// src/scripts/runCampaignCycle.js
// Daily campaign automation runner
// Loads eligible agents, dispatches correct campaign, logs results
// Safe: skips agents already sent today, respects allowlist

require("dotenv").config();

const { DatabaseSync } = require("node:sqlite");
const { assignCampaignState } = require("../services/campaignStateService");
const { dispatch } = require("../services/campaignDispatcher");

const db = new DatabaseSync("openclaw.db");

function getEligibleAgents() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayISO = todayStart.toISOString();

  return db
    .prepare(
      `
    SELECT
      a.id, a.first_name, a.last_name, a.email,
      al.campaign_state, al.campaign_step, al.campaign_last_sent_at
    FROM agents a
    JOIN agent_lifecycle al ON al.agent_id = a.id
    WHERE al.campaign_state IN ('pre_activation', 'post_analysis')
      AND al.campaign_step < 3
      AND (al.campaign_last_sent_at IS NULL OR al.campaign_last_sent_at < ?)
  `,
    )
    .all(todayISO);
}

async function runCampaignCycle() {
  console.log("\n========================================");
  console.log("  NODE RUNNER — DAILY CAMPAIGN CYCLE");
  console.log("  " + new Date().toISOString());
  console.log("========================================\n");

  // Assign/refresh campaign states for all agents
  const allAgents = db.prepare("SELECT agent_id FROM agent_lifecycle").all();
  for (const { agent_id } of allAgents) {
    assignCampaignState(agent_id);
  }

  // Load eligible agents
  const eligible = getEligibleAgents();
  console.log("Eligible agents: " + eligible.length);

  if (!eligible.length) {
    console.log("No eligible agents for today. Exiting.\n");
    return;
  }

  const results = { sent: 0, blocked: 0, failed: 0, skipped: 0 };

  for (const agent of eligible) {
    console.log("\nProcessing: " + agent.first_name + " (" + agent.id + ")");
    console.log(
      "  State: " + agent.campaign_state + " | Step: " + agent.campaign_step,
    );

    const result = await dispatch(agent.id);

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

  console.log("\n========================================");
  console.log("  CYCLE COMPLETE");
  console.log("  Sent:    " + results.sent);
  console.log("  Blocked: " + results.blocked);
  console.log("  Failed:  " + results.failed);
  console.log("  Skipped: " + results.skipped);
  console.log("========================================\n");
}

runCampaignCycle().catch((e) => console.error("Cycle error:", e.message));
