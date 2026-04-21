// src/services/campaignStateService.js
const db = require("../db/db");

function determineCampaignState(agentId) {
  const assessment = db
    .prepare("SELECT id FROM assessments WHERE agent_id = $1 LIMIT 1")
    .get(agentId);

  if (!assessment) return "pre_activation";

  const lifecycle = db
    .prepare("SELECT stage FROM agent_lifecycle WHERE agent_id = $1")
    .get(agentId);

  if (!lifecycle) return "pre_activation";

  const activePhases = ["COACHING", "ACTIVE_PIPELINE"];
  if (activePhases.includes(lifecycle.stage)) return "lifecycle";

  return "post_analysis";
}

function assignCampaignState(agentId) {
  const newState = determineCampaignState(agentId);

  const current = db
    .prepare(
      "SELECT campaign_state, campaign_step FROM agent_lifecycle WHERE agent_id = $1",
    )
    .get(agentId);

  if (!current) return null;

  // If moving into post_analysis, reset step to 1
  const newStep =
    newState === "post_analysis" && current.campaign_state !== "post_analysis"
      ? 1
      : current.campaign_step;

  db.prepare(
    `UPDATE agent_lifecycle
     SET campaign_state = $1,
         campaign_step = $2,
         last_sync_at = $3
     WHERE agent_id = $4`,
  ).run(newState, newStep, new Date().toISOString(), agentId);

  return { agentId, campaignState: newState, campaignStep: newStep };
}

function assignAllAgents() {
  const agents = db.prepare("SELECT agent_id FROM agent_lifecycle").all();
  const results = [];
  for (const { agent_id } of agents) {
    results.push(assignCampaignState(agent_id));
  }
  return results;
}

module.exports = {
  determineCampaignState,
  assignCampaignState,
  assignAllAgents,
};
