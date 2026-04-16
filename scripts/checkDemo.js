const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("./openclaw.db");

const ids = [
  "agent_marcus_jordan_demo",
  "agent_sarah_miller_demo",
  "agent_david_chen_demo",
];

ids.forEach((id) => {
  const c = db
    .prepare(
      "SELECT focus, top_action, weekly_target, message FROM coaching_outputs WHERE agent_id = ?",
    )
    .get(id);
  console.log("--- " + id + " ---");
  if (!c) {
    console.log("NO OUTPUT");
    return;
  }
  console.log("FOCUS:", c.focus);
  console.log("ACTION:", c.top_action);
  console.log("MSG:", String(c.message || "").slice(0, 200));
  console.log("");
});
