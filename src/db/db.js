const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// ── Auto-create new tables if they don't exist ──
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agent_goals (
        id SERIAL PRIMARY KEY,
        agent_id TEXT NOT NULL,
        gci_goal NUMERIC DEFAULT 0,
        transaction_goal INTEGER DEFAULT 0,
        avg_commission NUMERIC DEFAULT 10000,
        close_rate NUMERIC DEFAULT 0.5,
        appt_conversion_rate NUMERIC DEFAULT 0.1,
        goal_year INTEGER DEFAULT 2026,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(agent_id, goal_year)
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS daily_scorecard (
        id SERIAL PRIMARY KEY,
        agent_id TEXT NOT NULL,
        log_date DATE NOT NULL DEFAULT CURRENT_DATE,
        calls INTEGER DEFAULT 0,
        contacts INTEGER DEFAULT 0,
        appt_set INTEGER DEFAULT 0,
        appt_held INTEGER DEFAULT 0,
        list_taken INTEGER DEFAULT 0,
        list_sold INTEGER DEFAULT 0,
        commitments_json TEXT,
        points_earned INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(agent_id, log_date)
      );
    `);
    console.log("✓ agent_goals + daily_scorecard tables ready");
  } catch (err) {
    console.error("Table auto-create error:", err.message);
  }
})();

module.exports = {
  query: (text, params) => pool.query(text, params),

  prepare: (text) => ({
    get: async (...params) => {
      const res = await pool.query(text, params);
      return res.rows[0] || null;
    },
    all: async (...params) => {
      const res = await pool.query(text, params);
      return res.rows;
    },
    run: async (...params) => {
      return await pool.query(text, params);
    },
  }),

  close: () => pool.end(),
};
