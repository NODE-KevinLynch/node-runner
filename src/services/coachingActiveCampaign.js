// src/services/coachingActiveCampaign.js
// 12 unique coaching emails, cycling for 26 weeks (Mon-Fri daily sends)
// Booking link introduced at week 8+

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

const EMAILS = {
  1: {
    subject: "Welcome to Co.Pilot by Sutton — your coaching portal is live",
    body: wrapHtml(`<p>Your Co.Pilot coaching portal is now active.</p><p>Inside you will find your personalized coaching plan — built around your specific bottleneck, with daily actions, a scorecard, and a clear roadmap to hit your income goal.</p><p>Here is what I want you to do this week: log in, review your coaching directive, and complete your daily scorecard at least 3 times.</p><p>That is it. Three days. Start building the habit.</p><p>__PORTAL_LINK__</p><p>Let us get to work.</p>`),
  },
  2: {
    subject: "Your first week — how did it go?",
    body: wrapHtml(`<p>You have had your Co.Pilot portal for a week now. I am curious — did you log in? Did you look at your numbers?</p><p>If you did, you are already ahead of most agents. The ones who engage with the system in week one are the ones who see results by month three.</p><p>If you have not logged in yet, today is the day. Open your portal, check your coaching directive, and log one scorecard entry. Just one.</p><p>__PORTAL_LINK__</p><p>Momentum starts with one action.</p>`),
  },
  3: {
    subject: "The daily scorecard is your secret weapon",
    body: wrapHtml(`<p>I want to talk about the daily scorecard in your portal.</p><p>It is not busywork. It is not a checkbox exercise. It is the single most powerful tool for changing your business — because it forces you to be honest about your activity levels.</p><p>Most agents think they are making enough calls. They think they are following up consistently. But when they start tracking, the truth shows up fast.</p><p>Log your scorecard every day this week. Just the numbers. Calls, contacts, appointments. Watch what happens when you start measuring.</p><p>__PORTAL_LINK__</p>`),
  },
  4: {
    subject: "Your RPM plan — are you using it?",
    body: wrapHtml(`<p>Inside your portal there is an RPM plan — Result, Purpose, Massive Action.</p><p>This is not just a motivational exercise. It is the Tony Robbins framework that top performers use to stay focused when things get noisy.</p><p>Your Result is what you want. Your Purpose is why it matters. Your Massive Action is the specific thing you do every day to make it real.</p><p>Review your RPM plan today. Is the action clear? Are you doing it? If not, what is getting in the way?</p><p>__PORTAL_LINK__</p>`),
  },
  5: {
    subject: "The habit is forming — do not stop now",
    body: wrapHtml(`<p>If you have been logging your scorecard and reviewing your coaching directive, something is starting to shift.</p><p>You might not see it in your GCI yet. But you are building the foundation. Habits take about 3-4 weeks to stick. You are right in the zone.</p><p>Do not stop now. This is where most agents quit — right before the compound effect kicks in.</p><p>Keep logging. Keep tracking. Keep showing up.</p><p>__PORTAL_LINK__</p>`),
  },
  6: {
    subject: "Your Daily Win — are you locking it in?",
    body: wrapHtml(`<p>Inside your portal there is a Daily Win section where you pick your top 3 actions for the week.</p><p>This is your accountability contract with yourself. The agents who use it consistently report feeling more focused and less overwhelmed within two weeks.</p><p>Pick your 3 wins. Lock them in. Do them before anything else.</p><p>__PORTAL_LINK__</p>`),
  },
  7: {
    subject: "The halfway point — time for a check-in",
    body: wrapHtml(`<p>You are about halfway through your first month with Co.Pilot. Let us take stock.</p><p>How many days did you log your scorecard? How many times did you review your coaching directive? Are your daily numbers going up?</p><p>If yes — you are on the right track. Keep pushing.</p><p>If not — no judgment. But I want you to recommit right now. Open your portal, review your plan, and log today.</p><p>__PORTAL_LINK__</p>`),
  },
  8: {
    subject: "Ready to go deeper? Let us talk strategy",
    body: wrapHtml(`<p>You have been using Co.Pilot for a few weeks now. You have your scorecard, your coaching directive, your RPM plan.</p><p>But there is only so much a system can do on its own. The agents who see the biggest breakthroughs are the ones who pair the system with a real conversation.</p><p>I would love to spend 30 minutes with you — looking at your numbers, talking through your bottleneck, and building a 90-day action plan together.</p><p>No pitch. No pressure. Just a focused strategy session between you and your Performance Architect.</p><p><a href="https://calendar.app.google/Mvs8PimcWXHYQjY17" style="color:#1a0dab;font-weight:bold">Book your free strategy session.</a></p><p>__PORTAL_LINK__</p>`),
  },
  9: {
    subject: "What your numbers are telling you",
    body: wrapHtml(`<p>If you have been logging your scorecard, your portal now has real data. And data tells a story.</p><p>Look at your calls made vs contacts reached. That is your connect rate. Look at appointments set vs held. That is your show rate. Look at your daily target progress percentage.</p><p>These numbers do not lie. They tell you exactly where the leaks are — and where to focus next.</p><p>__PORTAL_LINK__</p><p>If you want help interpreting your numbers, <a href="https://calendar.app.google/Mvs8PimcWXHYQjY17" style="color:#1a0dab">book a quick strategy session</a> and we will look at them together.</p>`),
  },
  10: {
    subject: "The compound effect is real — keep pushing",
    body: wrapHtml(`<p>You are into your second month with Co.Pilot. This is where things start to get interesting.</p><p>The calls you made in week one are starting to turn into conversations. The conversations are becoming appointments. The pipeline is filling.</p><p>This is the compound effect in action. Small daily actions, stacked consistently, creating results that feel disproportionate to the effort.</p><p>Do not ease up. This is the moment to push harder.</p><p>__PORTAL_LINK__</p>`),
  },
  11: {
    subject: "Are you protecting your morning power hours?",
    body: wrapHtml(`<p>Quick gut check.</p><p>What are you doing between 8 AM and 10 AM every day? If the answer is email, admin, or social media — you are giving away your most valuable hours.</p><p>The morning is when your energy is highest and your focus is sharpest. That is when you should be doing your highest-value activity — prospecting, follow-ups, client conversations.</p><p>Check your coaching directive in the portal. Are you doing that first thing? Every day?</p><p>__PORTAL_LINK__</p>`),
  },
  12: {
    subject: "Your 90-day review is coming up",
    body: wrapHtml(`<p>In a few weeks you will hit your 90-day mark with Co.Pilot. That is a milestone.</p><p>When we get there, I want you to compare your numbers — before and after. Calls per day. Appointments per week. Pipeline value. GCI pace.</p><p>If you have been using the system, the difference will be measurable. Not because of magic. Because of math.</p><p>Keep logging. The data is building your case.</p><p>__PORTAL_LINK__</p><p>Want to do a formal 90-day review together? <a href="https://calendar.app.google/Mvs8PimcWXHYQjY17" style="color:#1a0dab">Book your review session.</a></p>`),
  },
};

function getCoachingActiveEmail(step, portalUrl) {
  const totalUnique = Object.keys(EMAILS).length;
  const emailIndex = ((step - 1) % totalUnique) + 1;
  const email = EMAILS[emailIndex];
  if (!email) return null;

  let html = email.body;
  const portalButton = portalUrl
    ? `<div style="text-align:center;margin:24px 0"><a href="${portalUrl}" style="display:inline-block;padding:14px 32px;background:#1a2b4a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Open My Co.Pilot Portal</a></div>`
    : "";
  html = html.replace(/__PORTAL_LINK__/g, portalButton);

  return {
    subject: email.subject,
    html,
    ctaUrl: portalUrl || "https://node-runner.onrender.com/assessment.html",
    campaignType: "coaching_active",
    campaignStep: step,
  };
}

module.exports = { getCoachingActiveEmail };
