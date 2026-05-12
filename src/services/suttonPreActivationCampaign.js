// src/services/suttonPreActivationCampaign.js
// 26-email weekly sequence (6 months) for Sutton Group agents only
// Triggered when source = "sutton_import"
// Theme: Co.Pilot is the hero, Sutton Group is the provider, coaching insights are seasoning
// Each email delivers: a piece of real estate wisdom + a Co.Pilot exclusive reminder + CTA
// Cycles after week 26 if agent hasn't converted

const SIGNATURE = `
<br><br>
<p style="margin-bottom:8px">To your success,</p>
<table cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:14px;color:#222;line-height:1.6">
  <tr><td><strong>Kevin Lynch</strong></td></tr>
  <tr><td>Performance Architect</td></tr>
  <tr><td>National Coach | Sutton Group Canada</td></tr>
  <tr><td><a href="https://calendar.app.google/Mvs8PimcWXHYQjY17" style="color:#1a0dab">Book a Strategy Session</a></td></tr>
  <tr><td>kevinlynch.ca</td></tr>
  <tr><td>&nbsp;</td></tr>
  <tr><td><a href="https://agentanalysis.kevinlynch.ca" style="color:#1a0dab;font-weight:bold">Start Your Free Co.Pilot Journey — Sutton Agents Only</a></td></tr>
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

// Helper: build standard CTA block used in every email
function ctaBlock(label = "Start Your Free Co.Pilot Journey") {
  return `<div style="text-align:center;margin:28px 0"><a href="https://agentanalysis.kevinlynch.ca" style="display:inline-block;padding:14px 32px;background:#1a2b4a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">${label}</a></div>`;
}

// firstName-aware greeting (used on milestone emails 1, 7, 14, 21)
function greeting(firstName) {
  return `<p>Hi ${firstName || "there"},</p>`;
}

const EMAILS = {
  // ── EMAIL 1 — THE ANNOUNCEMENT (FIRST NAME) ────────────────────
  1: {
    subject: "Sutton Group has done it again — your free Co.Pilot is live",
    bodyFn: (firstName) =>
      wrapHtml(`
      ${greeting(firstName)}
      <p>Sutton Group has done it again.</p>
      <p>While other brokerages talk about supporting their agents, Sutton has built something real — and it is yours, exclusively, at no cost.</p>
      <p><strong>Co.Pilot is now live.</strong> It is the most advanced coaching and accountability platform ever built for real estate agents, and it is free for every Sutton agent in Canada.</p>
      <p>What is inside:</p>
      <ul>
        <li>A personalized diagnosis of your business bottleneck</li>
        <li>A daily coaching directive built around YOUR numbers</li>
        <li>An RPM action plan (Result, Purpose, Massive Action) refreshed weekly</li>
        <li>A live performance scorecard so you always know where you stand</li>
        <li>Coaching insights synthesized from the top performance minds in the world</li>
      </ul>
      <p>This is not a tool you have to figure out. It is a coach in your corner, available 24/7, built for the way you actually work.</p>
      <p><strong>Real estate insight of the week:</strong> The single biggest predictor of next year's income is not your market or your marketing — it is the number of meaningful conversations you are having every single day. Co.Pilot tracks this. Most agents do not.</p>
      ${ctaBlock("Activate My Free Co.Pilot")}
      <p>Welcome to the next level.</p>
    `),
  },

  // ── EMAIL 2 — THE 30-DAY RULE (HOOK OPEN, NO COACH NAMED) ──────
  2: {
    subject: "Sutton Group agents now get the 30-Day Rule built in",
    bodyFn: () =>
      wrapHtml(`
      <p>Most agents do not realize this until it is too late.</p>
      <p>The prospecting work you do today does not pay off today. It pays off 90 days from now.</p>
      <p>Which means if you have a slow month, the cause is not what is happening this month. It is what you did not do three months ago.</p>
      <p>The top producers in this industry follow what is called the <strong>30-Day Rule</strong>: every single 30-day period needs a non-negotiable minimum of outreach, follow-up, and database touches — regardless of how busy you feel.</p>
      <p>This is how they break the feast-or-famine cycle that traps everyone else.</p>
      <p><strong>This is exactly what Co.Pilot enforces.</strong> Your dashboard tells you, every day, whether you are doing the work that will pay you in 90 days — or whether you are coasting on momentum that is about to run out.</p>
      <p>And because you are a Sutton agent, it is yours at no cost.</p>
      ${ctaBlock("Start Your Co.Pilot Diagnosis")}
    `),
  },

  // ── EMAIL 3 — THE MORNING POWER HOURS ──────────────────────────
  3: {
    subject: "Sutton Group exclusive: the morning routine that triples income",
    bodyFn: () =>
      wrapHtml(`
      <p>What you do between 8 AM and 10 AM determines what you earn.</p>
      <p>The agents I coach who clear half a million in GCI all share one habit: they protect their morning power hours ruthlessly. No email. No social media. No admin work. Just one thing — the highest-value activity in their business.</p>
      <p>For most agents that means prospecting, follow-ups, or direct client conversations. The work that actually generates revenue.</p>
      <p>The trap is that admin and email feel productive. They are not. They are the activities that fill the day of an average agent and leave them wondering why they cannot break through.</p>
      <p><strong>Co.Pilot tells you, every morning, what your highest-value activity should be that day — based on your numbers, your goals, and your specific bottleneck.</strong></p>
      <p>No more guessing. No more "I should probably make some calls today." You get a directive. You execute. You measure.</p>
      <p>This is what Sutton Group built for you. Free.</p>
      ${ctaBlock("Get My Daily Directive")}
    `),
  },

  // ── EMAIL 4 — THE FOLLOW-UP GAP ────────────────────────────────
  4: {
    subject: "Sutton Group agents are closing 80% more deals — here is how",
    bodyFn: () =>
      wrapHtml(`
      <p>Here is a stat that should sting a little.</p>
      <p>The average agent follows up with a new lead 1.5 times. Once or twice, then they move on.</p>
      <p>But the data is unforgiving: <strong>80% of sales happen between the 5th and 12th contact.</strong></p>
      <p>That means most agents are quitting right before the money shows up. Not because they are lazy. Because they do not have a system that holds them accountable to the follow-ups they intended to make.</p>
      <p>This is not a motivation problem. It is a systems problem.</p>
      <p><strong>Co.Pilot's follow-up tracking surfaces every lead that has gone cold, every conversation that needs a touch, every relationship at risk of going dark.</strong> It is the difference between hoping you are following up and knowing you are.</p>
      <p>Sutton Group gives you this for free. The rest of the industry pays $300/month for less.</p>
      ${ctaBlock("Tighten My Follow-Up")}
    `),
  },

  // ── EMAIL 5 — THE DATABASE TRUTH ───────────────────────────────
  5: {
    subject: "Sutton Group: the database math that changes everything",
    bodyFn: () =>
      wrapHtml(`
      <p>How many people are in your database right now?</p>
      <p>Of those, how many have heard from you in the last 30 days?</p>
      <p>If those two answers are far apart, you are sitting on a gold mine you are not mining.</p>
      <p>The math: a well-maintained database of 200 people should generate 8 to 12 transactions per year through referrals and repeat business alone. No ads. No cold calling. Just relationships, touched consistently.</p>
      <p>Most agents have hundreds of contacts collecting dust in a CRM. They are not building wealth — they are restarting from zero every January.</p>
      <p>The top producers? They treat their database like the most valuable asset they own. Because it is.</p>
      <p><strong>Co.Pilot's Relationship Capital module shows you exactly who in your database is overdue for a touch, who is most likely to refer, and what to say when you reach out.</strong></p>
      <p>This is the kind of intelligence brokerages charge thousands for. Sutton gives it to you free.</p>
      ${ctaBlock("Activate Relationship Capital")}
    `),
  },

  // ── EMAIL 6 — THE HUNTER vs FARMER FRAME ───────────────────────
  6: {
    subject: "Sutton Group agents: are you a hunter or a farmer?",
    bodyFn: () =>
      wrapHtml(`
      <p>In real estate, there are two kinds of agents.</p>
      <p><strong>Hunters</strong> chase new business constantly. They prospect, cold call, run ads, hustle. When they stop hunting, the income stops.</p>
      <p><strong>Farmers</strong> build systems. They plant — relationships, follow-ups, database touches — and harvest year after year. Their business grows even when they take a week off.</p>
      <p>Most agents think they need to be better hunters. The truth is they need to start farming.</p>
      <p>The highest earners in this industry have built farming systems so strong that referrals and repeat business make up more than half their income. They never start a year from zero.</p>
      <p>So which type are you right now? And more importantly — which type should you be?</p>
      <p><strong>Co.Pilot's diagnosis tells you exactly where you stand on the hunter-farmer spectrum and what to build next.</strong> Free, for Sutton agents only.</p>
      ${ctaBlock("Run My Diagnosis")}
    `),
  },

  // ── EMAIL 7 — MIDPOINT CHECK-IN (FIRST NAME) ───────────────────
  7: {
    subject: "Sutton Group: your first month with Co.Pilot — let us talk",
    bodyFn: (firstName) =>
      wrapHtml(`
      ${greeting(firstName)}
      <p>You have had access to Co.Pilot for a few weeks now. I want to be straight with you.</p>
      <p>If you have not run your diagnosis yet, you are leaving the biggest free advantage Sutton Group has ever offered on the table.</p>
      <p>This is not a sales pitch. There is nothing to buy. Sutton Group has covered your access — every dollar of it.</p>
      <p>What I am asking is sixty seconds. One short analysis. One clear picture of where your business is leaking time, money, and momentum right now.</p>
      <p><strong>Real estate insight of the week:</strong> The agents who break through to the next income tier do not work harder. They work on different things. The hard part is knowing what those different things are. That is what the diagnosis tells you.</p>
      <p>I built Co.Pilot for agents like you. Sutton funded it. The only thing left is you saying yes.</p>
      ${ctaBlock("Run My 60-Second Diagnosis")}
    `),
  },

  // ── EMAIL 8 — THE LISTING CONVERSION GAP ───────────────────────
  8: {
    subject: "Sutton Group: top agents close 3 of 4 listings — here is why",
    bodyFn: () =>
      wrapHtml(`
      <p>The average agent converts about 1 in 4 listing presentations.</p>
      <p>The top agents? They are closing 3 out of 4.</p>
      <p>Same market. Same clients. Same price points. Completely different results.</p>
      <p>The difference is not charisma. It is preparation.</p>
      <p>The best agents in this industry do not wing their presentations. They have a structured pre-listing package, a consultative approach, a clear value story, and a confident close — every single time.</p>
      <p>If you are showing up to listing appointments with a generic CMA and hoping for the best, you are leaving deals on the table that should be yours.</p>
      <p><strong>Co.Pilot's listing presentation framework gives you the exact sequence top producers use.</strong> Built into your dashboard. Available the moment you activate.</p>
      <p>Sutton Group covers it. You just have to use it.</p>
      ${ctaBlock("Upgrade My Listing Game")}
    `),
  },

  // ── EMAIL 9 — RPM PLAN INTRO (NO COACH NAMED) ──────────────────
  9: {
    subject: "Sutton Group: the one-page plan that changes everything",
    bodyFn: () =>
      wrapHtml(`
      <p>Most agents do not have a real plan. They have a goal.</p>
      <p>"I want to do $150K this year." "I want to list 20 homes." "I want more referrals."</p>
      <p>Those are not plans. Those are wishes with deadlines.</p>
      <p>A real plan answers three questions: <strong>What is the result you want? Why does it matter? What is the massive action you will take every day to make it real?</strong></p>
      <p>Result. Purpose. Massive Action. That is it. One page. Reviewed daily. Held accountable weekly.</p>
      <p>This framework has built more million-dollar businesses than any other planning tool on the planet — across real estate, sales, and entrepreneurship.</p>
      <p><strong>Co.Pilot builds this plan for you, updates it as your business shifts, and reminds you of it every single morning.</strong></p>
      <p>This is the depth of coaching Sutton agents now get free. Other brokerages charge $5,000 a year for less.</p>
      ${ctaBlock("Build My RPM Plan")}
    `),
  },

  // ── EMAIL 10 — REFERRAL ENGINE (NO COACH NAMED) ────────────────
  10: {
    subject: "Sutton Group: build a referral business that runs without you",
    bodyFn: () =>
      wrapHtml(`
      <p>A great real estate business does not depend on hustle. It depends on relationships.</p>
      <p>The agents who build seven-figure businesses do it on the strength of a referral engine — a system where past clients, sphere contacts, and natural advocates send them business consistently, without being asked.</p>
      <p>This does not happen by accident. It happens because they treat their relationships like the strategic asset they are. They communicate consistently, they add value before they ask for anything, and they make referring them feel easy and natural.</p>
      <p>It is a structured discipline, not a personality trait.</p>
      <p><strong>Co.Pilot's relationship capital framework gives you a weekly playbook for who to touch, what to send, and how to deepen the conversations that turn into referrals.</strong></p>
      <p>Sutton Group is the only place in Canadian real estate where this comes free with your career.</p>
      ${ctaBlock("Build My Referral Engine")}
    `),
  },

  // ── EMAIL 11 — THE BUSY TRAP ───────────────────────────────────
  11: {
    subject: "Sutton Group: busy is not the same as productive",
    bodyFn: () =>
      wrapHtml(`
      <p>This one will sting a little, but it needs saying.</p>
      <p>Being busy is not the same as being productive. And in real estate, it is dangerously easy to confuse the two.</p>
      <p>I have watched agents work sixty-hour weeks and barely clear $80K. I have coached agents who work forty hours and earn three times that.</p>
      <p>The difference? The high earners protect their time ruthlessly. They know which activities generate revenue and which ones just feel productive.</p>
      <p>Admin work feels productive. Social media feels productive. Reorganizing your CRM feels productive. None of those things put a commission cheque in your hand.</p>
      <p>The question is not whether you are working hard enough. It is whether you are working on the right things.</p>
      <p><strong>Co.Pilot identifies the activities that move the needle in YOUR business — and ruthlessly cuts out the ones that do not.</strong></p>
      <p>Sutton Group built it for you. The only cost is the sixty seconds it takes to start.</p>
      ${ctaBlock("Find My High-Value Work")}
    `),
  },

  // ── EMAIL 12 — THE ONE-THING QUESTION ──────────────────────────
  12: {
    subject:
      "Sutton Group: the one question that separates growing agents from stuck agents",
    bodyFn: () =>
      wrapHtml(`
      <p>There is one question I ask every agent I coach.</p>
      <p>It is not how do I get more leads. It is not what CRM should I use. It is not should I be on TikTok.</p>
      <p>It is this: <strong>What is the one thing in your business that, if you fixed it, would make everything else easier?</strong></p>
      <p>Not five things. Not ten things. One.</p>
      <p>When you find that one thing and put all your energy into fixing it, everything changes. Pipeline fills. Conversion improves. Confidence rises. Stress drops.</p>
      <p>But most agents never find their one thing because they are too close to their own business to see it clearly. The blind spot is real, and it is expensive.</p>
      <p><strong>Co.Pilot's diagnosis finds it for you in sixty seconds.</strong> No fluff. No upsell. Just the truth about your business.</p>
      <p>Sutton Group bought you this clarity. Use it.</p>
      ${ctaBlock("Find My One Thing")}
    `),
  },

  // ── EMAIL 13 — TONY ROBBINS NAMED (COACH NAME OK) ─────────────
  13: {
    subject: "Sutton Group: what Tony Robbins teaches about results",
    bodyFn: () =>
      wrapHtml(`
      <p>Tony Robbins built his career on a simple idea: most people set goals around what they want to <em>have</em>, not who they need to <em>become</em>.</p>
      <p>The agents who break through to higher income brackets do not just work harder — they think differently. They have clearer rules for how they spend their time. They have stronger standards for what they accept from themselves. They make decisions faster.</p>
      <p>This is not motivational fluff. It is a measurable shift in identity that shows up in calendar choices, daily habits, and follow-through.</p>
      <p><strong>Real estate insight of the week:</strong> The agents who hit their income goals are the ones whose calendars match their stated priorities. Most agents have calendars that quietly betray what they say they want.</p>
      <p><strong>Co.Pilot tracks this gap and closes it.</strong> Your daily directive aligns your hours with your stated targets. Sutton agents get it free.</p>
      ${ctaBlock("Align My Day With My Goals")}
    `),
  },

  // ── EMAIL 14 — RE-COMMITMENT (FIRST NAME) ──────────────────────
  14: {
    subject: "Sutton Group: halfway through the year — where are you?",
    bodyFn: (firstName) =>
      wrapHtml(`
      ${greeting(firstName)}
      <p>If you are reading this email and you have not yet activated Co.Pilot, I want to gently challenge you.</p>
      <p>What is the actual reason?</p>
      <p>It is not cost. Sutton has covered every dollar.</p>
      <p>It is not time. The diagnosis takes sixty seconds.</p>
      <p>It is not skepticism. The platform is already built and used by your colleagues.</p>
      <p>So what is the real reason?</p>
      <p>For most agents who stall here, the honest answer is: they are afraid of what the diagnosis will tell them. Afraid the numbers will be worse than they hoped. Afraid they will see the gap.</p>
      <p>Here is the truth: <strong>the gap exists whether you measure it or not.</strong> Measuring it is the only way to close it.</p>
      <p><strong>Real estate insight of the week:</strong> Top producers measure obsessively. Average producers avoid measuring because measurement creates accountability — and accountability creates change, which is uncomfortable.</p>
      <p>Sutton Group built Co.Pilot for the agents who are ready to grow. Are you one of them?</p>
      ${ctaBlock("Face My Numbers")}
    `),
  },

  // ── EMAIL 15 — JEB BLOUNT NAMED (COACH NAME OK) ────────────────
  15: {
    subject: "Sutton Group: the prospecting discipline Jeb Blount lives by",
    bodyFn: () =>
      wrapHtml(`
      <p>Jeb Blount built his entire career on one principle: <strong>fanatical prospecting prevents desperation.</strong></p>
      <p>When your pipeline is full, you negotiate from strength. You walk away from bad deals. You charge full fees. You pick your clients.</p>
      <p>When your pipeline is empty, you take what you can get. You drop your standards. You chase. You discount. You compromise.</p>
      <p>The agents who never feel desperate are the ones who prospect when they do not need to. They make calls when they have three deals closing. They keep planting seeds when the harvest is already in.</p>
      <p>This is the discipline that separates a career from a job.</p>
      <p><strong>Co.Pilot enforces this discipline through your daily directive.</strong> When your pipeline is full, it tells you to keep prospecting. When it is thin, it shows you exactly where to focus first.</p>
      <p>Sutton agents get this enforcement for free. Most agents pay for a coaching program that does less.</p>
      ${ctaBlock("Activate My Prospecting Discipline")}
    `),
  },

  // ── EMAIL 16 — THE COMPOUND EFFECT ─────────────────────────────
  16: {
    subject: "Sutton Group: small daily actions, disproportionate results",
    bodyFn: () =>
      wrapHtml(`
      <p>Real estate is a compound business.</p>
      <p>The call you make today does not pay today. The follow-up you send this week does not close this week. The relationship you nurture this month does not transact this month.</p>
      <p>But over twelve months, the compounding is staggering.</p>
      <p>Five new conversations per day, every day, becomes 1,250 conversations in a year. Even at a conservative conversion rate, that is dozens of deals you would not otherwise have.</p>
      <p>This is why the top producers seem to have unfair advantages. They do not. They just stacked small consistent actions for years while everyone else was looking for shortcuts.</p>
      <p><strong>Co.Pilot tracks your daily activity and shows you the compounding math on your dashboard.</strong> You will see exactly what each day's work is building toward.</p>
      <p>Visibility is what creates consistency. Sutton agents get it free.</p>
      ${ctaBlock("See My Compounding Math")}
    `),
  },

  // ── EMAIL 17 — THE COACHING ROI DATA ───────────────────────────
  17: {
    subject: "Sutton Group: why coached agents earn 39% more",
    bodyFn: () =>
      wrapHtml(`
      <p>Here is a piece of industry data that should change your behavior.</p>
      <p>According to recent industry research, real estate agents who work with structured coaching average a <strong>39% increase in Gross Commission Income</strong> compared to uncoached peers.</p>
      <p>Not 5%. Not 15%. Thirty-nine percent.</p>
      <p>For an agent earning $100K, that is an extra $39,000 a year. For an agent earning $250K, it is closer to $100,000.</p>
      <p>This is why every elite agent has a coach. They have done the math.</p>
      <p>The friction has always been cost. Quality coaching runs $5,000 to $20,000 a year, and many agents talk themselves out of it.</p>
      <p><strong>Sutton Group eliminated that friction entirely.</strong> Co.Pilot delivers structured coaching, accountability, and performance tracking — included with your career, at no additional cost.</p>
      <p>No other brokerage in Canada has built this. You have it. Use it.</p>
      ${ctaBlock("Claim My 39%")}
    `),
  },

  // ── EMAIL 18 — THE PIPELINE DISCIPLINE ─────────────────────────
  18: {
    subject: "Sutton Group: never have a slow month again",
    bodyFn: () =>
      wrapHtml(`
      <p>Every agent has had this moment.</p>
      <p>You close two deals in a month. Maybe three. The bank account looks healthy. You exhale. You take your foot off the gas for a few weeks.</p>
      <p>Then ninety days later — drought. Empty pipeline. Stress. The panic prospecting begins.</p>
      <p>This cycle is not a personality flaw. It is the predictable result of measuring success by closings instead of by pipeline activity.</p>
      <p>The agents who never have a slow month have learned to measure leading indicators, not lagging ones. Calls made. Contacts initiated. Conversations had. Follow-ups completed.</p>
      <p>Closings are the lagging result. Activity is the leading cause.</p>
      <p><strong>Co.Pilot measures the leading indicators automatically and flags you the moment your activity drops below the level that produces consistent income.</strong></p>
      <p>This is the discipline Sutton Group is handing you. Free.</p>
      ${ctaBlock("End The Roller Coaster")}
    `),
  },

  // ── EMAIL 19 — MICHAEL MAHER NAMED (COACH NAME OK) ─────────────
  19: {
    subject: "Sutton Group: Michael Maher's communication pyramid",
    bodyFn: () =>
      wrapHtml(`
      <p>Michael Maher wrote the book on referral-based real estate, and he built his framework around a simple insight: <strong>not all communication is equal.</strong></p>
      <p>A text message is worth something. An email is worth more. A handwritten card is worth more still. A phone call is worth more than that. A face-to-face conversation is at the top of the pyramid.</p>
      <p>The agents who build referral-rich businesses do not communicate more — they communicate higher up the pyramid, more often.</p>
      <p>One handwritten card to a past client is worth fifty mass-email newsletters.</p>
      <p>This is the kind of insight that changes how you spend your week. Not more touches. Better touches.</p>
      <p><strong>Co.Pilot's relationship capital framework tells you which contacts deserve which level of touch — and when.</strong> It removes the guesswork.</p>
      <p>Sutton agents get it free. The rest of the industry pays thousands.</p>
      ${ctaBlock("Upgrade My Touches")}
    `),
  },

  // ── EMAIL 20 — THE MINDSET REFRAME ─────────────────────────────
  20: {
    subject: "Sutton Group: the agents who break through share one belief",
    bodyFn: () =>
      wrapHtml(`
      <p>After coaching hundreds of agents, I can tell you the breakthrough agents have one thing in common.</p>
      <p>They stopped seeing themselves as salespeople and started seeing themselves as business owners.</p>
      <p>Salespeople think in transactions. Business owners think in systems.</p>
      <p>Salespeople work harder when business slows down. Business owners diagnose the system that produced the slowdown.</p>
      <p>Salespeople wait for the market to be good. Business owners build a business that works in any market.</p>
      <p>This is not a semantic distinction. It is the gap between $100K agents and $500K agents.</p>
      <p><strong>Co.Pilot is built on this premise.</strong> It treats your real estate practice as a business with measurable inputs, predictable outputs, and identifiable leverage points.</p>
      <p>Sutton Group hands you the operating system. You bring the discipline.</p>
      ${ctaBlock("Run My Business Like A Business")}
    `),
  },

  // ── EMAIL 21 — DIRECT INVITATION (FIRST NAME) ──────────────────
  21: {
    subject: "Sutton Group: a personal note",
    bodyFn: (firstName) =>
      wrapHtml(`
      ${greeting(firstName)}
      <p>I have been writing to you for a while now, and I want to switch gears for a moment.</p>
      <p>The Co.Pilot platform is real. It is funded. It is exclusively free for Sutton agents. I built it because I have spent years coaching agents one-on-one and watched the same patterns play out over and over.</p>
      <p>Most agents do not need more information. They need a system that holds them accountable to the work they already know they should be doing.</p>
      <p>That is what Co.Pilot does. And it does it for free, because Sutton Group decided to do something no other brokerage has done.</p>
      <p>If you are ready, the door is open. Sixty seconds gets you started.</p>
      <p>If you are not ready yet, I will keep showing up in your inbox with insights you can use either way.</p>
      <p><strong>Real estate insight of the week:</strong> The cost of doing nothing is rarely zero. Every quarter you delay activating a system that could grow your business is a quarter of compounding you cannot get back.</p>
      <p>I am rooting for you, whichever way you go.</p>
      ${ctaBlock("Activate My Co.Pilot")}
    `),
  },

  // ── EMAIL 22 — THE TIME LEVERAGE TRUTH ─────────────────────────
  22: {
    subject: "Sutton Group: you cannot scale by working more hours",
    bodyFn: () =>
      wrapHtml(`
      <p>There is a hard ceiling on how much you can earn by trading hours for dollars.</p>
      <p>If you are doing every showing, every listing presentation, every follow-up, every contract review, every admin task yourself — you are capped. There are only so many hours in a week.</p>
      <p>The agents who break past $300K, $500K, $1M in GCI all share the same realization: <strong>they had to stop being the bottleneck in their own business.</strong></p>
      <p>That means systems. Templates. Delegation. Hiring. Letting go of work that does not require the agent's specific skills.</p>
      <p>It is uncomfortable. It feels like losing control. It is actually how you gain it.</p>
      <p><strong>Co.Pilot maps your activity against revenue-generating value and shows you exactly which tasks should not be on your plate anymore.</strong> It is the first step toward building a business that scales.</p>
      <p>Sutton Group built it for you. Free.</p>
      ${ctaBlock("Find My Leverage Points")}
    `),
  },

  // ── EMAIL 23 — THE LISTING-FOCUS BIAS ──────────────────────────
  23: {
    subject: "Sutton Group: listings are not always the answer",
    bodyFn: () =>
      wrapHtml(`
      <p>The conventional wisdom in real estate is simple: list more, earn more.</p>
      <p>It is mostly true, but it misses something important.</p>
      <p>Some of the highest-earning agents in the country are not listing machines. They are referral specialists, investor specialists, relocation specialists, or pure buyer's agents who have built deep niches.</p>
      <p>What they all share is not a focus on listings. It is a focus on the specific activities that produce income in <em>their</em> business model.</p>
      <p>This is the insight most coaching programs miss. They prescribe one path for every agent.</p>
      <p><strong>Co.Pilot diagnoses your specific business model and prescribes a strategy built around your strengths — not a generic template.</strong></p>
      <p>The Sutton Group advantage is personalization at no cost. The rest of the industry does not have anything close.</p>
      ${ctaBlock("Get My Personalized Strategy")}
    `),
  },

  // ── EMAIL 24 — THE WEEKLY REVIEW HABIT ─────────────────────────
  24: {
    subject: "Sutton Group: the 30-minute weekly habit that doubles results",
    bodyFn: () =>
      wrapHtml(`
      <p>The single most underused habit in real estate is the weekly business review.</p>
      <p>Thirty minutes. Once a week. Sitting down with your numbers and asking three questions:</p>
      <ol>
        <li>What did I commit to doing this week, and did I do it?</li>
        <li>What worked? What needs to change?</li>
        <li>What are the three highest-value actions for next week?</li>
      </ol>
      <p>That is it. No fancy framework. Just radical honesty with yourself, once a week.</p>
      <p>The agents who do this consistently outpace the ones who do not by orders of magnitude. Not because the review itself is magic — because it forces a level of intentionality that most agents never reach.</p>
      <p><strong>Co.Pilot facilitates this weekly review automatically.</strong> Your dashboard surfaces the numbers, asks the questions, and helps you build next week's plan.</p>
      <p>Sutton built it for you. Use it once and you will never go back.</p>
      ${ctaBlock("Start My Weekly Review")}
    `),
  },

  // ── EMAIL 25 — THE ATOMIC HABITS PRINCIPLE (NO COACH NAMED) ────
  25: {
    subject: "Sutton Group: tiny improvements, massive outcomes",
    bodyFn: () =>
      wrapHtml(`
      <p>One percent better, every day, compounds into thirty-seven times better over a year.</p>
      <p>That number sounds impossible until you do the math. It is not motivational — it is arithmetic.</p>
      <p>The agents who quietly dominate are not the ones making dramatic transformations. They are the ones improving one small thing per week. A better follow-up template. A tighter listing presentation. A new question in their buyer consultations. A cleaner database segmentation.</p>
      <p>None of those changes feels significant in isolation. Stacked over a year, they are transformational.</p>
      <p>This is the principle Co.Pilot is built on. Small, measurable, daily improvements — not heroic overhauls.</p>
      <p><strong>Real estate insight of the week:</strong> The agents who try to change everything at once usually change nothing. The ones who improve one thing per week usually change everything within a year.</p>
      <p>Sutton agents get the framework free. The discipline is on you.</p>
      ${ctaBlock("Start My One-Percent Journey")}
    `),
  },

  // ── EMAIL 26 — THE FINAL INVITATION ────────────────────────────
  26: {
    subject: "Sutton Group: six months of Co.Pilot — where are you?",
    bodyFn: () =>
      wrapHtml(`
      <p>You have received six months of insights from me. Twenty-six emails. Some you opened, some you did not. That is fine.</p>
      <p>But here is the honest math.</p>
      <p>Six months ago, Sutton Group gave you free access to a coaching platform built specifically to grow your real estate business. If you activated it, you have six months of personalized data, coaching directives, and accountability behind you.</p>
      <p>If you did not, you have six months that look exactly like the six months before that.</p>
      <p>Neither path is wrong. But only one of them changes anything.</p>
      <p>I am not going to stop sending these. The insights will keep coming. The platform will keep being free for Sutton agents.</p>
      <p>The only question is whether you decide, today, to use what your brokerage built for you.</p>
      <p><strong>Sixty seconds. One diagnosis. A clear path forward.</strong></p>
      ${ctaBlock("Activate Co.Pilot Now")}
      <p>Either way — keep growing.</p>
    `),
  },
};

function getSuttonPreActivationEmail(step, firstName) {
  // 26 unique emails, cycle after week 26 if agent has not converted
  const totalUnique = Object.keys(EMAILS).length;
  const emailIndex = ((step - 1) % totalUnique) + 1;
  const email = EMAILS[emailIndex];
  if (!email) return null;

  return {
    subject: email.subject,
    html: email.bodyFn(firstName),
    ctaUrl: "https://agentanalysis.kevinlynch.ca",
    campaignType: "pre_activation",
    campaignStep: step,
    cohort: "sutton",
  };
}

module.exports = { getSuttonPreActivationEmail };
