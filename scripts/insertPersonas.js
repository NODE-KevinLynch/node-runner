const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("/home/runner/workspace/openclaw.db");

const ia = db.prepare(
  "INSERT OR IGNORE INTO agents (id,first_name,last_name,email,phone,source,created_at) VALUES (?,?,?,?,?,?,datetime('now'))",
);
const il = db.prepare(
  "INSERT OR IGNORE INTO agent_lifecycle (agent_id,current_phase,engagement_score,campaign_state,status,phase_entered_at,last_engaged_at) VALUES (?,?,?,?,?,datetime('now'),datetime('now'))",
);
const iv = db.prepare(
  "INSERT OR IGNORE INTO assessments (id,agent_id,responses_json,score_json,created_at) VALUES (?,?,?,?,datetime('now'))",
);
const id2 = db.prepare(
  "INSERT OR IGNORE INTO diagnoses (id,agent_id,assessment_id,primary_bottleneck,campaign_id,confidence_score,created_at) VALUES (?,?,?,?,?,?,datetime('now'))",
);

ia.run(
  "agent_marcus_jordan_demo",
  "Marcus",
  "Jordan",
  "marcus.jordan@kevinlynch.ca",
  "604-555-0101",
  "Sutton Demo",
);
ia.run(
  "agent_sarah_miller_demo",
  "Sarah",
  "Miller",
  "sarah.miller@kevinlynch.ca",
  "604-555-0102",
  "Sutton Demo",
);
ia.run(
  "agent_david_chen_demo",
  "David",
  "Chen",
  "david.chen@kevinlynch.ca",
  "604-555-0103",
  "Sutton Demo",
);

il.run("agent_marcus_jordan_demo", "COACHING", 85, "post_analysis", "active");
il.run(
  "agent_sarah_miller_demo",
  "ACTIVE_PIPELINE",
  92,
  "post_analysis",
  "active",
);
il.run("agent_david_chen_demo", "FOUNDATION", 35, "post_analysis", "active");

iv.run(
  "assess_marcus_demo",
  "agent_marcus_jordan_demo",
  JSON.stringify({
    lead_flow: "consistent",
    follow_up: "strong",
    database_size: "large",
    phone_comfort: "high",
    business_model: "solo",
    goal_vs_schedule: "aligned",
    agent_style: "relationship",
  }),
  JSON.stringify({
    lead_engine: 7,
    foundation: 8,
    pipeline_repair: 8,
    conversion: 7,
  }),
);

iv.run(
  "assess_sarah_demo",
  "agent_sarah_miller_demo",
  JSON.stringify({
    lead_flow: "inconsistent",
    follow_up: "weak",
    database_size: "medium",
    phone_comfort: "high",
    business_model: "solo",
    goal_vs_schedule: "gap",
    agent_style: "transactional",
  }),
  JSON.stringify({
    lead_engine: 9,
    foundation: 6,
    pipeline_repair: 3,
    conversion: 8,
  }),
);

iv.run(
  "assess_david_demo",
  "agent_david_chen_demo",
  JSON.stringify({
    lead_flow: "inconsistent",
    follow_up: "weak",
    database_size: "small",
    phone_comfort: "low",
    business_model: "solo",
    goal_vs_schedule: "severe_gap",
    agent_style: "relationship",
  }),
  JSON.stringify({
    lead_engine: 3,
    foundation: 2,
    pipeline_repair: 2,
    conversion: 2,
  }),
);

id2.run(
  "diag_marcus_demo",
  "agent_marcus_jordan_demo",
  "assess_marcus_demo",
  "database_size",
  "SPHERE_ACTIVATION",
  0.88,
);
id2.run(
  "diag_sarah_demo",
  "agent_sarah_miller_demo",
  "assess_sarah_demo",
  "pipeline_repair",
  "PIPELINE_REPAIR",
  0.94,
);
id2.run(
  "diag_david_demo",
  "agent_david_chen_demo",
  "assess_david_demo",
  "lead_engine",
  "SOLO_LEAD_ENGINE",
  0.91,
);

console.log("Done — Marcus, Sarah, David inserted");
