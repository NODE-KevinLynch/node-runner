const db = require("../db/db");

async function run() {
  const agents = [
    { id: "agent_marcus_jordan_demo", type: "relationship_capital" },
    { id: "agent_jordan_demo", type: "market_authority" },
    { id: "agent_rachel_demo", type: "pipeline_discipline" },
  ];

  const subjects = {
    relationship_capital: [
      "Your sphere is your goldmine — here is how to activate it",
      "The 5 people you should call this week",
      "Why your past clients are your best lead source",
    ],
    market_authority: [
      "Own your niche — stop competing on price",
      "How to become the obvious choice in your market",
      "Your market authority blueprint for this quarter",
    ],
    pipeline_discipline: [
      "Your pipeline audit — leads that need attention now",
      "The 30-day follow-up rule that closes more deals",
      "Stop letting warm leads go cold — here is your plan",
    ],
  };

  let count = 0;
  for (const agent of agents) {
    const subs = subjects[agent.type];
    for (let day = 6; day >= 0; day--) {
      const date = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
      const sentAt = date.toISOString();
      const step = 7 - day;
      const subject = subs[step % subs.length];
      const status = day === 0 && agent.id === "agent_rachel_demo" ? "blocked" : "sent";

      await db.prepare(
        "INSERT INTO campaign_send_log (id, agent_id, campaign_type, campaign_step, subject, send_status, send_mode, sent_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
      ).run(
        `email_${agent.id}_step${step}_${Date.now()}`,
        agent.id,
        agent.type,
        step,
        subject,
        status,
        "auto",
        sentAt
      );
      count++;
    }
  }

  console.log("inserted", count, "email records");
  await db.close();
}

run().catch(e => console.error(e));
SCRIPT SCRIPT
