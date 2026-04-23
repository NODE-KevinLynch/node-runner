// src/services/postAnalysisCampaign.js
// 3-email sequence for agents who completed the Agent Analysis
// Goal: move them to Coaching App and Sutton Group
// Uses real analysis data from assessments table

const db = require("../db/db");

const SIGNATURE = `
<br><br>
<p style="margin-bottom:8px">Warm regards,</p>
<table cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:14px;color:#222;line-height:1.6">
  <tr><td><strong>Kevin Lynch</strong></td></tr>
  <tr><td>Performance Architect</td></tr>
  <tr><td>National Coach | Sutton Group Canada</td></tr>
  <tr><td><a href="https://calendar.app.google/Mvs8PimcWXHYQjY17" style="color:#1a0dab">Book a Strategy Session</a></td></tr>
  <tr><td>kevinlynch.ca</td></tr>
  <tr><td>&nbsp;</td></tr>
  <tr><td><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Get Your Free 60 Second Business Strategy Analysis</a></td></tr>
  <tr><td><em style="color:#555">See Your Biggest Gaps, Opportunities, and Money You Are Leaving On The Table</em></td></tr>
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

function interpretAnalysis(assessment) {
  if (!assessment) {
    return {
      truth: "your analysis revealed some clear patterns in your business",
      gap: "lead conversion and pipeline consistency",
      opportunity: "a structured coaching plan",
    };
  }

  let scores = {};

  try {
    scores = JSON.parse(assessment.score_json || "{}");
  } catch (e) {}

  const scoreMap = {
    lead_conversion: "lead conversion",
    pipeline_discipline: "pipeline discipline",
    listing_strategy: "listing strategy",
    follow_up_consistency: "follow-up consistency",
    mindset_resilience: "mindset and resilience",
    business_planning: "business planning",
  };

  let lowestKey = null;
  let lowestVal = Infinity;

  for (const [key, val] of Object.entries(scores)) {
    const num = parseFloat(val);
    if (!isNaN(num) && num < lowestVal) {
      lowestVal = num;
      lowestKey = key;
    }
  }

  const gapLabel = lowestKey
    ? scoreMap[lowestKey] || lowestKey.replace(/_/g, " ")
    : "pipeline consistency";
  const scoreDisplay =
    lowestVal !== Infinity
      ? ` (your score: ${Math.round(lowestVal * 100)}%)`
      : "";

  return {
    truth: `your analysis identified ${gapLabel}${scoreDisplay} as your primary growth constraint`,
    gap: gapLabel,
    opportunity:
      "a personalized coaching roadmap built around your specific numbers",
  };
}

function buildEmails(firstName, insight) {
  return {
    1: {
      subject: `${firstName}, I reviewed your analysis`,
      body: wrapHtml(`
        <p>${firstName},</p>
        <p>I took a look at your Agent Analysis results and I want to be direct with you.</p>
        <p>The data shows that ${insight.truth}.</p>
        <p>This is not a character flaw. It is not a talent issue. It is a systems issue — and systems can be fixed.</p>
        <p>Most agents in your position lose somewhere between 20 and 40 percent of their potential income every year because of this exact gap. Not because they are not working hard. Because they are working hard in the wrong direction.</p>
        <p>I have built a coaching program specifically designed to close this gap — fast, with a clear roadmap and real accountability.</p>
        <p>The next step is a strategy session where we look at your numbers together and build a 90-day plan.</p>
        <p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Start your free coaching portal here.</a></p>
        <p>No pressure. Just clarity.</p>
      `),
    },
    2: {
      subject: `The roadmap for your ${insight.gap}`,
      body: wrapHtml(`
        <p>${firstName},</p>
        <p>I want to follow up on what your analysis revealed.</p>
        <p>When ${insight.truth}, the fix is not to work harder. The fix is a specific sequence of actions — in the right order, at the right time.</p>
        <p>I have helped agents with this exact profile add six figures to their business within 12 months. Not by doing more. By doing the right things consistently.</p>
        <p>You are capable of significantly more than your current numbers show. The gap between where you are and where you want to be is not as wide as it feels. It just requires ${insight.opportunity}.</p>
        <p>That is exactly what we build together in the coaching program.</p>
        <p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Activate your free coaching portal.</a></p>
      `),
    },
    3: {
      subject: `${firstName}, this is the moment most agents walk away from`,
      body: wrapHtml(`
        <p>${firstName},</p>
        <p>I am going to be completely honest with you.</p>
        <p>Most agents who complete the analysis and see their results do one of two things.</p>
        <p>Some of them book a session, get their roadmap, and start moving. Within 90 days they are operating differently — more focused, more confident, more consistent.</p>
        <p>Others nod, feel a moment of clarity, and then go back to exactly what they were doing. A year later, same numbers. Same frustration.</p>
        <p>The difference is not talent. It is not even effort. It is the decision to get the right support at the right time.</p>
        <p>Your analysis showed that ${insight.truth}. That is a solvable problem. I solve it with agents every week.</p>
        <p>But I cannot help you if you do not take the next step.</p>
        <p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Activate your coaching portal now.</a> It is free. It is focused. And it might be the decision that changes your year.</p>
        <p>I hope to talk soon.</p>
      `),
    },
  };
}

function getPostAnalysisEmail(agentId, firstName, step) {
  const assessment = db
    .prepare(
      "SELECT score_json, responses_json FROM assessments WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 1",
    )
    .get(agentId);

  const insight = interpretAnalysis(assessment);
  const emails = buildEmails(firstName || "there", insight);
  const email = emails[step];

  if (!email) return null;

  return {
    subject: email.subject,
    html: email.body,
    ctaUrl: "https://node-runner.onrender.com/assessment.html",
    campaignType: "post_analysis",
    campaignStep: step,
    insight,
  };
}

module.exports = { getPostAnalysisEmail, interpretAnalysis };
