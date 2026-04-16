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
};

function getPreActivationEmail(step) {
  const email = EMAILS[step];
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
