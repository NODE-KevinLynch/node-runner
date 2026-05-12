// src/utils/unsubscribeToken.js
// Generates and verifies secure unsubscribe tokens.
//
// Each agent gets a unique, un-guessable token in their email footer.
// The token is built from the agent ID + a secret stored in the
// UNSUBSCRIBE_SECRET environment variable. Without the secret, nobody can
// forge a valid token, and nobody can unsubscribe someone they aren't.
//
// Token format: base64url(agentId).base64url(hmac).
// Example: YWdlbnRfbWFyY3VzX2RlbW8.x9k2mP4qLrT8nB3vY1...

const crypto = require("crypto");

function getSecret() {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) {
    throw new Error(
      "UNSUBSCRIBE_SECRET environment variable is not set. " +
        "Add it in Render → Environment.",
    );
  }
  return secret;
}

function base64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64").toString("utf8");
}

function signAgentId(agentId) {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update(agentId).digest();
}

/**
 * Generate an unsubscribe token for the given agent ID.
 * @param {string} agentId
 * @returns {string} token to include in unsubscribe URL
 */
function generateToken(agentId) {
  if (!agentId) throw new Error("agentId is required");
  const idPart = base64url(agentId);
  const sigPart = base64url(signAgentId(agentId));
  return `${idPart}.${sigPart}`;
}

/**
 * Verify a token and return the agent ID if valid.
 * @param {string} token
 * @returns {string|null} agent ID if valid, null if tampered/invalid
 */
function verifyToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }
  const [idPart, sigPart] = token.split(".");
  if (!idPart || !sigPart) return null;

  let agentId;
  try {
    agentId = base64urlDecode(idPart);
  } catch (e) {
    return null;
  }

  const expectedSig = base64url(signAgentId(agentId));

  // Constant-time comparison to prevent timing attacks
  if (
    sigPart.length !== expectedSig.length ||
    !crypto.timingSafeEqual(Buffer.from(sigPart), Buffer.from(expectedSig))
  ) {
    return null;
  }

  return agentId;
}

/**
 * Build the full unsubscribe URL for an agent.
 * @param {string} agentId
 * @param {string} baseUrl - e.g. "https://node-runner.onrender.com"
 * @returns {string}
 */
function buildUnsubscribeUrl(agentId, baseUrl) {
  const token = generateToken(agentId);
  const base = (baseUrl || "https://node-runner.onrender.com").replace(
    /\/$/,
    "",
  );
  return `${base}/unsubscribe/${token}`;
}

module.exports = {
  generateToken,
  verifyToken,
  buildUnsubscribeUrl,
};
