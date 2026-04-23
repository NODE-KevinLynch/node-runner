// src/services/preActivationCampaign.js
// 3-email sequence for agents with no analysis completed yet
// Goal: move them to complete the Agent Analysis
// No analysis data used — this is cold/warm outreach only

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

const EMAILS = {
  1: {
    subject: "Most agents don't know this about their business",
    body: wrapHtml(`
      <p>I want to ask you something honest.</p>
      <p>Most agents I work with are working hard. Really hard. Early mornings, late nights, weekends. They care about their clients and they want to grow.</p>
      <p>But there is one thing almost all of them have in common — they have never had someone sit down with them and show them exactly where their business is leaking money, time, and opportunity.</p>
      <p>Not in a vague way. Specifically. With their actual numbers.</p>
      <p>That is what I do.</p>
      <p>I built a 60-second analysis that shows you the one or two areas where your business is most vulnerable right now — and what to do about it.</p>
      <p>No pitch. No pressure. Just a clear picture of where you stand.</p>
      <p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Run your free analysis here.</a></p>
      <p>It takes less than a minute.</p>
    `),
  },
  2: {
    subject: "Why most agents stay stuck at the same number every year",
    body: wrapHtml(`
      <p>Here is something I have seen over and over in this industry.</p>
      <p>An agent has a decent year. Maybe their best year yet. And then the next year — same number. Or lower.</p>
      <p>It is not because they stopped working hard. It is because they never identified the one bottleneck that is quietly capping their growth.</p>
      <p>Every business has one. A weak point that everything else runs through. And until you find it, you can hustle as hard as you want — the ceiling stays exactly where it is.</p>
      <p>The agents I coach who break through do one thing first: they get honest about where the real problem is.</p>
      <p>Not where they think it is. Where it actually is.</p>
      <p>I built a tool that finds it for you in 60 seconds.</p>
      <p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Find your bottleneck here.</a></p>
      <p>No fluff. Just the truth about your business.</p>
    `),
  },
  3: {
    subject: "You are probably stronger than you think — but blind in one area",
    body: wrapHtml(`
      <p>I want to be straight with you.</p>
      <p>In my experience coaching agents across Canada, the ones who struggle are not struggling because they lack talent or work ethic.</p>
      <p>They are struggling because they have one blind spot they cannot see from the inside.</p>
      <p>It could be their follow-up system. Their listing strategy. Their pipeline discipline. Their conversion process. Something specific — and fixable.</p>
      <p>But you cannot fix what you cannot see.</p>
      <p>That is why I created the Agent Analysis. It takes 60 seconds and it shows you exactly where your blind spot is — and what to do about it.</p>
      <p>Over a thousand agents have run it. The ones who act on it change their business. The ones who don't — stay exactly where they are.</p>
      <p>I would rather you be in the first group.</p>
      <p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Run your free Agent Analysis now.</a></p>
      <p>It is free. It is fast. And it might be the most important 60 seconds you spend on your business this year.</p>
    `),
  },
  4: {
    subject: "The one number that predicts your income next year",
    body: wrapHtml(`<p>I am going to share something with you that most brokerages will never tell you.</p><p>There is one number that predicts — with surprising accuracy — what your income will look like 90 days from now.</p><p>It is not your closing rate. It is not your average sale price. It is not even your GCI.</p><p>It is the number of meaningful conversations you are having every single day.</p><p>Not emails. Not social media posts. Real conversations with real people about real estate.</p><p>The agents who track this number and hold themselves to a daily minimum are the ones who never have a bad quarter. Everyone else rides the roller coaster.</p><p>My free analysis calculates this number for you — and shows you exactly how many daily conversations your income goal actually requires.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">See your number here.</a></p>`),
  },
  5: {
    subject: "Are you a hunter or a farmer? (It matters more than you think)",
    body: wrapHtml(`<p>In real estate, there are two kinds of agents.</p><p>Hunters chase new business constantly. They prospect, cold call, door knock, run ads. They eat what they kill. When they stop hunting, the income stops.</p><p>Farmers build systems. They plant seeds — relationships, follow-ups, database touches — and harvest consistently. Their business grows even when they take a week off.</p><p>Most agents think they need to be better hunters. The truth? They need to start farming.</p><p>The highest-earning agents I coach have built a farming system so strong that referrals and repeat business make up more than half their income.</p><p>Which type are you? And more importantly — which type should you be?</p><p>My 60-second analysis will tell you.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Find out here.</a></p>`),
  },
  6: {
    subject: "The follow-up gap that is costing you 6 figures",
    body: wrapHtml(`<p>I reviewed the numbers across hundreds of agents last year and found something that should keep you up at night.</p><p>The average agent follows up with a new lead 1.5 times. Once or twice, then they move on.</p><p>But the data is clear: 80% of sales happen between the 5th and 12th contact.</p><p>That means most agents are quitting right before the money shows up.</p><p>This is not a motivation problem. It is a systems problem. You need a follow-up structure that does the work for you — so no lead falls through the cracks.</p><p>My analysis identifies whether follow-up is your bottleneck — and if it is, I will show you exactly how to fix it.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Run your free analysis now.</a></p>`),
  },
  7: {
    subject: "What a $500K agent does differently before 10 AM",
    body: wrapHtml(`<p>I have coached agents earning $100K and agents earning $500K. Want to know the biggest difference?</p><p>It is not talent. It is not market. It is not luck.</p><p>It is what they do between 8 AM and 10 AM.</p><p>The top producers I work with have a non-negotiable morning routine. Before they check email, before they scroll social media, before they respond to anyone — they do their highest-value activity first.</p><p>For most of them, that means prospecting. Calls, texts, personal outreach. The revenue-generating work that everyone else pushes to the afternoon and then never gets to.</p><p>Two hours. Every morning. No exceptions.</p><p>It sounds simple because it is. The hard part is doing it consistently. And that starts with knowing exactly what your highest-value activity should be.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Find yours in 60 seconds.</a></p>`),
  },
  8: {
    subject: "Your database is worth more than your next deal",
    body: wrapHtml(`<p>Let me ask you something.</p><p>How many people are in your database right now? And of those — how many have heard from you in the last 30 days?</p><p>If the answer makes you uncomfortable, you are not alone. Most agents have hundreds of contacts sitting in a CRM collecting dust.</p><p>Here is the math that should change your behavior: a well-maintained database of 200 people should generate 8-12 transactions per year through referrals and repeat business alone. No ads. No cold calls. Just relationships.</p><p>But only if you are actually touching that database consistently.</p><p>The agents who build wealth in this business — not just income, but real wealth — do it through their database. Everyone else starts from zero every January.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">See if your database is your bottleneck.</a></p>`),
  },
  9: {
    subject: "The 30-day rule that top producers swear by",
    body: wrapHtml(`<p>There is a rule in real estate that the best agents follow religiously. Most agents have never heard of it.</p><p>It is called the 30-Day Rule: the prospecting you do in any given 30-day period will pay off 90 days later.</p><p>Which means if you had a slow month — the reason is not what happened this month. It is what you did not do three months ago.</p><p>And if you stop prospecting today because you just closed a few deals and feel good? You are setting yourself up for a drought in 90 days.</p><p>This is why the feast-famine cycle exists. And it is why breaking it requires a system, not just motivation.</p><p>My analysis shows you whether pipeline discipline is your bottleneck — and gives you a framework to fix the cycle permanently.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Break the cycle here.</a></p>`),
  },
  10: {
    subject: "The listing presentation mistake that costs you 3 out of 4 deals",
    body: wrapHtml(`<p>Here is a stat that might sting.</p><p>The average agent converts about 1 in 4 listing presentations. The top agents? They are closing 3 out of 4.</p><p>Same market. Same clients. Same price points. Completely different results.</p><p>The difference is not charisma. It is preparation.</p><p>The best agents I coach do not wing their presentations. They have a structured process — a pre-listing package, a consultative approach, a clear value story, and a confident close. Every single time.</p><p>If you are showing up to listing appointments with a generic CMA and hoping for the best, you are leaving deals on the table.</p><p>My analysis identifies whether conversion is your biggest opportunity — and if it is, I will point you to exactly what to fix first.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Find your conversion gap.</a></p>`),
  },
  11: {
    subject: "Why the busiest agents are rarely the most successful",
    body: wrapHtml(`<p>I need to tell you something that might be uncomfortable.</p><p>Being busy is not the same as being productive. And in real estate, it is dangerously easy to confuse the two.</p><p>I have watched agents work 60-hour weeks and barely clear $80K. And I have coached agents who work 40 hours and earn three times that.</p><p>The difference? The high earners protect their time ruthlessly. They know which activities generate revenue and which ones just feel productive.</p><p>Admin work feels productive. Social media feels productive. Reorganizing your CRM feels productive. But none of those things put a commission cheque in your hand.</p><p>The question is not whether you are working hard enough. It is whether you are working on the right things.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Find out what to focus on.</a></p>`),
  },
  12: {
    subject: "One question that separates growing agents from stuck agents",
    body: wrapHtml(`<p>After coaching hundreds of agents, I have found that there is one question that separates the agents who grow from the ones who stay stuck.</p><p>It is not how do I get more leads or what CRM should I use or should I be on TikTok.</p><p>It is this: What is the one thing in my business that, if I fixed it, would make everything else easier?</p><p>That is it. One thing. Not five. Not ten. One.</p><p>When you find that one thing and put all your energy into fixing it — everything changes. Your pipeline fills. Your conversion improves. Your confidence goes up. Your stress goes down.</p><p>But most agents never find it because they are too close to their own business to see it clearly.</p><p>That is exactly what my analysis does. Sixty seconds. One clear answer.</p><p><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Find your one thing now.</a></p>`),
  },
};

function getPreActivationEmail(step) {
  // 12 unique emails, cycle for 26 weeks
  const totalUnique = Object.keys(EMAILS).length;
  const emailIndex = ((step - 1) % totalUnique) + 1;
  const email = EMAILS[emailIndex];
  if (!email) return null;
  return {
    subject: email.subject,
    html: email.body,
    ctaUrl: "https://agentanalysis.kevinlynch.ca",
    campaignType: "pre_activation",
    campaignStep: step,
  };
}

module.exports = { getPreActivationEmail };
