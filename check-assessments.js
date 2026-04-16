const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('openclaw.db');
const rows = db.prepare(`
  SELECT a.id, a.agent_id, a.score_json, a.responses_json,
         d.primary_bottleneck, d.campaign_id, d.confidence_score
  FROM assessments a
  LEFT JOIN diagnoses d ON d.assessment_id = a.id
  LIMIT 3
`).all();
rows.forEach(r => console.log(JSON.stringify(r, null, 2)));
