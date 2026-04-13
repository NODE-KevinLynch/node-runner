require("../db/schema");

const { createAgent, getAgentById } = require("../repositories/agentRepo");
const { createDiagnosis } = require("../repositories/diagnosisRepo");
const { getLifecycleByAgentId } = require("../repositories/lifecycleRepo");
const { getPhaseHistoryForAgent } = require("../repositories/phaseHistoryRepo");
const { applyDiagnosisToLifecycle } = require("../services/lifecycleEngine");

const { generateId } = require("../utils/id");
const { nowISO } = require("../utils/time");

function runLifecycleEngineTest() {
  const agentId = generateId("agent");
  const diagnosisId = generateId("diagnosis");
  const now = nowISO();

  createAgent({
    id: agentId,
    first_name: "Kevin",
    last_name: "Engine",
    email: `engine.${Date.now()}@example.com`,
    phone: "555-333-4444",
    source: "test_lifecycle_engine",
    created_at: now,
  });

  const diagnosis = {
    id: diagnosisId,
    agent_id: agentId,
    assessment_id: generateId("assessment"),
    primary_bottleneck: "lead_engine",
    campaign_id: "SOLO_LEAD_ENGINE",
    confidence_score: 0.92,
    created_at: now,
  };

  createDiagnosis(diagnosis);

  const result = applyDiagnosisToLifecycle(diagnosis);

  const savedAgent = getAgentById(agentId);
  const lifecycle = getLifecycleByAgentId(agentId);
  const history = getPhaseHistoryForAgent(agentId);

  console.log("=== LIFECYCLE ENGINE TEST SUCCESS ===");
  console.log("Engine Result:", result);
  console.log("Agent:", savedAgent);
  console.log("Lifecycle:", lifecycle);
  console.log("History:", history);
}

runLifecycleEngineTest();
