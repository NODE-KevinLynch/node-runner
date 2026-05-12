// src/routes/adminCleanup.js
// EMERGENCY one-time cleanup route to remove the wrongly-imported cold_import agents
// Mounted at /admin/cleanup-cold-import
//
// Safety:
//   - Only deletes agents WHERE source = 'cold_import' AND created_at >= '2026-05-12 18:00:00'
//   - Demos (source=null), onboarding, agent_analysis, sutton_import are all untouched
//   - Shows preview count first; requires explicit ?confirm=YES_DELETE_3197 to actually delete

const express = require("express");
const router = express.Router();
const db = require("../db/db");

// Cutoff: today's date when the bad import happened
// Use a generous window: anything cold_import created in last 24 hours
const CUTOFF_HOURS = 24;

// ── GET /admin/cleanup-cold-import — preview/confirm page ────────────────────
router.get("/", async (req, res) => {
  try {
    const cutoff = new Date(
      Date.now() - CUTOFF_HOURS * 60 * 60 * 1000,
    ).toISOString();

    // Count what would be deleted
    const countResult = await db
      .prepare(
        `SELECT COUNT(*) AS n FROM agents WHERE source = 'cold_import' AND created_at >= $1`,
      )
      .get(cutoff);
    const badCount = parseInt(countResult.n) || 0;

    // Show a sample
    const sample = await db
      .prepare(
        `SELECT id, name, last_name, email, source, created_at
       FROM agents WHERE source = 'cold_import' AND created_at >= $1
       ORDER BY created_at DESC LIMIT 10`,
      )
      .all(cutoff);

    // Show what's being preserved (legitimate agents)
    const preserved = await db
      .prepare(
        `SELECT source, COUNT(*) AS n FROM agents
       WHERE source IS DISTINCT FROM 'cold_import' OR created_at < $1
       GROUP BY source ORDER BY n DESC`,
      )
      .all(cutoff);

    const confirm = req.query.confirm;

    if (confirm === "YES_DELETE_" + badCount) {
      // EXECUTE THE DELETE
      // First delete agent_lifecycle rows (foreign key)
      const lifecycleResult = await db
        .prepare(
          `DELETE FROM agent_lifecycle WHERE agent_id IN (
          SELECT id FROM agents WHERE source = 'cold_import' AND created_at >= $1
        )`,
        )
        .run(cutoff);

      // Then delete the agents
      const agentsResult = await db
        .prepare(
          `DELETE FROM agents WHERE source = 'cold_import' AND created_at >= $1`,
        )
        .run(cutoff);

      return res.send(`<!DOCTYPE html><html><head>
        <style>body{font-family:sans-serif;padding:40px;max-width:700px;margin:0 auto;background:#f5f6f8}
        h1{color:#27ae60} .card{background:#fff;border:1px solid #ddd;border-radius:8px;padding:24px}</style>
        </head><body>
        <h1>✅ Cleanup Complete</h1>
        <div class="card">
          <p><strong>${agentsResult.rowCount || badCount} agents deleted</strong> from the cold_import accident.</p>
          <p>${lifecycleResult.rowCount || 0} associated agent_lifecycle rows also removed.</p>
          <p>All demo agents, onboarding signups, and agent_analysis records are preserved.</p>
          <p><a href="/admin">← Back to Admin</a></p>
        </div>
        </body></html>`);
    }

    // Render confirmation page
    const sampleRows = sample
      .map(
        (s) => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee">${s.email}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee">${s.name || "-"}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee">${s.source}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:11px;color:#888">${s.created_at}</td>
      </tr>`,
      )
      .join("");

    const preservedRows = preserved
      .map(
        (p) => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee">${p.source || "(null - demo agents)"}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right"><strong>${p.n}</strong></td>
      </tr>`,
      )
      .join("");

    res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cleanup Cold Import — Co.Pilot Admin</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f6f8; margin:0; padding:0; color:#222 }
    .wrap { max-width:820px; margin:0 auto; padding:40px 24px }
    h1 { margin:0 0 8px 0; color:#c0392b; font-size:28px }
    h3 { color:#1a2b4a; margin-top:24px }
    .back { color:#1a2b4a; text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px }
    .card { background:#fff; border:1px solid #ddd; border-radius:8px; padding:24px; margin-bottom:20px }
    .warn { background:#fef5e7; border-left:4px solid #f39c12; padding:16px 20px; border-radius:4px; margin-bottom:20px }
    .danger { background:#fee; border-left:4px solid #c0392b; padding:16px 20px; border-radius:4px; margin-bottom:20px }
    .num { font-size:48px; font-weight:bold; color:#c0392b; margin:0 }
    .label { color:#666; font-size:13px; text-transform:uppercase; letter-spacing:1px }
    table { width:100%; border-collapse:collapse; font-size:13px; margin-top:12px }
    th { background:#1a2b4a; color:#fff; padding:8px 12px; text-align:left }
    .btn-danger { background:#c0392b; color:#fff; padding:14px 28px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block; font-size:15px }
    .btn-cancel { background:#fff; color:#1a2b4a; border:1px solid #1a2b4a; padding:14px 28px; border-radius:6px; text-decoration:none; font-weight:bold; display:inline-block; font-size:15px; margin-left:12px }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="/admin" class="back">← Back to Admin</a>
    <h1>🚨 Cleanup Wrongly-Imported Agents</h1>

    <div class="danger">
      <strong>Issue identified:</strong> A bug in the import dry-run path caused ${badCount} agents to be written to production despite the dry-run checkbox being enabled. This cleanup removes only those records.
    </div>

    <div class="card">
      <p class="label">Will Be Deleted</p>
      <p class="num">${badCount}</p>
      <p style="color:#666;margin:0">Agents WHERE source = 'cold_import' AND created_at within last ${CUTOFF_HOURS} hours</p>
    </div>

    <div class="card">
      <h3 style="margin-top:0">What Stays (preserved)</h3>
      <table>
        <tr><th>Source</th><th style="text-align:right">Count</th></tr>
        ${preservedRows}
      </table>
    </div>

    <div class="card">
      <h3 style="margin-top:0">Sample of records to be deleted</h3>
      <table>
        <tr><th>Email</th><th>Name</th><th>Source</th><th>Created</th></tr>
        ${sampleRows}
      </table>
    </div>

    <div class="warn">
      <strong>Before proceeding:</strong> Verify the count matches what you expect. The preserved table above should still show your demo agents, onboarding signups, and agent_analysis users.
    </div>

    <a href="/admin/cleanup-cold-import?confirm=YES_DELETE_${badCount}" class="btn-danger">Delete ${badCount} Agents</a>
    <a href="/admin" class="btn-cancel">Cancel</a>
  </div>
</body>
</html>`);
  } catch (err) {
    res.status(500).send("<pre>Cleanup error: " + err.message + "</pre>");
  }
});

module.exports = router;
