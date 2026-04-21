const crypto = require("crypto");
const db = require("../db/db");

async function generateToken(agentId) {
  const token = crypto.randomBytes(32).toString("hex");
  await db.prepare(
    "INSERT INTO portal_tokens (agent_id, token) VALUES ($1, $2)"
  ).run(agentId, token);
  return token;
}

async function validateToken(agentId, token) {
  if (!token) return false;
  const row = await db.prepare(
    "SELECT * FROM portal_tokens WHERE agent_id = $1 AND token = $2 AND expires_at > NOW()"
  ).get(agentId, token);
  return !!row;
}

async function getTokenForAgent(agentId) {
  const row = await db.prepare(
    "SELECT token FROM portal_tokens WHERE agent_id = $1 AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1"
  ).get(agentId);
  return row ? row.token : null;
}

module.exports = { generateToken, validateToken, getTokenForAgent };
