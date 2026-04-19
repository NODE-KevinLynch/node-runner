/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MIGRATION: Add onboarding tables (business_onboarding + ford_goals)
 * Run once: node src/scripts/addOnboardingTables.js
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const db = require("../db/db");

async function migrate() {
  console.log("── Creating business_onboarding table...");
  await db.query(`
    CREATE TABLE IF NOT EXISTS business_onboarding (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL UNIQUE,
      units_2024 INTEGER DEFAULT 0,
      units_2023 INTEGER DEFAULT 0,
      units_2022 INTEGER DEFAULT 0,
      gci_2024 REAL DEFAULT 0,
      gci_2023 REAL DEFAULT 0,
      gci_2022 REAL DEFAULT 0,
      net_income REAL DEFAULT 0,
      has_budget TEXT DEFAULT '',
      monthly_spend REAL DEFAULT 0,
      lead_volume TEXT DEFAULT '',
      lead_source TEXT DEFAULT '',
      has_crm TEXT DEFAULT '',
      crm_name TEXT DEFAULT '',
      primary_challenge TEXT DEFAULT '',
      income_goal REAL DEFAULT 0,
      transaction_goal INTEGER DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP
    )
  `);
  console.log("   ✓ business_onboarding created");

  console.log("── Creating ford_goals table...");
  await db.query(`
    CREATE TABLE IF NOT EXISTS ford_goals (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      category TEXT NOT NULL,
      five_year TEXT DEFAULT '',
      one_year TEXT DEFAULT '',
      one_month TEXT DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP,
      UNIQUE(agent_id, category)
    )
  `);
  console.log("   ✓ ford_goals created");

  // Add brokerage and region columns to agents if they don't exist
  console.log("── Adding brokerage/region columns to agents (if missing)...");
  try {
    await db.query(`ALTER TABLE agents ADD COLUMN IF NOT EXISTS brokerage TEXT`);
    await db.query(`ALTER TABLE agents ADD COLUMN IF NOT EXISTS region TEXT`);
    await db.query(`ALTER TABLE agents ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP`);
    console.log("   ✓ agents columns updated");
  } catch (err) {
    console.log("   (columns may already exist:", err.message + ")");
  }

  console.log("\n══ Migration complete ══");
  await db.close();
  process.exit(0);
}

migrate().catch(err => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
