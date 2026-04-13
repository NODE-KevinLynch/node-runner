const db = require("../db/db");

function createAgent(agent) {
  const stmt = db.prepare(`
    INSERT INTO agents (id, first_name, last_name, email, phone, source, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    agent.id,
    agent.first_name || null,
    agent.last_name || null,
    agent.email || null,
    agent.phone || null,
    agent.source || null,
    agent.created_at,
  );
}

function getAgentById(id) {
  const stmt = db.prepare(`
    SELECT * FROM agents WHERE id = ?
  `);

  return stmt.get(id);
}

function getAgentByEmail(email) {
  const stmt = db.prepare(`
    SELECT * FROM agents WHERE email = ?
  `);

  return stmt.get(email);
}

function updateAgent(agent) {
  const stmt = db.prepare(`
    UPDATE agents
    SET first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?,
        source = ?
    WHERE id = ?
  `);

  stmt.run(
    agent.first_name || null,
    agent.last_name || null,
    agent.email || null,
    agent.phone || null,
    agent.source || null,
    agent.id,
  );
}

module.exports = {
  createAgent,
  getAgentById,
  getAgentByEmail,
  updateAgent,
};
