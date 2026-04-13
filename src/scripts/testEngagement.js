const { assignInitialLifecycle } = require("../services/lifecycleEngine");
const { trackEngagement } = require("../services/engagementEngine");

function main() {
  const diagnosis = {
    agent_id: `agent_test_${Date.now()}`,
    inferred_campaign: "SOLO_LEAD_ENGINE",
  };

  const lifecycle = assignInitialLifecycle(diagnosis);
  console.log("Initial lifecycle:", lifecycle);

  const result1 = trackEngagement(diagnosis.agent_id, "assessment_started");
  console.log("After assessment_started:", result1);

  const result2 = trackEngagement(diagnosis.agent_id, "email_click");
  console.log("After email_click:", result2);

  const result3 = trackEngagement(diagnosis.agent_id, "coaching_action_taken");
  console.log("After coaching_action_taken:", result3);

  console.log("=== ENGAGEMENT TEST SUCCESS ===");
}

main();
