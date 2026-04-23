// src/services/dynamicCoachingEmail.js
// Dynamic coaching emails — behavior-aware, data-driven, personalized daily
// Replaces the static 12-email coaching_active cycle
// Queries live data per agent and adapts tone based on engagement behavior

const db = require("../db/db");

const SIGNATURE = `
<br><br>
<p style="margin-bottom:8px">Warm regards,</p>
<table cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:14px;color:#222;line-height:1.6">
  <tr><td><strong>Kevin Lynch</strong></td></tr>
  <tr><td>Performance Architect</td></tr>
  <tr><td>National Coach | Sutton Group Canada</td></tr>
  <tr><td>kevinlynch.ca</td></tr>
</table>
`;

function wrapHtml(body) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Georgia,serif;font-size:15px;color:#222;line-height:1.7;max-width:600px;margin:0 auto;padding:24px">
  ${body}
  ${SIGNATURE}
</body>
</html>`;
}

function portalButton(portalUrl) {
  if (!portalUrl) return "";
  return `<div style="text-align:center;margin:24px 0"><a href="${portalUrl}" style="display:inline-block;padding:14px 32px;background:#1a2b4a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Open My Co.Pilot Portal</a></div>`;
}

function bookingBlock() {
  return `<p style="margin-top:20px">Want to go deeper? <a href="https://calendar.app.google/Mvs8PimcWXHYQjY17" style="color:#1a0dab;font-weight:bold">Book a free 30-minute strategy session</a> and we will look at your numbers together.</p>`;
}

// ── Determine behavior tone ─────────────────────────────────────────────────
// Returns: "celebration" | "momentum" | "encouragement" | "nudge" | "wakeup" | "welcome"
function determineTone(step, daysDark) {
  if (step <= 1) return "welcome";
  if (daysDark <= 0) return "celebration";   // active today or yesterday
  if (daysDark === 1) return "momentum";     // 1 day since last activity
  if (daysDark === 2) return "encouragement"; // 2 days dark
  if (daysDark <= 4) return "nudge";         // 3-4 days dark
  return "wakeup";                           // 5+ days dark
}

// ── Subject lines per tone ──────────────────────────────────────────────────
const SUBJECT_POOLS = {
  welcome: [
    "Welcome to Co.Pilot — your coaching portal is live",
  ],
  celebration: [
    "You showed up — and it is showing",
    "Your momentum is real — here is today's focus",
    "Consistency unlocked — keep this streak alive",
    "You are in the zone — do not let up",
    "Active and accountable — this is how winners operate",
  ],
  momentum: [
    "Keep it rolling — here is today's play",
    "You were in the portal yesterday — let us build on that",
    "Good rhythm — here is your next move",
    "One more day of showing up changes everything",
    "Your daily focus — locked and loaded",
  ],
  encouragement: [
    "Quick check-in — your portal is waiting",
    "Two days — time to get back on track",
    "Your coaching directive has not changed — but your day can",
    "A quick win today resets everything",
    "Miss a day? Fine. Miss two? Let us fix that now",
  ],
  nudge: [
    "Your pipeline does not take days off — neither should you",
    "Three days dark — let us talk about that",
    "Your scorecard is empty — what happened?",
    "The agents who win are the ones who show up even when they do not feel like it",
    "Silence is expensive in real estate — log in today",
  ],
  wakeup: [
    "We need to talk about your activity levels",
    "Your portal has been dark for over a week — here is the truth",
    "The gap between where you are and where you want to be is growing",
    "This is the email most agents ignore — the ones who read it change",
    "Your coaching plan is ready. You are the missing piece.",
  ],
};

function pickSubject(tone, step) {
  const pool = SUBJECT_POOLS[tone] || SUBJECT_POOLS.encouragement;
  const index = (step - 1) % pool.length;
  return pool[index];
}

// ── FORD / Dream Board check ────────────────────────────────────────────────
function isFordDay() {
  const day = new Date().getDate();
  return day === 1 || day === 15;
}

function fordBlock(firstName) {
  return `
<div style="background:#f8f6f0;border-left:4px solid #1a2b4a;padding:16px 20px;margin:20px 0;border-radius:4px">
  <p style="margin:0 0 8px;font-weight:bold;color:#1a2b4a">Vision Check — Your Dream Board Moment</p>
  <p style="margin:0">${firstName}, take 60 seconds right now. Close your eyes. Picture the life you are building — the income, the freedom, the family moments, the vacations, the version of yourself that made it happen. That person does not skip days. That person shows up. Be that person today.</p>
</div>`;
}

// ── Build the dynamic email ─────────────────────────────────────────────────
async function getDynamicCoachingEmail(agentId, step, portalUrl) {
  // ── Load agent data ────────────────────────────────────────────────────
  const agent = await db.prepare(`
    SELECT a.name, a.last_name, a.email,
           al.engagement_score, al.last_engaged_at, al.stage, al.phase_entered_at
    FROM agents a
    LEFT JOIN agent_lifecycle al ON al.agent_id = a.id
    WHERE a.id = $1
  `).get(agentId);

  if (!agent) return null;

  const firstName = agent.name || "there";

  // ── Load coaching data ─────────────────────────────────────────────────
  const coaching = await db.prepare(`
    SELECT the_truth, the_strategy, rpm_plan, primary_constraint,
           coaching_directive, quote_of_the_day
    FROM coaching_outputs
    WHERE agent_id = $1
    ORDER BY created_at DESC LIMIT 1
  `).get(agentId);

  // ── Load diagnosis ─────────────────────────────────────────────────────
  const diagnosis = await db.prepare(`
    SELECT bottleneck, profile
    FROM diagnoses
    WHERE agent_id = $1
    ORDER BY created_at DESC LIMIT 1
  `).get(agentId);

  // ── Load goals ─────────────────────────────────────────────────────────
  const goals = await db.prepare(`
    SELECT gci_goal, transaction_goal
    FROM agent_goals
    WHERE agent_id = $1
  `).get(agentId);

  // ── Load onboarding signals (for welcome email) ────────────────────────
  const onboarding = await db.prepare(`
    SELECT primary_challenge, has_business_plan, has_accountability,
           prospecting_hours, has_listing_pres, repeat_client_pct,
           tracks_activities, has_morning_routine, units_2024, gci_2024
    FROM business_onboarding
    WHERE agent_id = $1
  `).get(agentId);

  // ── Calculate days dark ────────────────────────────────────────────────
  let daysDark = 3; // default if no engagement data
  if (agent.last_engaged_at) {
    daysDark = Math.floor((Date.now() - new Date(agent.last_engaged_at).getTime()) / 86400000);
  }

  // ── Determine tone ─────────────────────────────────────────────────────
  const tone = determineTone(step, daysDark);
  const subject = pickSubject(tone, step);

  // ── Parse RPM plan ─────────────────────────────────────────────────────
  let rpmAction = "Complete your top 3 priority actions before noon.";
  let rpmResult = "Measurable progress this week.";
  let rpmPurpose = "So your business moves forward by design, not by chance.";
  if (coaching?.rpm_plan) {
    try {
      const rpm = JSON.parse(coaching.rpm_plan);
      rpmAction = rpm.action || rpm.massive_action || rpmAction;
      rpmResult = rpm.result || rpmResult;
      rpmPurpose = rpm.purpose || rpmPurpose;
    } catch (e) {
      rpmAction = coaching.rpm_plan;
    }
  }

  // ── Extract coaching pieces ────────────────────────────────────────────
  const directive = coaching?.coaching_directive || "Focus on your #1 revenue-generating activity before anything else today.";
  const bottleneck = diagnosis?.bottleneck || "business performance";
  const constraint = coaching?.primary_constraint || "Performance Foundation";
  const quote = coaching?.quote_of_the_day || "It is not what we do once in a while that shapes our lives. It is what we do consistently.";
  const truth = coaching?.the_truth || "";
  const strategy = coaching?.the_strategy || "";

  // ── Format bottleneck for display ──────────────────────────────────────
  const bottleneckDisplay = bottleneck.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  // ── Goal context ───────────────────────────────────────────────────────
  let goalLine = "";
  if (goals?.gci_goal) {
    const monthly = Math.round(goals.gci_goal / 12).toLocaleString();
    goalLine = `<p style="color:#555;font-size:13px;margin-top:4px">Your GCI target: $${Number(goals.gci_goal).toLocaleString()} / year — that is $${monthly} / month. Every day you skip widens the gap.</p>`;
  }

  // ── Build body based on tone ───────────────────────────────────────────
  let body = "";

  if (tone === "welcome") {
    // Build gaps list from onboarding signals
    const gaps = [];
    if (onboarding) {
      if (onboarding.has_business_plan === "no") gaps.push("No written business plan");
      if (onboarding.tracks_activities === "no") gaps.push("Not tracking daily activities");
      if (onboarding.has_morning_routine === "no") gaps.push("No structured morning routine");
      if (onboarding.has_listing_pres === "no") gaps.push("No listing presentation system");
      if (onboarding.has_accountability === "no") gaps.push("No accountability partner");
      if (onboarding.prospecting_hours === "0-2") gaps.push("Under 2 hours prospecting per week");
      if (onboarding.repeat_client_pct === "under-10") gaps.push("Under 10% repeat/referral business");
    }
    const gapItems = gaps.length > 0
      ? gaps.slice(0, 4).map((g, i) => `<tr><td style="padding:4px 0;color:#555;font-size:14px">${i + 1}. ${g}</td></tr>`).join("")
      : "";
    const gapSection = gapItems
      ? `<div style="margin:16px 0"><p style="font-weight:bold;color:#1a2b4a;margin-bottom:6px;font-size:14px">Key Gaps Identified:</p><table style="width:100%">${gapItems}</table></div>`
      : "";

    // Business snapshot line
    let snapshotLine = "";
    if (onboarding && (onboarding.units_2024 || onboarding.gci_2024)) {
      snapshotLine = `<p style="color:#555;font-size:13px">Last year: ${onboarding.units_2024 || 0} units / $${Number(onboarding.gci_2024 || 0).toLocaleString()} GCI</p>`;
    }

    body = `
<p>Hi ${firstName},</p>

<p>Thank you for completing your Co.Pilot assessment. Your coaching portal is now active and I have reviewed your results personally.</p>

<div style="background:#f0f4f8;border-radius:8px;padding:20px 24px;margin:20px 0">
  <p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a;font-size:16px">Your Primary Bottleneck</p>
  <p style="margin:0;font-size:18px;color:#c0392b;font-weight:bold">${bottleneckDisplay}</p>
  <p style="margin:8px 0 0;color:#555;font-size:14px">This is the single area holding your business back. Your entire coaching plan is built around fixing this.</p>
</div>

${snapshotLine}
${gapSection}

<p>Here is your personalized coaching plan:</p>

<div style="background:#f8f6f0;border-left:4px solid #1a2b4a;padding:16px 20px;margin:16px 0;border-radius:4px">
  <p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a">Your Coaching Directive</p>
  <p style="margin:0">${directive}</p>
</div>

<table style="width:100%;border-collapse:collapse;margin:12px 0">
  <tr><td style="padding:8px 12px;background:#1a2b4a;color:#fff;font-weight:bold;border-radius:4px 4px 0 0">RPM Plan — Result</td></tr>
  <tr><td style="padding:10px 12px;border:1px solid #ddd">${rpmResult}</td></tr>
  <tr><td style="padding:8px 12px;background:#1a2b4a;color:#fff;font-weight:bold">Purpose</td></tr>
  <tr><td style="padding:10px 12px;border:1px solid #ddd">${rpmPurpose}</td></tr>
  <tr><td style="padding:8px 12px;background:#1a2b4a;color:#fff;font-weight:bold">Massive Action</td></tr>
  <tr><td style="padding:10px 12px;border:1px solid #ddd;border-radius:0 0 4px 4px">${rpmAction}</td></tr>
</table>

${goalLine}

<p><strong>Your first week challenge:</strong> Log in, review your coaching directive, and complete your daily scorecard at least 3 times. That is it. Three days. Start building the habit.</p>

${portalButton(portalUrl)}

<p>Let us get to work.</p>`;
  }

  else if (tone === "celebration") {
    body = `
<p>Hi ${firstName},</p>
<p>You have been showing up — and I see it. Your engagement score is <strong>${agent.engagement_score || 0}</strong> and climbing. That is not luck. That is discipline.</p>
<p>Today's focus stays the same because it is working:</p>
<div style="background:#f0f4f8;border-radius:8px;padding:16px 20px;margin:20px 0">
  <p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a">Today's Directive</p>
  <p style="margin:0">${directive}</p>
</div>
<p>Your bottleneck is <strong>${bottleneckDisplay}</strong>. Every day you show up and execute against it, the gap closes. Keep going.</p>
<div style="background:#f8f6f0;border-left:4px solid #1a2b4a;padding:12px 16px;margin:16px 0;border-radius:4px">
  <p style="margin:0;font-style:italic">"${quote}"</p>
</div>
${goalLine}
${portalButton(portalUrl)}`;
  }

  else if (tone === "momentum") {
    body = `
<p>Hi ${firstName},</p>
<p>Good — you were active recently. That rhythm matters more than any single action you take.</p>
<p>Here is your play for today:</p>
<div style="background:#f0f4f8;border-radius:8px;padding:16px 20px;margin:20px 0">
  <p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a">Today's Directive</p>
  <p style="margin:0">${directive}</p>
</div>
<p>Your RPM for the week:</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0">
  <tr><td style="padding:8px 12px;background:#1a2b4a;color:#fff;font-weight:bold;border-radius:4px 4px 0 0">Result</td></tr>
  <tr><td style="padding:10px 12px;border:1px solid #ddd">${rpmResult}</td></tr>
  <tr><td style="padding:8px 12px;background:#1a2b4a;color:#fff;font-weight:bold">Purpose</td></tr>
  <tr><td style="padding:10px 12px;border:1px solid #ddd">${rpmPurpose}</td></tr>
  <tr><td style="padding:8px 12px;background:#1a2b4a;color:#fff;font-weight:bold">Massive Action</td></tr>
  <tr><td style="padding:10px 12px;border:1px solid #ddd;border-radius:0 0 4px 4px">${rpmAction}</td></tr>
</table>
${goalLine}
${portalButton(portalUrl)}`;
  }

  else if (tone === "encouragement") {
    body = `
<p>Hi ${firstName},</p>
<p>It has been a couple of days since you logged in. No judgment — life happens. But your business does not pause when you do.</p>
<p>Here is what I need from you today — just one thing:</p>
<div style="background:#f0f4f8;border-radius:8px;padding:16px 20px;margin:20px 0">
  <p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a">Your One Thing Today</p>
  <p style="margin:0">${directive}</p>
</div>
<p>Your bottleneck is still <strong>${bottleneckDisplay}</strong>. That does not fix itself. But 15 minutes of focused action today puts you back on track.</p>
<p>Open your portal. Log one scorecard entry. That is the win for today.</p>
${goalLine}
${portalButton(portalUrl)}`;
  }

  else if (tone === "nudge") {
    body = `
<p>${firstName},</p>
<p>It has been ${daysDark} days since your last portal activity. I am going to be direct with you because that is what a coach does.</p>
<p>Your bottleneck — <strong>${bottleneckDisplay}</strong> — is not going to fix itself. The agents who break through are not the ones with the best market or the most leads. They are the ones who show up every day, even when it is hard.</p>
<div style="background:#fff3f3;border-left:4px solid #c0392b;padding:16px 20px;margin:20px 0;border-radius:4px">
  <p style="margin:0 0 6px;font-weight:bold;color:#c0392b">Your Directive — Unchanged and Waiting</p>
  <p style="margin:0">${directive}</p>
</div>
<p>I built this plan for you because your assessment told me exactly where you are stuck. But the plan only works if you do.</p>
${goalLine}
<p>Open your portal. Right now. Not later. Now.</p>
${portalButton(portalUrl)}`;
  }

  else if (tone === "wakeup") {
    body = `
<p>${firstName},</p>
<p>Your portal has been dark for ${daysDark} days. Let me be honest with you.</p>
${truth ? `<div style="background:#f8f6f0;border-left:4px solid #1a2b4a;padding:16px 20px;margin:20px 0;border-radius:4px"><p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a">The Truth</p><p style="margin:0">${truth.substring(0, 300)}${truth.length > 300 ? "..." : ""}</p></div>` : ""}
<p>Your bottleneck is <strong>${bottleneckDisplay}</strong>. Your coaching directive is clear. Your RPM plan is built. Everything is ready — except you.</p>
<p>I am not writing this to make you feel bad. I am writing it because I have seen what happens when agents disengage at this stage. The gap between where they are and where they want to be grows wider every week.</p>
<div style="background:#f0f4f8;border-radius:8px;padding:16px 20px;margin:20px 0">
  <p style="margin:0 0 6px;font-weight:bold;color:#1a2b4a">Your Directive — Still Waiting</p>
  <p style="margin:0">${directive}</p>
</div>
${goalLine}
<p>You filled out the assessment because you wanted something to change. This is the system that changes it. But you have to show up.</p>
<p><strong>Log in today. Just once. Let us restart.</strong></p>
${portalButton(portalUrl)}`;
  }

  // ── Add FORD block on the 1st and 15th ─────────────────────────────────
  if (isFordDay() && tone !== "welcome") {
    body += fordBlock(firstName);
  }

  // ── Add booking link after step 8 ──────────────────────────────────────
  if (step >= 8) {
    body += bookingBlock();
  }

  const html = wrapHtml(body);

  return {
    subject,
    html,
    ctaUrl: portalUrl || "https://node-runner.onrender.com/assessment.html",
    campaignType: "coaching_active",
    campaignStep: step,
    tone,
    daysDark,
  };
}

module.exports = { getDynamicCoachingEmail };
