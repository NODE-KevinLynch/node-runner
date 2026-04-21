const db = require("../db/db");
const { nowISO } = require("../utils/time");

const engagementRepo = {
  trackActivity(agentId, points = 1) {
    const now = nowISO();
    const stmt = db.prepare(`
      UPDATE agent_lifecycle
      SET engagement_score = engagement_score + $1,
          last_engaged_at = $2
      WHERE agent_id = $3
    `);

    return stmt.run(points, now, agentId);
  },

  getEngagement(agentId) {
    const stmt = db.prepare(`
      SELECT engagement_score, last_engaged_at
      FROM agent_lifecycle
      WHERE agent_id = $1
    `);

    return stmt.get(agentId);
  },
};

module.exports = engagementRepo;
module.exports = engagementRepo;
