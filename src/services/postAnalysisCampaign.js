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

function interpretAnalysis(diagnosis) {
  const gapMap = {
    pipeline_volume: "pipeline volume and prospecting consistency",
    lead_volume: "lead generation volume",
    prospecting_consistency: "prospecting discipline",
    pipeline_leakage: "pipeline retention",
    lead_conversion: "lead conversion speed",
    digital_leads: "digital lead management",
    speed_to_lead: "speed to lead response",
    follow_up: "follow-up cadence",
    online_conversion: "online-to-offline conversion",
    low_conversion: "consultation-to-close conversion",
    relationship_deficit: "relationship capital",
    referral_quality: "referral network quality",
    database_size: "database development",
    sphere_awareness: "sphere of influence activation",
    retention: "client retention and loyalty",
    consistency_habits: "daily habit consistency",
    discipline: "professional discipline",
    tracking: "performance tracking",
    momentum: "business momentum",
    systems_design: "systems and process design",
    mindset_state: "mindset and emotional state",
    personal_vision: "personal vision and purpose",
    overwhelm: "focus and overwhelm management",
    high_stress: "stress management",
    time_management: "time and priority management",
    accountability: "accountability structure",
    cold_call_aversion: "prospecting comfort and confidence",
  };

  if (!diagnosis || !diagnosis.bottleneck) {
    return {
      truth: "your analysis revealed some clear patterns in your business",
      gap: "pipeline consistency",
      opportunity: "a structured coaching plan",
    };
  }

  const gapLabel = gapMap[diagnosis.bottleneck] || diagnosis.bottleneck.replace(/_/g, " ");
  const profileLabel = diagnosis.profile ? " Your profile: " + diagnosis.profile.replace(/_/g, " ") + "." : "";

  return {
    truth: "your analysis identified " + gapLabel + " as your primary growth constraint." + profileLabel,
    gap: gapLabel,
    opportunity: "a personalized coaching roadmap built around your specific numbers",
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
    4: {
      subject: firstName + ", the math behind your income goal",
      body: wrapHtml('<p>' + firstName + ',</p><p>Let me show you something most agents never calculate.</p><p>Your analysis showed that ' + insight.truth + '</p><p>Here is what that means in real numbers: if your goal is to earn more this year, the path is not mysterious. It is math. How many closings do you need? How many listings? How many appointments? How many conversations per day?</p><p>When you know your daily number, everything changes. You stop guessing and start engineering.</p><p>Co.Pilot by Sutton calculates this for you automatically and tracks your progress in real time.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">See your numbers here.</a></p>'),
    },
    5: {
      subject: "The 90-day pattern hiding in your business",
      body: wrapHtml('<p>' + firstName + ',</p><p>There is a pattern in real estate that most agents never see because they are too close to it.</p><p>Whatever you did or did not do 90 days ago is showing up in your results right now.</p><p>Your analysis flagged ' + insight.gap + ' as your primary constraint. That means the work you do on this one area over the next 90 days will determine your results three months from now.</p><p>Co.Pilot by Sutton gives you a daily action plan built around this exact constraint so you are never wondering what to do next.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Start your 90-day plan.</a></p>'),
    },
    6: {
      subject: firstName + ", are you tracking the right things?",
      body: wrapHtml('<p>' + firstName + ',</p><p>Here is a question that separates agents who grow from agents who plateau: do you know your numbers?</p><p>Not your GCI. Not your closing count. I mean the daily leading indicators. Calls made, contacts reached, appointments set, conversations had.</p><p>Most agents track results. Top producers track activities. Because by the time you see the results, it is too late to change them.</p><p>Your constraint is ' + insight.gap + '. Co.Pilot by Sutton includes a daily scorecard designed to keep you accountable to the specific activities that move the needle.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Get your scorecard.</a></p>'),
    },
    7: {
      subject: "What I would tell you if we were sitting across a table",
      body: wrapHtml('<p>' + firstName + ',</p><p>If we were sitting across a table right now, here is what I would say.</p><p>You are not where you want to be. You know it. Your analysis confirmed it. ' + insight.truth + '</p><p>But here is the part most people miss: that gap is not a character flaw. It is a skills gap. And skills gaps close fast when you have the right system and accountability.</p><p>The agents I work with who commit to 90 days of focused action see a measurable shift. Not because they are special. Because they stopped doing everything and started doing the right thing.</p><p>Co.Pilot by Sutton is free for 30 days. You have nothing to lose except the patterns holding you back.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Activate your Co.Pilot.</a></p>'),
    },
    8: {
      subject: firstName + ", your daily routine is your income strategy",
      body: wrapHtml('<p>' + firstName + ',</p><p>I want to challenge something you might believe.</p><p>Most agents think their income is determined by the market, their leads, or their luck. It is not. It is determined by what they do in the first two hours of every workday.</p><p>The agents who earn $300K or more have a morning routine that is non-negotiable. Prospecting first. Revenue-generating activity first. Everything else waits.</p><p>Your analysis showed ' + insight.gap + ' is your bottleneck. Co.Pilot by Sutton builds a daily ritual around fixing this with specific actions, a scorecard, and weekly tracking.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Build your morning routine.</a></p>'),
    },
    9: {
      subject: "The difference between a $100K agent and a $400K agent",
      body: wrapHtml('<p>' + firstName + ',</p><p>After years of coaching agents at every income level, I can tell you the difference between a $100K agent and a $400K agent is not what you think.</p><p>It is not hours worked. It is not market knowledge. It is not even lead volume.</p><p>It is consistency. The $400K agents do the same revenue-producing activities every single day, regardless of how they feel or how busy they are.</p><p>Your analysis identified ' + insight.gap + ' as your growth constraint. Consistency in this one area is worth more than excellence in ten others.</p><p>Co.Pilot by Sutton is designed to build that consistency one day at a time.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Start building consistency.</a></p>'),
    },
    10: {
      subject: firstName + ", the compound effect in real estate",
      body: wrapHtml('<p>' + firstName + ',</p><p>There is a concept called the Compound Effect that applies perfectly to real estate.</p><p>Small, consistent actions repeated daily create massive results over time. But most agents never see those results because they quit too early or they are inconsistent.</p><p>Five extra contacts per day equals 25 per week equals 100 per month equals 1,200 per year. At even a modest conversion rate, that is 12 to 15 additional transactions you would not have had otherwise.</p><p>Your bottleneck is ' + insight.gap + '. Co.Pilot by Sutton helps you stack these small wins daily until the compound effect kicks in.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Start compounding.</a></p>'),
    },
    11: {
      subject: "Why accountability changes everything",
      body: wrapHtml('<p>' + firstName + ',</p><p>Let me share something I have observed across every agent I have coached.</p><p>The ones who succeed are not the most talented. They are the ones who have accountability built into their week.</p><p>Someone checking their numbers. Someone asking if they hit their targets. Someone who will not let them slide back into old patterns.</p><p>That is what Co.Pilot by Sutton provides. A daily scorecard, weekly tracking, and a clear directive that keeps you focused on ' + insight.gap + '.</p><p>You already know what to do. You need a system that makes sure you actually do it.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Get your accountability system.</a></p>'),
    },
    12: {
      subject: firstName + ", one month from now",
      body: wrapHtml('<p>' + firstName + ',</p><p>Picture yourself 30 days from now.</p><p>In one version of the future, nothing has changed. Same patterns, same frustrations, same numbers.</p><p>In another version, you have spent 30 days with a clear daily plan, a scorecard tracking your progress, and a coaching system built around your specific bottleneck: ' + insight.gap + '.</p><p>You have made more calls. Followed up more consistently. Tracked your numbers for the first time. And you can already feel the momentum building.</p><p>Which version do you want?</p><p>Co.Pilot by Sutton is free for 30 days. The only cost is the decision to start.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Start your 30 days now.</a></p>'),
    },
    13: {
      subject: "A quick check-in from your Performance Architect",
      body: wrapHtml('<p>' + firstName + ',</p><p>I wanted to check in.</p><p>Your analysis showed that ' + insight.gap + ' is the area with the most opportunity in your business. That has not changed and neither has the offer.</p><p>Co.Pilot by Sutton is still available to you. Free for 30 days. Personalized to your bottleneck. Built to create real change.</p><p>If the timing was not right before, maybe it is now.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Activate your Co.Pilot.</a></p>'),
    },
    14: {
      subject: "The cost of doing nothing",
      body: wrapHtml('<p>' + firstName + ',</p><p>I am not trying to pressure you. But I do want you to think about something.</p><p>Every week that passes without addressing ' + insight.gap + ' is a week of lost potential. Not lost effort. You are working hard. Lost potential. The deals that should have happened but did not because the system was not in place.</p><p>Over a year, that gap compounds. It is not just one missed deal. It is the referrals from that deal. The confidence from that win. The momentum that builds when things are working.</p><p>Co.Pilot by Sutton is ready when you are.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Close the gap.</a></p>'),
    },
    15: {
      subject: firstName + ", what other agents in your position are doing",
      body: wrapHtml('<p>' + firstName + ',</p><p>I work with agents across Canada who had the same analysis results as you. ' + insight.gap + ' as their primary constraint.</p><p>The ones who activated Co.Pilot by Sutton and followed the system for 90 days saw measurable improvement. More consistent prospecting. Better follow-up. Higher conversion. Real numbers, not just feelings.</p><p>They did not have more time than you. They did not have a better market. They just decided to build a system around their weakness instead of ignoring it.</p><p>Co.Pilot is still free for 30 days.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Join them.</a></p>'),
    },
    16: {
      subject: "Your business deserves better systems",
      body: wrapHtml('<p>' + firstName + ',</p><p>You would never tell a client to sell their home without a strategy. You would never list a property without a marketing plan. You would never go to a closing without preparation.</p><p>So why are you running your business without a performance system?</p><p>Your analysis showed that ' + insight.gap + ' is your biggest opportunity. Co.Pilot by Sutton gives you the system. Daily actions, weekly tracking, and a clear roadmap.</p><p>Treat your business like you treat your clients. Give it the structure it deserves.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Build your system.</a></p>'),
    },
    17: {
      subject: firstName + ", the agents who break through all do this one thing",
      body: wrapHtml('<p>' + firstName + ',</p><p>After coaching hundreds of agents, I have noticed one thing that every breakthrough agent has in common.</p><p>They stopped trying to fix everything at once and focused on one thing.</p><p>For you, that one thing is ' + insight.gap + '. Not because the rest does not matter but because fixing this one constraint unlocks everything else.</p><p>Co.Pilot by Sutton is built around this principle. One bottleneck. One daily action. One scorecard. Relentless focus until it is fixed.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Focus on your one thing.</a></p>'),
    },
    18: {
      subject: "A couple of months in. Where do you stand?",
      body: wrapHtml('<p>' + firstName + ',</p><p>It has been a little while since your analysis. I am curious. Has anything changed?</p><p>If it has, that is great. Keep going.</p><p>If it has not, that is not a judgment. It is just information. And the offer still stands.</p><p>Your bottleneck is still ' + insight.gap + '. Co.Pilot by Sutton is still free for 30 days. And I am still here to help.</p><p>Sometimes the right time is simply when you decide it is.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Decide today.</a></p>'),
    },
    19: {
      subject: firstName + ", 90 days from now your business could look completely different",
      body: wrapHtml('<p>' + firstName + ',</p><p>Here is something worth thinking about.</p><p>Ninety days from today, your business will either look the same as it does right now, or it will be measurably different.</p><p>Not a little different. Measurably different. More conversations. More appointments. More consistent follow-up. A real system instead of a daily scramble.</p><p>Your analysis identified ' + insight.gap + ' as your primary constraint. Ninety days of focused work on this one area can change your trajectory. Not just for this quarter, but for the year.</p><p>Co.Pilot by Sutton gives you the roadmap. Free for 30 days. No risk.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Start your 90 days.</a></p>'),
    },
    20: {
      subject: "Last thought before I stop reaching out",
      body: wrapHtml('<p>' + firstName + ',</p><p>I do not believe in pestering people. So this will be one of my last emails to you about this.</p><p>Your analysis showed something real: ' + insight.truth + ' That is a fixable problem. I fix it with agents every week.</p><p>If you ever want to take the next step, Co.Pilot by Sutton will be there. Free for 30 days. Personalized to your specific situation.</p><p>I wish you the best either way. And if you ever want to talk, my calendar is always open.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Your Co.Pilot is ready when you are.</a></p>'),
    },
    21: {
      subject: firstName + ", a final invitation",
      body: wrapHtml('<p>' + firstName + ',</p><p>This is my last email in this series.</p><p>I have enjoyed reaching out, and I hope some of what I shared resonated with you.</p><p>Your analysis identified ' + insight.gap + ' as your biggest growth opportunity. If you ever decide to work on it with a structured system, Co.Pilot by Sutton is there for you. Free for 30 days, personalized to your business.</p><p>No matter what, I hope you have a phenomenal year.</p><p><a href="https://node-runner.onrender.com/assessment.html" style="color:#1a0dab;font-weight:bold">Activate anytime.</a></p><p>All the best,</p>'),
    },
  };
}

function getPostAnalysisEmail(agentId, firstName, step) {
  const diagnosis = db
    .prepare(
      "SELECT bottleneck, profile, signals FROM diagnoses WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 1",
    )
    .get(agentId);

  const insight = interpretAnalysis(diagnosis);
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
