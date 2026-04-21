const db = require("../db/db");

async function logError(source, message, stack) {
  try {
    await db.prepare(
      "INSERT INTO error_log (source, message, stack, created_at) VALUES ($1, $2, $3, NOW())"
    ).run(source, message, stack || null);
  } catch (e) {
    console.error("Failed to log error to DB:", e.message);
  }
  console.error(`[ERROR] ${source}: ${message}`);
}

module.exports = { logError };
