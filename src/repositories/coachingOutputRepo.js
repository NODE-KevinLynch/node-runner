const db = require("../db/db");

function createCoachingOutput(output) {
  const stmt = db.prepare(`
    INSERT INTO coaching_outputs (
      id,
      agent_id,
      phase,
      focus,
      top_action,
      daily_ritual,
      weekly_target,
      supporting_actions_json,
      message,
      character_type,
      version,
      generated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    output.id,
    output.agent_id,
    output.phase,
    output.focus,
    output.top_action,
    output.daily_ritual,
    output.weekly_target,
    output.supporting_actions_json || null,
    output.message,
    output.character_type || null,
    output.version,
    output.generated_at,
  );
}

function getLatestCoachingOutputForAgent(agentId) {
  const stmt = db.prepare(`
    SELECT *
    FROM coaching_outputs
    WHERE agent_id = $1
    ORDER BY generated_at DESC
    LIMIT 1
  `);

  return stmt.get(agentId);
}

module.exports = {
  createCoachingOutput,
  getLatestCoachingOutputForAgent,
};
