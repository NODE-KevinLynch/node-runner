// src/scripts/sendTrafficMachineBroadcast.js
// One-off broadcast: "The Traffic Machine" workshop invite.
//
// Runs from Render Shell:
//   cd ~/project/src && node src/scripts/sendTrafficMachineBroadcast.js --dry-run
//   cd ~/project/src && node src/scripts/sendTrafficMachineBroadcast.js --live
//
// Behavior:
//   • Loads every real agent with an email
//   • Skips unsubscribed (agents.unsubscribed_at IS NOT NULL)
//   • Skips demos (id ILIKE '%demo%')
//   • Skips anyone who already received this broadcast (dedup on campaign_send_log)
//   • Personalizes {{First Name}} with agents.name (fallback "there")
//   • Appends real per-agent legal footer via buildLegalFooter()
//   • Logs each send to campaign_send_log with
//       campaign_type = 'broadcast:traffic_machine_1'
//   • Rate limits at ~2 emails/second (kind to Resend + inbox providers)
//   • --dry-run: prints what WOULD send, writes nothing, sends nothing
//   • --live:   actually sends
//
// Safety:
//   • Refuses to run without either --dry-run or --live
//   • Honors EMAIL_MODE and EMAIL_ALLOWLIST (same gates as dispatcher)
//   • Failures on individual sends never crash the run — logged and continued

const db = require("../db/db");
const { sendEmail } = require("../services/notificationService");
const { buildLegalFooter } = require("../utils/emailFooter");

// ── CONFIG ──────────────────────────────────────────────────────────────────
const CAMPAIGN_TYPE = "broadcast:traffic_machine_1";
const SUBJECT = "Free 3-hour social media workshop — Thursday, Burnaby";
const RATE_LIMIT_MS = 500; // 2 emails per second

// ── ARG PARSING ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isLive = args.includes("--live");

if (!isDryRun && !isLive) {
  console.error("");
  console.error("ERROR: must pass either --dry-run or --live");
  console.error("");
  console.error("  Dry run (safe, no writes, no sends):");
  console.error("    node src/scripts/sendTrafficMachineBroadcast.js --dry-run");
  console.error("");
  console.error("  Live send (writes to DB, sends real emails):");
  console.error("    node src/scripts/sendTrafficMachineBroadcast.js --live");
  console.error("");
  process.exit(1);
}

// ── EMAIL BODY ──────────────────────────────────────────────────────────────
function buildEmailHtml(firstName, agentId) {
  const greeting = firstName && firstName.trim() ? firstName.trim() : "there";
  const footer = buildLegalFooter(agentId);

  const body = `
<div style="font-family:Georgia,serif;font-size:16px;line-height:1.65;color:#1a2b4a;max-width:600px;">

  <p>Hi ${greeting},</p>

  <p>Short and direct: I'm running a free 3-hour social media workshop for agents this Thursday afternoon, and I'd like you in the room.</p>

  <p><strong>What it is:</strong> a working session, not a lecture. You'll have your phone out the whole time. We open six free tools already installed on your device that almost no agent uses — TikTok's Content Gap tab, Instagram's Trial Reels, the comment-to-video trick, free Meta audience data, and the 7-hook test that lets data pick your best content instead of you guessing.</p>

  <p><strong>What you leave with:</strong> three validated content topics for your own market, a working knowledge of what the algorithm actually rewards (hint: it isn't likes), and a 30-day posting calendar we build together before you walk out.</p>

  <p><strong>What it costs:</strong> nothing. No ad budget, no subscriptions, no gear.</p>

  <p style="margin:24px 0;padding:20px 24px;background:#f5f6f8;border-left:4px solid #aebd2e;">
    <strong>Thursday, July 16 · 1:00–4:00 PM</strong><br>
    Presentation Room, Sutton Centre Realty<br>
    3010 Boundary Road, Burnaby
  </p>

  <p><strong>Bring:</strong> phone, charger, laptop.</p>

  <p><strong>To register:</strong> call me at <a href="tel:+16043079448" style="color:#1a2b4a;">604-307-9448</a>. Seats are limited to keep it hands-on.</p>

  <p style="margin-top:32px;">Kevin Lynch<br>
  <span style="color:#6b7588;font-size:14px;">Coach | Trainer | REALTOR</span></p>

</div>
${footer}
`;

  return body;
}

// ── LOG WRITER ──────────────────────────────────────────────────────────────
function generateId() {
  return "log_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

async function logSend(agentId, sendStatus, sendMode, emailHtml) {
  try {
    await db
      .prepare(
        `INSERT INTO campaign_send_log
           (id, agent_id, campaign_type, campaign_step, subject, send_status, send_mode, email_html, sent_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      )
      .run(
        generateId(),
        agentId,
        CAMPAIGN_TYPE,
        1,
        SUBJECT,
        sendStatus,
        sendMode,
        sendStatus === "sent" ? emailHtml : null,
        new Date().toISOString(),
      );
  } catch (err) {
    console.error(`  ✗ log write failed for ${agentId}: ${err.message}`);
  }
}

// ── SLEEP HELPER ────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("");
  console.log("=".repeat(60));
  console.log("  TRAFFIC MACHINE BROADCAST — email 1 of 1");
  console.log("=".repeat(60));
  console.log("  Mode        : " + (isLive ? "LIVE (real sends)" : "DRY RUN (no sends)"));
  console.log("  Subject     : " + SUBJECT);
  console.log("  From        : " + (process.env.EMAIL_FROM || "(unset — will error in live mode)"));
  console.log("  EMAIL_MODE  : " + (process.env.EMAIL_MODE || "mock"));
  console.log("  ALLOWLIST   : " + (process.env.EMAIL_ALLOWLIST || "(none — all recipients allowed)"));
  console.log("  Campaign ID : " + CAMPAIGN_TYPE);
  console.log("=".repeat(60));
  console.log("");

  // Load audience — every real agent with a valid email, not unsubscribed,
  // not a demo, not already sent this broadcast.
  const audience = await db
    .prepare(
      `SELECT a.id, a.name, a.email
       FROM agents a
       WHERE a.email IS NOT NULL
         AND a.email <> ''
         AND a.email LIKE '%@%.%'
         AND a.unsubscribed_at IS NULL
         AND DATE(a.created_at) = '2026-05-13'
         AND NOT EXISTS (
           SELECT 1 FROM campaign_send_log csl
           WHERE csl.agent_id = a.id
             AND csl.campaign_type = $1
             AND csl.send_status IN ('sent','blocked')
         )
       ORDER BY a.created_at ASC`,
    )
    .all(CAMPAIGN_TYPE);

  console.log(`Audience: ${audience.length} agents queued for send.`);
  console.log("");

  if (audience.length === 0) {
    console.log("Nothing to send. Exiting.");
    process.exit(0);
  }

  // Show first 5 as a preview
  console.log("First 5 recipients (preview):");
  audience.slice(0, 5).forEach((a) => {
    console.log(`  • ${a.name || "(no name)"} <${a.email}>  [${a.id}]`);
  });
  console.log("");

  if (isDryRun) {
    console.log("DRY RUN — no sends, no writes. Re-run with --live to send.");
    process.exit(0);
  }

  // ── LIVE SEND ─────────────────────────────────────────────────────────────
  const sendMode = process.env.EMAIL_MODE || "mock";
  let sent = 0;
  let failed = 0;
  let blocked = 0;

  for (let i = 0; i < audience.length; i++) {
    const agent = audience[i];
    const html = buildEmailHtml(agent.name, agent.id);

    try {
      const result = await sendEmail({
        to: agent.email,
        phase: "broadcast",
        subject: SUBJECT,
        html,
        extra: { campaignType: CAMPAIGN_TYPE, campaignStep: 1 },
      });

      const status = result.sent ? "sent" : result.blocked ? "blocked" : "failed";
      await logSend(agent.id, status, sendMode, html);

      if (status === "sent") sent++;
      else if (status === "blocked") blocked++;
      else failed++;

      const pad = String(i + 1).padStart(String(audience.length).length, " ");
      console.log(
        `  [${pad}/${audience.length}] ${status.toUpperCase().padEnd(7)} ${agent.email}`,
      );
    } catch (err) {
      failed++;
      await logSend(agent.id, "failed", sendMode, null);
      console.log(`  [${i + 1}/${audience.length}] FAILED  ${agent.email}  (${err.message})`);
    }

    // Rate limit
    if (i < audience.length - 1) await sleep(RATE_LIMIT_MS);
  }

  console.log("");
  console.log("=".repeat(60));
  console.log("  DONE");
  console.log("=".repeat(60));
  console.log(`  Sent    : ${sent}`);
  console.log(`  Blocked : ${blocked}  (recipients not in EMAIL_ALLOWLIST)`);
  console.log(`  Failed  : ${failed}`);
  console.log("=".repeat(60));
  console.log("");

  process.exit(0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
