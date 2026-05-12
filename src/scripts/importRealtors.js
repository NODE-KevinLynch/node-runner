// src/scripts/importRealtors.js
// Bulk import realtors from a CSV file into Postgres
// Usage:
//   node src/scripts/importRealtors.js <csv_path> [--dry-run] [--source=cold_import]
//
// Expected CSV columns: Email, Area/Tab, Brokerage  (other columns ignored)
//
// What it does:
//   1. Parses the CSV (handles quoted fields with commas)
//   2. Extracts first name from email address where possible
//   3. Creates agents + agent_lifecycle rows in Postgres
//   4. Skips duplicates by email (safe to re-run)
//   5. Logs every row's result for review
//   6. --dry-run mode previews everything without writing

const fs = require("fs");
const path = require("path");
const db = require("../db/db");

// ── CLI arg parsing ─────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const csvPath = args.find((a) => !a.startsWith("--"));
const isDryRun = args.includes("--dry-run");
const sourceArg = args.find((a) => a.startsWith("--source="));
const source = sourceArg ? sourceArg.split("=")[1] : "cold_import";

if (!csvPath) {
  console.error(
    "Usage: node src/scripts/importRealtors.js <csv_path> [--dry-run] [--source=cold_import]",
  );
  console.error(
    "Example: node src/scripts/importRealtors.js uploads/realtors.csv --dry-run",
  );
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  console.error(`File not found: ${csvPath}`);
  process.exit(1);
}

// ── First-name extraction from email ────────────────────────────────────────
// Tries to derive a first name from the local part of an email.
// Returns { firstName, confidence } where confidence is 'high' | 'medium' | 'low' | 'none'.
//
// Strategy:
//   robert@... → Robert (high)
//   robert.smith@... → Robert (high)
//   robertsmith@... → unable to split reliably → null (low)
//   info@..., admin@..., contact@..., team@... → null (none)
//   r.smith@... → null (low — single letter)
//
// We err on the side of NOT guessing a name. Better to fall back to "Hi there"
// than to send an email greeting someone by the wrong name.

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

function extractFirstName(email) {
  if (!email || !email.includes("@"))
    return { firstName: null, confidence: "none" };

  const local = email.split("@")[0].toLowerCase();

  // Generic mailbox — no personal name
  if (GENERIC_LOCAL_PARTS.has(local)) {
    return { firstName: null, confidence: "none" };
  }

  // Try to split on common separators: dot, underscore, dash, plus
  const parts = local.split(/[._+\-]/).filter(Boolean);

  // First part is usually the first name
  let candidate = parts[0];

  // Reject if too short to be a real name
  if (!candidate || candidate.length < 2) {
    return { firstName: null, confidence: "low" };
  }

  // Reject if it's mostly numbers
  if (/^\d/.test(candidate) || /\d{3,}/.test(candidate)) {
    return { firstName: null, confidence: "low" };
  }

  // Reject if it's a generic part
  if (GENERIC_LOCAL_PARTS.has(candidate)) {
    return { firstName: null, confidence: "none" };
  }

  // Strip trailing numbers (e.g. "robert123" → "robert")
  candidate = candidate.replace(/\d+$/, "");
  if (candidate.length < 2) {
    return { firstName: null, confidence: "low" };
  }

  // Capitalize first letter
  const firstName =
    candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();

  // Confidence: high if separator was present (clear delimiter), medium otherwise
  const confidence = parts.length > 1 ? "high" : "medium";

  return { firstName, confidence };
}

// ── CSV parser (handles quoted fields with embedded commas) ─────────────────
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

// ── Agent ID generator ──────────────────────────────────────────────────────
function generateAgentId(firstName, email) {
  const namePart = (firstName || email.split("@")[0])
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .slice(0, 20);
  const timePart = Date.now().toString(36);
  const randPart = Math.random().toString(36).slice(2, 6);
  return `agent_${namePart}_${timePart}${randPart}`;
}

// ── Main import ─────────────────────────────────────────────────────────────
async function importRealtors() {
  console.log("\n=== REALTOR IMPORT SCRIPT ===");
  console.log(`CSV file:   ${csvPath}`);
  console.log(`Source:     ${source}`);
  console.log(
    `Mode:       ${isDryRun ? "DRY RUN (no writes)" : "LIVE (writing to Postgres)"}`,
  );
  console.log("");

  const content = fs.readFileSync(csvPath, "utf8");
  const { headers, rows } = parseCSV(content);

  console.log(`Detected columns: ${headers.join(", ")}`);
  console.log(`Found ${rows.length} data rows\n`);

  // Map column names flexibly — accept Email, email, EMAIL, etc.
  const colMap = {
    email: headers.find((h) => /^e?mail$/i.test(h) || h === "email"),
    region: headers.find((h) => /area|tab|region|city/i.test(h)),
    brokerage: headers.find((h) => /broker/i.test(h)),
    firstName: headers.find((h) => /first.?name/i.test(h)),
    lastName: headers.find((h) => /last.?name|surname/i.test(h)),
    phone: headers.find((h) => /phone|mobile|tel/i.test(h)),
  };

  if (!colMap.email) {
    console.error(
      "ERROR: No email column found in CSV. Expected a column named 'Email'.",
    );
    process.exit(1);
  }

  console.log("Column mapping:");
  console.log(`  email     → ${colMap.email}`);
  console.log(`  region    → ${colMap.region || "(none)"}`);
  console.log(`  brokerage → ${colMap.brokerage || "(none)"}`);
  console.log(`  firstName → ${colMap.firstName || "(derived from email)"}`);
  console.log(`  lastName  → ${colMap.lastName || "(none)"}`);
  console.log(`  phone     → ${colMap.phone || "(none)"}`);
  console.log("");

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

    // Basic email sanity check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      stats.skippedBadEmail++;
      continue;
    }

    // Derive first name
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

    // Collect samples for the preview output
    if (samples.good.length < 5 && firstName) {
      samples.good.push({ email, firstName, brokerage, region, confidence });
    }
    if (samples.generic.length < 5 && !firstName) {
      samples.generic.push({ email, brokerage, region });
    }

    // Dedup check
    try {
      const existing = await db
        .prepare("SELECT id FROM agents WHERE email = $1")
        .get(email);
      if (existing) {
        stats.skippedDuplicate++;
        continue;
      }
    } catch (err) {
      console.error(`Row ${i + 2}: dedup check failed — ${err.message}`);
      stats.errors++;
      samples.errors.push({ email, error: err.message });
      continue;
    }

    // DRY RUN — just count, don't write
    if (isDryRun) {
      stats.created++;
      continue;
    }

    // LIVE — write to Postgres
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
      console.error(`Row ${i + 2} (${email}): insert failed — ${err.message}`);
      stats.errors++;
      samples.errors.push({ email, error: err.message });
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────
  console.log("\n=== IMPORT SUMMARY ===");
  console.log(`Total rows in CSV:        ${stats.total}`);
  console.log(
    `${isDryRun ? "Would create" : "Created"}:                  ${stats.created}`,
  );
  console.log(`Skipped (duplicate):      ${stats.skippedDuplicate}`);
  console.log(`Skipped (no email):       ${stats.skippedNoEmail}`);
  console.log(`Skipped (bad email):      ${stats.skippedBadEmail}`);
  console.log(`Errors:                   ${stats.errors}`);
  console.log("");
  console.log(`Name extraction:`);
  console.log(`  High confidence:        ${stats.nameHighConfidence}`);
  console.log(`  Medium confidence:      ${stats.nameMediumConfidence}`);
  console.log(`  No name (generic):      ${stats.nameNoMatch}`);
  console.log("");

  if (samples.good.length) {
    console.log("Sample successful name extractions:");
    samples.good.forEach((s) => {
      console.log(
        `  ${s.email.padEnd(40)} → ${s.firstName} [${s.confidence}] (${s.region || "no region"})`,
      );
    });
    console.log("");
  }

  if (samples.generic.length) {
    console.log("Sample generic emails (will use 'Hi there' fallback):");
    samples.generic.forEach((s) => {
      console.log(`  ${s.email.padEnd(40)} (${s.region || "no region"})`);
    });
    console.log("");
  }

  if (samples.errors.length) {
    console.log("Sample errors:");
    samples.errors.forEach((s) => {
      console.log(`  ${s.email}: ${s.error}`);
    });
    console.log("");
  }

  if (isDryRun) {
    console.log("DRY RUN COMPLETE — nothing was written to the database.");
    console.log("To run for real, remove the --dry-run flag:");
    console.log(
      `  node src/scripts/importRealtors.js ${csvPath} --source=${source}`,
    );
  } else {
    console.log("LIVE IMPORT COMPLETE.");
    console.log(`Agents created: ${stats.created}`);
    console.log(`Open /admin to verify.`);
  }

  process.exit(0);
}

importRealtors().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
