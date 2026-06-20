// src/scripts/createBroadcast.js
// One-time helper: inserts a single broadcast email into the `broadcasts` table.
// The stored html_body is the EMAIL BODY ONLY — the sender (runBroadcast.js)
// appends node-runner's own buildLegalFooter(agentId) per recipient, exactly
// like the daily sequence does. Do NOT put unsubscribe links or Resend tokens
// in here.
//
// Run once:  node src/scripts/createBroadcast.js
// Prints the new broadcast id. Safe to re-run: it will refuse to create a
// duplicate of the same subject and instead report the existing id.

try { require("dotenv").config(); } catch (e) {}
const db = require("../db/db");

const SUBJECT = "One 30-second video can outperform months of marketing";
const FROM_ADDRESS = "Kevin Lynch <kevin@kevinlynch.ca>";
const DAILY_CAP = 1000;

const HTML_BODY = `<!-- ============================================================
     THE TRAFFIC MACHINE — WORKSHOP INVITE
     Paste this whole block into Resend Broadcasts (HTML body).
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;padding:0;background:#eef1f5;">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

        <!-- ── HERO ────────────────────────────────────────── -->
        <tr>
          <td style="background:#0d1b3e;padding:38px 40px 34px 40px;">
            <p style="margin:0 0 14px 0;font-size:12px;letter-spacing:2px;color:#aebd2e;font-weight:700;text-transform:uppercase;">
              Free Live Workshop · Sutton Centre Realty
            </p>
            <h1 style="margin:0;font-size:38px;line-height:1.04;color:#ffffff;font-weight:800;letter-spacing:-0.5px;">
              The Traffic Machine:<br>
              <span style="color:#aebd2e;">Become Unignorable</span>
            </h1>
            <p style="margin:18px 0 0 0;font-size:16px;line-height:1.5;color:#c4cde0;">
              The modern agent's system for staying relevant, winning attention,
              and generating consistent business with short-form video.
            </p>
          </td>
        </tr>

        <!-- ── BODY ────────────────────────────────────────── -->
        <tr>
          <td style="padding:36px 40px 8px 40px;">
            <p style="margin:0 0 20px 0;font-size:17px;line-height:1.6;color:#1a2b4a;">
              Hi there,
            </p>

            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#34425c;">
              The agents winning today aren't necessarily the most experienced or
              the biggest spenders. They're the most <strong>visible</strong>, the most
              <strong>relevant</strong>, and the most <strong>consistent</strong>.
            </p>

            <p style="margin:0 0 26px 0;font-size:16px;line-height:1.65;color:#34425c;">
              Short-form video is how they got there — and one 30-second clip can
              outperform months of traditional marketing.
            </p>

            <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#34425c;">
              I'm running a free, hands-on workshop to show you exactly how to build
              your own traffic machine:
            </p>

            <!-- benefits -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 30px 0;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eef1f5;font-size:16px;line-height:1.5;color:#1a2b4a;">
                  <span style="color:#aebd2e;font-weight:800;">→</span>&nbsp;&nbsp;The <strong>7 video formats</strong> that consistently generate attention
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eef1f5;font-size:16px;line-height:1.5;color:#1a2b4a;">
                  <span style="color:#aebd2e;font-weight:800;">→</span>&nbsp;&nbsp;The <strong>hook formula</strong> that stops the scroll in 3 seconds
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:16px;line-height:1.5;color:#1a2b4a;">
                  <span style="color:#aebd2e;font-weight:800;">→</span>&nbsp;&nbsp;A simple <strong>30-day plan</strong> to become unignorable in your market
                </td>
              </tr>
            </table>

            <!-- details card -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;background:#0d1b3e;border-radius:10px;">
              <tr>
                <td style="padding:26px 28px;">
                  <p style="margin:0 0 4px 0;font-size:13px;letter-spacing:1.5px;color:#aebd2e;font-weight:700;text-transform:uppercase;">
                    Workshop Details
                  </p>
                  <p style="margin:0 0 14px 0;font-size:19px;line-height:1.35;color:#ffffff;font-weight:700;">
                    The Traffic Machine: Become Unignorable
                  </p>
                  <p style="margin:0 0 4px 0;font-size:15px;line-height:1.6;color:#dbe2f0;">
                    <strong style="color:#ffffff;">Thursday, June 25</strong> &nbsp;·&nbsp; 1:00–3:00 PM
                  </p>
                  <p style="margin:0;font-size:15px;line-height:1.6;color:#dbe2f0;">
                    Sutton Centre Realty – Training Centre<br>3010 Boundary Road, Burnaby, BC
                  </p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px 0;">
              <tr>
                <td align="center">
                  <a href="https://TrafficMachine.eventbrite.com"
                     style="display:inline-block;background:#aebd2e;color:#0d1b3e;font-size:17px;font-weight:800;text-decoration:none;padding:16px 44px;border-radius:8px;letter-spacing:0.3px;">
                    Register Free →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 30px 0;font-size:15px;line-height:1.6;color:#6b7588;text-align:center;font-style:italic;">
              Bring your phone. That's the only equipment you need.
            </p>

            <!-- signature -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #eef1f5;">
              <tr>
                <td style="padding:24px 0 4px 0;">
                  <p style="margin:0;font-size:16px;line-height:1.5;color:#1a2b4a;font-weight:700;">Kevin Lynch</p>
                  <p style="margin:2px 0 0 0;font-size:14px;line-height:1.5;color:#6b7588;">Coach&nbsp;|&nbsp;Trainer&nbsp;|&nbsp;REALTOR</p>
                  <p style="margin:2px 0 0 0;font-size:14px;line-height:1.5;color:#6b7588;">604-307-9448</p>
                  <p style="margin:2px 0 0 0;font-size:14px;line-height:1.5;">
                    <a href="https://LynchPerformanceSystems.com" style="color:#1a2b4a;font-weight:600;text-decoration:none;">LynchPerformanceSystems.com</a>
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>


      </table>

    </td>
  </tr>
</table>`;

(async () => {
  try {
    const existing = await db
      .prepare("SELECT id, status FROM broadcasts WHERE subject = $1")
      .get(SUBJECT);

    if (existing) {
      console.log(
        `Broadcast already exists: id=${existing.id} status=${existing.status}. ` +
        `Not creating a duplicate.`
      );
      process.exit(0);
    }

    const res = await db
      .prepare(
        `INSERT INTO broadcasts (subject, from_address, html_body, daily_cap, status)
         VALUES ($1, $2, $3, $4, 'draft')
         RETURNING id`
      )
      .run(SUBJECT, FROM_ADDRESS, HTML_BODY, DAILY_CAP);

    const id = res.rows[0].id;
    console.log(`Broadcast created: id=${id}`);
    console.log(`  subject : ${SUBJECT}`);
    console.log(`  from    : ${FROM_ADDRESS}`);
    console.log(`  cap/day : ${DAILY_CAP}`);
    console.log(`  status  : draft`);
    console.log("");
    console.log("Next: dry-run the send with EMAIL_MODE=mock to preview counts.");
    process.exit(0);
  } catch (err) {
    console.error("createBroadcast failed:", err.message);
    process.exit(1);
  }
})();
