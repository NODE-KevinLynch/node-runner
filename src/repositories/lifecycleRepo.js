const db = require("../db/db");

function createLifecycle(lifecycle) {
  const stmt = db.prepare(`
    INSERT INTO agent_lifecycle (
      agent_id,
      stage,
      phase_entered_at,
      last_engaged_at,
      last_sync_at,
      engagement_score,
      status
    )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `);

  stmt.run(
    lifecycle.agent_id,
    lifecycle.stage,
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
    WHERE agent_id = $1
  `);

  return stmt.get(agentId);
}

function updateLifecycle(lifecycle) {
  const stmt = db.prepare(`
    UPDATE agent_lifecycle
    SET stage = $1,
        phase_entered_at = $2,
        last_engaged_at = $3,
        last_sync_at = $4,
        engagement_score = $5,
        status = $6
    WHERE agent_id = $1
  `);

  stmt.run(
    lifecycle.stage,
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
