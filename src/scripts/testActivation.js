const { assignInitialLifecycle } = require("../services/lifecycleEngine");
const { trackEngagement } = require("../services/engagementEngine");
const { checkProgression } = require("../services/progressionEngine");

async function main() {
  console.log("=== ACTIVATION TEST STARTING ===");

  const diagnosis = {
    agent_id: `agent_activation_${Date.now()}`,
    inferred_campaign: "SOLO_LEAD_ENGINE",
  };

  assignInitialLifecycle(diagnosis);
  console.log("Agent initialized:", diagnosis.agent_id);

  for (let i = 0; i < 3; i++) {
    trackEngagement(diagnosis.agent_id, "assessment_completed");
  }
  console.log("Engagement tracked - score should be 15");

  const result = await checkProgression(diagnosis.agent_id);
  console.log("Progression result:", result);

  console.log("=== ACTIVATION TEST COMPLETE ===");
}

main();
