const engagementRepo = require("../repositories/engagementRepo");

function getPointsForEvent(eventType) {
  switch (eventType) {
    case "assessment_started": return 2;
    case "assessment_completed": return 5;
    case "email_open": return 1;
    case "email_click": return 2;
    case "login": return 1;
    case "coaching_action_taken": return 3;
    case "manual_touch": return 1;
    default: return 1;
  }
}

function trackEngagement(agentId, eventType = "manual_touch") {
  if (!agentId) throw new Error("trackEngagement requires agentId");
  const points = getPointsForEvent(eventType);
  engagementRepo.trackActivity(agentId, points);
  const updated = engagementRepo.getEngagement(agentId);
  return { action: "engagement_tracked", agent_id: agentId, event_type: eventType, points_added: points, engagement: updated };
}

module.exports = { trackEngagement, getPointsForEvent };
