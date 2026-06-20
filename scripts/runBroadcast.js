// src/scripts/runBroadcast.js
// Sends ONE broadcast (from the `broadcasts` table) to the full agents list,
// reusing node-runner's existing send path and safety gates.
//
// Reuses:
//   • sendEmail()            — same Resend path as the daily sequence
//   • buildLegalFooter()     — same per-agent compliant unsubscribe footer
//   • campaign_send_log      — same send-log table (for dedupe + visibility)
//
// Safety / behavior:
//   • Skips agents with no email
//   • Skips unsubscribed agents (unsubscribed_at IS NOT NULL) — CASL/CAN-SPAM
//   • Dedupe / resume-safe: never re-sends to an agent already logged
//     as send_status='sent' for this broadcast (campaign_type='broadcast:<id>')
//   • Respects daily_cap — sends at most that many per run
//   • Honors EMAIL_MODE (mock vs live) via sendEmail()
//   • Prints sent / failed / remaining each run
//
// Usage:
//   node src/scripts/runBroadcast.js            # uses lowest-id non-complete broadcast
//   node src/scripts/runBroadcast.js 3          # target broadcast id=3
//
// Re-run daily (or whenever) until "remaining = 0". Pause the daily-sequence
// cron while this runs so total domain volume stays flat (Option 2).

try { require("dotenv").config(); } catch (e) {}
const db = require("../db/db");
const { sendEmail } = require("../services/notificationService");
const { buildLegalFooter } = require("../utils/emailFooter");

const SEND_DELAY_MS = 400; // gentle pacing between individual sends

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function loadBroadcast(argId) {
  if (argId) {
    return await db
      .prepare("SELECT * FROM broadcasts WHERE id = $1")
      .get(argId);
  }
  return await db
    .prepare(
      `SELECT * FROM broadcasts
       WHERE status <> 'complete'
       ORDER BY id ASC
       LIMIT 1`
    )
    .get();
}

async function main() {
  const argId = process.argv[2] ? parseInt(process.argv[2], 10) : null;
  const broadcast = await loadBroadcast(argId);

  if (!broadcast) {
    console.log("No broadcast found to send (none, or all are 'complete').");
    process.exit(0);
  }

  const campaignType = `broadcast:${broadcast.id}`;
  const cap = broadcast.daily_cap || 1000;
  const mode = (process.env.EMAIL_MODE || "mock").toLowerCase();

  console.log(`Broadcast id=${broadcast.id} — "${broadcast.subject}"`);
  console.log(`  campaign_type : ${campaignType}`);
  console.log(`  daily_cap     : ${cap}`);
  console.log(`  EMAIL_MODE    : ${mode}${mode === "live" ? "  *** LIVE ***" : "  (dry-run)"}`);

  if (process.env.EMAIL_ALLOWLIST && process.env.EMAIL_ALLOWLIST.trim()) {
    console.log(
      `  WARNING: EMAIL_ALLOWLIST is set — only those addresses will actually send.`
    );
  }

  // Total addressable (has email, not unsubscribed)
  const addressable = await db
    .prepare(
      `SELECT COUNT(*)::int AS n FROM agents
       WHERE email IS NOT NULL AND email <> '' AND unsubscribed_at IS NULL`
    )
    .get();

  // Already sent for THIS broadcast
  const alreadySent = await db
    .prepare(
      `SELECT COUNT(*)::int AS n FROM campaign_send_log
       WHERE campaign_type = $1 AND send_status = 'sent'`
    )
    .get(campaignType);

  // Eligible this run: addressable, minus anyone already sent this broadcast
  const recipients = await db
    .prepare(
      `SELECT a.id, a.email, a.name
       FROM agents a
       WHERE a.email IS NOT NULL AND a.email <> ''
         AND a.unsubscribed_at IS NULL
         AND NOT EXISTS (
           SELECT 1 FROM campaign_send_log l
           WHERE l.agent_id = a.id
             AND l.campaign_type = $1
             AND l.send_status = 'sent'
         )
       ORDER BY a.id ASC
       LIMIT $2`
    )
    .all(campaignType, cap);

  const remainingBefore = addressable.n - alreadySent.n;
  console.log("");
  console.log(`  addressable (total)     : ${addressable.n}`);
  console.log(`  already sent (this b/c) : ${alreadySent.n}`);
  console.log(`  remaining before run    : ${remainingBefore}`);
  console.log(`  sending this run (<=cap): ${recipients.length}`);
  console.log("");

  if (recipients.length === 0) {
    console.log("Nothing to send — broadcast is fully delivered.");
    if (remainingBefore <= 0) {
      await db
        .prepare("UPDATE broadcasts SET status = 'complete' WHERE id = $1")
        .run(broadcast.id);
      console.log("Marked broadcast status = 'complete'.");
    }
    process.exit(0);
  }

  // Mark as sending
  await db
    .prepare("UPDATE broadcasts SET status = 'sending' WHERE id = $1")
    .run(broadcast.id);

  let sent = 0;
  let failed = 0;

  for (const agent of recipients) {
    const html = broadcast.html_body + buildLegalFooter(agent.id);

    const result = await sendEmail({
      to: agent.email,
      subject: broadcast.subject,
      html,
    });

    const sendStatus = result && result.sent ? "sent" : "failed";
    const sendMode = result && result.mode ? result.mode : mode;

    await db
      .prepare(
        `INSERT INTO campaign_send_log
           (agent_id, campaign_type, campaign_step, subject, send_status, send_mode, email_html, sent_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`
      )
      .run(
        agent.id,
        campaignType,
        0,
        broadcast.subject,
        sendStatus,
        sendMode,
        sendStatus === "sent" ? html : null
      );

    if (sendStatus === "sent") {
      sent++;
    } else {
      failed++;
      console.warn(`  ! failed: ${agent.email} (${result && result.error ? result.error : result && result.reason ? result.reason : "unknown"})`);
    }

    if ((sent + failed) % 50 === 0) {
      console.log(`  ...progress: ${sent} sent, ${failed} failed`);
    }

    await sleep(SEND_DELAY_MS);
  }

  const remainingAfter = remainingBefore - sent;

  console.log("");
  console.log(`Run complete (${mode}):`);
  console.log(`  sent this run   : ${sent}`);
  console.log(`  failed this run : ${failed}`);
  console.log(`  remaining       : ${remainingAfter}`);

  if (remainingAfter <= 0) {
    await db
      .prepare("UPDATE broadcasts SET status = 'complete' WHERE id = $1")
      .run(broadcast.id);
    console.log("  status          : complete  (all delivered)");
  } else {
    await db
      .prepare("UPDATE broadcasts SET status = 'sending' WHERE id = $1")
      .run(broadcast.id);
    console.log(`  status          : sending   (run again to send the next ${cap})`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("runBroadcast failed:", err.message);
  process.exit(1);
});
