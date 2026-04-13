const db = require("./db");

db.exec(`
  CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    source TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS assessments (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL,
    responses_json TEXT NOT NULL,
    score_json TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS diagnoses (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL,
    assessment_id TEXT NOT NULL,
    primary_bottleneck TEXT NOT NULL,
    campaign_id TEXT NOT NULL,
    confidence_score REAL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS agent_lifecycle (
    agent_id TEXT PRIMARY KEY,
    current_phase TEXT NOT NULL,
    phase_entered_at TEXT NOT NULL,
    last_engaged_at TEXT,
    last_sync_at TEXT NOT NULL,
    engagement_score INTEGER DEFAULT 0,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS phase_history (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL,
    from_phase TEXT,
    to_phase TEXT NOT NULL,
    changed_at TEXT NOT NULL,
    reason TEXT
  );

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
  );
`);

module.exports = db;
