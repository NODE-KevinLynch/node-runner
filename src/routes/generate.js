/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COACHING GENERATION ROUTES
 * Node Runner: Performance Architect Suite
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * POST /api/generate/:agentId  — Run the full coaching pipeline for one agent
 * POST /api/generate-all       — Run coaching pipeline for all diagnosed agents
 * GET  /api/council/:agentId   — Preview which masters would be selected (dry run)
 *
 * Add to server.js:
 *   const generateRoutes = require("./routes/generate");
 *   generateRoutes(app, db);
 */

const { generateCoachingOutput, runCoachingPipeline } = require("../lib/coachingGenerator");
const { getMastersForBottleneck, getAllBottlenecks } = require("../lib/coachingLibrary");

function registerGenerateRoutes(app, db) {
  // ── POST /api/generate/:agentId ─────────────────────────────────────────
  // Run the full pipeline: read diagnosis → select council → generate → write
  app.post("/api/generate/:agentId", async (req, res) => {
    try {
      const { agentId } = req.params;
      const result = await runCoachingPipeline(db, agentId);

      res.json({
        status: "generated",
        agentId,
        council: result.council,
        coaching: {
          id: result.output.id,
          primary_constraint: result.output.primary_constraint,
          coaching_directive: result.output.coaching_directive,
          quote_of_the_day: result.output.quote_of_the_day,
          the_truth_preview: result.output.the_truth.substring(0, 200) + "...",
          the_strategy_preview: result.output.the_strategy.substring(0, 200) + "...",
          rpm_plan: JSON.parse(result.output.rpm_plan),
          created_at: result.output.created_at,
        },
      });
    } catch (err) {
      console.error(`Generate error for ${req.params.agentId}:`, err.message);
      res.status(err.message.includes("not found") ? 404 : 500).json({
        error: err.message,
      });
    }
  });

  // ── POST /api/generate-all ──────────────────────────────────────────────
  // Run coaching pipeline for all agents that have a diagnosis
  app.post("/api/generate-all", async (req, res) => {
    try {
      const diagnosedAgents = await db
        .prepare(
          `SELECT DISTINCT d.agent_id
           FROM diagnoses d
           JOIN agents a ON a.id = d.agent_id
           ORDER BY d.agent_id`
        )
        .all();

      const results = [];
      const errors = [];

      for (const row of diagnosedAgents) {
        try {
          const result = await runCoachingPipeline(db, row.agent_id);
          results.push({
            agentId: row.agent_id,
            council: result.council,
            status: "generated",
          });
        } catch (err) {
          errors.push({
            agentId: row.agent_id,
            error: err.message,
          });
        }
      }

      res.json({
        status: "batch_complete",
        generated: results.length,
        failed: errors.length,
        results,
        errors: errors.length ? errors : undefined,
      });
    } catch (err) {
      console.error("Generate-all error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // ── GET /api/council/:agentId ───────────────────────────────────────────
  // Dry-run: show which masters would be selected without writing anything
  app.get("/api/council/:agentId", async (req, res) => {
    try {
      const { agentId } = req.params;

      const diagnosis = await db
        .prepare(
          `SELECT bottleneck, profile, signals, created_at
           FROM diagnoses
           WHERE agent_id = $1
           ORDER BY created_at DESC LIMIT 1`
        )
        .get(agentId);

      if (!diagnosis) {
        return res.status(404).json({
          error: `No diagnosis found for agent: ${agentId}`,
        });
      }

      const council = getMastersForBottleneck(diagnosis.bottleneck, 3);

      res.json({
        agentId,
        diagnosis: {
          bottleneck: diagnosis.bottleneck,
          profile: diagnosis.profile,
          diagnosed_at: diagnosis.created_at,
        },
        council: council.map((c) => ({
          master: c.master.id,
          name: c.master.name,
          title: c.master.title,
          role: c.weight === 3 ? "Primary" : c.weight === 2 ? "Supporting" : "Reinforcing",
          weight: c.weight,
          focus: c.master.focus,
          sample_directive: c.master.directives[0],
        })),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── GET /api/bottlenecks ────────────────────────────────────────────────
  // Reference: list all recognized bottleneck keys
  app.get("/api/bottlenecks", (req, res) => {
    const bottlenecks = getAllBottlenecks();
    const mapped = bottlenecks.map((b) => ({
      key: b,
      council: getMastersForBottleneck(b, 3).map((c) => ({
        master: c.master.name,
        weight: c.weight,
      })),
    }));
    res.json({ bottlenecks: mapped, count: mapped.length });
  });

  // POST /api/regenerate/:agentId — regenerate coaching for an agent
  app.post("/api/regenerate/:agentId", async (req, res) => {
    try {
      const { runCoachingPipeline } = require("../lib/coachingGenerator");
      const { agentId } = req.params;
      await runCoachingPipeline(db, agentId);
      res.json({ status: "regenerated", agent_id: agentId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = registerGenerateRoutes;
