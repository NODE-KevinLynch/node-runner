const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "../db.json");

function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}));
  }
  return Promise.resolve();
}

function getState(fubId) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  return Promise.resolve(data[fubId] || null);
}

function upsertState(state) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  data[state.fubId] = {
    ...state,
    updated_at: new Date().toISOString(),
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  return Promise.resolve({ ok: true });
}

module.exports = { initDb, getState, upsertState };
