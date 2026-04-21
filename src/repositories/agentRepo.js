const db = require("../db/db");

function createAgent(agent) {
  const stmt = db.prepare(`
    INSERT INTO agents (id, name, last_name, email, phone, source, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
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
    SELECT * FROM agents WHERE id = $1
  `);

  return stmt.get(id);
}

function getAgentByEmail(email) {
  const stmt = db.prepare(`
    SELECT * FROM agents WHERE email = $1
  `);

  return stmt.get(email);
}

function updateAgent(agent) {
  const stmt = db.prepare(`
    UPDATE agents
    SET name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        source = $5
    WHERE id = $6
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
