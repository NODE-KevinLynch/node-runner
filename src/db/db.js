const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

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
