const express = require("express");
const path = require("path");
const db = require("./db/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the dashboard from the root-level public folder
app.use(express.static(path.join(__dirname, "..", "public")));

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await db.prepare("SELECT 1").get();
    res.json({
      status: "ok",
      db: "shared-db",
      ts: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

// All agents with lifecycle state
app.get("/api/agents", async (req, res) => {
  try {
    const rows = await db
      .prepare(
        `
      SELECT
        a.id,
        a.first_name,
        a.last_name,
        a.email,
        a.phone,
        a.source,
        a.created_at,
        al.current_phase,
        al.phase_entered_at,
        al.last_engaged_at,
        al.last_sync_at,
        al.engagement_score,
        al.status
      FROM agents a
      LEFT JOIN agent_lifecycle al
        ON al.agent_id = a.id
      ORDER BY COALESCE(al.engagement_score, 0) DESC, a.created_at DESC
    `,
      )
      .all();

    res.json({
      agents: rows,
      count: rows.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single agent detail
app.get("/api/agents/:id", (req, res) => {
  try {
    const { id } = req.params;

    const agent = db
      .prepare(
        `
      SELECT
        a.id,
        a.first_name,
        a.last_name,
        a.email,
        a.phone,
        a.source,
        a.created_at,
        al.current_phase,
        al.phase_entered_at,
        al.last_engaged_at,
        al.last_sync_at,
        al.engagement_score,
        al.status
      FROM agents a
      LEFT JOIN agent_lifecycle al
        ON al.agent_id = a.id
      WHERE a.id = $1
    `,
      )
      .get(id);

    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }

    const diagnosis = db
      .prepare(
        `
      SELECT *
      FROM diagnoses
      WHERE agent_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `,
      )
      .get(id);

    const coaching = db
      .prepare(
        `
      SELECT *
      FROM coaching_outputs
      WHERE agent_id = $1
      ORDER BY generated_at DESC
      LIMIT 1
    `,
      )
      .get(id);

    const assessment = db
      .prepare(
        `
      SELECT *
      FROM assessments
      WHERE agent_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `,
      )
      .get(id);

    res.json({
      agent,
      diagnosis: diagnosis || null,
      coaching: coaching || null,
      assessment: assessment || null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Phase distribution summary
app.get("/api/phases", async (req, res) => {
  try {
    const rows = await db
      .prepare(
        `
      SELECT
        current_phase,
        COUNT(*) AS agent_count
      FROM agent_lifecycle
      GROUP BY current_phase
      ORDER BY agent_count DESC
    `,
      )
      .all();

    res.json({ phases: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Phase history for one agent
app.get("/api/history/:agentId", async (req, res) => {
  try {
    const rows = await db
      .prepare(
        `
      SELECT
        id,
        agent_id,
        from_phase,
        to_phase,
        changed_at,
        reason
      FROM phase_history
      WHERE agent_id = $1
      ORDER BY changed_at DESC
      LIMIT 50
    `,
      )
      .all(req.params.agentId);

    res.json({
      history: rows,
      count: rows.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top-level stats
app.get("/api/stats", async (req, res) => {
  try {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const totalAgents = (
      await db
        .prepare(
          `
      SELECT COUNT(*) AS n
      FROM agents
    `,
        )
        .get()
    ).n;

    const activeAgents = (
      await db
        .prepare(
          `
      SELECT COUNT(*) AS n
      FROM agent_lifecycle
      WHERE status = 'active'
    `,
        )
        .get()
    ).n;

    const avgScore = (
      await db
        .prepare(
          `
      SELECT ROUND(COALESCE(AVG(engagement_score), 0), 1) AS avg
      FROM agent_lifecycle
    `,
        )
        .get()
    ).avg;

    const recentPromotions = db
      .prepare(
        `
      SELECT COUNT(*) AS n
      FROM phase_history
      WHERE changed_at >= $1
    `,
      )
      .get(cutoff).n;

    res.json({
      totalAgents,
      activeAgents,
      avgScore,
      recentPromotions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ── GET /api/report ───────────────────────────────────────────────────────────
// Executive pulse — aggregated stats for the dashboard
app.get("/api/report", async (req, res) => {
  try {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // TEST 1 — states
    try {
      await db
        .prepare(
          `
        SELECT campaign_state, COUNT(*) as n
        FROM agent_lifecycle
        GROUP BY campaign_state
      `,
        )
        .all();
      console.log("states ✅");
    } catch (e) {
      console.error("emails24h ❌", e.message);
      return res.status(500).json({ error: e.message });
    }

    // TEST 2 — emails24h
    // TEST 2 — emails24h
    try {
      await db
        .prepare(
          "SELECT send_status, COUNT(*) as n FROM campaign_send_log WHERE sent_at >= $1 GROUP BY send_status",
        )
        .all(since24h);
      console.log("emails24h ✅");
    } catch (e) {
      console.error("emails24h ❌", e.message);
      throw new Error("emails24h failed");
    }

    // TEST 3 — emails7d
    try {
      await db
        .prepare(
          `
        SELECT COUNT(*) as n
        FROM campaign_send_log
        WHERE sent_at >= $1 AND send_status = 'sent'
      `,
        )
        .get(since24h);
      console.log("emails7d ✅");
    } catch (e) {
      console.error("emails7d ❌", e.message);
      throw new Error("emails7d failed");
    }

    res.json({ status: "all queries passed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(PORT, () => {
  // ── GET /portal/:agentId ─────────────────────────────────────────────────────
  app.get("/portal/:agentId", (req, res) => {
    const { agentId } = req.params;
    try {
      const agent = db
        .prepare(
          `
        SELECT a.id, a.first_name, a.last_name, a.email,
               al.current_phase, al.engagement_score, al.campaign_state
        FROM agents a
        LEFT JOIN agent_lifecycle al ON a.id = al.agent_id
        WHERE a.id = $1
      `,
        )
        .get(agentId);

      if (!agent) return res.status(404).send("<h2>Agent not found</h2>");

      const coaching = db
        .prepare(
          `
        SELECT * FROM coaching_outputs
        WHERE agent_id = $1
        ORDER BY generated_at DESC LIMIT 1
      `,
        )
        .get(agentId);

      const diagnosis = db
        .prepare(
          `
        SELECT primary_bottleneck, confidence_score
        FROM diagnoses WHERE agent_id = $1
        ORDER BY created_at DESC LIMIT 1
      `,
        )
        .get(agentId);

      const recentEmails = db
        .prepare(
          `
        SELECT campaign_type, campaign_step, subject, send_status, sent_at
        FROM campaign_send_log
        WHERE agent_id = 
        ORDER BY sent_at DESC LIMIT 5
      `,
        )
        .all(agentId);

      const supporting = coaching
        ? JSON.parse(coaching.supporting_actions_json || "[]")
        : [];

      const emailRows = recentEmails.length
        ? recentEmails
            .map(
              (e) => `
            <tr>
              <td>${e.campaign_type || "—"}</td>
              <td style="text-align:center">${e.campaign_step || "—"}</td>
              <td>${e.subject || "—"}</td>
              <td style="text-align:center">${e.send_status || "—"}</td>
              <td>${e.sent_at ? new Date(e.sent_at).toLocaleDateString("en-CA") : "—"}</td>
            </tr>`,
            )
            .join("")
        : "<tr><td colspan='5' style='text-align:center;color:#888'>No emails sent yet</td></tr>";

      const supportingItems = supporting.length
        ? supporting.map((a) => `<li>${a}</li>`).join("")
        : "<li>Coaching actions will appear here</li>";

      const fs = require("fs");
      let html = fs.readFileSync(
        require("path").join(__dirname, "..", "public", "portal.html"),
        "utf8",
      );

      html = html
        .replace(/__AGENT_NAME__/g, `${agent.first_name} ${agent.last_name}`)
        .replace(/__AGENT_ID__/g, agent.id)
        .replace(/__PHASE__/g, agent.current_phase || "Discovery")
        .replace(
          /__CHARACTER_TYPE__/g,
          coaching?.character_type || "The Professional",
        )
        .replace(
          /__FOCUS__/g,
          coaching?.focus || "Business Performance & Growth",
        )
        .replace(/__VERSION__/g, coaching?.version || "v1.0")
        .replace(/__BOTTLENECK__/g, diagnosis?.primary_bottleneck || "—")
        .replace(
          /__CONFIDENCE__/g,
          diagnosis?.confidence_score
            ? Math.round(diagnosis.confidence_score * 100) + "%"
            : "—",
        )
        .replace(
          /__TRUTH__/g,
          (coaching?.message || "")
            .replace(/[\s\S]*?THE TRUTH[\s\S]*?\n\n/i, "")
            .replace(/\n\nTHE STRATEGY[\s\S]*/i, "")
            .trim()
            .replace(/\n/g, "<br>") ||
            coaching?.message?.replace(/\n/g, "<br>") ||
            "Your roadmap is being prepared.",
        )
        .replace(/__STRATEGY__/g, coaching?.focus || "")
        .replace(
          /__RPM_ACTION__/g,
          coaching?.top_action ||
            "Complete your top 3 priority actions before noon.",
        )
        .replace(
          /__RPM_RESULT__/g,
          coaching?.weekly_target || "Secure measurable progress this week.",
        )
        .replace(
          /__RPM_PURPOSE__/g,
          "So your business moves forward by design, not by chance.",
        )
        .replace(/__CONSTRAINT__/g, coaching?.focus || "Performance Foundation")
        .replace(
          /__DIRECTIVE__/g,
          coaching?.top_action ||
            "Execute your #1 priority action before anything else today.",
        )
        .replace(
          /__QUOTE__/g,
          "It is not what we do once in a while that shapes our lives. It is what we do consistently.",
        )
        .replace(/__QUOTE_AUTHOR__/g, "— Tony Robbins")
        .replace(/__TOP_ACTION__/g, coaching?.top_action || "—")
        .replace(/__DAILY_RITUAL__/g, coaching?.daily_ritual || "—")
        .replace(/__WEEKLY_TARGET__/g, coaching?.weekly_target || "—")
        .replace(/__SUPPORTING_ITEMS__/g, supportingItems)
        .replace(/__EMAIL_ROWS__/g, emailRows)
        .replace(
          /__GENERATED_AT__/g,
          coaching?.generated_at
            ? new Date(coaching.generated_at).toLocaleDateString("en-CA")
            : "—",
        );

      res.send(html);
    } catch (err) {
      res.status(500).send("Portal error: " + err.message);
    }
  });
  app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "admin.html"));
  });
  console.log(`OpenClaw Ops API running on port ${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}`);
  console.log(`Health:    http://localhost:${PORT}/api/health`);
});
