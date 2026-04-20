/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MIGRATION: Add coaching intelligence columns to business_onboarding
 * Run in Render Shell: node src/scripts/addCoachingColumns.js
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const db = require("../db/db");

async function migrate() {
  const columns = [
    "has_business_plan TEXT DEFAULT ''",
    "has_accountability TEXT DEFAULT ''",
    "prospecting_hours TEXT DEFAULT ''",
    "avg_dom TEXT DEFAULT ''",
    "has_listing_pres TEXT DEFAULT ''",
    "repeat_client_pct TEXT DEFAULT ''",
    "tracks_activities TEXT DEFAULT ''",
    "has_morning_routine TEXT DEFAULT ''",
  ];

  console.log("── Adding coaching intelligence columns to business_onboarding...");
  for (const col of columns) {
    const name = col.split(" ")[0];
    try {
      await db.query(`ALTER TABLE business_onboarding ADD COLUMN IF NOT EXISTS ${col}`);
      console.log("   ✓ " + name);
    } catch (err) {
      console.log("   ⚠ " + name + " — " + err.message);
    }
  }

  // Also remove columns we no longer use
  console.log("── Removing deprecated columns...");
  const dropCols = ["lead_volume", "lead_source", "has_crm", "crm_name", "monthly_spend"];
  for (const col of dropCols) {
    try {
      await db.query(`ALTER TABLE business_onboarding DROP COLUMN IF EXISTS ${col}`);
      console.log("   ✓ dropped " + col);
    } catch (err) {
      console.log("   ⚠ " + col + " — " + err.message);
    }
  }

  console.log("\n══ Migration complete ══");
  await db.close();
  process.exit(0);
}

migrate().catch(err => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
