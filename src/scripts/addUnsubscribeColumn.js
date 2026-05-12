// src/scripts/addUnsubscribeColumn.js
// One-time migration: adds `unsubscribed_at` column to the agents table.
// Safe to run multiple times — uses IF NOT EXISTS.
//
// Run from Replit Shell with:
//   node src/scripts/addUnsubscribeColumn.js

const db = require("../db/db");

(async () => {
  try {
    console.log("Adding unsubscribed_at column to agents table...");

    await db
      .prepare(
        `ALTER TABLE agents
         ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP DEFAULT NULL`,
      )
      .run();

    console.log("✓ Column added (or already existed).");

    // Verify
    const result = await db
      .prepare(
        `SELECT column_name FROM information_schema.columns
         WHERE table_name = 'agents' AND column_name = 'unsubscribed_at'`,
      )
      .get();

    if (result) {
      console.log("✓ Verified: unsubscribed_at column exists on agents table.");
    } else {
      console.error("✗ Column not found after migration. Check the database.");
      process.exit(1);
    }

    console.log("Migration complete.");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
})();
