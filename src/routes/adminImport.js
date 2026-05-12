// src/routes/adminImport.js
// Admin CSV upload page for bulk realtor import
// GET  /admin/import — upload form
// POST /admin/import — process the uploaded CSV
//
// Uses the same logic as src/scripts/importRealtors.js but runs on Render
// where the Node environment is healthy. No file system writes — CSV is
// parsed from the POST body directly.

const express = require("express");
const router = express.Router();
const db = require("../db/db");

// ── Generic local-parts that don't map to a person's first name ──────────────
const GENERIC_LOCAL_PARTS = new Set([
  "info",
  "admin",
  "contact",
  "team",
  "office",
  "hello",
  "hi",
  "sales",
  "support",
  "help",
  "inquiries",
  "inquiry",
  "enquiry",
  "broker",
  "realtor",
  "agent",
  "listings",
  "homes",
  "realty",
  "mail",
  "email",
  "noreply",
  "no-reply",
  "service",
  "services",
  "marketing",
  "client",
  "clients",
  "customer",
  "customerservice",
  "general",
  "main",
  "reception",
  "frontdesk",
  "manager",
  "ops",
  "operations",
  "accounts",
  "accounting",
  "billing",
  "hr",
]);

// ── Extract first name from email ────────────────────────────────────────────
function extractFirstName(email) {
  if (!email || !email.includes("@"))
    return { firstName: null, confidence: "none" };
  const local = email.split("@")[0].toLowerCase();
  if (GENERIC_LOCAL_PARTS.has(local))
    return { firstName: null, confidence: "none" };

  const parts = local.split(/[._+\-]/).filter(Boolean);
  let candidate = parts[0];
  if (!candidate || candidate.length < 2)
    return { firstName: null, confidence: "low" };
  if (/^\d/.test(candidate) || /\d{3,}/.test(candidate))
    return { firstName: null, confidence: "low" };
  if (GENERIC_LOCAL_PARTS.has(candidate))
    return { firstName: null, confidence: "none" };

  candidate = candidate.replace(/\d+$/, "");
  if (candidate.length < 2) return { firstName: null, confidence: "low" };

  const firstName =
    candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();
  const confidence = parts.length > 1 ? "high" : "medium";
  return { firstName, confidence };
}

// ── CSV parser (handles quoted fields) ───────────────────────────────────────
function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  function parseLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  }

  const headers = parseLine(lines[0]).map((h) =>
    h.toLowerCase().replace(/\s+/g, "_"),
  );
  const rows = lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row;
  });

  return { headers, rows };
}

function generateAgentId(firstName, email) {
  const namePart = (firstName || email.split("@")[0])
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .slice(0, 20);
  const timePart = Date.now().toString(36);
  const randPart = Math.random().toString(36).slice(2, 6);
  return `agent_${namePart}_${timePart}${randPart}`;
}

// ── GET /admin/import — upload form ──────────────────────────────────────────
router.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bulk Import — Co.Pilot Admin</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f6f8; margin:0; padding:0; color:#222 }
    .wrap { max-width:780px; margin:0 auto; padding:40px 24px }
    h1 { margin:0 0 8px 0; color:#1a2b4a; font-size:32px }
    .sub { color:#666; margin-bottom:32px; font-size:15px }
    .back { color:#1a2b4a; text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px }
    .card { background:#fff; border:1px solid #ddd; border-radius:8px; padding:32px; margin-bottom:24px }
    label { display:block; font-weight:bold; margin-bottom:8px; color:#1a2b4a }
    .field { margin-bottom:24px }
    select, textarea { width:100%; padding:12px; border:1px solid #ccc; border-radius:6px; font-size:14px; font-family:inherit; box-sizing:border-box }
    textarea { min-height:200px; font-family:'SF Mono', Menlo, monospace; font-size:13px }
    .row { display:flex; gap:16px; align-items:center }
    .row input[type=checkbox] { width:20px; height:20px }
    button { background:#1a2b4a; color:#fff; border:none; padding:14px 28px; border-radius:6px; font-size:15px; font-weight:bold; cursor:pointer }
    button:hover { background:#243a63 }
    .hint { color:#666; font-size:13px; margin-top:6px }
    .danger { background:#fff5f5; border-left:4px solid #c33; padding:12px 16px; border-radius:4px; margin-top:16px; font-size:13px }
    .file-drop { border:2px dashed #aaa; border-radius:8px; padding:32px; text-align:center; background:#fafafa; cursor:pointer; transition:background .15s }
    .file-drop:hover { background:#f0f4f8; border-color:#1a2b4a }
    .file-drop.has-file { background:#e8f0ff; border-color:#1a2b4a; border-style:solid }
    input[type=file] { display:none }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="/admin" class="back">← Back to Admin</a>
    <h1>Bulk Realtor Import</h1>
    <div class="sub">Upload a CSV of realtors to import into Co.Pilot. They will be placed in pre_activation campaign state, ready for the email engine to pick up.</div>

    <form id="importForm" method="POST" action="/admin/import" enctype="multipart/form-data">
      <div class="card">
        <div class="field">
          <label>CSV File</label>
          <label class="file-drop" id="dropZone" for="csvFile">
            <div id="dropText">Click to select a CSV file, or drag-drop here</div>
            <input type="file" id="csvFile" name="csvFile" accept=".csv,.txt" required>
          </label>
          <div class="hint">Expected columns: Email (required), Brokerage, Area/Tab/Region, First Name (optional), Last Name (optional), Phone (optional)</div>
        </div>

        <div class="field">
          <label>Source</label>
          <select name="source" required>
            <option value="cold_import">cold_import — Non-Sutton agents (12-email cold sequence)</option>
            <option value="sutton_import">sutton_import — Sutton Group agents (26-email Sutton sequence)</option>
          </select>
          <div class="hint">This determines which email sequence the imported agents enter.</div>
        </div>

        <div class="field">
          <div class="row">
            <input type="checkbox" id="dryRun" name="dryRun" value="1" checked>
            <label for="dryRun" style="margin:0">Dry run (preview only, no database writes)</label>
          </div>
          <div class="hint">Strongly recommended for first run. Uncheck to commit the import.</div>
        </div>

        <button type="submit">Run Import</button>

        <div class="danger">
          <strong>Heads up:</strong> Live imports write to the production database. Always run a dry-run first.
        </div>
      </div>
    </form>
  </div>

  <script>
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('csvFile');
    const dropText = document.getElementById('dropText');

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        dropZone.classList.add('has-file');
        dropText.textContent = '✓ ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
      }
    });

    ['dragover', 'dragenter'].forEach(evt => {
      dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.style.borderColor = '#1a2b4a'; });
    });
    ['dragleave', 'drop'].forEach(evt => {
      dropZone.addEventListener(evt, (e) => { e.preventDefault(); dropZone.style.borderColor = ''; });
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        const file = e.dataTransfer.files[0];
        dropZone.classList.add('has-file');
        dropText.textContent = '✓ ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
      }
    });
  </script>
</body>
</html>`);
});

// ── POST /admin/import — process the CSV ─────────────────────────────────────
// Uses busboy for multipart parsing (already a dependency of express in newer versions)
router.post("/", async (req, res) => {
  // Manually parse multipart/form-data — minimal implementation, no extra deps
  let csvContent = "";
  let source = "cold_import";
  let isDryRun = false;

  try {
    // Read raw body
    const rawBody = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => resolve(Buffer.concat(chunks)));
      req.on("error", reject);
    });

    const contentType = req.headers["content-type"] || "";
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
      return res.status(400).send("Missing multipart boundary");
    }
    const boundary = "--" + boundaryMatch[1];
    const bodyStr = rawBody.toString("binary");
    const parts = bodyStr.split(boundary).slice(1, -1);

    for (const part of parts) {
      const headerEnd = part.indexOf("\r\n\r\n");
      if (headerEnd === -1) continue;
      const headerStr = part.slice(0, headerEnd);
      const valueStr = part.slice(headerEnd + 4, part.length - 2); // strip trailing \r\n

      const nameMatch = headerStr.match(/name="([^"]+)"/);
      if (!nameMatch) continue;
      const fieldName = nameMatch[1];

      if (fieldName === "csvFile") {
        csvContent = Buffer.from(valueStr, "binary").toString("utf8");
      } else if (fieldName === "source") {
        source = valueStr.trim();
      } else if (fieldName === "dryRun") {
        isDryRun = valueStr.trim() === "1";
      }
    }
  } catch (err) {
    return res.status(500).send("Upload parse error: " + err.message);
  }

  if (!csvContent) {
    return res.status(400).send("No CSV content received");
  }

  // ── Process the CSV ────────────────────────────────────────────────────────
  const { headers, rows } = parseCSV(csvContent);

  const colMap = {
    email: headers.find((h) => /^e?mail$/i.test(h) || h === "email"),
    region: headers.find((h) => /area|tab|region|city/i.test(h)),
    brokerage: headers.find((h) => /broker/i.test(h)),
    firstName: headers.find((h) => /first.?name/i.test(h)),
    lastName: headers.find((h) => /last.?name|surname/i.test(h)),
    phone: headers.find((h) => /phone|mobile|tel/i.test(h)),
  };

  if (!colMap.email) {
    return res.status(400).send(
      renderResult({
        error: "No email column found in CSV. Expected a column named 'Email'.",
        headers,
      }),
    );
  }

  const stats = {
    total: rows.length,
    created: 0,
    skippedDuplicate: 0,
    skippedNoEmail: 0,
    skippedBadEmail: 0,
    errors: 0,
    nameHighConfidence: 0,
    nameMediumConfidence: 0,
    nameNoMatch: 0,
  };
  const samples = { good: [], generic: [], errors: [] };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const email = (row[colMap.email] || "").trim().toLowerCase();

    if (!email) {
      stats.skippedNoEmail++;
      continue;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      stats.skippedBadEmail++;
      continue;
    }

    let firstName = colMap.firstName
      ? (row[colMap.firstName] || "").trim()
      : "";
    let lastName = colMap.lastName ? (row[colMap.lastName] || "").trim() : "";
    let confidence = "high";

    if (!firstName) {
      const extracted = extractFirstName(email);
      firstName = extracted.firstName || "";
      confidence = extracted.confidence;
    }

    if (confidence === "high") stats.nameHighConfidence++;
    else if (confidence === "medium") stats.nameMediumConfidence++;
    else stats.nameNoMatch++;

    const brokerage = colMap.brokerage
      ? (row[colMap.brokerage] || "").trim()
      : "";
    const region = colMap.region ? (row[colMap.region] || "").trim() : "";
    const phone = colMap.phone ? (row[colMap.phone] || "").trim() : "";

    if (samples.good.length < 8 && firstName) {
      samples.good.push({ email, firstName, brokerage, region, confidence });
    }
    if (samples.generic.length < 8 && !firstName) {
      samples.generic.push({ email, brokerage, region });
    }

    try {
      const existing = await db
        .prepare("SELECT id FROM agents WHERE email = $1")
        .get(email);
      if (existing) {
        stats.skippedDuplicate++;
        continue;
      }
    } catch (err) {
      stats.errors++;
      samples.errors.push({ email, error: err.message });
      continue;
    }

    if (isDryRun) {
      stats.created++;
      continue;
    }

    const agentId = generateAgentId(firstName, email);
    try {
      await db
        .prepare(
          `INSERT INTO agents (id, name, last_name, email, phone, brokerage, region, source, campaign_state, trial_start_date, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pre_activation', NOW(), NOW())`,
        )
        .run(
          agentId,
          firstName || "",
          lastName || "",
          email,
          phone || null,
          brokerage || null,
          region || null,
          source,
        );

      await db
        .prepare(
          `INSERT INTO agent_lifecycle (agent_id, stage, engagement_score, campaign_state, created_at, updated_at)
         VALUES ($1, 'discovery', 0, 'pre_activation', NOW(), NOW())`,
        )
        .run(agentId);

      stats.created++;
    } catch (err) {
      stats.errors++;
      samples.errors.push({ email, error: err.message });
    }
  }

  res.send(renderResult({ stats, samples, source, isDryRun, headers, colMap }));
});

// ── Result page rendering ────────────────────────────────────────────────────
function renderResult({
  stats,
  samples,
  source,
  isDryRun,
  headers,
  colMap,
  error,
}) {
  if (error) {
    return `<!DOCTYPE html><html><head><style>body{font-family:sans-serif;padding:40px;max-width:700px;margin:0 auto}</style></head><body>
      <a href="/admin/import">← Back to import</a>
      <h1 style="color:#c33">Import Error</h1>
      <p>${error}</p>
      ${headers ? `<p><strong>Headers found in your CSV:</strong></p><code>${headers.join(", ")}</code>` : ""}
      </body></html>`;
  }

  const modeBadge = isDryRun
    ? `<span style="background:#f39c12;color:#fff;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:bold;letter-spacing:1px">DRY RUN</span>`
    : `<span style="background:#27ae60;color:#fff;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:bold;letter-spacing:1px">LIVE IMPORT</span>`;

  const goodSamples = samples.good.length
    ? `<h3>Sample name extractions (good)</h3><table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr style="background:#1a2b4a;color:#fff"><th style="padding:8px 12px;text-align:left">Email</th><th style="padding:8px 12px;text-align:left">First Name</th><th style="padding:8px 12px;text-align:left">Confidence</th><th style="padding:8px 12px;text-align:left">Region</th></tr>
        ${samples.good.map((s) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${s.email}</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><strong>${s.firstName}</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${s.confidence}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${s.region || "-"}</td></tr>`).join("")}
       </table>`
    : "";

  const genericSamples = samples.generic.length
    ? `<h3>Sample generic emails (no first name available)</h3>
       <p style="color:#666;font-size:13px">These contacts will receive emails using a generic "Hi there" opener since no first name could be extracted.</p>
       <table style="width:100%;border-collapse:collapse;font-size:13px">
        <tr style="background:#7f8c8d;color:#fff"><th style="padding:8px 12px;text-align:left">Email</th><th style="padding:8px 12px;text-align:left">Region</th></tr>
        ${samples.generic.map((s) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${s.email}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${s.region || "-"}</td></tr>`).join("")}
       </table>`
    : "";

  const errorSamples = samples.errors.length
    ? `<h3 style="color:#c33">Errors</h3><table style="width:100%;border-collapse:collapse;font-size:13px">
        ${samples.errors.map((s) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">${s.email}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#c33">${s.error}</td></tr>`).join("")}
       </table>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Import Result — Co.Pilot Admin</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f6f8; margin:0; padding:0; color:#222 }
    .wrap { max-width:820px; margin:0 auto; padding:40px 24px }
    h1 { margin:0 0 8px 0; color:#1a2b4a; font-size:28px }
    h3 { color:#1a2b4a; margin-top:32px }
    .back { color:#1a2b4a; text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px }
    .card { background:#fff; border:1px solid #ddd; border-radius:8px; padding:24px; margin-bottom:24px }
    .grid { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin:24px 0 }
    .stat { background:#f8f9fb; border:1px solid #e5e7eb; border-radius:6px; padding:16px; text-align:center }
    .stat-num { font-size:32px; font-weight:bold; color:#1a2b4a }
    .stat-label { font-size:12px; color:#666; text-transform:uppercase; letter-spacing:1px; margin-top:4px }
    .actions { margin-top:32px; display:flex; gap:12px }
    .btn { background:#1a2b4a; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:14px }
    .btn.secondary { background:#fff; color:#1a2b4a; border:1px solid #1a2b4a }
    .notice { padding:16px 20px; border-radius:6px; margin-bottom:24px }
    .notice.dry { background:#fef5e7; border-left:4px solid #f39c12 }
    .notice.live { background:#e8f8ec; border-left:4px solid #27ae60 }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="/admin/import" class="back">← Run another import</a>
    <h1>Import Result ${modeBadge}</h1>
    <p style="color:#666;font-size:14px">Source: <code>${source}</code></p>

    <div class="notice ${isDryRun ? "dry" : "live"}">
      ${
        isDryRun
          ? `<strong>This was a dry run.</strong> No data was written. Review the results below — if everything looks good, run again with dry-run unchecked.`
          : `<strong>Live import complete.</strong> ${stats.created} agents created in the production database. The campaign engine will pick them up on the next run.`
      }
    </div>

    <div class="card">
      <div class="grid">
        <div class="stat"><div class="stat-num">${stats.total}</div><div class="stat-label">Total Rows</div></div>
        <div class="stat"><div class="stat-num" style="color:#27ae60">${stats.created}</div><div class="stat-label">${isDryRun ? "Would Create" : "Created"}</div></div>
        <div class="stat"><div class="stat-num" style="color:#f39c12">${stats.skippedDuplicate}</div><div class="stat-label">Duplicates</div></div>
        <div class="stat"><div class="stat-num">${stats.skippedNoEmail}</div><div class="stat-label">No Email</div></div>
        <div class="stat"><div class="stat-num">${stats.skippedBadEmail}</div><div class="stat-label">Bad Email</div></div>
        <div class="stat"><div class="stat-num" style="color:${stats.errors ? "#c33" : "#27ae60"}">${stats.errors}</div><div class="stat-label">Errors</div></div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin-top:0">Name Extraction Quality</h3>
      <div class="grid">
        <div class="stat"><div class="stat-num" style="color:#27ae60">${stats.nameHighConfidence}</div><div class="stat-label">High Confidence</div></div>
        <div class="stat"><div class="stat-num" style="color:#f39c12">${stats.nameMediumConfidence}</div><div class="stat-label">Medium Confidence</div></div>
        <div class="stat"><div class="stat-num" style="color:#7f8c8d">${stats.nameNoMatch}</div><div class="stat-label">Generic / No Match</div></div>
      </div>
      <p style="color:#666;font-size:13px;margin:0">${stats.nameHighConfidence + stats.nameMediumConfidence} of ${stats.total} (${Math.round(((stats.nameHighConfidence + stats.nameMediumConfidence) / Math.max(stats.total, 1)) * 100)}%) will be greeted by first name. The rest get a generic opener.</p>
    </div>

    <div class="card">
      ${goodSamples}
      ${genericSamples}
      ${errorSamples}
    </div>

    <div class="actions">
      <a href="/admin/import" class="btn">Run Another Import</a>
      <a href="/admin" class="btn secondary">Back to Admin</a>
    </div>
  </div>
</body>
</html>`;
}

module.exports = router;
