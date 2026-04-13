const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("openclaw.db");

module.exports = db;
