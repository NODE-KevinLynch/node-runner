const db = require("../db/db");

function createDiagnosis(diagnosis) {
  const stmt = db.prepare(`
    INSERT INTO diagnoses (
      id,
      agent_id,
      assessment_id,
      primary_bottleneck,
      campaign_id,
      confidence_score,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    diagnosis.id,
    diagnosis.agent_id,
    diagnosis.assessment_id,
    diagnosis.primary_bottleneck,
    diagnosis.campaign_id,
    diagnosis.confidence_score ?? null,
    diagnosis.created_at,
  );
}

function getLatestDiagnosisForAgent(agentId) {
  const stmt = db.prepare(`
    SELECT *
    FROM diagnoses
    WHERE agent_id = $1
    ORDER BY created_at DESC
    LIMIT 1
  `);

  return stmt.get(agentId);
}

function getDiagnosisByAssessmentId(assessmentId) {
  const stmt = db.prepare(`
    SELECT *
    FROM diagnoses
    WHERE assessment_id = $1
    LIMIT 1
  `);

  return stmt.get(assessmentId);
}

module.exports = {
  createDiagnosis,
  getLatestDiagnosisForAgent,
  getDiagnosisByAssessmentId,
};
