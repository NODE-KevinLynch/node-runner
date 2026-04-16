const { Resend } = require("resend");

const PHASE_VOICE = {
  ACTIVE_PIPELINE: {
    subject: "Your momentum is building",
    message:
      "You are actively moving leads through your pipeline. Keep engaging your prospects daily.",
  },
  COACHING: {
    subject: "You have unlocked Coaching support",
    message:
      "Your engagement has earned you dedicated coaching. A session is being prepared for you.",
  },
  CONVERTED: {
    subject: "Congratulations - you have converted",
    message:
      "Outstanding work. Your consistency has paid off. Let us build on this momentum.",
  },
  STAGNANT: {
    subject: "We miss you - let us re-engage",
    message:
      "It has been a while. Your pipeline is waiting. One small action today can restart your momentum.",
  },
};

function getEnv(name, fallback = "") {
  return (process.env[name] || fallback).trim();
}

function parseAllowlist(value) {
  return value
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

function isAllowedRecipient(to) {
  const allowlist = parseAllowlist(getEnv("EMAIL_ALLOWLIST", ""));
  if (!allowlist.length) return false;
  return allowlist.includes(
    String(to || "")
      .trim()
      .toLowerCase(),
  );
}

function getVoice(phase) {
  return (
    PHASE_VOICE[phase] || {
      subject: "Update from your coaching system",
      message: "You have a new update.",
    }
  );
}

async function sendMockEmail({ to, phase, extra, subject, message }) {
  console.log("");
  console.log("==================================================");
  console.log("  NOTIFICATION SERVICE - MOCK MODE");
  console.log("==================================================");
  console.log("  Recipient : " + to);
  console.log("  Subject   : " + subject);
  console.log("  Phase     : " + phase);
  console.log("  Message   : " + message);
  if (extra.from_phase)
    console.log("  Promoted  : " + extra.from_phase + " -> " + phase);
  if (extra.days_inactive)
    console.log("  Inactive  : " + extra.days_inactive + " days");
  console.log("==================================================");
  console.log("");
  return {
    sent: true,
    mode: "mock",
    to,
    phase,
    subject,
  };
}

async function sendLiveEmail({ to, subject, message, html }) {
  const apiKey = getEnv("RESEND_API_KEY");
  const from = getEnv("EMAIL_FROM");
  if (!apiKey || apiKey === "REDACTED") {
    throw new Error("RESEND_API_KEY is missing or placeholder");
  }
  if (!from || from === "hello@yourdomain.com") {
    throw new Error("EMAIL_FROM is missing or placeholder");
  }
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject,
    ...(html ? { html } : { text: message }),
  });
  return {
    sent: true,
    mode: "live",
    to,
    subject,
    provider: "resend",
    provider_result: result,
  };
}

async function sendEmail({
  to,
  phase,
  extra = {},
  subject: overrideSubject,
  html,
} = {}) {
  try {
    const mode = getEnv("EMAIL_MODE", "mock").toLowerCase();
    const voice = getVoice(phase);
    const subject = overrideSubject || voice.subject;
    const message = voice.message;

    if (!to) {
      throw new Error("Recipient email is required");
    }

    if (!isAllowedRecipient(to)) {
      console.warn(`Notification blocked: ${to} is not in EMAIL_ALLOWLIST`);
      return {
        sent: false,
        blocked: true,
        reason: "recipient_not_allowlisted",
        mode,
        to,
        phase,
      };
    }

    if (mode !== "live") {
      return await sendMockEmail({ to, phase, extra, subject, message });
    }

    return await sendLiveEmail({ to, subject, message, html });
  } catch (err) {
    console.error("Notification error (non-fatal):", err.message);
    return {
      sent: false,
      error: err.message,
    };
  }
}

module.exports = { sendEmail };
