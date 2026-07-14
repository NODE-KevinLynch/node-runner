// src/utils/emailFooter.js
// CASL/CAN-SPAM compliant legal footer for all outgoing campaign emails.
//
// Appended AFTER the existing signature in every email, across all 4
// campaigns (pre-activation cold, Sutton pre-activation, post-analysis,
// dynamic coaching).
//
// Includes:
//   • Why the recipient is receiving the email
//   • One-click unsubscribe link (unique per agent, signed token)
//   • Sender identity
//   • Physical business address (legally required)

const { buildUnsubscribeUrl } = require("./unsubscribeToken");

const BASE_URL =
  process.env.PUBLIC_BASE_URL || "https://node-runner.onrender.com";

/**
 * Build the legal footer HTML block for a given agent.
 * @param {string} agentId - the agent's database ID
 * @returns {string} HTML to append after the email signature
 */
function buildLegalFooter(agentId) {
  const unsubUrl = buildUnsubscribeUrl(agentId, BASE_URL);

  return `
<br><br>
<hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
<table cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:12px;color:#888;line-height:1.5;max-width:600px">
  <tr><td>
    You're receiving this because you were included in our BC realtor outreach.
    If this isn't relevant to you, no hard feelings:
  </td></tr>
  <tr><td style="padding-top:8px">
    <a href="${unsubUrl}" style="color:#1a0dab">Unsubscribe with one click</a>
  </td></tr>
  <tr><td style="padding-top:12px;color:#888">
    Kevin Lynch · Sutton Business Solution | Lynch Performance Systems<br>
    Sutton Centre Realty · 3010 Boundary Road, Burnaby BC V5M 4A1
  </td></tr>
</table>
`;
}

module.exports = { buildLegalFooter };
