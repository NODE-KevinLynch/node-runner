require("../db/schema");

const { createAgent } = require("../repositories/agentRepo");
const { createAssessment } = require("../repositories/assessmentRepo");
const { createDiagnosis } = require("../repositories/diagnosisRepo");
const {
  createLifecycle,
  updateLifecycle,
  getLifecycleByAgentId,
} = require("../repositories/lifecycleRepo");
const {
  createPhaseHistory,
  getPhaseHistoryForAgent,
} = require("../repositories/phaseHistoryRepo");

const { generateId } = require("../utils/id");
const { nowISO } = require("../utils/time");

function runLifecycleTest() {
  const agentId = generateId("agent");
  const assessmentId = generateId("assessment");
  const diagnosisId = generateId("diagnosis");
  const now = nowISO();

  // Create base records
  createAgent({
    id: agentId,
    first_name: "Kevin",
    last_name: "Lifecycle",
    email: `lifecycle.${Date.now()}@test.com`,
    phone: "555-000-0000",
    source: "lifecycle_test",
    created_at: now,
  });

  createAssessment({
    id: assessmentId,
    agent_id: agentId,
    responses_json: "{}",
    score_json: "{}",
    created_at: now,
  });

  createDiagnosis({
    id: diagnosisId,
    agent_id: agentId,
    assessment_id: assessmentId,
    primary_bottleneck: "pipeline_repair",
    campaign_id: "PIPELINE_REPAIR",
    confidence_score: 0.91,
    created_at: now,
  });

  // Create lifecycle
  createLifecycle({
    id: generateId("lifecycle"),
    agent_id: agentId,
    current_phase: "NEW",
    phase_entered_at: now,
    last_engaged_at: now,
    last_sync_at: now,
    engagement_score: 0,
    status: "active",
  });

  // Update lifecycle (simulate progression)
  updateLifecycle({
    agent_id: agentId,
    current_phase: "ACTIVE_PIPELINE",
    phase_entered_at: nowISO(),
    last_engaged_at: nowISO(),
    last_sync_at: nowISO(),
    engagement_score: 25,
    status: "active",
  });

  // Track phase change
  createPhaseHistory({
    id: generateId("phase"),
    agent_id: agentId,
    from_phase: "NEW",
    to_phase: "ACTIVE_PIPELINE",
    changed_at: nowISO(),
    reason: "Test progression",
  });

  const lifecycle = getLifecycleByAgentId(agentId);
  const history = getPhaseHistoryForAgent(agentId);

  console.log("=== LIFECYCLE TEST SUCCESS ===");
  console.log("Lifecycle:", lifecycle);
  console.log("History:", history);
}

runLifecycleTest();
