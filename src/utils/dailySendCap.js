// src/utils/dailySendCap.js
// Daily send cap for cold outreach (domain warmup).
//
// Why this exists: sending thousands of cold emails on day one will get
// the domain flagged as spam by Gmail/Outlook within hours. Once flagged,
// deliverability tanks for months. The ramp below is a conservative
// industry-standard schedule that gradually builds sender reputation.
//
// What counts toward the cap:
//   • Cold pre_activation emails (both cold_import and sutton_import)
// What does NOT count:
//   • post_analysis emails (transactional, opted-in)
//   • coaching_active emails (active users)
//
// Override: set BYPASS_DAILY_CAP=true in Render env to disable entirely.

const db = require("../db/db");

// Ramp schedule — weeks since launch → daily cap for cold sends
const RAMP_SCHEDULE = [
  { week: 1, dailyCap: 50 },
  { week: 2, dailyCap: 100 },
  { week: 3, dailyCap: 250 },
  { week: 4, dailyCap: 500 },
  // Week 5+ = unlimited (handled below)
];

function getLaunchDate() {
  // RAMP_LAUNCH_DATE env var — ISO 8601 string with timezone offset
  // Example: "2026-05-12T20:00:00-07:00" (May 12, 8pm Pacific)
  const raw = process.env.RAMP_LAUNCH_DATE;
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  return d;
}

/**
 * Calculate the current daily cap based on weeks since launch.
 * Returns:
 *   • { capActive: false, reason: "pre_launch" }   — launch is in the future
 *   • { capActive: false, reason: "unlimited" }    — week 5+
 *   • { capActive: false, reason: "no_launch_set" } — env var missing
 *   • { capActive: true, dailyCap: N, week: N }    — within ramp
 */
function getCurrentCap() {
  const launch = getLaunchDate();
  if (!launch) {
    return { capActive: false, reason: "no_launch_set" };
  }

  const now = new Date();
  if (now < launch) {
    return {
      capActive: false,
      reason: "pre_launch",
      launchAt: launch.toISOString(),
    };
  }

  const msSinceLaunch = now.getTime() - launch.getTime();
  const daysSinceLaunch = msSinceLaunch / 86400000;
  const week = Math.floor(daysSinceLaunch / 7) + 1; // week 1 starts at launch

  const tier = RAMP_SCHEDULE.find((r) => r.week === week);
  if (!tier) {
    return { capActive: false, reason: "unlimited", week };
  }

  return {
    capActive: true,
    dailyCap: tier.dailyCap,
    week,
    launchAt: launch.toISOString(),
  };
}

/**
 * Count cold sends already sent today (since UTC midnight).
 * Counts campaign_send_log entries with campaign_type='pre_activation'
 * AND send_status='sent' AND sent_at >= today.
 */
async function countTodaysColdSends() {
  // Use UTC midnight as the day boundary. Sticking with UTC across the
  // service is simpler than juggling timezones — the cap resets at
  // midnight UTC (5pm Pacific) which is fine for a coaching ops tool.
  const now = new Date();
  const utcMidnight = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n
       FROM campaign_send_log
       WHERE campaign_type = 'pre_activation'
         AND send_status = 'sent'
         AND sent_at >= $1`,
    )
    .get(utcMidnight.toISOString());

  return row ? Number(row.n) || 0 : 0;
}

/**
 * Check whether a cold send is allowed right now.
 * Returns:
 *   { allowed: true }                              — go ahead
 *   { allowed: false, reason, sentToday, dailyCap } — blocked
 */
async function checkColdSendAllowed() {
  if (process.env.BYPASS_DAILY_CAP === "true") {
    return { allowed: true, reason: "bypass_env_var" };
  }

  const cap = getCurrentCap();

  if (!cap.capActive) {
    // No cap → unlimited send (covers pre_launch, no_launch_set, and unlimited)
    // BUT: pre_launch means launch date is set for the future and we should
    // NOT send cold emails yet. Treat pre_launch as blocked.
    if (cap.reason === "pre_launch") {
      return {
        allowed: false,
        reason: "pre_launch",
        launchAt: cap.launchAt,
        sentToday: 0,
        dailyCap: 0,
      };
    }
    return { allowed: true, reason: cap.reason };
  }

  const sentToday = await countTodaysColdSends();

  if (sentToday >= cap.dailyCap) {
    return {
      allowed: false,
      reason: "daily_cap_reached",
      sentToday,
      dailyCap: cap.dailyCap,
      week: cap.week,
    };
  }

  return {
    allowed: true,
    sentToday,
    dailyCap: cap.dailyCap,
    week: cap.week,
    remaining: cap.dailyCap - sentToday,
  };
}

/**
 * Status snapshot for admin dashboard.
 */
async function getCapStatus() {
  const cap = getCurrentCap();
  const sentToday = await countTodaysColdSends();

  return {
    bypass: process.env.BYPASS_DAILY_CAP === "true",
    launchAt: cap.launchAt || null,
    capActive: cap.capActive,
    reason: cap.reason || null,
    week: cap.week || null,
    dailyCap: cap.dailyCap || null,
    sentToday,
    remaining:
      cap.capActive && cap.dailyCap
        ? Math.max(0, cap.dailyCap - sentToday)
        : null,
  };
}

module.exports = {
  checkColdSendAllowed,
  getCapStatus,
  getCurrentCap,
  countTodaysColdSends,
};
