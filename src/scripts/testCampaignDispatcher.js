// src/scripts/testCampaignDispatcher.js
// Full system validation across both campaign states
// Safe mode only — respects allowlist

require("dotenv").config();

const { assignCampaignState } = require("../services/campaignStateService");
const { dispatch } = require("../services/campaignDispatcher");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("openclaw.db");

async function runTest() {
  console.log("\n========================================");
  console.log("  NODE RUNNER — CAMPAIGN SYSTEM TEST");
  console.log("========================================\n");

  // Get one pre_activation agent and one post_analysis agent
  const preAgent = db
    .prepare(
      `
    SELECT a.id, a.first_name, a.email, al.campaign_state, al.campaign_step
    FROM agents a
    JOIN agent_lifecycle al ON al.agent_id = a.id
    WHERE al.campaign_state = 'pre_activation'
    LIMIT 1
  `,
    )
    .get();

  const postAgent = db
    .prepare(
      `
    SELECT a.id, a.first_name, a.email, al.campaign_state, al.campaign_step
    FROM agents a
    JOIN agent_lifecycle al ON al.agent_id = a.id
    WHERE al.campaign_state = 'post_analysis'
    LIMIT 1
  `,
    )
    .get();

  // ── Test 1: Pre-activation agent ─────────────────────────────────────────
  console.log("TEST 1 — PRE ACTIVATION AGENT");
  console.log("----------------------------------------");

  if (!preAgent) {
    console.log("No pre_activation agent found — skipping\n");
  } else {
    console.log("Agent:    " + preAgent.first_name + " (" + preAgent.id + ")");
    console.log("Email:    " + preAgent.email);
    console.log("State:    " + preAgent.campaign_state);
    console.log("Step:     " + preAgent.campaign_step);

    const result1 = await dispatch(preAgent.id);
    console.log("Success:  " + result1.success);
    console.log("Status:   " + result1.sendStatus);
    console.log("Step now: " + result1.campaignStep);
    console.log("Subject:  " + result1.subject);
    if (!result1.success) console.log("Reason:   " + result1.reason);
  }

  // ── Test 2: Post-analysis agent ───────────────────────────────────────────
  console.log("\nTEST 2 — POST ANALYSIS AGENT");
  console.log("----------------------------------------");

  if (!postAgent) {
    console.log("No post_analysis agent found — skipping\n");
  } else {
    console.log(
      "Agent:    " + postAgent.first_name + " (" + postAgent.id + ")",
    );
    console.log("Email:    " + postAgent.email);
    console.log("State:    " + postAgent.campaign_state);
    console.log("Step:     " + postAgent.campaign_step);

    const result2 = await dispatch(postAgent.id);
    console.log("Success:  " + result2.success);
    console.log("Status:   " + result2.sendStatus);
    console.log("Step now: " + result2.campaignStep);
    console.log("Subject:  " + result2.subject);
    if (!result2.success) console.log("Reason:   " + result2.reason);
  }

  // ── Test 3: Send log check ────────────────────────────────────────────────
  console.log("\nTEST 3 — SEND LOG VERIFICATION");
  console.log("----------------------------------------");

  const logs = db
    .prepare("SELECT * FROM campaign_send_log ORDER BY sent_at DESC LIMIT 5")
    .all();

  console.log("Recent send logs: " + logs.length);
  logs.forEach((l) => {
    console.log(
      "  " +
        l.agent_id +
        " | " +
        l.campaign_type +
        " | step " +
        l.campaign_step +
        " | " +
        l.send_status +
        " | " +
        l.sent_at,
    );
  });

  console.log("\n========================================");
  console.log("  TEST COMPLETE");
  console.log("========================================\n");
}

runTest().catch((e) => console.error("Test error:", e.message));
