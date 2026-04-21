const express = require("express");
const router = express.Router();
const { trackEngagement } = require("../services/engagementEngine");

router.post("/", async (req, res) => {
  try {
    const { agent_id, event_type } = req.body;
    if (!agent_id) return res.status(400).json({ error: "agent_id required" });
    const result = await trackEngagement(agent_id, event_type || "manual_touch");
    res.json(result);
  } catch (err) {
    console.error("Engagement tracking error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:agentId", async (req, res) => {
  try {
    const engagementRepo = require("../repositories/engagementRepo");
    const data = await engagementRepo.getEngagement(req.params.agentId);
    res.json(data || { engagement_score: 0, last_engaged_at: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
