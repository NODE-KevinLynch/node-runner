const { assignInitialLifecycle } = require("../services/lifecycleEngine");
const { trackEngagement } = require("../services/engagementEngine");
const { checkProgression } = require("../services/progressionEngine");

function main() {
  const diagnosis = {
    agent_id: `agent_prog_${Date.now()}`,
    inferred_campaign: "SOLO_LEAD_ENGINE",
  };

  assignInitialLifecycle(diagnosis);
  console.log("Lifecycle created");

  for (let i = 0; i < 3; i++) {
    trackEngagement(diagnosis.agent_id, "assessment_completed");
  }
  console.log("Tracked 3x assessment_completed (15 points)");

  const result = checkProgression(diagnosis.agent_id);
  console.log("Progression check:", result);

  console.log("=== PROGRESSION TEST SUCCESS ===");
}

main();
