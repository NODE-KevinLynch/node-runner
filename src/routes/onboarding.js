/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ONBOARDING ASSESSMENT ROUTES
 * Node Runner: Performance Architect Suite
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * POST /api/onboarding  — Submit full onboarding assessment
 *                         Creates: agent, business_onboarding, ford_goals,
 *                         agent_lifecycle records. Triggers diagnosis.
 *
 * GET  /api/ford/:agentId — Retrieve F.O.R.D. goals for portal display
 *
 * PUT  /api/ford/:agentId — Update F.O.R.D. monthly/annual targets
 *
 * Add to server.js:
 *   const onboardingRoutes = require("./routes/onboarding");
 *   onboardingRoutes(app, db);
 */

const { v4: uuidv4 } = require("uuid");

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

  // ── POST /api/onboarding

  app.post("/api/onboarding", async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        brokerage,
        region,
        units_2024,
        units_2023,
        units_2022,
        gci_2024,
        gci_2023,
        gci_2022,
        net_income,
        has_budget,
        monthly_spend,
        lead_volume,
        lead_source,
        has_crm,
        crm_name,
        primary_challenge,
        income_goal,
        transaction_goal,
        ford,
      } = req.body;

      if (!first_name || !last_name || !email) {
        return res
          .status(400)
          .json({ error: "first_name, last_name, and email are required" });
      }

      // 1. Check if agent already exists by email
      let agent = await db
        .prepare("SELECT id FROM agents WHERE email = $1")
        .get(email);

      let agent_id;

      if (agent) {
        agent_id = agent.id;
        // Update existing agent record
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
            return res
              .status(400)
              .json({
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
           id, agent_id,
           units_2024, units_2023, units_2022,
           gci_2024, gci_2023, gci_2022,
           net_income, has_budget, monthly_spend,
           lead_volume, lead_source, has_crm, crm_name,
           primary_challenge, income_goal, transaction_goal,
           created_at
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,NOW())
         ON CONFLICT (agent_id) DO UPDATE SET
           units_2024=$3, units_2023=$4, units_2022=$5,
           gci_2024=$6, gci_2023=$7, gci_2022=$8,
           net_income=$9, has_budget=$10, monthly_spend=$11,
           lead_volume=$12, lead_source=$13, has_crm=$14, crm_name=$15,
           primary_challenge=$16, income_goal=$17, transaction_goal=$18,
           updated_at=NOW()`,
        )
        .run(
          uuidv4(),
          agent_id,
          units_2024 || 0,
          units_2023 || 0,
          units_2022 || 0,
          gci_2024 || 0,
          gci_2023 || 0,
          gci_2022 || 0,
          net_income || 0,
          has_budget || "",
          monthly_spend || 0,
          lead_volume || "",
          lead_source || "",
          has_crm || "",
          crm_name || "",
          primary_challenge || "",
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
                 id, agent_id, category, five_year, one_year, one_month, created_at
               ) VALUES ($1,$2,$3,$4,$5,$6,NOW())
               ON CONFLICT (agent_id, category) DO UPDATE SET
                 five_year=$4, one_year=$5, one_month=$6, updated_at=NOW()`,
              )
              .run(
                uuidv4(),
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

      // 5. Determine bottleneck from responses
      const bottleneck = diagnoseBottleneck({
        gci_2024,
        units_2024,
        lead_volume,
        lead_source,
        has_crm,
        primary_challenge,
      });

      // 6. Create diagnosis record
      const profile = buildProfile({
        gci_2024,
        gci_2023,
        gci_2022,
        units_2024,
        lead_volume,
        has_crm,
        primary_challenge,
      });

      await db
        .prepare(
          `INSERT INTO diagnoses (id, agent_id, bottleneck, profile, signals, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        )
        .run(
          uuidv4(),
          agent_id,
          bottleneck,
          profile,
          JSON.stringify({
            lead_volume,
            lead_source,
            has_crm,
            primary_challenge,
            has_budget,
          }),
        );

      res.json({
        status: "onboarded",
        agent_id,
        bottleneck,
        profile,
        message: "Assessment saved. Coaching pipeline ready.",
      });
    } catch (err) {
      console.error("Onboarding error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // ── GET /api/ford/:agentId ──────────────────────────────────────────────
  app.get("/api/ford/:agentId", async (req, res) => {
    try {
      const rows = await db
        .prepare(
          `SELECT category, five_year, one_year, one_month, updated_at
         FROM ford_goals WHERE agent_id = $1 ORDER BY category`,
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

// ── Bottleneck Diagnosis Logic ──────────────────────────────────────────────
function diagnoseBottleneck({
  gci_2024,
  units_2024,
  lead_volume,
  lead_source,
  has_crm,
  primary_challenge,
}) {
  const gci = Number(gci_2024) || 0;
  const units = Number(units_2024) || 0;

  // Challenge-based mapping (primary signal)
  const challengeMap = {
    lead_gen: "pipeline_volume",
    conversion: "conversion_deficit",
    follow_up: "follow_up_consistency",
    time_mgmt: "time_management",
    sphere: "sphere_saturation",
    confidence: "mindset_foundation",
  };

  if (primary_challenge && challengeMap[primary_challenge]) {
    return challengeMap[primary_challenge];
  }

  // Fallback: production-based diagnosis
  if (gci < 40000 || units < 4) return "pipeline_volume";
  if (gci < 80000) return "conversion_deficit";
  if (lead_source === "sphere") return "sphere_saturation";
  if (has_crm === "no") return "follow_up_consistency";
  return "pipeline_volume";
}

// ── Profile Builder ─────────────────────────────────────────────────────────
function buildProfile({
  gci_2024,
  gci_2023,
  gci_2022,
  units_2024,
  lead_volume,
  has_crm,
  primary_challenge,
}) {
  const gci = Number(gci_2024) || 0;
  let tier;
  if (gci < 40000) tier = "emerging";
  else if (gci < 80000) tier = "developing";
  else if (gci < 150000) tier = "established";
  else tier = "elite";

  const trend =
    Number(gci_2024) > Number(gci_2023)
      ? "growing"
      : Number(gci_2024) < Number(gci_2023)
        ? "declining"
        : "flat";

  return `${tier}_${trend}`;
}

module.exports = registerOnboardingRoutes;
