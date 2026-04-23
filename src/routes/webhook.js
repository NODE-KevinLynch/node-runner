const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

// POST /api/webhook/analysis — receive data from agentanalysis.kevinlynch.ca
router.post("/analysis", async (req, res) => {
  try {
    const data = req.body;
    const email = data.email;
    if (!email) return res.status(400).json({ error: "email required" });

    // Check if agent already exists
    const existing = await db.prepare(
      "SELECT id FROM agents WHERE email = $1"
    ).get(email);

    if (existing) {
      return res.json({ status: "exists", agent_id: existing.id, message: "Agent already in system" });
    }

    // Create new agent from analysis data
    const agent_id = "agent_" + (data.first_name || "unknown").toLowerCase().replace(/\s+/g, "_") + "_" + Date.now().toString(36);

    await db.prepare(
      `INSERT INTO agents (id, name, last_name, email, phone, brokerage, region, source, campaign_state, trial_start_date, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'agent_analysis', 'pre_activation', NOW(), NOW())`
    ).run(
      agent_id,
      data.first_name || "",
      data.last_name || "",
      email,
      data.phone || null,
      data.brokerage || null,
      data.region || null
    );

    // Create lifecycle record
    await db.prepare(
      `INSERT INTO agent_lifecycle (agent_id, stage, engagement_score, campaign_state, created_at, updated_at)
       VALUES ($1, 'discovery', 0, 'pre_activation', NOW(), NOW())`
    ).run(agent_id);

    // Store analysis responses as assessments
    const analysisFields = [
      "annual_gci", "units_closed", "avg_commission", "years_in_re",
      "agent_type", "lead_source", "monthly_leads", "referral_pct",
      "crm_platform", "followup_frequency", "database_size",
      "conversion_rate", "marketing_budget", "active_channels",
      "income_goal", "biggest_challenges", "top_priority", "timeline"
    ];

    for (const key of analysisFields) {
      if (data[key]) {
        await db.prepare(
          "INSERT INTO assessments (id, agent_id, question_key, answer, score, created_at) VALUES ($1, $2, $3, $4, 0, NOW())"
        ).run(uuidv4(), agent_id, key, typeof data[key] === "object" ? JSON.stringify(data[key]) : String(data[key]));
      }
    }

    // Track engagement
    try {
      const { trackEngagement } = require("../services/engagementEngine");
      await trackEngagement(agent_id, "assessment_started");
    } catch (e) { console.error("Engagement track failed:", e.message); }

    console.log("Webhook: new agent from analysis:", agent_id, email);

    res.json({
      status: "created",
      agent_id,
      message: "Agent created from analysis. Pre-activation campaign will begin.",
      next_step: "https://node-runner.onrender.com/assessment.html?email=" + encodeURIComponent(email)
    });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// POST /api/webhook/fub — receive new lead events from Follow Up Boss
router.post("/fub", async (req, res) => {
  try {
    const data = req.body;
    const event = data.event || "unknown";

    // Only process new person events
    if (event !== "peopleCreated" && event !== "peopleUpdated") {
      return res.json({ status: "ignored", event, message: "Event type not handled" });
    }

    const person = data.person || data.people?.[0] || {};
    const email = person.emails?.[0]?.value || person.email;
    if (!email) return res.status(400).json({ error: "No email in FUB payload" });

    // Check if agent already exists
    const existing = await db.prepare(
      "SELECT id FROM agents WHERE email = $1"
    ).get(email);

    if (existing) {
      return res.json({ status: "exists", agent_id: existing.id, message: "Agent already in system" });
    }

    // Create new agent from FUB data
    const firstName = person.firstName || person.name || "";
    const lastName = person.lastName || "";
    const phone = person.phones?.[0]?.value || null;
    const agent_id = "agent_" + firstName.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now().toString(36);

    await db.prepare(
      `INSERT INTO agents (id, name, last_name, email, phone, source, campaign_state, trial_start_date, created_at)
       VALUES ($1, $2, $3, $4, $5, 'fub', 'pre_activation', NOW(), NOW())`
    ).run(agent_id, firstName, lastName, email, phone);

    // Create lifecycle record
    await db.prepare(
      `INSERT INTO agent_lifecycle (agent_id, stage, engagement_score, campaign_state, created_at, updated_at)
       VALUES ($1, 'discovery', 0, 'pre_activation', NOW(), NOW())`
    ).run(agent_id);

    // Track engagement
    try {
      const { trackEngagement } = require("../services/engagementEngine");
      await trackEngagement(agent_id, "manual_touch");
    } catch (e) { console.error("FUB webhook engagement failed:", e.message); }

    console.log("FUB webhook: new agent created:", agent_id, email);
    res.json({
      status: "created",
      agent_id,
      message: "Agent created from FUB. Pre-activation campaign will begin."
    });
  } catch (err) {
    console.error("FUB webhook error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
