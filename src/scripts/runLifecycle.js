require("dotenv").config();
const { syncEngagementToFub } = require("../services/fubMirrorService");

const db = require("../db/db");
const { sendEmail } = require("../services/notificationService");

async function runLifecycle() {
  console.log("Running lifecycle check...\n");

  const agents = db
    .prepare(
      `
      SELECT
        a.id,
        a.name AS first_name,
        a.last_name,
        a.email,
        al.stage,
        al.engagement_score,
        al.status
      FROM agents a
      JOIN agent_lifecycle al ON al.agent_id = a.id
      WHERE al.status = 'active'
      `,
    )
    .all();

  for (const agent of agents) {
    let newPhase = agent.stage;

    if (agent.engagement_score >= 20 && agent.stage !== "COACHING") {
      newPhase = "COACHING";
    }

    if (newPhase !== agent.stage) {
      console.log(
        `Promoting ${agent.first_name} from ${agent.stage} → ${newPhase}`,
      );

      db.prepare(
        `
        UPDATE agent_lifecycle
        SET stage = $1,
            phase_entered_at = $2,
            last_sync_at = $3
        WHERE agent_id = $4
        `,
      ).run(
        newPhase,
        new Date().toISOString(),
        new Date().toISOString(),
        agent.id,
      );

      await sendEmail({
        to: agent.email,
        phase: newPhase,
        extra: { from_phase: agent.stage },
      });
      try { await syncEngagementToFub(agent.id, agent.email, agent.engagement_score, newPhase); } catch(fubErr) { console.error("FUB phase sync failed (non-fatal):", fubErr.message); }
    }
  }

  console.log("\nLifecycle run complete.");
}

runLifecycle();
