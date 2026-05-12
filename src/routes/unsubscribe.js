// src/routes/unsubscribe.js
// Unsubscribe routes — handles one-click unsubscribe from email footers.
//
// GET  /unsubscribe/:token  → verifies token, marks agent unsubscribed,
//                              shows confirmation landing page.
// POST /unsubscribe/:token  → same behavior (some email clients prefetch
//                              GET links; supporting POST also lets us
//                              honor List-Unsubscribe-Post=One-Click).
//
// On success: sets agents.unsubscribed_at = NOW() and stops further sends.

const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { verifyToken } = require("../utils/unsubscribeToken");

async function handleUnsubscribe(req, res) {
  const { token } = req.params;
  const agentId = verifyToken(token);

  if (!agentId) {
    return res.status(400).send(renderError("invalid"));
  }

  try {
    const agent = await db
      .prepare(
        `SELECT id, name, last_name, email, unsubscribed_at
         FROM agents WHERE id = $1`,
      )
      .get(agentId);

    if (!agent) {
      return res.status(404).send(renderError("notfound"));
    }

    // Already unsubscribed — show the same confirmation page (idempotent)
    if (agent.unsubscribed_at) {
      return res.send(renderSuccess(agent, true));
    }

    await db
      .prepare(`UPDATE agents SET unsubscribed_at = NOW() WHERE id = $1`)
      .run(agentId);

    return res.send(renderSuccess(agent, false));
  } catch (err) {
    console.error("Unsubscribe error:", err.message);
    return res.status(500).send(renderError("server"));
  }
}

router.get("/:token", handleUnsubscribe);
router.post("/:token", handleUnsubscribe);

// ── Page rendering ──────────────────────────────────────────────────────────

function pageShell(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Co.Pilot by Sutton Group</title>
  <style>
    * { box-sizing: border-box }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Georgia, sans-serif;
      background: #f5f6f8;
      margin: 0;
      padding: 0;
      color: #1a2b4a;
      line-height: 1.6;
    }
    .wrap {
      max-width: 560px;
      margin: 0 auto;
      padding: 80px 24px 40px;
    }
    .card {
      background: #fff;
      border: 1px solid #e0e3e8;
      border-radius: 12px;
      padding: 48px 40px;
      box-shadow: 0 2px 8px rgba(26, 43, 74, 0.04);
    }
    h1 {
      margin: 0 0 16px 0;
      font-size: 28px;
      font-weight: 600;
      color: #1a2b4a;
    }
    p { margin: 0 0 16px 0; color: #444; font-size: 15px }
    .checkmark {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #e8f5ee;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      color: #1f8a4a;
      font-size: 28px;
      font-weight: bold;
    }
    .error-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #fff0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      color: #c33;
      font-size: 28px;
      font-weight: bold;
    }
    .footer {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
      font-size: 13px;
      color: #888;
    }
    .footer strong { color: #1a2b4a }
    a { color: #1a2b4a; text-decoration: underline }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      ${bodyHtml}
      <div class="footer">
        <strong>Kevin Lynch</strong> · Sutton Business Solution | Co.Pilot<br>
        Sutton Centre Realty · 3010 Boundary Road, Burnaby BC V5M 4A1
      </div>
    </div>
  </div>
</body>
</html>`;
}

function renderSuccess(agent, alreadyUnsubscribed) {
  const greeting = agent.name ? `${agent.name},` : "All done.";
  const message = alreadyUnsubscribed
    ? `You were already unsubscribed. No further emails will be sent to <strong>${agent.email}</strong>.`
    : `You've been unsubscribed. No further emails will be sent to <strong>${agent.email}</strong>.`;

  return pageShell(
    "Unsubscribed",
    `
    <div class="checkmark">✓</div>
    <h1>${greeting}</h1>
    <p>${message}</p>
    <p style="color:#888;font-size:14px">
      Change your mind later? You can re-subscribe anytime by signing up at
      <a href="https://agentanalysis.kevinlynch.ca">agentanalysis.kevinlynch.ca</a>.
    </p>
    `,
  );
}

function renderError(kind) {
  const messages = {
    invalid: {
      title: "Link Not Valid",
      body: `<p>This unsubscribe link is invalid or has been altered. If you'd like to unsubscribe, please reply to any email from Kevin Lynch with the word "unsubscribe" and we'll handle it manually.</p>`,
    },
    notfound: {
      title: "Account Not Found",
      body: `<p>We couldn't find the account associated with this link. If you're seeing this in error, please reply to any email from Kevin Lynch with the word "unsubscribe".</p>`,
    },
    server: {
      title: "Something Went Wrong",
      body: `<p>We hit an unexpected error processing your request. Please try the link again in a moment, or reply to any email with "unsubscribe" and we'll handle it manually.</p>`,
    },
  };

  const m = messages[kind] || messages.server;

  return pageShell(
    m.title,
    `
    <div class="error-icon">!</div>
    <h1>${m.title}</h1>
    ${m.body}
    `,
  );
}

module.exports = router;
