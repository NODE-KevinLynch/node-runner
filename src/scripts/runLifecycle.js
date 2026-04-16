require("dotenv").config();

const db = require("../db/db");
const { sendEmail } = require("../services/notificationService");

async function runLifecycle() {
  console.log("Running lifecycle check...\n");

  const agents = db
    .prepare(
      `
      SELECT
        a.id,
        a.first_name,
        a.last_name,
        a.email,
        al.current_phase,
        al.engagement_score,
        al.status
      FROM agents a
      JOIN agent_lifecycle al ON al.agent_id = a.id
      WHERE al.status = 'active'
      `,
    )
    .all();

  for (const agent of agents) {
    let newPhase = agent.current_phase;

    if (agent.engagement_score >= 20 && agent.current_phase !== "COACHING") {
      newPhase = "COACHING";
    }

    if (newPhase !== agent.current_phase) {
      console.log(
        `Promoting ${agent.first_name} from ${agent.current_phase} → ${newPhase}`,
      );

      db.prepare(
        `
        UPDATE agent_lifecycle
        SET current_phase = ?,
            phase_entered_at = ?,
            last_sync_at = ?
        WHERE agent_id = ?
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
        extra: { from_phase: agent.current_phase },
      });
    }
  }

  console.log("\nLifecycle run complete.");
}

runLifecycle();
