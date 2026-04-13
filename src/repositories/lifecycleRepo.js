const db = require("../db/db");

function createLifecycle(lifecycle) {
  const stmt = db.prepare(`
    INSERT INTO agent_lifecycle (
      agent_id,
      current_phase,
      phase_entered_at,
      last_engaged_at,
      last_sync_at,
      engagement_score,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    lifecycle.agent_id,
    lifecycle.current_phase,
    lifecycle.phase_entered_at,
    lifecycle.last_engaged_at || null,
    lifecycle.last_sync_at,
    lifecycle.engagement_score ?? 0,
    lifecycle.status,
  );
}

function getLifecycleByAgentId(agentId) {
  const stmt = db.prepare(`
    SELECT *
    FROM agent_lifecycle
    WHERE agent_id = ?
  `);

  return stmt.get(agentId);
}

function updateLifecycle(lifecycle) {
  const stmt = db.prepare(`
    UPDATE agent_lifecycle
    SET current_phase = ?,
        phase_entered_at = ?,
        last_engaged_at = ?,
        last_sync_at = ?,
        engagement_score = ?,
        status = ?
    WHERE agent_id = ?
  `);

  stmt.run(
    lifecycle.current_phase,
    lifecycle.phase_entered_at,
    lifecycle.last_engaged_at || null,
    lifecycle.last_sync_at,
    lifecycle.engagement_score ?? 0,
    lifecycle.status,
    lifecycle.agent_id,
  );
}

module.exports = {
  createLifecycle,
  getLifecycleByAgentId,
  updateLifecycle,
};
