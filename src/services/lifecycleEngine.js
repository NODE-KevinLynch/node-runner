const lifecycleRepo = require("../repositories/lifecycleRepo");
const phaseHistoryRepo = require("../repositories/phaseHistoryRepo");

function assignInitialLifecycle(diagnosis) {
  if (!diagnosis || !diagnosis.agent_id) {
    throw new Error("assignInitialLifecycle requires a diagnosis with agent_id");
  }

  const existing = lifecycleRepo.getLifecycleByAgentId(diagnosis.agent_id);
  if (existing) return existing;

  const phase = inferPhase(diagnosis);

  lifecycleRepo.createLifecycle({
    agent_id: diagnosis.agent_id,
    stage: phase,
    phase_entered_at: new Date().toISOString(),
    last_engaged_at: new Date().toISOString(),
    last_sync_at: new Date().toISOString(),
    engagement_score: 0,
    status: "active",
  });

  phaseHistoryRepo.createPhaseHistory({
    id: "phase_" + Math.random().toString(36).slice(2),
    agent_id: diagnosis.agent_id,
    from_phase: "NEW",
    to_phase: phase,
    changed_at: new Date().toISOString(),
    reason: "Initial assignment",
  });

  return lifecycleRepo.getLifecycleByAgentId(diagnosis.agent_id);
}

function inferPhase(diagnosis) {
  const campaign = diagnosis.inferred_campaign || "";
  if (campaign.includes("SOLO")) return "ACTIVE_PIPELINE";
  if (campaign.includes("TEAM")) return "ACTIVE_PIPELINE";
  return "ACTIVE_PIPELINE";
}

module.exports = { assignInitialLifecycle, inferPhase };
