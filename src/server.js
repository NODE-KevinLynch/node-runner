const express = require("express");
const path = require("path");
const db = require("./db/db");

const generateRoutes = require("./routes/generate");
const onboardingRoutes = require("./routes/onboarding");
const engagementRoutes = require("./routes/engagement");
const webhookRoutes = require("./routes/webhook");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the dashboard from the root-level public folder
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
onboardingRoutes(app, db);
app.use("/api/engagement", engagementRoutes);
app.use("/api/webhook", webhookRoutes);
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

// Schema diagnostic
app.get("/api/schema", async (req, res) => {
  try {
    const agents = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'agents' ORDER BY ordinal_position",
      )
      .all();
    const lifecycle = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'agent_lifecycle' ORDER BY ordinal_position",
      )
      .all();
    const sendlog = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'campaign_send_log' ORDER BY ordinal_position",
      )
      .all();
    const diagnoses = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'diagnoses' ORDER BY ordinal_position",
      )
      .all();
    const phasehistory = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'phase_history' ORDER BY ordinal_position",
      )
      .all();
    const coaching = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'coaching_outputs' ORDER BY ordinal_position",
      )
      .all();
    const assessments = await db
      .prepare(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'assessments' ORDER BY ordinal_position",
      )
      .all();
    res.json({
      agents,
      lifecycle,
      sendlog,
      diagnoses,
      phasehistory,
      coaching,
      assessments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
        a.name,
        a.last_name,
        a.email,
        a.phone,
        a.source,
        a.created_at,
        al.stage,
        al.engagement_score,
        al.campaign_state,
        al.updated_at
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
// coaching_outputs: id, agent_id, the_truth, the_strategy, rpm_plan, primary_constraint, coaching_directive, quote_of_the_day, engagement_score, created_at, updated_at
// assessments: id, agent_id, question_key, answer, score, created_at (row-per-question, not JSON blob)
// diagnoses: id, agent_id, bottleneck, profile, signals, created_at
app.get("/api/agents/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await db
      .prepare(
        `
      SELECT
        a.id,
        a.name,
        a.last_name,
        a.email,
        a.phone,
        a.source,
        a.created_at,
        al.stage,
        al.engagement_score,
        al.campaign_state,
        al.updated_at
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

    const diagnosis = await db
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

    const coaching = await db
      .prepare(
        `
      SELECT *
      FROM coaching_outputs
      WHERE agent_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `,
      )
      .get(id);

    const assessmentRows = await db
      .prepare(
        `
      SELECT question_key, answer, score
      FROM assessments
      WHERE agent_id = $1
      ORDER BY created_at DESC
    `,
      )
      .all(id);

    res.json({
      agent,
      diagnosis: diagnosis || null,
      coaching: coaching || null,
      assessment: assessmentRows.length ? assessmentRows : null,
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
        stage,
        COUNT(*) AS agent_count
      FROM agent_lifecycle
      GROUP BY stage
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
      await db.prepare("SELECT COUNT(*) AS n FROM agents").get()
    ).n;

    const activeAgents = (
      await db
        .prepare(
          "SELECT COUNT(*) AS n FROM agent_lifecycle WHERE engagement_score > 0",
        )
        .get()
    ).n;

    const avgScore = (
      await db
        .prepare(
          "SELECT ROUND(COALESCE(AVG(engagement_score), 0), 1) AS avg FROM agent_lifecycle",
        )
        .get()
    ).avg;

    const recentPromotions = (
      await db
        .prepare(
          "SELECT COUNT(*) AS n FROM phase_history WHERE changed_at >= $1",
        )
        .get(cutoff)
    ).n;

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
    const since7d = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const totalAgents = (
      await db.prepare("SELECT COUNT(*) AS n FROM agents").get()
    ).n;

    const emails7d = (
      await db
        .prepare(
          "SELECT COUNT(*) AS n FROM campaign_send_log WHERE sent_at >= $1 AND send_status = 'sent'",
        )
        .get(since7d)
    ).n;

    const analysisComplete = (
      await db
        .prepare("SELECT COUNT(DISTINCT agent_id) AS n FROM diagnoses")
        .get()
    ).n;

    const promotions24h = (
      await db
        .prepare(
          "SELECT COUNT(*) AS n FROM phase_history WHERE changed_at >= $1",
        )
        .get(since24h)
    ).n;

    const emails24h = await db
      .prepare(
        "SELECT send_status, COUNT(*) AS n FROM campaign_send_log WHERE sent_at >= $1 GROUP BY send_status",
      )
      .all(since24h);

    const states = await db
      .prepare(
        "SELECT campaign_state, COUNT(*) AS n FROM agent_lifecycle GROUP BY campaign_state",
      )
      .all();

    const recentLogs = await db
      .prepare(
        "SELECT agent_id, campaign_type, campaign_step, subject, send_status, sent_at FROM campaign_send_log ORDER BY sent_at DESC LIMIT 50",
      )
      .all();

    const atRisk = await db
      .prepare(
        "SELECT a.name, a.last_name, a.email, al.updated_at as last_engaged_at FROM agents a JOIN agent_lifecycle al ON a.id = al.agent_id WHERE al.campaign_state = 'post_analysis' AND (al.updated_at IS NULL OR al.updated_at <= $1)",
      )
      .all(since7d);

    res.json({
      totalAgents,
      emails7d,
      analysisComplete,
      promotions24h,
      emails24h,
      states,
      recentLogs,
      atRisk,
    });
  } catch (err) {
    console.error("report error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
// ── GET /api/goals/:agentId ──
app.get("/api/goals/:agentId", async (req, res) => {
  try {
    const goals = await db
      .prepare(
        "SELECT * FROM agent_goals WHERE agent_id = $1 AND goal_year = 2026",
      )
      .get(req.params.agentId);
    const scorecards = await db
      .prepare(
        "SELECT * FROM daily_scorecard WHERE agent_id = $1 ORDER BY log_date DESC LIMIT 30",
      )
      .all(req.params.agentId);
    const ytdClosed = await db
      .prepare(
        "SELECT COALESCE(SUM(list_sold), 0) AS n FROM daily_scorecard WHERE agent_id = $1",
      )
      .get(req.params.agentId);
    res.json({
      goals: goals || null,
      scorecards,
      ytdClosed: ytdClosed ? ytdClosed.n : 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/log-activity ──
app.post("/api/log-activity", async (req, res) => {
  try {
    const {
      agent_id,
      calls,
      contacts,
      appt_set,
      appt_held,
      list_taken,
      list_sold,
      commitments,
    } = req.body;
    if (!agent_id) return res.status(400).json({ error: "agent_id required" });
    await db
      .prepare(
        `INSERT INTO daily_scorecard (agent_id, log_date, calls, contacts, appt_set, appt_held, list_taken, list_sold, commitments_json, points_earned)
       VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (agent_id, log_date)
       DO UPDATE SET calls=$2, contacts=$3, appt_set=$4, appt_held=$5, list_taken=$6, list_sold=$7, commitments_json=$8, points_earned=$9`,
      )
      .run(
        agent_id,
        calls || 0,
        contacts || 0,
        appt_set || 0,
        appt_held || 0,
        list_taken || 0,
        list_sold || 0,
        JSON.stringify(commitments || {}),
        (calls || 0) +
          (contacts || 0) * 2 +
          (appt_set || 0) * 5 +
          (appt_held || 0) * 5 +
          (list_taken || 0) * 10 +
          (list_sold || 0) * 10,
      );
    const total = await db
      .prepare(
        "SELECT COALESCE(SUM(points_earned), 0) AS pts FROM daily_scorecard WHERE agent_id = $1",
      )
      .get(agent_id);
    await db
      .prepare(
        "UPDATE agent_lifecycle SET engagement_score = $1, updated_at = NOW() WHERE agent_id = $2",
      )
      .run(Math.min(total.pts, 100), agent_id);
    res.json({ status: "logged", points: total.pts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/goals ──
app.post("/api/goals", async (req, res) => {
  try {
    const {
      agent_id,
      gci_goal,
      transaction_goal,
      avg_commission,
      close_rate,
      appt_conversion_rate,
    } = req.body;
    if (!agent_id) return res.status(400).json({ error: "agent_id required" });
    await db
      .prepare(
        `INSERT INTO agent_goals (agent_id, gci_goal, transaction_goal, avg_commission, close_rate, appt_conversion_rate, goal_year)
       VALUES ($1, $2, $3, $4, $5, $6, 2026)
       ON CONFLICT (agent_id, goal_year)
       DO UPDATE SET gci_goal=$2, transaction_goal=$3, avg_commission=$4, close_rate=$5, appt_conversion_rate=$6, updated_at=NOW()`,
      )
      .run(
        agent_id,
        gci_goal || 0,
        transaction_goal || 0,
        avg_commission || 10000,
        close_rate || 0.5,
        appt_conversion_rate || 0.1,
      );
    res.json({ status: "saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ── GET /api/daily-wins/:agentId ──
app.get("/api/daily-wins/:agentId", async (req, res) => {
  try {
    var now = new Date();
    var day = now.getDay();
    var diff = now.getDate() - day + (day === 0 ? -6 : 1);
    var monday = new Date(new Date(now).setDate(diff));
    var weekStart = monday.toISOString().slice(0, 10);
    var existing = await db
      .prepare(
        "SELECT * FROM daily_wins WHERE agent_id = $1 AND week_start = $2",
      )
      .get(req.params.agentId, weekStart);
    if (existing) {
      return res.json({
        status: "locked",
        weekStart: weekStart,
        selections: JSON.parse(existing.selections_json),
      });
    }
    var diagnosis = await db
      .prepare(
        "SELECT bottleneck FROM diagnoses WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 1",
      )
      .get(req.params.agentId);
    var bottleneck = diagnosis ? diagnosis.bottleneck : "pipeline_volume";
    var { getDailyWinOptions } = require("./lib/coachingGenerator");
    var options = getDailyWinOptions(bottleneck);
    res.json({
      status: "select",
      weekStart: weekStart,
      bottleneck: bottleneck,
      options: options,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/daily-wins ──
app.post("/api/daily-wins", async (req, res) => {
  try {
    var { agent_id, selections } = req.body;
    if (
      !agent_id ||
      !selections ||
      !Array.isArray(selections) ||
      selections.length !== 3
    ) {
      return res
        .status(400)
        .json({ error: "agent_id and exactly 3 selections required" });
    }
    var now = new Date();
    var day = now.getDay();
    var diff = now.getDate() - day + (day === 0 ? -6 : 1);
    var monday = new Date(new Date(now).setDate(diff));
    var weekStart = monday.toISOString().slice(0, 10);
    await db
      .prepare(
        `INSERT INTO daily_wins (agent_id, week_start, selections_json, locked)
       VALUES ($1, $2, $3, true)
       ON CONFLICT (agent_id, week_start)
       DO UPDATE SET selections_json = $3, updated_at = NOW()`,
      )
      .run(agent_id, weekStart, JSON.stringify(selections));
    res.json({
      status: "locked",
      weekStart: weekStart,
      selections: selections,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Error log endpoint
app.get("/api/errors", async (req, res) => {
  try {
    const rows = await db.prepare("SELECT * FROM error_log ORDER BY created_at DESC LIMIT 50").all();
    res.json({ errors: rows, count: rows.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  const { logError } = require("./utils/errorMonitor");
  logError("express", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => {
  // ── GET /portal/:agentId ─────────────────────────────────────────────────────
  // Real coaching_outputs columns: id, agent_id, the_truth, the_strategy, rpm_plan,
  //   primary_constraint, coaching_directive, quote_of_the_day, engagement_score, created_at, updated_at
  // Real diagnoses columns: id, agent_id, bottleneck, profile, signals, created_at
  // Real assessments columns: id, agent_id, question_key, answer, score, created_at
  app.get("/portal/:agentId", async (req, res) => {
    const { agentId } = req.params;
    try {
      const agent = await db
        .prepare(
          `
        SELECT a.id, a.name, a.last_name, a.email, a.brokerage, a.trial_start_date,
               al.stage, al.engagement_score, al.campaign_state
        FROM agents a
        LEFT JOIN agent_lifecycle al ON a.id = al.agent_id
        WHERE a.id = $1
      `,
        )
        .get(agentId);

      if (!agent) return res.status(404).send("<h2>Agent not found</h2>");
      try { const { trackEngagement } = require("./services/engagementEngine"); await trackEngagement(agentId, "login"); } catch(engErr) { console.error("Portal engagement track failed:", engErr.message); }
      // Portal auth check
      const { validateToken } = require("./utils/portalAuth");
      const token = req.query.token;
      const isValid = await validateToken(agentId, token);
      if (!isValid) {
        return res.status(401).send(`<html><head><title>Access Required</title><style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8f9fa;margin:0}.box{text-align:center;max-width:500px;padding:40px;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.08)}h1{color:#1a2b4a}p{color:#666;line-height:1.6}</style></head><body><div class="box"><h1>Access Required</h1><p>This portal requires a valid access link. Check your email for your personalized Co.Pilot portal link, or complete the assessment to get started.</p><a style="display:inline-block;margin-top:20px;padding:12px 32px;background:#1a2b4a;color:#fff;text-decoration:none;border-radius:8px" href="/assessment.html">Take the Assessment</a></div></body></html>`);
      }
      // Trial gating check
      const { isTrialExpired, getTrialDaysRemaining } = require("./utils/trialGating");
      if (isTrialExpired(agent)) {
        return res.send(`<html><head><title>Trial Expired</title><style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8f9fa;margin:0}.box{text-align:center;max-width:500px;padding:40px;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.08)}h1{color:#1a2b4a}p{color:#666;line-height:1.6}.btn{display:inline-block;margin-top:20px;padding:12px 32px;background:#1a2b4a;color:#fff;text-decoration:none;border-radius:8px}</style></head><body><div class="box"><h1>Your 30-Day Trial Has Ended</h1><p>Your free trial of Co.Pilot by Sutton has expired. To continue accessing your personalized coaching portal, upgrade to a paid plan.</p><a class="btn" href="mailto:kevin@sutton.com?subject=Co.Pilot Upgrade">Contact Us to Upgrade</a></div></body></html>`);
      }
      const trialDaysLeft = getTrialDaysRemaining(agent);

      const coaching = await db
        .prepare(
          `
        SELECT * FROM coaching_outputs
        WHERE agent_id = $1
        ORDER BY created_at DESC LIMIT 1
      `,
        )
        .get(agentId);

      const diagnosis = await db
        .prepare(
          `
        SELECT bottleneck, profile, signals
        FROM diagnoses WHERE agent_id = $1
        ORDER BY created_at DESC LIMIT 1
      `,
        )
        .get(agentId);

      const recentEmails = await db
        .prepare(
          `
        SELECT campaign_type, campaign_step, subject, send_status, sent_at
        FROM campaign_send_log
        WHERE agent_id = $1
        ORDER BY sent_at DESC LIMIT 5
      `,
        )
        .all(agentId);

      // No supporting_actions_json column exists — use empty array
      const supporting = [];

      // Query F.O.R.D. goals
      const fordGoals = await db
        .prepare(
          "SELECT category, five_year, one_year, one_month FROM ford_goals WHERE agent_id = $1 ORDER BY category",
        )
        .all(agentId);
      const fordMap = {};
      fordGoals.forEach((r) => { fordMap[r.category] = r; });

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

      const supportingItems = "<li>Coaching actions will appear here</li>";

      const fs = require("fs");
      let html = fs.readFileSync(
        require("path").join(__dirname, "..", "public", "portal.html"),
        "utf8",
      );

      // Parse rpm_plan JSON if it exists
      let rpmAction = "Complete your top 3 priority actions before noon.";
      let rpmResult = "Secure measurable progress this week.";
      let rpmPurpose =
        "So your business moves forward by design, not by chance.";
      if (coaching?.rpm_plan) {
        try {
          const rpm = JSON.parse(coaching.rpm_plan);
          rpmAction = rpm.action || rpm.massive_action || rpmAction;
          rpmResult = rpm.result || rpmResult;
          rpmPurpose = rpm.purpose || rpmPurpose;
        } catch (e) {
          // rpm_plan might be plain text
          rpmAction = coaching.rpm_plan;
        }
      }

      html = html
        .replace(
          /__AGENT_NAME__/g,
          `${agent.name || ""} ${agent.last_name || ""}`.trim(),
        )
        .replace(/__AGENT_ID__/g, agent.id)
        .replace(/__PHASE__/g, agent.stage || "Discovery")
        .replace(/__CHARACTER_TYPE__/g, "The Professional")
        .replace(
          /__FOCUS__/g,
          coaching?.primary_constraint || "Business Performance & Growth",
        )
        .replace(/__VERSION__/g, "v1.0")
        .replace(/__BOTTLENECK__/g, diagnosis?.bottleneck || "—")
        .replace(/__CONFIDENCE__/g, "—")
        .replace(
          /__TRUTH__/g,
          coaching?.the_truth
            ? coaching.the_truth.replace(/\n/g, "<br>")
            : "Your roadmap is being prepared.",
        )
        .replace(
          /__STRATEGY__/g,
          coaching?.the_strategy
            ? coaching.the_strategy.replace(/\n/g, "<br>")
            : "",
        )
        .replace(/__RPM_ACTION__/g, rpmAction)
        .replace(/__RPM_RESULT__/g, rpmResult)
        .replace(/__RPM_PURPOSE__/g, rpmPurpose)
        .replace(
          /__CONSTRAINT__/g,
          coaching?.primary_constraint || "Performance Foundation",
        )
        .replace(
          /__DIRECTIVE__/g,
          coaching?.coaching_directive ||
            "Execute your #1 priority action before anything else today.",
        )
        .replace(
          /__QUOTE__/g,
          coaching?.quote_of_the_day ||
            "It is not what we do once in a while that shapes our lives. It is what we do consistently.",
        )
        .replace(/__QUOTE_AUTHOR__/g, "")
        .replace(/__ENGAGEMENT_SCORE__/g, agent.engagement_score || "0")
        .replace(/__AGENT_ID__/g, agent.id)
        .replace(
          /__CREATED_AT__/g,
          agent.created_at || coaching?.created_at || "—",
        )
        .replace(/__GCI_GOAL__/g, "0")
        .replace(/__TXN_GOAL__/g, "0")
        .replace(/__TOP_ACTION__/g, coaching?.coaching_directive || "—")
        .replace(/__DAILY_RITUAL__/g, "—")
        .replace(/__WEEKLY_TARGET__/g, "—")
        .replace(/__SUPPORTING_ITEMS__/g, supportingItems)
        .replace(/__EMAIL_ROWS__/g, emailRows)
        .replace(
          /__GENERATED_AT__/g,
          coaching?.created_at
            ? new Date(coaching.created_at).toLocaleDateString("en-CA")
            : "—",
        );


      // Build F.O.R.D. section
      const fordCards = fordGoals.length ? fordGoals.map(function(f) {
        var icons = { family: "Family", occupation: "Occupation", recreation: "Recreation", dreams: "Dreams" };
        return "<div class=\"ford-card\">"
          + "<div class=\"ford-cat\">" + (icons[f.category] || f.category) + "</div>"
          + "<div class=\"ford-row\"><span class=\"ford-lbl\">5-Year Vision:</span> " + (f.five_year || "—") + "</div>"
          + "<div class=\"ford-row\"><span class=\"ford-lbl\">1-Year Target:</span> " + (f.one_year || "—") + "</div>"
          + "<div class=\"ford-row\"><span class=\"ford-lbl\">This Month:</span> " + (f.one_month || "—") + "</div>"
          + "</div>";
      }).join("") : "<p style=\"color:#888;text-align:center\">Dream Board not yet completed</p>";
      html = html.replace(/__FORD_SECTION__/g, fordCards);
      res.send(html);
    } catch (err) {
      res.status(500).send("Portal error: " + err.message);
    }
  });

  app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "admin.html"));
  });
  generateRoutes(app, db);
  console.log(`OpenClaw Ops API running on port ${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}`);
  console.log(`Health:    http://localhost:${PORT}/api/health`);
});
