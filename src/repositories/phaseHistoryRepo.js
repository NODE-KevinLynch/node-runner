const db = require("../db/db");

function createPhaseHistory(entry) {
  const stmt = db.prepare(`
    INSERT INTO phase_history (
      id,
      agent_id,
      from_phase,
      to_phase,
      changed_at,
      reason
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    entry.id,
    entry.agent_id,
    entry.from_phase || null,
    entry.to_phase,
    entry.changed_at,
    entry.reason || null,
  );
}

function getPhaseHistoryForAgent(agentId) {
  const stmt = db.prepare(`
    SELECT *
    FROM phase_history
    WHERE agent_id = $1
    ORDER BY changed_at DESC
  `);

  return stmt.all(agentId);
}

module.exports = {
  createPhaseHistory,
  getPhaseHistoryForAgent,
};
