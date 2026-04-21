const db = require("../db/db");

function createAssessment(assessment) {
  const stmt = db.prepare(`
    INSERT INTO assessments (id, agent_id, responses_json, score_json, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(
    assessment.id,
    assessment.agent_id,
    assessment.responses_json,
    assessment.score_json || null,
    assessment.created_at,
  );
}

function getAssessmentById(id) {
  const stmt = db.prepare(`
    SELECT * FROM assessments WHERE id = $1
  `);

  return stmt.get(id);
}

function getLatestAssessmentForAgent(agentId) {
  const stmt = db.prepare(`
    SELECT *
    FROM assessments
    WHERE agent_id = $1
    ORDER BY created_at DESC
    LIMIT 1
  `);

  return stmt.get(agentId);
}

module.exports = {
  createAssessment,
  getAssessmentById,
  getLatestAssessmentForAgent,
};
