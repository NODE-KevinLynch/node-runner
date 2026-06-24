// src/services/preActivationCampaign.js
// UNIFIED pre-activation sequence — sent to ALL agents who have not completed
// the analysis (no source split). Evergreen, loops indefinitely. The Lynch
// Method / Sutton identity lives in the signature, not in subjects.
//
// Exposed as getPreActivationEmail(step, agentId) — drop-in compatible with the
// dispatcher. Step cycles through the full set via modulo, so the sequence
// repeats forever once complete.

const { buildLegalFooter } = require("../utils/emailFooter");

const SIGNATURE = `
<br><br>
<p style="margin-bottom:8px">To your success,</p>
<table cellpadding="0" cellspacing="0" style="font-family:Georgia,serif;font-size:14px;color:#222;line-height:1.6">
  <tr><td><strong>Kevin Lynch</strong></td></tr>
  <tr><td style="font-style:italic;color:#555">Helping REALTORS Build Their Best Business and Life</td></tr>
  <tr><td>Sutton Centre Realty</td></tr>
  <tr><td style="padding-top:6px"><a href="https://lynchperformancesystems.com" style="color:#1a0dab;font-weight:bold">Try Our Agent Growth System</a></td></tr>
  <tr><td>Lynch Performance Systems</td></tr>
</table>
`;

function ctaBlock(label = "Start My Free Lynch Method Journey") {
  return `<div style="text-align:center;margin:28px 0"><a href="https://analysis.lynchperformancesystems.com" style="display:inline-block;padding:14px 32px;background:#1a2b4a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">${label}</a></div>`;
}

function wrapHtml(body, agentId) {
  const footer = agentId ? buildLegalFooter(agentId) : "";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Georgia,serif;font-size:15px;color:#222;line-height:1.7;max-width:600px;margin:0 auto;padding:24px">
  ${body}
  ${SIGNATURE}
  ${footer}
</body>
</html>`;
}

// Greeting name token used inside bodies as there
const greeting_name = "there";

const EMAIL_BODIES = {
  1: {
    subject: "The 9 coaches behind every top producer — now in your corner",
    body: `<p>Hi there,</p>
  <p>Here's the single biggest predictor of your income next year. It isn't your market, your marketing, or even your experience. It's the number of meaningful conversations you have every day. Top producers protect that number obsessively. Most agents never track it at all.</p>
  <p>That's the kind of thing world-class coaching teaches you to see — and the reason nearly every top-producing agent you admire has a coach, usually several. The barrier has always been access: real coaching is expensive and out of reach for most working REALTORS.</p>
  <p>That's what we set out to fix. The Lynch Method distills the frameworks of the world's top real estate and performance coaches — Tony Robbins, Jeb Blount, Michael Maher, Gary Keller and more — into one personalized growth path built for your business.</p>
  <p>It starts with a free, sixty-second analysis of where your business is leaking time and money, and exactly what to do about it.</p>
  ${ctaBlock()}
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the thing most agents don't realize until it's too late — and how to get ahead of it.</p>`,
  },
  2: {
    subject: "Most agents don't actually know this about their own business",
    body: `<p>Hi there,</p>
  <p>Most agents run their business on instinct. They feel busy, they feel like things are working, and they hope the numbers add up at the end of the year.</p>
  <p>But you can't fix what you can't see. The biggest leaks in a real estate business — the dropped follow-ups, the neglected database, the listings lost to a sharper presentation — are almost always invisible to the person living inside the business.</p>
  <p>The agents who break through are the ones who finally hold their business up to the light and look at it honestly. Not to judge themselves, but to find the one or two changes that move everything.</p>
  <p>That clarity is the whole point of a diagnosis: a clear, outside look at where your business actually stands right now.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: what the highest earners do before 10 AM that decides their whole year.</p>`,
  },
  3: {
    subject: "What the highest earners do before 10 AM",
    body: `<p>Hi there,</p>
  <p>What you do between 8 and 10 AM tends to decide what you earn.</p>
  <p>The highest earners guard that window. Before the day's noise — the texts, the emails, the small fires — can hijack their attention, they spend it on the few activities that actually generate business: prospecting, following up, having real conversations.</p>
  <p>The average agent does the opposite. They open their inbox, react to whatever's loudest, and look up at noon having been busy for hours without moving a single deal forward.</p>
  <p>Your first two hours are the most valuable real estate you own. Protect them like a listing appointment you can't reschedule.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why most agents stay stuck at the same number year after year.</p>`,
  },
  4: {
    subject: "Why most agents stay stuck at the same number every year",
    body: `<p>Hi there,</p>
  <p>Here's a pattern almost no one talks about: most agents earn roughly the same income year after year. Different market, different conditions — same number.</p>
  <p>That's not a market problem. It's a pattern problem. We all build habits, defaults, and ceilings, and without something to interrupt them, this year quietly becomes a copy of last year.</p>
  <p>Breaking the pattern requires seeing it first. What are the three or four things you do — or avoid — that keep capping your results? They're usually invisible from the inside, which is exactly why they persist.</p>
  <p>The agents who finally jump to a new income tier didn't work harder. They identified the pattern and changed it.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: a listing stat that should sting a little — and the fix.</p>`,
  },
  5: {
    subject: "A listing stat that should sting a little",
    body: `<p>Hi there,</p>
  <p>Here's a stat that should sting a little: the average agent wins about one in four listing presentations.</p>
  <p>Sit with that. Three out of every four times an agent sits at a kitchen table, they walk away empty-handed — and usually blame price, or the competition, or the seller.</p>
  <p>The truth is less comfortable and more fixable. Top agents win three of four, and they don't do it on charm. They do it on process: a pre-listing package that pre-sells them, a discovery conversation that uncovers what actually matters, and a presentation that frames the decision instead of begging for it.</p>
  <p>The gap between 1-in-4 and 3-in-4 isn't talent. It's a repeatable system most agents never build.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: are you a hunter or a farmer? Most agents guess wrong about themselves.</p>`,
  },
  6: {
    subject: "Are you a hunter or a farmer?",
    body: `<p>Hi there,</p>
  <p>In real estate there are two kinds of agents.</p>
  <p>Hunters chase. Every month starts near zero, and income depends on how many new deals they can run down. It works — until the day they get tired, sick, or simply can't keep up the chase. Then it stops.</p>
  <p>Farmers cultivate. They plant relationships, tend their database, and harvest a business that compounds year over year. It's slower to start and far more durable once it's growing.</p>
  <p>Most agents are accidental hunters — not by choice, but because no one ever showed them how to farm. The exhausting part isn't the work; it's that hunting never lets you rest.</p>
  <p>Which one are you right now? And which one do you want to be in five years?</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the follow-up gap that's quietly costing you six figures.</p>`,
  },
  7: {
    subject: "The follow-up gap that's costing you six figures",
    body: `<p>Hi there,</p>
  <p>Most leads don't die because they weren't interested. They die in the gap.</p>
  <p>The gap is the space between the first conversation and the fifth, eighth, or twelfth follow-up — the touches almost nobody makes. Studies on this are brutal: the majority of agents quit after one or two attempts, while most deals come together somewhere between the fifth and twelfth.</p>
  <p>That means there's a fortune sitting in your past conversations right now. People who were interested, got busy, and simply never heard from you again.</p>
  <p>Follow-up isn't being pushy. It's being the one professional who actually stayed in touch. And it's very likely the single most profitable habit you're not keeping.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: how many people are in your database right now? The math will surprise you.</p>`,
  },
  8: {
    subject: "How many people are in your database right now?",
    body: `<p>Hi there,</p>
  <p>Let me show you something most agents have never actually calculated.</p>
  <p>On average, people move every seven years. That means in any given year, about one in seven of the people you know is going to move.</p>
  <p>So take a database of 500 people — your phone, your contacts, your sphere. Divide by seven, and roughly 71 of them will move this year.</p>
  <p>Now here's where it gets interesting. About half of those movers will both sell their current home and buy another — two transaction sides each. The other half will do one or the other. Run the math, and 500 contacts represents roughly 105 transaction sides moving this year.</p>
  <p>What is that worth? Depending on your average price and commission:</p>
  <ul style="margin:8px 0 8px 0;padding-left:20px"><li style="margin-bottom:6px">At $800K and 2.5%, that's about $20,000 a side — roughly $2.1M in total potential commission.</li><li style="margin-bottom:6px">At $1.2M and 2.75%, about $33,000 a side — roughly $3.5M.</li><li style="margin-bottom:6px">At $1.6M and 3%, about $48,000 a side — roughly $5M.</li></ul>
  <p>No one captures all of it, of course. But imagine capturing even 10 to 20 percent of the business already sitting inside your own phone. That's a six-figure year from people who already know you — if you stay in front of them.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why your database is worth more than your next deal.</p>`,
  },
  9: {
    subject: "Your database is worth more than your next deal",
    body: `<p>Hi there,</p>
  <p>Yesterday we did the math on what's moving through your database. Today, the mindset shift behind it.</p>
  <p>Most agents treat their database as a list — names to maybe email someday. Top agents treat it as an asset: an appreciating, income-producing asset that, tended properly, outperforms almost anything else they could chase.</p>
  <p>Here's the irony. Agents will spend hundreds of dollars and countless hours chasing cold strangers while ignoring the warm relationships already in their phone — people who know them, trust them, and will move whether or not the agent stays in touch.</p>
  <p>Your next deal is worth one commission. Your database, worked consistently, is worth a career.</p>
  <p>Stop hunting strangers long enough to tend what you already have.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the rule top producers swear by — and why your pipeline runs a quarter behind your effort.</p>`,
  },
  10: {
    subject: "The 90-day rule: why your pipeline runs a quarter behind your effort",
    body: `<p>Hi there,</p>
  <p>Here's something that catches almost every agent off guard at least once: your pipeline runs about a quarter behind your effort.</p>
  <p>The work you do today — the calls, the follow-ups, the relationships you nurture — usually doesn't show up as closed business for roughly 90 days. There's a lag between the action and the result.</p>
  <p>That lag is why slow months feel like they come from nowhere. They don't. A dead month in the spring is almost always the echo of a quiet stretch the previous winter, when prospecting slipped and no one noticed.</p>
  <p>Once you understand the 90-day rule, two things change. You stop panicking about a slow week, and you stop ever fully turning off the prospecting tap — because you know today's effort is funding three months from now.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the same rule from the other side — the discipline that keeps the pipeline full.</p>`,
  },
  11: {
    subject: "The discipline behind the 90-day rule",
    body: `<p>Hi there,</p>
  <p>Yesterday: your pipeline runs about a quarter behind your effort. Today: what to do about it.</p>
  <p>If results lag 90 days behind the work, then the only safe way to run a business is to prospect consistently — not in panicked bursts when the pipeline runs dry, but steadily, every week, regardless of how busy you feel right now.</p>
  <p>This is where most agents get caught. They prospect hard when business is slow, close a few deals, get busy with those clients, stop prospecting entirely — and then, about 90 days later, fall off a cliff they built themselves.</p>
  <p>The fix isn't more intensity. It's consistency. A protected block of prospecting every single week, in good months and busy ones, so the quarter ahead is always being fed.</p>
  <p>Boring? A little. But it's the difference between a business that lurches and one that compounds.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: you're probably stronger than you think — but blind in one area.</p>`,
  },
  12: {
    subject: "You're stronger than you think — but blind in one area",
    body: `<p>Hi there,</p>
  <p>Most agents are harder on themselves than they need to be. You're likely better at more parts of this business than you give yourself credit for.</p>
  <p>But almost every agent has one blind spot — a single area, often invisible to them, that quietly caps everything else. Maybe it's follow-up. Maybe it's pricing conversations. Maybe it's that the database hasn't been touched in a year.</p>
  <p>Here's what makes a blind spot dangerous: by definition, you can't see it. You can be excellent at nine things and have the tenth silently holding your income flat.</p>
  <p>The fastest growth rarely comes from getting better at what you're already good at. It comes from finding the one weak link and fixing it. The hard part is simply seeing it — which is exactly what an honest outside look gives you.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the one number that predicts your income next year.</p>`,
  },
  13: {
    subject: "The one number that predicts your income next year",
    body: `<p>Hi there,</p>
  <p>If you could track only one number in your business, this would be the one: the count of meaningful conversations you have each day.</p>
  <p>Not emails sent. Not hours worked. Not listings posted. Real conversations — with past clients, prospects, your sphere — about real estate, their plans, their lives.</p>
  <p>It's the closest thing this business has to a crystal ball. String together enough meaningful conversations day after day, and deals become inevitable. They have to go somewhere.</p>
  <p>Most agents never track this because it forces a hard truth: on the days they felt "busy," they may have had almost no real conversations at all.</p>
  <p>Pick a number. Five a day. Ten. Track it like your income depends on it — because it does.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why top agents win three of four listings.</p>`,
  },
  14: {
    subject: "Why top agents win three of four listings",
    body: `<p>Hi there,</p>
  <p>We talked about the agent who wins one in four. Now the other end.</p>
  <p>Top listing agents win roughly three of four — and it isn't because they're more likeable or better dressed. It's because they've built a system around the listing appointment, while everyone else improvises.</p>
  <p>It usually has three parts. A pre-listing package that arrives before they do, so the seller is half-sold before the meeting starts. A discovery conversation that uncovers what actually matters to the seller — not what the agent assumes matters. And a presentation that frames the decision and asks for it, instead of dumping information and hoping.</p>
  <p>None of that is talent. All of it is process — and process can be learned, sharpened, and repeated until three-of-four is simply what you do.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the difference between having a goal and having a plan.</p>`,
  },
  15: {
    subject: "You don't have a plan. You have a goal.",
    body: `<p>Hi there,</p>
  <p>Most agents will tell you they have a plan. Press a little, and what they actually have is a goal.</p>
  <p>"I want to do thirty deals this year." That's a goal. A wish with a number on it. It says nothing about what happens on a Tuesday morning.</p>
  <p>A plan is different. A plan works backward from the goal to the daily actions that produce it. Thirty deals means a certain number of conversations, which means a certain amount of prospecting, which means specific blocks on specific days. The goal lives in the future; the plan lives in your calendar.</p>
  <p>You don't need a thirty-page business plan. You need one page that connects what you want to what you'll do tomorrow morning. That single page outperforms every vague ambition you've ever set.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: what Tony Robbins understands about results that most goal-setters miss.</p>`,
  },
  16: {
    subject: "What Tony Robbins understands about results",
    body: `<p>Hi there,</p>
  <p>Tony Robbins built a career on a deceptively simple idea: most people set goals around what they want to have, not who they need to become.</p>
  <p>It matters more than it sounds. An agent who wants to "make more money" but still thinks of themselves as someone who hates prospecting, avoids hard conversations, and works in reactive bursts will drift back to their old numbers every time. The identity pulls the behavior back.</p>
  <p>The agents who transform don't just chase a bigger number. They become a different kind of professional — someone who prospects without drama, follows up relentlessly, and runs their day on purpose. The results follow the identity, not the other way around.</p>
  <p>So the real question underneath your income goal is this: who would you have to become for that number to be normal?</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the prospecting rule that kills desperation for good.</p>`,
  },
  17: {
    subject: "The prospecting rule that kills desperation",
    body: `<p>Hi there,</p>
  <p>Jeb Blount built his entire career on one principle: consistent prospecting prevents desperation.</p>
  <p>Desperation is the silent killer in real estate. The desperate agent takes bad listings, caves on commission, chases unqualified buyers, and radiates a neediness that clients can feel from across the room. And desperation almost always traces back to one thing — an empty pipeline.</p>
  <p>The antidote isn't a better script or a slicker close. It's a full pipeline, kept full through steady, fanatical prospecting. When you always have business coming, you negotiate from strength. You can say no. You can be selective. You become the calm professional instead of the anxious one.</p>
  <p>Prospecting isn't just how you find deals. It's how you protect your confidence — and your standards.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why busy is not the same as productive.</p>`,
  },
  18: {
    subject: "Busy is not the same as productive",
    body: `<p>Hi there,</p>
  <p>This one stings a little, but it needs saying: the busiest agents are rarely the most successful ones.</p>
  <p>Busy feels like progress. The full calendar, the constant pings, the sense of always running — it all feels like the work of someone who's winning. But motion isn't the same as progress. You can spend an entire day in frantic activity and not move a single deal closer to closing.</p>
  <p>Productive agents are often less visibly busy. They've ruthlessly cut the low-value motion — the busywork, the meetings that go nowhere, the "organizing" that's really just avoidance — and protected their time for the few activities that generate income.</p>
  <p>Audit an honest week sometime. How much of your "busy" actually produces business? For most agents, the answer is uncomfortable — and it's the doorway to a better year.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why top producers measure obsessively — and average ones avoid it.</p>`,
  },
  19: {
    subject: "Top producers measure. Average producers avoid it.",
    body: `<p>Hi there,</p>
  <p>Here's an uncomfortable divide. Top producers measure their business obsessively. Average producers avoid measuring almost entirely.</p>
  <p>It's not laziness. Measurement creates accountability, and accountability creates pressure to change — which is uncomfortable. So the average agent quietly avoids looking at their conversion rate, their database activity, their real numbers, because not knowing feels safer than knowing.</p>
  <p>But here's the truth worth sitting with: the gap between where you are and where you want to be exists whether you measure it or not. Refusing to look doesn't shrink it. It just keeps it hidden, and unfixable.</p>
  <p>The agents who grow make peace with measurement. They'd rather face an uncomfortable number than be quietly capped by one they refused to see.</p>
  ${ctaBlock()}
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: how to build a business that runs on relationships instead of hustle.</p>`,
  },
  20: {
    subject: "Build a business that runs on relationships, not hustle",
    body: `<p>Hi there,</p>
  <p>Hustle has a ceiling. Relationships compound.</p>
  <p>A business built purely on hustle depends entirely on your energy. The day you slow down — vacation, illness, burnout, simply getting older — the income slows with you. You are the engine, and engines wear out.</p>
  <p>A business built on relationships works differently. Past clients refer you. Your sphere thinks of you first. The work you did years ago keeps producing, because trust doesn't expire the way a marketing budget does.</p>
  <p>This is the quiet shift that separates a job from an asset. The hustle-driven agent starts near zero every month. The relationship-driven agent harvests what they planted seasons ago — and the harvest grows every year they keep planting.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the data on why coached agents earn 39% more.</p>`,
  },
  21: {
    subject: "Why coached agents earn 39% more",
    body: `<p>Hi there,</p>
  <p>Here's a piece of industry data worth changing your behavior over: agents who work with a coach significantly outearn those who don't — by margins that have been measured as high as 39 percent.</p>
  <p>Now, why? It's tempting to assume coached agents simply learn more. But that's not really it. Most agents already know what they should be doing — prospect consistently, follow up, work the database, run a plan. Knowledge has never been the bottleneck.</p>
  <p>The difference is accountability. A coach turns "I should" into "I did," because someone is going to ask. That single dynamic — knowing you'll have to answer for the work — closes the gap between intention and action that quietly costs the average agent a fortune.</p>
  <p>You probably don't need more information. You need a system that holds you to what you already know.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: Michael Maher's communication pyramid — why not all client contact is equal.</p>`,
  },
  22: {
    subject: "Michael Maher's communication pyramid",
    body: `<p>Hi there,</p>
  <p>Michael Maher wrote the book on referral-based real estate, and he built his framework on a simple insight: not all communication is equal.</p>
  <p>Most agents, when they do stay in touch, default to the weakest forms — a mass email, a generic market update, a social post broadcast to everyone. It feels productive. It barely registers.</p>
  <p>Maher's pyramid ranks communication by relationship impact. At the bottom: the low-effort, low-connection mass touches. Higher up: a personal note, a phone call, a handwritten card. At the very top: meeting in person. The higher you climb, the more relationship and referral each touch generates.</p>
  <p>The lesson isn't to abandon the easy touches. It's to stop mistaking them for real connection — and to make sure your best relationships get your best, highest-level communication.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why small daily actions create disproportionately large results.</p>`,
  },
  23: {
    subject: "Why small daily actions create disproportionate results",
    body: `<p>Hi there,</p>
  <p>Real estate is a compound business, and most agents drastically underestimate what that means.</p>
  <p>Compounding feels like nothing in the moment. One follow-up call. One database note. One handwritten card. On any given day, skipping it costs you nothing you can see. That's exactly the trap.</p>
  <p>But stack those tiny actions over a year, and they don't add — they multiply. The relationships deepen, the referrals start arriving, the pipeline fills, and one day you look up at a business that feels effortless and wonder how you got there.</p>
  <p>The agents who win this game aren't doing heroic things on big days. They're doing small, almost forgettable things on ordinary days, relentlessly, while everyone else waits for motivation.</p>
  <p>Disproportionate results come from unremarkable consistency.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the actual math — how one percent better every day compounds.</p>`,
  },
  24: {
    subject: "1% better every day = 37x better in a year",
    body: `<p>Hi there,</p>
  <p>Yesterday, the principle. Today, the math — because it's almost hard to believe.</p>
  <p>Improve by just one percent a day, and the gains compound to roughly thirty-seven times better over a single year. One percent. The smallest improvement you could plausibly make, repeated, becomes a transformation.</p>
  <p>Run it the other way and it's a warning. One percent worse every day, and you decline to nearly nothing over the same year. The tiny choices aren't neutral — they're quietly building or eroding your business while you're not watching.</p>
  <p>This is freeing once it lands. You don't need a dramatic overhaul. You need one small improvement, made consistently — one more conversation, one better follow-up, one habit upgraded — and time does the rest.</p>
  <p>The compounding is real. The only question is which direction you point it.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the follow-up most agents quit far too early.</p>`,
  },
  25: {
    subject: "The follow-up most agents quit too early",
    body: `<p>Hi there,</p>
  <p>We've touched on follow-up before, but this angle is worth its own email, because it's where so much money leaks.</p>
  <p>The research is consistent and brutal: most agents quit following up after one or two attempts. Most deals, meanwhile, come together somewhere between the fifth and twelfth touch. Look at those two numbers together and the problem is obvious — agents stop precisely where the business begins.</p>
  <p>Why do they quit? It feels awkward. They assume silence means no. They don't want to be "annoying." So they walk away from people who were genuinely interested and simply needed more time.</p>
  <p>Persistence isn't being pushy. The person who keeps showing up — helpfully, patiently, without pressure — is the professional who eventually earns the deal, while everyone else assumed it was dead.</p>
  <p>The fortune is in the follow-up almost nobody finishes.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the one question that separates growing agents from stuck ones.</p>`,
  },
  26: {
    subject: "The one question that separates growing agents from stuck ones",
    body: `<p>Hi there,</p>
  <p>There's one question I ask every agent I coach, and their answer tells me almost everything: "What are the three activities that actually drive your business — and how much of your week do you spend on them?"</p>
  <p>Growing agents answer fast. They know their drivers cold, and they've built their week around protecting them. Stuck agents go quiet. They've never separated the activities that produce income from the ones that merely fill time — so everything feels equally urgent and nothing gets prioritized.</p>
  <p>The clarity is the difference. When you know your three real drivers, every "yes" and "no" on your calendar gets easier. When you don't, you're at the mercy of whatever's loudest.</p>
  <p>So — what are your three? And does your last week actually reflect them?</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the single habit, not decision, that separates growing agents from stuck ones.</p>`,
  },
  27: {
    subject: "The habit that separates growing agents from stuck ones",
    body: `<p>Hi there,</p>
  <p>Yesterday we asked the question. Today, the habit underneath it — because the growing-versus-stuck divide is rarely one big decision. It's a small recurring one.</p>
  <p>Stuck agents make their drivers negotiable. Prospecting happens if there's time. Follow-up happens when they remember. The database gets touched when business is slow. Everything important is optional, so everything important eventually slides.</p>
  <p>Growing agents make their drivers non-negotiable. The prospecting block is in the calendar like an appointment they can't move. The weekly review happens every week, busy or not. They've removed the daily decision of whether to do the work — because they decided once, and built the habit.</p>
  <p>Motivation is unreliable. Habits aren't. The agents who compound simply stopped renegotiating the basics every morning.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: how to make sure you never have a slow month again.</p>`,
  },
  28: {
    subject: "Never have a slow month again",
    body: `<p>Hi there,</p>
  <p>Every agent has had the moment. A month opens up with almost nothing in the pipeline, and that quiet dread sets in — the scramble, the discounting, the desperate energy clients can smell.</p>
  <p>Here's the reframe that ends it: a slow month is never a this-month problem. It's a lagging symptom of prospecting you skipped weeks or months ago. Remember the rule — your pipeline runs about a quarter behind your effort. The dry month you're panicking about was written into existence by a quiet stretch you barely noticed at the time.</p>
  <p>Which means the cure isn't a frantic burst of activity now. It's consistency then — steady prospecting in the good months, so the lean ones never arrive.</p>
  <p>Fix the input, on a schedule, in every season, and the slow month simply stops showing up.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the 30-minute weekly habit that quietly doubles results.</p>`,
  },
  29: {
    subject: "The 30-minute weekly habit that doubles results",
    body: `<p>Hi there,</p>
  <p>The single most underused habit in real estate is also one of the simplest: a weekly business review. Thirty minutes, once a week, every week.</p>
  <p>Here's what it does. You look back at the week — what you actually did, the conversations you had, the numbers that moved. Then you look forward — what matters most in the week ahead, and where your protected time blocks go. That's it. Reflect, measure, plan.</p>
  <p>Most agents never do this. They run week to week on momentum and memory, reacting to whatever lands in front of them, never stepping back to steer. So they drift.</p>
  <p>Thirty minutes of steering a week is the difference between a business that runs you and one you run. It's the highest-ROI half hour on your calendar, and almost nobody books it.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: a contrarian one — why more listings isn't always the answer.</p>`,
  },
  30: {
    subject: "\"List more, earn more\" isn't always true",
    body: `<p>Hi there,</p>
  <p>The conventional wisdom in real estate is simple: list more, earn more. Most of the time it's right. But not always — and the exception matters.</p>
  <p>Chase every possible listing and you can end up scattered: spread thin across too many clients, none of them served well, your best relationships neglected while you run after marginal ones. Volume for its own sake can quietly lower your standards, your service, and your reputation.</p>
  <p>Sometimes the more profitable move is focus. Fewer, better-fit clients. Deeper relationships that refer. A reputation for excellence rather than ubiquity. The agent who serves forty clients brilliantly often outearns — and outlasts — the one who served eighty adequately.</p>
  <p>More isn't automatically better. Better is better. Sometimes the path to a bigger business is being more selective, not less.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why you can't scale by simply working more hours.</p>`,
  },
  31: {
    subject: "You can't scale by working more hours",
    body: `<p>Hi there,</p>
  <p>There's a hard ceiling on how much you can earn by trading hours for dollars, and most agents slam into it without realizing what it is.</p>
  <p>You can work harder. Skip lunch, answer at midnight, give up your weekends. It buys you a little more — until it doesn't, because you eventually run out of hours and out of yourself. Hustle alone always tops out, usually right around burnout.</p>
  <p>The agents who break past the ceiling stop trying to do more and start building leverage. Systems that handle repetitive work. Processes that don't require them personally. Eventually, people. A database that produces without a fresh push every time.</p>
  <p>Leverage is the only real path up. More hours gets you to the ceiling faster. Building systems is how you raise the ceiling itself.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the single belief every breakthrough agent shares.</p>`,
  },
  32: {
    subject: "The single belief every breakthrough agent shares",
    body: `<p>Hi there,</p>
  <p>After coaching hundreds of agents, I can tell you the breakthrough ones share something — and it's not a technique, a script, or a market. It's a belief.</p>
  <p>They believe their results are theirs to own. Not the market's fault, not the leads' fault, not the brokerage's fault — theirs. That sounds harsh, but it's the most empowering belief in this business, because if your results are yours, then they're also yours to change.</p>
  <p>The stuck agent quietly externalizes. The market is slow, the leads are bad, rates are high. Each may even be true — and each hands away the one thing that could actually help: ownership.</p>
  <p>The breakthrough agent takes it back. They ask "what can I do differently?" instead of "why is this happening to me?" — and that single shift changes everything that follows.</p>
  ${ctaBlock()}
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: something a little more personal.</p>`,
  },
  33: {
    subject: "A personal note",
    body: `<p>Hi there,</p>
  <p>Let me switch gears for a moment and be straight with you.</p>
  <p>I've spent years coaching agents one-on-one, and I've watched the same thing play out over and over. It's rarely a knowledge problem. The agents who struggle usually know exactly what they should be doing. What they're missing is a system that holds them to it — something that turns good intentions into consistent action, week after week.</p>
  <p>That's the whole reason any of this exists. Not more information to file away, but a structure that keeps you accountable to the work you already know matters.</p>
  <p>If you're ready, the door is open — it starts with a sixty-second look at where your business actually stands. And if you're not ready yet, that's fine too. I'll keep showing up in your inbox with things you can use either way.</p>
  ${ctaBlock()}
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: why the cost of doing nothing is almost never zero.</p>`,
  },
  34: {
    subject: "The cost of doing nothing is rarely zero",
    body: `<p>Hi there,</p>
  <p>Most agents treat inaction as neutral. Waiting, thinking it over, getting to it later — it all feels free. It's the most expensive belief in this business.</p>
  <p>The cost of doing nothing is rarely zero. Every quarter you delay building a real system is a quarter of compounding you don't get back. The listings that went to a more organized agent. The referrals you never asked for. The database that kept cooling while you meant to get to it. None of that shows up as a bill, which is exactly why it's so easy to ignore.</p>
  <p>Standing still feels safe. It isn't. In a compounding business, standing still is slowly falling behind the agents who started planting seasons ago.</p>
  <p>The most expensive decision is almost always the one you keep postponing.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: a concrete look at what a high earner does before 10 AM.</p>`,
  },
  35: {
    subject: "What a $500K agent does differently before 10 AM",
    body: `<p>Hi there,</p>
  <p>Earlier we talked about protecting your mornings. Here's what it actually looks like for an agent producing at a high level — because the routine is more ordinary than you'd expect.</p>
  <p>They don't open their inbox first. Email is other people's agenda; they don't hand over their best hours to it. Instead the first block is prospecting and follow-up — live conversations, the activities that generate business — before the day can fill with reaction.</p>
  <p>There's a plan already written, usually the night before or in a weekly review, so the morning isn't spent deciding what to do. The time-blocks are set. The phone is a tool, not a leash. And the hardest, highest-value work happens first, while the energy and focus are sharpest.</p>
  <p>None of it is exotic. It's just deliberate. The $500K morning isn't busier than yours — it's pointed.</p>
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: the honest math two agents face after a year.</p>`,
  },
  36: {
    subject: "The honest math two agents face after a year",
    body: `<p>Hi there,</p>
  <p>Let me leave you with the honest math.</p>
  <p>Picture two agents starting the year in exactly the same place — same market, same skills, same database. One builds a system: tracks their conversations, runs a weekly review, works a real plan, prospects consistently. The other stays busy, works hard, and trusts it'll all work out.</p>
  <p>From the outside, their effort looks nearly identical. Both are putting in the hours. But a year later their results aren't close — not because one had more talent or luck, but because one had a system turning effort into consistent action, and the other had only good intentions and a full calendar.</p>
  <p>That's the whole difference between the agents who compound and the agents who plateau. Not hustle. Not talent. A system underneath the work.</p>
  <p>The good news: a system is buildable, starting with one honest look at where you stand.</p>
  ${ctaBlock()}
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. Next: where to actually start — because the compounding only works if you begin.</p>`,
  },
  37: {
    subject: "Tiny improvements, massive outcomes — where to start",
    body: `<p>Hi there,</p>
  <p>We've covered a lot together: the database math, the 90-day lag, the follow-up gap, the one number that predicts your income, the belief that breakthrough agents share. If it feels like a lot, here's the relief — you don't have to do it all.</p>
  <p>The whole point of compounding is that you don't need a dramatic overhaul. You need one small improvement, made consistently, and time multiplies it. One more conversation a day. One follow-up you used to skip. One protected prospecting block a week.</p>
  <p>Pick one. Just one. Start it this week and let it compound while you add the next.</p>
  <p>But the compounding only works if you begin — and the clearest place to begin is knowing exactly where your business stands right now. Sixty seconds will tell you which small improvement would move the most.</p>
  ${ctaBlock()}
  <p style="color:#555;font-style:italic;margin-top:18px">P.S. There's always another insight coming — keep an eye on your inbox.</p>`,
  },
};

/**
 * Returns the unified pre-activation email for a given step.
 * Cycles through all emails via modulo so the sequence loops forever.
 * @returns {object|null} { subject, html, ctaUrl, campaignType, campaignStep }
 */
function getPreActivationEmail(step, agentId) {
  const totalUnique = Object.keys(EMAIL_BODIES).length;
  const emailIndex = ((step - 1) % totalUnique) + 1;
  const email = EMAIL_BODIES[emailIndex];
  if (!email) return null;
  return {
    subject: email.subject,
    html: wrapHtml(email.body, agentId),
    ctaUrl: "https://analysis.lynchperformancesystems.com",
    campaignType: "pre_activation",
    campaignStep: step,
  };
}

module.exports = { getPreActivationEmail };
