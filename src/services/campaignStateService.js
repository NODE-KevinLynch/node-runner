// src/services/campaignStateService.js
const db = require("../db/db");

async function determineCampaignState(agentId) {
  const assessment = await db
    .prepare("SELECT id FROM assessments WHERE agent_id = $1 LIMIT 1")
    .get(agentId);
  // Check if coaching has been generated (agent completed Co.Pilot assessment)
  const coaching = await db
    .prepare("SELECT id FROM coaching_outputs WHERE agent_id = $1 LIMIT 1")
    .get(agentId);
  if (coaching) return "coaching_active";
  if (!assessment) return "pre_activation";
  const lifecycle = await db
    .prepare("SELECT stage FROM agent_lifecycle WHERE agent_id = $1")
    .get(agentId);
  if (!lifecycle) return "pre_activation";
  const activePhases = ["COACHING", "ACTIVE_PIPELINE"];
  if (activePhases.includes(lifecycle.stage)) return "lifecycle";
  return "post_analysis";
}

async function assignCampaignState(agentId) {
  const newState = await determineCampaignState(agentId);
  const current = await db
    .prepare(
      "SELECT campaign_state, campaign_step FROM agent_lifecycle WHERE agent_id = $1",
    )
    .get(agentId);
  if (!current) return null;
  // If moving into a new campaign state, reset step to 1
  const newStep =
    (newState !== current.campaign_state) ? 1 : current.campaign_step;
  await db.prepare(
    `UPDATE agent_lifecycle
     SET campaign_state = $1,
         campaign_step = $2,
         last_sync_at = $3
     WHERE agent_id = $4`,
  ).run(newState, newStep, new Date().toISOString(), agentId);
  return { agentId, campaignState: newState, campaignStep: newStep };
}

async function assignAllAgents() {
  const agents = await db.prepare("SELECT agent_id FROM agent_lifecycle").all();
  const results = [];
  for (const { agent_id } of agents) {
    results.push(await assignCampaignState(agent_id));
  }
  return results;
}

module.exports = {
  determineCampaignState,
  assignCampaignState,
  assignAllAgents,
};
