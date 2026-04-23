/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ONBOARDING ASSESSMENT ROUTES
 * Node Runner: Performance Architect Suite — Copilot by Sutton
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const { v4: uuidv4 } = require("uuid");
const { runCoachingPipeline } = require("../lib/coachingGenerator");
const { syncAssessmentToFub, syncCoachingToFub } = require("../services/fubMirrorService");

function registerOnboardingRoutes(app, db) {
  // ── GET /api/lookup-agent ─────────────────────────────────────────────
  app.get("/api/lookup-agent", async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) return res.json({ found: false });
      const agent = await db
        .prepare(
          "SELECT id, name, last_name, email, phone, brokerage, region FROM agents WHERE email = $1",
        )
        .get(email);
      if (agent) {
        res.json({ found: true, agent });
      } else {
        res.json({ found: false });
      }
    } catch (err) {
      res.json({ found: false });
    }
  });

  // ── POST /api/onboarding ────────────────────────────────────────────────
  app.post("/api/onboarding", async (req, res) => {
    try {
      const body = req.body;
      const first_name = body.first_name;
      const last_name = body.last_name;
      const email = body.email;
      const phone = body.phone;
      const brokerage = body.brokerage;
      const region = body.region;

      // Dynamic year keys from the form
      const y1 = body.year1 || 2024;
      const y2 = body.year2 || 2023;
      const y3 = body.year3 || 2022;
      const units_y1 = body["units_" + y1] || 0;
      const units_y2 = body["units_" + y2] || 0;
      const units_y3 = body["units_" + y3] || 0;
      const gci_y1 = body["gci_" + y1] || 0;
      const gci_y2 = body["gci_" + y2] || 0;
      const gci_y3 = body["gci_" + y3] || 0;

      const net_income = body.net_income || 0;
      const has_budget = body.has_budget || "";
      const primary_challenge = body.primary_challenge || "";
      const income_goal = body.income_goal || 0;
      const transaction_goal = body.transaction_goal || 0;

      // 8 new coaching intelligence fields
      const has_business_plan = body.has_business_plan || "";
      const has_accountability = body.has_accountability || "";
      const prospecting_hours = body.prospecting_hours || "";
      const avg_dom = body.avg_dom || "";
      const has_listing_pres = body.has_listing_pres || "";
      const repeat_client_pct = body.repeat_client_pct || "";
      const tracks_activities = body.tracks_activities || "";
      const has_morning_routine = body.has_morning_routine || "";

      const ford = body.ford;

      if (!first_name || !last_name || !email) {
        return res.status(400).json({
          error:
            "Please fill in your first name, last name, and email to continue.",
        });
      }

      // 1. Check if agent already exists by email
      let agent = await db
        .prepare("SELECT id FROM agents WHERE email = $1")
        .get(email);

      let agent_id;

      if (agent) {
        agent_id = agent.id;
        await db
          .prepare(
            `UPDATE agents SET name = $1, last_name = $2, phone = $3,
           brokerage = $4, region = $5, source = 'onboarding', updated_at = NOW()
           WHERE id = $6`,
          )
          .run(
            first_name,
            last_name,
            phone || null,
            brokerage || null,
            region || null,
            agent_id,
          );
      } else {
        const baseId =
          "agent_" +
          first_name.toLowerCase() +
          "_" +
          last_name.toLowerCase().replace(/\s+/g, "_");
        const suffix = "_" + Date.now().toString(36);
        agent_id = baseId + suffix;
        try {
          await db
            .prepare(
              `INSERT INTO agents (id, name, last_name, email, phone, brokerage, region, source, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'onboarding', NOW())`,
            )
            .run(
              agent_id,
              first_name,
              last_name,
              email,
              phone || null,
              brokerage || null,
              region || null,
            );
        } catch (insertErr) {
          if (
            insertErr.message.includes("unique") ||
            insertErr.message.includes("duplicate")
          ) {
            return res.status(400).json({
              error:
                "An account with this email already exists. Please use a different email or contact Kevin for help updating your profile.",
            });
          }
          throw insertErr;
        }
      }

      // 2. Save business onboarding data
      await db
        .prepare(
          `INSERT INTO business_onboarding (
           agent_id,
           units_2024, units_2023, units_2022,
           gci_2024, gci_2023, gci_2022,
           net_income, has_budget,
           has_business_plan, has_accountability, prospecting_hours,
           avg_dom, has_listing_pres, repeat_client_pct,
           tracks_activities, has_morning_routine,
           primary_challenge, income_goal, transaction_goal,
           created_at
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,NOW())
         ON CONFLICT (agent_id) DO UPDATE SET
           units_2024=$2, units_2023=$3, units_2022=$4,
           gci_2024=$5, gci_2023=$6, gci_2022=$7,
           net_income=$8, has_budget=$9,
           has_business_plan=$10, has_accountability=$11, prospecting_hours=$12,
           avg_dom=$13, has_listing_pres=$14, repeat_client_pct=$15,
           tracks_activities=$16, has_morning_routine=$17,
           primary_challenge=$18, income_goal=$19, transaction_goal=$20,
           updated_at=NOW()`,
        )
        .run(
          agent_id,
          units_y1 || 0,
          units_y2 || 0,
          units_y3 || 0,
          gci_y1 || 0,
          gci_y2 || 0,
          gci_y3 || 0,
          net_income || 0,
          has_budget,
          has_business_plan,
          has_accountability,
          prospecting_hours,
          avg_dom,
          has_listing_pres,
          repeat_client_pct,
          tracks_activities,
          has_morning_routine,
          primary_challenge,
          income_goal || 0,
          transaction_goal || 0,
        );
      // 3. Save F.O.R.D. goals
      if (ford) {
        const categories = ["family", "occupation", "recreation", "dreams"];
        for (const cat of categories) {
          if (ford[cat]) {
            await db
              .prepare(
                `INSERT INTO ford_goals (
                     agent_id, category, five_year, one_year, one_month, created_at
                   ) VALUES ($1,$2,$3,$4,$5,NOW())
                   ON CONFLICT (agent_id, category) DO UPDATE SET
                     five_year=$3, one_year=$4, one_month=$5, updated_at=NOW()`,
              )
              .run(
                agent_id,
                cat,
                ford[cat].five_year || "",
                ford[cat].one_year || "",
                ford[cat].one_month || "",
              );
          }
        }
      }

      // 4. Create agent_lifecycle record if it doesn't exist
      const lifecycle = await db
        .prepare("SELECT agent_id FROM agent_lifecycle WHERE agent_id = $1")
        .get(agent_id);

      if (!lifecycle) {
        await db
          .prepare(
            `INSERT INTO agent_lifecycle (agent_id, stage, engagement_score, campaign_state, created_at, updated_at)
           VALUES ($1, 'discovery', 0, 'pre_activation', NOW(), NOW())`,
          )
          .run(agent_id);
      }

      // Set trial start date
      await db.prepare("UPDATE agents SET trial_start_date = NOW() WHERE id = $1 AND trial_start_date IS NULL").run(agent_id);
      // 5. Determine bottleneck from ALL responses (enhanced diagnosis)
      const bottleneck = diagnoseBottleneck({
        gci_y1,
        units_y1,
        primary_challenge,
        prospecting_hours,
        repeat_client_pct,
        has_listing_pres,
        tracks_activities,
        has_morning_routine,
        has_business_plan,
      });

      // 6. Build profile
      const profile = buildProfile({ gci_y1, gci_y2, gci_y3, units_y1 });

      // 7. Build comprehensive signals object
      const signals = {
        has_budget,
        has_business_plan,
        has_accountability,
        prospecting_hours,
        avg_dom,
        has_listing_pres,
        repeat_client_pct,
        tracks_activities,
        has_morning_routine,
        primary_challenge,
      };

      await db
        .prepare(
          `INSERT INTO diagnoses (agent_id, bottleneck, profile, signals, created_at)
             VALUES ($1, $2, $3, $4, NOW())`,
        )
        .run(agent_id, bottleneck, profile, JSON.stringify(signals));
      // 8.5 Save assessment answers to assessments table
      const assessmentFields = {
        primary_challenge, has_budget, has_business_plan, has_accountability,
        prospecting_hours, avg_dom, has_listing_pres, repeat_client_pct,
        tracks_activities, has_morning_routine, income_goal: String(income_goal),
        transaction_goal: String(transaction_goal), net_income: String(net_income),
        units_y1: String(units_y1), gci_y1: String(gci_y1)
      };
      for (const [qKey, qVal] of Object.entries(assessmentFields)) {
        if (qVal) {
          try {
            await db.prepare(
              "INSERT INTO assessments (id, agent_id, question_key, answer, score, created_at) VALUES ($1, $2, $3, $4, 0, NOW())"
            ).run(require("uuid").v4(), agent_id, qKey, qVal);
          } catch(aErr) { console.error("Assessment save error:", aErr.message); }
        }
      }


      // 9. Auto-generate coaching content so portal is ready immediately
      try {
        await runCoachingPipeline(db, agent_id);
        console.log("Coaching generated for:", agent_id);
            try { const { trackEngagement } = require("../services/engagementEngine"); await trackEngagement(agent_id, "assessment_completed"); } catch(engErr) { console.error("Engagement track failed:", engErr.message); }
            try { const { generateToken } = require("../utils/portalAuth"); const token = await generateToken(agent_id); console.log("Portal token generated for:", agent_id); } catch(tokErr) { console.error("Token generation failed:", tokErr.message); }
            try { const coaching = await db.prepare("SELECT * FROM coaching_outputs WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 1").get(agent_id); const agentRow = await db.prepare("SELECT email FROM agents WHERE id = $1").get(agent_id); if (agentRow?.email) { await syncAssessmentToFub(agent_id, agentRow.email, { bottleneck, phase: "Discovery" }); if (coaching) await syncCoachingToFub(agent_id, agentRow.email, coaching); } } catch(fubErr) { console.error("FUB sync failed (non-fatal):", fubErr.message); }
      } catch (coachErr) {
        console.error("Coaching generation failed (non-fatal):", coachErr.message);
      }

        let portal_url = null;
        try { const { getTokenForAgent } = require("../utils/portalAuth"); const t = await getTokenForAgent(agent_id); if (t) portal_url = "https://node-runner.onrender.com/portal/" + agent_id + "?token=" + t; } catch(e) {}
      res.json({
        status: "onboarded",
        agent_id,
        bottleneck,
        profile,
            portal_url,
        message: "Assessment saved. Coaching pipeline ready.",
      });
    } catch (err) {
      console.error("Onboarding error:", err.message);
      res.status(500).json({
        error:
          "Something went wrong saving your assessment. Please try again or contact Kevin for help.",
      });
    }
  });

  // ── GET /api/ford/:agentId ──────────────────────────────────────────────
  app.get("/api/ford/:agentId", async (req, res) => {
    try {
      const rows = await db
        .prepare(
          "SELECT category, five_year, one_year, one_month, updated_at FROM ford_goals WHERE agent_id = $1 ORDER BY category",
        )
        .all(req.params.agentId);
      const ford = {};
      rows.forEach((r) => {
        ford[r.category] = r;
      });
      res.json({ agent_id: req.params.agentId, ford });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── PUT /api/ford/:agentId ──────────────────────────────────────────────
  app.put("/api/ford/:agentId", async (req, res) => {
    try {
      const { agentId } = req.params;
      const { category, one_year, one_month } = req.body;
      if (!category)
        return res.status(400).json({ error: "category required" });
      await db
        .prepare(
          `UPDATE ford_goals SET one_year = COALESCE($1, one_year),
         one_month = COALESCE($2, one_month), updated_at = NOW()
         WHERE agent_id = $3 AND category = $4`,
        )
        .run(one_year || null, one_month || null, agentId, category);
      res.json({ status: "updated", agent_id: agentId, category });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

// ── Enhanced Bottleneck Diagnosis ───────────────────────────────────────────
function diagnoseBottleneck({
  gci_y1,
  units_y1,
  primary_challenge,
  prospecting_hours,
  repeat_client_pct,
  has_listing_pres,
  tracks_activities,
  has_morning_routine,
  has_business_plan,
}) {
  const gci = Number(gci_y1) || 0;
  const units = Number(units_y1) || 0;

  // Score each bottleneck category based on signals
  const scores = {
    pipeline_volume: 0,
    conversion_deficit: 0,
    follow_up_consistency: 0,
    sphere_saturation: 0,
    time_management: 0,
    mindset_foundation: 0,
  };

  // Primary challenge is the strongest signal
  const challengeMap = {
    lead_gen: "pipeline_volume",
    conversion: "conversion_deficit",
    follow_up: "follow_up_consistency",
    time_mgmt: "time_management",
    sphere: "sphere_saturation",
    confidence: "mindset_foundation",
  };
  if (primary_challenge && challengeMap[primary_challenge]) {
    scores[challengeMap[primary_challenge]] += 5;
  }

  // Prospecting hours — low hours = pipeline problem
  if (prospecting_hours === "0-2") {
    scores.pipeline_volume += 3;
  } else if (prospecting_hours === "3-5") {
    scores.pipeline_volume += 1;
  }

  // Repeat client % — low = sphere underworked
  if (repeat_client_pct === "under-10") {
    scores.sphere_saturation += 3;
  } else if (repeat_client_pct === "10-25") {
    scores.sphere_saturation += 1;
  }

  // Listing presentation — no deck = conversion gap
  if (has_listing_pres === "no") {
    scores.conversion_deficit += 2;
  }

  // Activity tracking — not tracking = follow-up/time issue
  if (tracks_activities === "no") {
    scores.follow_up_consistency += 2;
    scores.time_management += 1;
  } else if (tracks_activities === "sometimes") {
    scores.follow_up_consistency += 1;
  }

  // Morning routine — no routine = mindset signal
  if (has_morning_routine === "no") {
    scores.mindset_foundation += 2;
  } else if (has_morning_routine === "inconsistent") {
    scores.mindset_foundation += 1;
  }

  // Business plan — no plan = time/mindset signal
  if (has_business_plan === "no") {
    scores.time_management += 2;
    scores.mindset_foundation += 1;
  }

  // Production fallback
  if (gci < 40000 || units < 4) {
    scores.pipeline_volume += 2;
  } else if (gci < 80000) {
    scores.conversion_deficit += 1;
  }

  // Return highest scoring bottleneck
  let maxKey = "pipeline_volume";
  let maxVal = 0;
  for (const [key, val] of Object.entries(scores)) {
    if (val > maxVal) {
      maxVal = val;
      maxKey = key;
    }
  }
  return maxKey;
}

// ── Profile Builder ─────────────────────────────────────────────────────────
function buildProfile({ gci_y1, gci_y2, gci_y3, units_y1 }) {
  const gci = Number(gci_y1) || 0;
  let tier;
  if (gci < 40000) tier = "emerging";
  else if (gci < 80000) tier = "developing";
  else if (gci < 150000) tier = "established";
  else tier = "elite";

  const trend =
    Number(gci_y1) > Number(gci_y2)
      ? "growing"
      : Number(gci_y1) < Number(gci_y2)
        ? "declining"
        : "flat";

  return `${tier}_${trend}`;
}

module.exports = registerOnboardingRoutes;
