// src/scripts/runCampaignCycle.js
// Daily campaign automation runner — Postgres version
// Loads eligible agents, dispatches correct campaign, logs results
// Safe: skips agents already sent today, respects allowlist
// Run: node src/scripts/runCampaignCycle.js (from Render Shell)

require("dotenv").config();

const db = require("../db/db");
const { assignCampaignState } = require("../services/campaignStateService");
const { dispatch } = require("../services/campaignDispatcher");

function getEligibleAgents() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayISO = todayStart.toISOString();

  return db
    .prepare(
      `SELECT al.agent_id, al.stage, al.campaign_state, al.engagement_score,
              a.name AS first_name, a.last_name, a.email,
              COALESCE(
                (SELECT MAX(campaign_step) FROM campaign_send_log
                 WHERE agent_id = al.agent_id AND campaign_type = al.campaign_state),
                0
              ) AS campaign_step
       FROM agent_lifecycle al
       JOIN agents a ON a.id = al.agent_id
       WHERE al.campaign_state IS NOT NULL
         AND al.campaign_state != 'complete'
         AND NOT EXISTS (
           SELECT 1 FROM campaign_send_log
           WHERE agent_id = al.agent_id AND sent_at >= $1
         )
       ORDER BY al.engagement_score DESC`,
    )
    .all(todayISO);
}

async function runCampaignCycle() {
  console.log("\n==========================================");
  console.log("  NODE RUNNER — DAILY CAMPAIGN CYCLE");
  console.log("  " + new Date().toISOString());
  console.log("==========================================\n");

  // Assign/refresh campaign states for all agents
  const allAgents = await db.prepare("SELECT agent_id FROM agent_lifecycle").all();
  for (const { agent_id } of allAgents) {
    await assignCampaignState(agent_id);
  }

  // Load eligible agents
  const eligible = await getEligibleAgents();
  console.log("Eligible agents: " + eligible.length);

  if (!eligible.length) {
    console.log("No eligible agents for today. Exiting.\n");
    return;
  }

  const results = { sent: 0, blocked: 0, failed: 0, skipped: 0 };

  for (const agent of eligible) {
    console.log("\nProcessing: " + agent.first_name + " (" + agent.agent_id + ")");
    console.log(
      "  State: " + agent.campaign_state + " | Step: " + agent.campaign_step,
    );

    const result = await dispatch(agent.agent_id);

    if (result.success) {
      if (result.sendStatus === "sent") {
        results.sent++;
        console.log("  ✓ Sent: " + result.subject);
      } else if (result.sendStatus === "blocked") {
        results.blocked++;
        console.log("  ⊘ Blocked (allowlist): " + result.subject);
      }
    } else {
      if (result.reason === "sequence_complete") {
        results.skipped++;
        console.log("  — Sequence complete, skipping");
      } else {
        results.failed++;
        console.log("  ✗ Failed: " + result.reason);
      }
    }
  }

  console.log("\n==========================================");
  console.log("  CYCLE COMPLETE");
  console.log("  Sent:    " + results.sent);
  console.log("  Blocked: " + results.blocked);
  console.log("  Failed:  " + results.failed);
  console.log("  Skipped: " + results.skipped);
  console.log("==========================================\n");
}

runCampaignCycle().catch((e) => console.error("Cycle error:", e.message));
