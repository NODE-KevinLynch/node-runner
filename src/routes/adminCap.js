// src/routes/adminCap.js
// Admin dashboard for the daily send cap (domain warmup).
//
// GET /admin/cap — visual status: launch date, current week, cap, sent today, remaining.
// GET /api/cap   — same data as JSON.

const express = require("express");
const router = express.Router();
const { getCapStatus } = require("../utils/dailySendCap");

router.get("/", async (req, res) => {
  try {
    const s = await getCapStatus();

    let stateLabel = "";
    let stateColor = "";
    let stateMessage = "";

    if (s.bypass) {
      stateLabel = "BYPASS ACTIVE";
      stateColor = "#c0392b";
      stateMessage =
        "BYPASS_DAILY_CAP env var is set — cap is disabled. Use only for testing.";
    } else if (s.reason === "no_launch_set") {
      stateLabel = "NOT CONFIGURED";
      stateColor = "#7f8c8d";
      stateMessage =
        "RAMP_LAUNCH_DATE env var is not set. Set it in Render to enable warmup.";
    } else if (s.reason === "pre_launch") {
      stateLabel = "PRE-LAUNCH";
      stateColor = "#f39c12";
      stateMessage = `Cold sends are blocked until launch at ${new Date(s.launchAt).toLocaleString("en-CA", { timeZone: "America/Vancouver" })} Pacific.`;
    } else if (s.reason === "unlimited") {
      stateLabel = "WARMUP COMPLETE";
      stateColor = "#27ae60";
      stateMessage = `Week ${s.week} — warmup ramp is complete. No daily cap.`;
    } else if (s.capActive) {
      stateLabel = `WEEK ${s.week} — RAMPING`;
      stateColor = "#1a2b4a";
      stateMessage = `Cap active: ${s.dailyCap} cold sends per day this week.`;
    }

    res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Daily Send Cap — Co.Pilot Admin</title>
  <style>
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f6f8;margin:0;padding:0;color:#222 }
    .wrap { max-width:760px;margin:0 auto;padding:40px 24px }
    h1 { margin:0 0 8px 0;color:#1a2b4a;font-size:30px }
    .sub { color:#666;margin-bottom:32px;font-size:15px }
    .back { color:#1a2b4a;text-decoration:none;font-size:14px;display:inline-block;margin-bottom:16px }
    .card { background:#fff;border:1px solid #ddd;border-radius:10px;padding:28px;margin-bottom:24px }
    .state-badge { display:inline-block;background:${stateColor};color:#fff;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:bold;letter-spacing:1px;margin-bottom:12px }
    .grid { display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0 }
    .stat { background:#f8f9fb;border:1px solid #e5e7eb;border-radius:8px;padding:18px;text-align:center }
    .stat-num { font-size:36px;font-weight:bold;color:#1a2b4a;line-height:1 }
    .stat-label { font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px;margin-top:6px }
    table.schedule { width:100%;border-collapse:collapse;font-size:14px }
    table.schedule th { background:#1a2b4a;color:#fff;padding:10px;text-align:left }
    table.schedule td { padding:10px;border-bottom:1px solid #eee }
    .current-row { background:#fff7e0 }
    .message { padding:14px 18px;border-radius:6px;background:#f0f4f8;border-left:4px solid ${stateColor};color:#333;margin:0 0 8px }
    .json-link { font-size:12px;color:#666;margin-top:24px }
  </style>
</head>
<body>
<div class="wrap">
  <a href="/admin" class="back">← Back to Admin</a>
  <h1>Daily Send Cap</h1>
  <div class="sub">Domain warmup throttle for cold pre-activation emails. Post-analysis and coaching emails are not throttled.</div>

  <div class="card">
    <div class="state-badge">${stateLabel}</div>
    <p class="message">${stateMessage}</p>

    <div class="grid">
      <div class="stat">
        <div class="stat-num">${s.sentToday}</div>
        <div class="stat-label">Sent Today (UTC)</div>
      </div>
      <div class="stat">
        <div class="stat-num">${s.remaining !== null ? s.remaining : "∞"}</div>
        <div class="stat-label">Remaining Today</div>
      </div>
    </div>

    ${
      s.launchAt
        ? `<p style="color:#666;font-size:13px;margin:0">Launch: <strong>${new Date(s.launchAt).toLocaleString("en-CA", { timeZone: "America/Vancouver" })} Pacific</strong></p>`
        : ""
    }
  </div>

  <div class="card">
    <h3 style="margin-top:0;color:#1a2b4a">Warmup Schedule</h3>
    <table class="schedule">
      <tr><th>Week</th><th>Daily Cap</th><th>Status</th></tr>
      <tr ${s.week === 1 ? 'class="current-row"' : ""}><td>Week 1</td><td>50 / day</td><td>${s.week === 1 ? "← Current" : s.week > 1 ? "✓ Complete" : "Upcoming"}</td></tr>
      <tr ${s.week === 2 ? 'class="current-row"' : ""}><td>Week 2</td><td>100 / day</td><td>${s.week === 2 ? "← Current" : s.week > 2 ? "✓ Complete" : "Upcoming"}</td></tr>
      <tr ${s.week === 3 ? 'class="current-row"' : ""}><td>Week 3</td><td>250 / day</td><td>${s.week === 3 ? "← Current" : s.week > 3 ? "✓ Complete" : "Upcoming"}</td></tr>
      <tr ${s.week === 4 ? 'class="current-row"' : ""}><td>Week 4</td><td>500 / day</td><td>${s.week === 4 ? "← Current" : s.week > 4 ? "✓ Complete" : "Upcoming"}</td></tr>
      <tr ${s.week >= 5 ? 'class="current-row"' : ""}><td>Week 5+</td><td>Unlimited</td><td>${s.week >= 5 ? "← Current" : "Upcoming"}</td></tr>
    </table>
  </div>

  <p class="json-link">Raw JSON: <a href="/api/cap" style="color:#1a2b4a">/api/cap</a></p>
</div>
</body>
</html>`);
  } catch (err) {
    res.status(500).send("Cap status error: " + err.message);
  }
});

// JSON API endpoint
const apiRouter = express.Router();
apiRouter.get("/", async (req, res) => {
  try {
    const s = await getCapStatus();
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, apiRouter };
