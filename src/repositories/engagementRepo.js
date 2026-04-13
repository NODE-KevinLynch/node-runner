const db = require("../db/db");
const { nowISO } = require("../utils/time");

const engagementRepo = {
  trackActivity(agentId, points = 1) {
    const now = nowISO();
    const stmt = db.prepare(`
      UPDATE agent_lifecycle
      SET engagement_score = engagement_score + ?,
          last_engaged_at = ?
      WHERE agent_id = ?
    `);

    return stmt.run(points, now, agentId);
  },

  getEngagement(agentId) {
    const stmt = db.prepare(`
      SELECT engagement_score, last_engaged_at
      FROM agent_lifecycle
      WHERE agent_id = ?
    `);

    return stmt.get(agentId);
  },
};

module.exports = engagementRepo;
module.exports = engagementRepo;
