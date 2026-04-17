const db = require("../db/db");

async function run() {
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS coaching_outputs (
        id TEXT PRIMARY KEY,
        agent_id TEXT NOT NULL,
        phase TEXT NOT NULL,
        focus TEXT NOT NULL,
        top_action TEXT NOT NULL,
        daily_ritual TEXT NOT NULL,
        weekly_target TEXT NOT NULL,
        supporting_actions_json TEXT,
        message TEXT NOT NULL,
        character_type TEXT,
        version TEXT NOT NULL,
        generated_at TEXT NOT NULL
      )
    `).run();
    console.log("coaching_outputs table created");

    await db.prepare(`
      CREATE TABLE IF NOT EXISTS assessments (
        id TEXT PRIMARY KEY,
        agent_id TEXT NOT NULL,
        responses_json TEXT NOT NULL,
        score_json TEXT,
        created_at TEXT NOT NULL
      )
    `).run();
    console.log("assessments table created");

    await db.close();
    console.log("done");
  } catch (err) {
    console.error("error:", err.message);
  }
}

run();
