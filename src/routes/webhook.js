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

module.exports = router;
