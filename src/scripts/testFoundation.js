const requireSchema = require("../db/schema");

const { createAgent, getAgentById } = require("../repositories/agentRepo");
const {
  createAssessment,
  getLatestAssessmentForAgent,
} = require("../repositories/assessmentRepo");
const {
  createDiagnosis,
  getLatestDiagnosisForAgent,
} = require("../repositories/diagnosisRepo");

const { generateId } = require("../utils/id");
const { nowISO } = require("../utils/time");

function runTestFoundation() {
  const agentId = generateId("agent");
  const assessmentId = generateId("assessment");
  const diagnosisId = generateId("diagnosis");
  const createdAt = nowISO();

  createAgent({
    id: agentId,
    first_name: "Kevin",
    last_name: "Test",
    email: `kevin.test.${Date.now()}@example.com`,
    phone: "555-111-2222",
    source: "test_foundation",
    created_at: createdAt,
  });

  createAssessment({
    id: assessmentId,
    agent_id: agentId,
    responses_json: JSON.stringify({
      lead_flow: "inconsistent",
      follow_up: "weak",
      database_size: "small",
    }),
    score_json: JSON.stringify({
      lead_engine: 8,
      foundation: 5,
      pipeline_repair: 3,
    }),
    created_at: createdAt,
  });

  createDiagnosis({
    id: diagnosisId,
    agent_id: agentId,
    assessment_id: assessmentId,
    primary_bottleneck: "lead_engine",
    campaign_id: "SOLO_LEAD_ENGINE",
    confidence_score: 0.87,
    created_at: createdAt,
  });

  const savedAgent = getAgentById(agentId);
  const savedAssessment = getLatestAssessmentForAgent(agentId);
  const savedDiagnosis = getLatestDiagnosisForAgent(agentId);

  console.log("=== TEST FOUNDATION SUCCESS ===");
  console.log("Agent:", savedAgent);
  console.log("Assessment:", savedAssessment);
  console.log("Diagnosis:", savedDiagnosis);
}

runTestFoundation();
