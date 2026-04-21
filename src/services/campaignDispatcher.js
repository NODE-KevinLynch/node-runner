// src/services/campaignDispatcher.js
// Routes each agent to the correct campaign and sends/logs the email
// Order: send → log → mirror FUB
// Firewall: failures at any stage are caught and never crash the engine

const db = require("../db/db");
const { sendEmail } = require("./notificationService");
const { determineCampaignState } = require("./campaignStateService");
const { getPreActivationEmail } = require("./preActivationCampaign");
const { getPostAnalysisEmail } = require("./postAnalysisCampaign");
const { logCampaignActivity } = require("./fubMirrorService");

function generateId() {
  return "log_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

function logSend({
  agentId,
  campaignType,
  campaignStep,
  subject,
  sendStatus,
  sendMode,
}) {
  try {
    db.prepare(
      `
      INSERT INTO campaign_send_log
        (id, agent_id, campaign_type, campaign_step, subject, send_status, send_mode, sent_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(
      generateId(),
      agentId,
      campaignType,
      campaignStep,
      subject,
      sendStatus,
      sendMode,
      new Date().toISOString(),
    );
  } catch (err) {
    console.error("Log write failed (non-fatal):", err.message);
  }
}

function advanceCampaignStep(agentId, newStep) {
  try {
    db.prepare(
      `
      UPDATE agent_lifecycle
      SET campaign_step = $1,
          campaign_last_sent_at = $2,
          last_sync_at = $3
      WHERE agent_id = $4
    `,
    ).run(newStep, new Date().toISOString(), new Date().toISOString(), agentId);
  } catch (err) {
    console.error("Step advance failed (non-fatal):", err.message);
  }
}

async function dispatch(agentId) {
  try {
    // Load agent
    const row = db
      .prepare(
        `
      SELECT a.id, a.first_name, a.last_name, a.email,
             al.campaign_state, al.campaign_step
      FROM agents a
      JOIN agent_lifecycle al ON al.agent_id = a.id
      WHERE a.id = $1
    `,
      )
      .get(agentId);

    if (!row) {
      return { success: false, reason: "agent_not_found", agentId };
    }

    if (!row.email) {
      return { success: false, reason: "no_email", agentId };
    }

    // Determine live campaign state
    const campaignState = determineCampaignState(agentId);
    const currentStep = row.campaign_step || 0;
    const nextStep = currentStep + 1;

    // Stop after step 3
    if (nextStep > 3) {
      return {
        success: false,
        reason: "sequence_complete",
        agentId,
        campaignState,
      };
    }

    // Generate the correct email
    let emailContent = null;

    if (campaignState === "pre_activation") {
      emailContent = getPreActivationEmail(nextStep);
    } else if (campaignState === "post_analysis") {
      emailContent = getPostAnalysisEmail(agentId, row.first_name, nextStep);
    } else {
      return {
        success: false,
        reason: "lifecycle_managed_separately",
        agentId,
        campaignState,
      };
    }

    if (!emailContent) {
      return {
        success: false,
        reason: "no_content_for_step",
        agentId,
        campaignState,
        nextStep,
      };
    }

    // Step 1 — Send email
    const sendResult = await sendEmail({
      to: row.email,
      phase: campaignState,
      subject: emailContent.subject,
      html: emailContent.html,
      extra: { campaignType: campaignState, campaignStep: nextStep },
    });

    const sendMode = process.env.EMAIL_MODE || "mock";
    const sendStatus = sendResult.sent
      ? "sent"
      : sendResult.blocked
        ? "blocked"
        : "failed";

    // Step 2 — Log send to SQLite (always runs)
    logSend({
      agentId,
      campaignType: campaignState,
      campaignStep: nextStep,
      subject: emailContent.subject,
      sendStatus,
      sendMode,
    });

    // Step 3 — Advance campaign step
    if (sendResult.sent || sendResult.blocked) {
      advanceCampaignStep(agentId, nextStep);
    }

    // Step 4 — Mirror to FUB (non-blocking, firewall)
    logCampaignActivity(agentId, {
      agentEmail: row.email,
      agentName: (row.first_name || "") + " " + (row.last_name || ""),
      campaignType: campaignState,
      campaignStep: nextStep,
      subject: emailContent.subject,
      sendStatus,
    }).catch((err) => {
      console.error("FUB mirror async error (non-fatal):", err.message);
    });

    return {
      success: true,
      agentId,
      campaignState,
      campaignStep: nextStep,
      subject: emailContent.subject,
      sendStatus,
      sendResult,
    };
  } catch (err) {
    console.error("Dispatcher error (non-fatal):", err.message);
    return { success: false, reason: err.message, agentId };
  }
}

module.exports = { dispatch };
