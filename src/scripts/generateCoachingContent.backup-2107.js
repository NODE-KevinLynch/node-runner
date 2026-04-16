// src/scripts/generateCoachingContent.js
// Kevin Lynch Coaching Intelligence Layer — Compassionate Authority Voice
// Run: node src/scripts/generateCoachingContent.js

"use strict";

const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("openclaw.db");

// ---------------------------------------------------------------------------
// SIGNAL READER
// ---------------------------------------------------------------------------

function readSignals(responsesJson, scoreJson, bottleneck, campaignId) {
  let responses = {};
  let scores = {};
  try {
    responses = JSON.parse(responsesJson || "{}");
  } catch {}
  try {
    scores = JSON.parse(scoreJson || "{}");
  } catch {}
  return {
    leadFlow: responses.lead_flow || null,
    followUp: responses.follow_up || null,
    databaseSize: responses.database_size || null,
    phoneComfort: responses.phone_comfort || null,
    businessModel: responses.business_model || null,
    goalVsSchedule: responses.goal_vs_schedule || null,
    agentStyle: responses.agent_style || null,
    leadEngineScore: scores.lead_engine || 0,
    foundationScore: scores.foundation || 0,
    pipelineScore: scores.pipeline_repair || 0,
    conversionScore: scores.conversion || 0,
    bottleneck: bottleneck || null,
    campaignId: campaignId || null,
    hasResponses: Object.keys(responses).length > 0,
    hasScores: Object.keys(scores).length > 0,
  };
}

// ---------------------------------------------------------------------------
// PROGRESSION LADDER
// ---------------------------------------------------------------------------

function selectTacticTier(engagementScore) {
  const score = engagementScore || 0;
  if (score < 40) return "foundational_repair";
  if (score <= 75) return "systems_consistency";
  return "leverage_expansion";
}

// ---------------------------------------------------------------------------
// TONE LOCK — Compassionate Authority
// Struggling agents get support and validation.
// High performers with weak signals get a protective hard truth.
// ---------------------------------------------------------------------------

function selectTone(engagementScore, signals) {
  const score = engagementScore || 0;
  const isComplacent =
    score > 75 &&
    (signals.followUp === "weak" || signals.leadFlow === "inconsistent");

  if (isComplacent) return "Hard Truth";
  if (score < 40) return "Extreme Support";
  if (score <= 75) return "Direct & Structured";
  return "High Performance";
}

// ---------------------------------------------------------------------------
// WEEKLY OBJECTIVE — bottleneck + tier specific
// ---------------------------------------------------------------------------

function deriveWeeklyObjective(bottleneck, tier) {
  const objectives = {
    lead_engine: {
      foundational_repair:
        "5 meaningful database contacts per day this week — calls, texts, or notes. No exceptions. This is the rhythm that restarts everything.",
      systems_consistency:
        "10 new sphere conversations this week. Not broadcasts — real, two-way exchanges with people who already know you.",
      leverage_expansion:
        "Launch one additional lead channel this week alongside your existing sphere activation. Document the process so it runs without you.",
    },
    pipeline_repair: {
      foundational_repair:
        "Contact every Hot lead in your pipeline before Friday. Not email — a call. One conversation this week can change your month.",
      systems_consistency:
        "20 meaningful follow-up contacts this week. Track every one. A two-way exchange counts; a voicemail does not.",
      leverage_expansion:
        "Build and activate a 5-step automated follow-up sequence for your Warm leads. Your follow-up system should work even when you are in appointments.",
    },
    foundation: {
      foundational_repair:
        "Map your entire business on one page by Wednesday — lead sources, conversion rates, average commission, monthly target. Clarity before action.",
      systems_consistency:
        "Document one repeatable process this week. Choose the one you do most often and build the standard for it.",
      leverage_expansion:
        "Identify and eliminate or delegate one task this week that falls below your effective hourly rate. Protect your highest-value time.",
    },
    conversion: {
      foundational_repair:
        "Practice your value proposition out loud 10 times this week — in the mirror, to a colleague, recorded on your phone. Repetition builds certainty.",
      systems_consistency:
        "Conduct 2 full consultations using your refined positioning opening. Debrief each one within 24 hours.",
      leverage_expansion:
        "Complete your Authority Stack this week — 3 proof pieces ready to share before every appointment. Let your results do the talking.",
    },
  };

  const key = bottleneck?.toLowerCase().trim();
  return (
    objectives[key]?.[tier] ||
    "Complete your top 3 revenue-generating actions before noon every day this week. Protect that time like an appointment."
  );
}

// ---------------------------------------------------------------------------
// COACHING TRACKS
// Maps business_style to strategy archetype.
// ---------------------------------------------------------------------------

const COACHING_TRACKS = {
  relationship: {
    archetype: "Sphere Saturation",
    core_belief:
      "Your warmest pipeline is already in your phone. Activate it before building anything new.",
  },
  transactional: {
    archetype: "Direct Market Authority",
    core_belief:
      "Volume without conversion is activity without income. Sharpen the close.",
  },
  discipline: {
    archetype: "Pipeline Discipline",
    core_belief:
      "Consistency is the skill. Systems make consistency possible without willpower.",
  },
  hybrid: {
    archetype: "Balanced Growth",
    core_belief:
      "Relationship capital and disciplined follow-up are not opposites — they are the same system at different stages.",
  },
};

// ---------------------------------------------------------------------------
// PROFILE CONTENT LIBRARY
// Five profiles. Each has tiered tactics (foundational / systems / leverage).
// Truth sections open with compassion, pivot to the gap.
// Hard truth always ties back to agent objectives.
// Language: Gap, Bottleneck, Rhythm, Potential — never Bad or Failing.
// ---------------------------------------------------------------------------

const PROFILES = {
  sphere_saturation: {
    character_type: "The Connector",
    focus: "Sphere Activation & Relationship Capital",

    truth: {
      standard: `Building a real estate business from the ground up — or rebuilding momentum after a slow stretch — is genuinely hard work. The fact that you are here, looking at this honestly, already puts you ahead of most. What the System sees in your results is not a talent gap. It is a relationship activation gap. The people who already know you, like you, and trust you are your fastest path forward. That pipeline exists. It is just not fully awake yet.`,
      hard_truth: `You have built something real. The relationships are there, the reputation is there, and the potential is clear. But here is what your goals are telling us: the pace of activation does not match the pace your objectives require. This is not a criticism — it is a signal. The people in your sphere who could refer you business this month will not do so unless they hear from you consistently. That rhythm is the gap between where you are and where your goals say you want to be. We are going to close it.`,
    },

    strategy: `The highest-leverage move in your business right now is depth, not breadth. Before adding a single new lead source, you will saturate your existing sphere with consistent, value-driven contact. When the people in your world think of real estate — for themselves, for a friend, for a colleague — your name is the only one that comes to mind. That is not luck. It is frequency.`,

    tactics: {
      foundational_repair: [
        `Identify your top 20 relationships right now — past clients, close personal contacts, anyone who has referred you before. These are your foundation. Call 3 of them today. Not to prospect. Not to pitch. To genuinely connect. Ask how they are. Share something relevant to their life. Plant the seed simply by being present.`,
        `Set a non-negotiable daily contact goal for this week: 5 database reach-outs per day. Calls, handwritten notes, personal texts. Not mass emails. Personal contact. Do this for 5 consecutive days and track every exchange. You will be surprised what surfaces.`,
        `Write down the names of 5 people in your sphere who you have not spoken to in over 90 days. Those are your first calls. Reconnection is not awkward when it comes from a genuine place — and a genuine place is exactly where this system starts.`,
      ],
      systems_consistency: [
        `Build your A-list: 30 people who know you well, trust you, and are likely to refer or transact. Create a 33-touch annual plan for this group. Every person on your A-list should hear from you at least once per month through a rotating mix of calls, notes, market updates, and personal touchpoints.`,
        `Create one piece of personal market content this week — a 60-second voice note or video with one real insight about your local market. Send it individually to 10 people on your A-list with a personal message. "I thought of you when I saw this" travels further than any broadcast.`,
        `Set a standing Relationship Hour every Friday afternoon — 60 minutes of pure outreach to your sphere. No pitch. No agenda. Just presence. Block it. Protect it. It will become the most consistent lead-generating hour of your week.`,
      ],
      leverage_expansion: [
        `Your sphere is engaged. Now systematize it. Build a referral request protocol — a natural, comfortable way to ask for introductions at the right moment in every client relationship. Practice it until it feels like a conversation, not a script.`,
        `Identify your top 5 referral sources — the people who have sent you business more than once. Schedule a personal meeting or call with each of them this month. Deepen the relationship. Find out what they need. Bring them value before you ask for anything.`,
        `Launch one community presence initiative this month — a neighbourhood event, a local partnership, a social presence focused on one geographic area. Your goal is to become the name people associate with their community, not just their transaction.`,
      ],
    },

    supporting_actions: [
      `Add 10 new contacts to your database this week from your existing network — neighbours, service providers, social contacts not yet logged.`,
      `Categorize your full database into A (high trust), B (warm), and C (cold). Focus all personal energy on A this month.`,
      `Write 5 handwritten notes this week to past clients. No agenda. Just gratitude and genuine connection.`,
      `Track every referral conversation you generate for the next 30 days. Knowing your referral rate is the beginning of improving it.`,
    ],

    top_action: `Call 5 people from your existing database today — not to prospect, but to genuinely reconnect. The next deal you close is likely already in your phone. This call is the first step toward it.`,
    daily_ritual: `Every morning, before any administrative work, identify 3 people to contact that day. One past client. One sphere contact. One referral source. Those 3 contacts happen before noon.`,
  },

  pipeline_discipline: {
    character_type: "The Closer",
    focus: "Follow-Up Systems & Pipeline Conversion",

    truth: {
      standard: `Managing a pipeline while trying to prospect, serve clients, and run a business is a real juggling act — and most agents drop the follow-up ball not because they do not care, but because no system exists to catch it. What the data shows is not a motivation gap. It is a rhythm gap. The leads are there. The potential is there. What is missing is a consistent follow-up structure that runs independent of how your week is going. That is exactly what the System builds.`,
      hard_truth: `You have worked hard to build a pipeline. That effort deserves to be rewarded — and right now, it is not being fully converted. This is not about effort. It is about the gap between the leads entering your funnel and the conversations that should be happening on the back end. Your goals require a higher conversion rate than your current follow-up rhythm is producing. The System is going to close that gap — not by adding more to your plate, but by building a structure that protects your potential.`,
    },

    strategy: `The System is going to install a follow-up rhythm that runs whether you feel like it or not. The highest-converting agents are not more motivated than you — they have built infrastructure that makes consistent follow-up the path of least resistance. We are going to build that infrastructure in your business this week.`,

    tactics: {
      foundational_repair: [
        `Audit your pipeline today — right now, before anything else. Every lead gets a category: Hot (deciding in 30 days), Warm (60-90 days), Long-term (6+ months). If you cannot categorize a lead, your first step is a call to find out where they stand. You cannot manage what you have not measured.`,
        `Every Hot lead in your pipeline gets a personal call this week. Not a text. Not an email. A call. Some of those conversations will surprise you. The leads you assumed were cold may simply be waiting to hear from you again.`,
        `Block 60 minutes tomorrow morning exclusively for follow-up calls. No email. No admin. One hour of focused outreach. Do this three times this week. Notice how your pipeline feels different by Friday.`,
      ],
      systems_consistency: [
        `Block 90 minutes every Tuesday and Thursday for follow-up calls. These blocks are non-negotiable — they do not move for showings, administrative tasks, or anything that is not a genuine emergency. Your follow-up time is as protected as a listing appointment.`,
        `Build a 5-step follow-up sequence for every Warm lead: Call. Value email with a real market insight. Personal text check-in. Handwritten note. Call again. Space each step 10-14 days apart. Most agents stop at Step 1. You will complete all 5.`,
        `Set up a simple weekly tracking view — even a spreadsheet — showing every active lead, their category, and your last contact date. Review it every Monday morning for 10 minutes before your week begins.`,
      ],
      leverage_expansion: [
        `Build and activate an automated follow-up sequence for your Warm and Long-term leads. Your system should deliver consistent value touches — market updates, relevant content, personal check-ins — on a schedule that runs even when you are fully booked.`,
        `Design a re-engagement protocol for leads that have gone quiet for 60+ days. A single personal, non-salesy message — referencing something specific to their situation — can reactivate a conversation you thought was lost.`,
        `Track your contact-to-appointment ratio weekly. Set a target to improve it by 10% over the next 30 days. Measure it. What gets measured gets managed.`,
      ],
    },

    supporting_actions: [
      `Script and practice your re-engagement conversation for leads gone cold. Role-play it with a colleague until it feels natural — not rehearsed.`,
      `For every showing or consultation that does not convert immediately, set a specific follow-up task before you leave the appointment. Not tomorrow. Before you leave.`,
      `Identify your personal follow-up ceiling — the number of active leads you can realistically manage with quality. Do not take on more than you can follow up with properly.`,
      `Review your last 10 lost deals. At what point did follow-up stop? That point is where the System will focus.`,
    ],

    top_action: `Open your pipeline right now and identify the 3 leads you have been meaning to call. Call them today. The discomfort you feel about those calls is the exact cost of not having a system. The System starts today.`,
    daily_ritual: `Every morning, identify your top 3 follow-up priorities for the day. Complete those 3 contacts before 11am. Everything else — email, admin, social — comes after.`,
  },

  direct_market_authority: {
    character_type: "The Authority",
    focus: "Market Positioning & Conversion Mastery",

    truth: {
      standard: `Generating leads consistently takes real discipline, and you are doing that work. The opportunity the System sees is not in your prospecting — it is in what happens after the lead arrives. When a prospect chooses another agent, it is rarely because that agent was more qualified. It is because their positioning was clearer. The gap here is not effort. It is the communication of your value — and that is one of the most learnable skills in this business.`,
      hard_truth: `Your prospecting is working. The leads are coming in. But your goals are telling us something important: the conversion rate does not yet match the effort you are putting into the front end. This is not a criticism of your work — it is a signal that the positioning needs to sharpen. Prospects choose the agent who makes them feel most certain. Right now, there is a gap between how certain you feel and how certain they feel when they leave your consultation. We are going to close that gap — because your goals depend on it.`,
    },

    strategy: `The System is going to sharpen your positioning until choosing you feels like the only logical decision. Authority in this market is not built on personality — it is built on demonstrated expertise, consistent presence, and a clear value proposition that prospects feel before they ever meet you in person.`,

    tactics: {
      foundational_repair: [
        `Write your personal value proposition this week — one clear paragraph that answers the question every prospect is silently asking: "Why you, specifically, over every other agent in this market?" Not your biography. Your differentiated value. What do your clients get that they cannot get anywhere else?`,
        `Practice your consultation opening out loud, every day this week. The first 5 minutes of any buyer or listing appointment should establish your authority before you discuss a single property or price. Practice it until it feels like a conversation, not a script.`,
        `Identify the 3 objections you hear most consistently — "I want to think about it," "I know another agent," "What are your fees?" — and develop a confident, empathetic response to each. Write them down. Role-play them. Own them.`,
      ],
      systems_consistency: [
        `Define your market niche this week. One neighbourhood. One price point. One client profile. You cannot be the authority everywhere — but you can be the undisputed expert in one area. Go deep before you go wide.`,
        `Build your Authority Stack: 3 pieces of content that demonstrate your expertise before you walk into a room. A detailed local market report. A case study of a transaction you navigated well. A short video or written piece on one insight most agents miss. These travel ahead of you to every appointment.`,
        `Record yourself delivering your value proposition and watch it back. Most agents are surprised by what they see. Identify the 3 moments where your certainty drops. Fix those moments.`,
      ],
      leverage_expansion: [
        `Launch a consistent market intelligence presence — a weekly neighbourhood update, a monthly market analysis, a regular video series on local trends. Your goal is to become the name people think of when they want to understand this market.`,
        `Build a proof portfolio — testimonials, transaction results, case studies, client stories — that prospects can access before your first conversation. Let your results establish authority before you open your mouth.`,
        `Study one deal per week from your market that you did not win. What did the agent who won it do differently in their positioning, their follow-up, or their presentation? Document the insight. Apply it.`,
      ],
    },

    supporting_actions: [
      `Build a pre-appointment credibility packet — your market stats, your proof points, your value proposition — and send it to every prospect before you meet.`,
      `Track your consultation-to-signed-agreement ratio monthly. Set a target and work toward it deliberately.`,
      `Find one mentor, coach, or top producer in your market whose positioning you admire. Study how they communicate their value. Adapt — do not copy.`,
      `After every consultation, write down one thing that landed well and one thing you would change. Over 90 days, this debrief practice will transform your conversion rate.`,
    ],

    top_action: `Write a one-paragraph statement of your specific value — what clients get from working with you that they cannot get from anyone else. Say it out loud until you believe it completely. That certainty is what prospects feel.`,
    daily_ritual: `Spend 20 minutes every morning on market intelligence. Know your local numbers — active listings, days on market, list-to-sale ratio, absorption rate. Walk into every conversation as the most informed person in the room.`,
  },

  business_architecture: {
    character_type: "The Architect",
    focus: "Business Systems & Scalable Infrastructure",

    truth: {
      standard: `Running a growing real estate practice while trying to prospect, serve clients, stay organized, and plan ahead is genuinely demanding — and most agents who reach a certain production level hit a ceiling that has nothing to do with their sales ability. What the System sees in your results is a systems gap. Not a skills gap. Not a motivation gap. The lead generation is working. The issue is that the business underneath it is not yet built to sustain and scale what you are producing. That is exactly the kind of problem the System was designed to solve.`,
      hard_truth: `You have proven you can generate business. The production is there. But your goals are pointing to something important: the ceiling you are approaching is not a prospecting ceiling — it is an infrastructure ceiling. Without systems underneath your production, every busy period creates chaos and every slow period feels like starting from scratch. Your goals require a business that can operate at a higher level consistently, not just when everything lines up perfectly. That business starts with what we build this week.`,
    },

    strategy: `The System is going to build the infrastructure that makes your results repeatable and your growth sustainable. Revenue that depends entirely on your personal effort every single day is a job. A business runs systems that produce results independent of your best day. We are building the second one — starting with the foundational structures that high-producing agents rely on.`,

    tactics: {
      foundational_repair: [
        `Map your entire business on one page this week. Every lead source. Every conversion stage. Your average commission. Your monthly GCI target. If you cannot fill in every box from memory right now, that is your first priority. Clarity before complexity.`,
        `Identify the single task in your business that consumes the most time but produces the least direct revenue. Write it down. By the end of this week, you will have a plan to either systematize, delegate, or eliminate it.`,
        `Set a CEO Hour this week — 60 minutes where you step out of salesperson mode and into business owner mode. Review your numbers. Assess your systems. Identify your single biggest operational bottleneck. Most agents never do this. That is why their business never grows beyond themselves.`,
      ],
      systems_consistency: [
        `Create a 90-day business plan with weekly milestones. Not annual goals — 90 days. Review it every Monday morning for 10 minutes. The plan is not a prediction; it is a navigation system. Adjust weekly. Stay honest.`,
        `Document one repeatable process per week for the next 8 weeks. A buyer onboarding checklist. A listing launch sequence. A follow-up workflow. Build the operating manual for your business — so that every important process has a written standard.`,
        `Build a simple performance dashboard: 5 numbers that tell you at a glance how your business is running this week. Review it every Monday before you do anything else.`,
      ],
      leverage_expansion: [
        `Calculate your effective hourly rate: last 12 months GCI divided by hours worked. Every task you do regularly that falls below that rate is a candidate for delegation. Identify one this week and build the handoff plan.`,
        `Identify the one person — an assistant, a transaction coordinator, a showing agent — who could free up 5 hours per week of your highest-value time. Build the case for that hire or contract. Time is the resource your goals need most.`,
        `Schedule a quarterly board meeting with yourself — 2 hours, off-site, away from the day-to-day. Review the business from a strategic level: what is working, what is not, what needs to change in the next 90 days. Treat it like the most important appointment of the quarter.`,
      ],
    },

    supporting_actions: [
      `List every recurring task in your week. Next to each one, write: "Only I can do this" or "This could be done by someone else." Be honest. Most agents overestimate the first column.`,
      `Build a simple onboarding experience for new clients — a welcome message, a process overview, a timeline. Systems that make clients feel taken care of generate referrals.`,
      `Identify one technology or tool that could save you 3 hours per week if you invested one day learning it properly. Schedule that learning day.`,
      `Find one accountability structure for your business planning — a peer group, a coach, a partner who will ask you the hard questions every week.`,
    ],

    top_action: `Set your CEO Hour for this week right now. Block it in your calendar. Protect it from everything except a genuine emergency. In that hour, you will map your business on one page and identify your biggest operational bottleneck.`,
    daily_ritual: `Begin every day with a 15-minute business review. Revenue to date. Pipeline value. Appointments booked. Tasks completed yesterday. You run the business — the business does not run you.`,
  },

  performance_foundation: {
    character_type: "The Professional",
    focus: "Business Performance & Growth Foundation",

    truth: {
      standard: `Every agent who reaches a plateau does so not because of a lack of ability, but because the habits that built their current level are not the same ones that will carry them to the next. This is not a personal gap — it is a growth gap. The fact that you are examining your business honestly right now is the first act of the agent you are becoming. The System is here to help you identify exactly what needs to shift — and to build the daily structure that makes that shift sustainable.`,
      hard_truth: `The potential is clear. The commitment is evident. But your goals are asking a direct question: is your current daily schedule actually capable of producing the results you say you want? This is not about motivation. Motivation comes and goes. This is about whether the non-negotiable disciplines of your business are truly non-negotiable right now. Your goals deserve an honest answer to that question — and the System is going to help you find it.`,
    },

    strategy: `The System does not deal in motivation. Motivation is temporary. The System builds structure — daily disciplines and weekly rhythms that produce results whether you feel inspired or not. Your coaching plan is built around one question: what is the smallest set of non-negotiable actions that, done consistently, will produce the business your goals describe? We are going to identify those actions and build your week around protecting them.`,

    tactics: {
      foundational_repair: [
        `Track every hour of your workday for 5 consecutive days this week. At the end of each day, categorize every hour as revenue-generating or support activity. Do not judge what you find — just observe it. That ratio is your honest starting point, and it will tell us exactly where the System needs to focus.`,
        `Write your 12-month GCI goal at the top of a blank page. Below it, reverse-engineer the weekly activity required to reach it: transactions needed, listings required, appointments per week, conversations per day. If the math does not match your current schedule, you have found your gap.`,
        `Identify your single highest-value daily activity — the one action that, done consistently, would have the greatest positive impact on your business. Block time for that activity every day this week and protect it from everything else.`,
      ],
      systems_consistency: [
        `Start every day by identifying your top 3 revenue-generating priorities. Not your email. Not your to-do list. Your 3 most important business-building actions. Complete at least 2 of them before noon. This one habit, sustained for 90 days, will change your production.`,
        `Book a 90-minute strategic review session with yourself this week — calendar blocked, phone off. Review where your business is today against where you intended it to be. The gap between those two points is your coaching curriculum. Be honest. Be specific.`,
        `Find one accountability structure — a coach, a peer partner, a mastermind group — and commit to a weekly check-in for the next 90 days. Accountability is not weakness. It is one of the most consistent differentiators between agents who grow and agents who plateau.`,
      ],
      leverage_expansion: [
        `Define what your business looks like at 2x your current production. Not just the income number — the number of transactions, the team structure, the lead sources, the systems required. Build backward from that picture to identify the single most important gap between where you are and where that version of your business lives.`,
        `Identify one high-performing agent in your market whose business model you respect. Study it. Not to copy it — but to understand the principles underneath it. What habits, systems, and disciplines are producing those results? Which of those could you adapt?`,
        `Build a 90-day sprint plan: one specific, measurable goal, the 3 weekly actions required to reach it, and the one daily habit that underpins all of it. Review it every Monday. Adjust as needed. Stay honest about the gap.`,
      ],
    },

    supporting_actions: [
      `Define what success looks like for your business in 12 months in specific, measurable terms — GCI, transactions, market share, and the lifestyle that production enables.`,
      `Read or listen to one piece of industry or business content per week. Not for inspiration — for edge. The agent who knows more serves better and converts more.`,
      `Identify the one relationship in your professional network that, if strengthened, would have the greatest positive impact on your business in the next 12 months. Invest in that relationship this month.`,
      `Schedule a personal performance review every 30 days — 30 minutes to assess what is working, what is not, and what one thing you will do differently next month.`,
    ],

    top_action: `Write your 12-month GCI goal down right now. Then write the one daily action that — if done without exception — gives you the best chance of reaching it. That action becomes your non-negotiable. Everything else in your schedule works around it.`,
    daily_ritual: `Start every day by reviewing your top 3 revenue-generating priorities. Not your inbox. Not your phone. Your 3 most important business-building actions. Complete at least 2 before noon.`,
  },
};

// ---------------------------------------------------------------------------
// STYLE DETECTOR
// ---------------------------------------------------------------------------

function detectStyle(signals) {
  if (signals.agentStyle) return signals.agentStyle;
  if (signals.databaseSize === "small" || signals.leadFlow === "inconsistent") {
    if (signals.followUp !== "strong") return "relationship";
  }
  if (signals.followUp === "weak" || signals.phoneComfort === "low")
    return "discipline";
  if (signals.leadEngineScore >= 6 && signals.pipelineScore < 5)
    return "transactional";
  return "relationship";
}

// ---------------------------------------------------------------------------
// PROFILE ROUTER
// ---------------------------------------------------------------------------

function routeProfile(signals) {
  const bottleneck = signals.bottleneck?.toLowerCase().trim();

  if (signals.hasScores) {
    if (signals.leadEngineScore >= 6 && signals.foundationScore <= 3)
      return "business_architecture";
    if (signals.leadEngineScore >= 7 && signals.pipelineScore <= 4)
      return "direct_market_authority";
  }

  if (signals.hasResponses) {
    if (signals.leadFlow === "inconsistent" && signals.databaseSize === "small")
      return "sphere_saturation";
    if (signals.followUp === "weak" || signals.leadFlow === "inconsistent")
      return "pipeline_discipline";
    const style = detectStyle(signals);
    if (style === "transactional") return "direct_market_authority";
    if (style === "relationship") return "sphere_saturation";
  }

  const bottleneckMap = {
    lead_engine: "discipline",
    pipeline_repair: "pipeline_discipline",
    foundation: "business_architecture",
    conversion: "direct_market_authority",
    database_size: "sphere_saturation",
  };
  if (bottleneck && bottleneckMap[bottleneck]) return bottleneckMap[bottleneck];
  return "performance_foundation";
}

// ---------------------------------------------------------------------------
// VERSION + PHASE
// ---------------------------------------------------------------------------

function deriveVersion(signals) {
  if (!signals.hasScores && !signals.hasResponses) return "v1.0-baseline";
  const vals = [
    signals.leadEngineScore,
    signals.foundationScore,
    signals.pipelineScore,
  ].filter((s) => s > 0);
  const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  if (avg >= 7) return "v1.2-advanced";
  if (avg >= 4) return "v1.1-intermediate";
  return "v1.0-foundation";
}

function derivePhase(profileKey) {
  const map = {
    sphere_saturation: "SPHERE",
    pipeline_discipline: "PIPELINE",
    direct_market_authority: "AUTHORITY",
    business_architecture: "ARCHITECTURE",
    performance_foundation: "FOUNDATION",
  };
  return map[profileKey] || "COACHING";
}

// ---------------------------------------------------------------------------
// MESSAGE BUILDER — Truth / Strategy / Tactics / Objective
// ---------------------------------------------------------------------------

function buildMessage(profile, tactics, weeklyObjective, tone, style) {
  const track = COACHING_TRACKS[style] || COACHING_TRACKS.relationship;
  const truthText =
    tone === "Hard Truth" ? profile.truth.hard_truth : profile.truth.standard;

  return [
    `THE TRUTH\n${truthText}`,
    `THE STRATEGY\n${profile.strategy}`,
    `THE TACTICS\n${tactics.map((t, i) => `${i + 1}. ${t}`).join("\n\n")}`,
    `YOUR OBJECTIVE THIS WEEK\n${weeklyObjective}`,
    `YOUR COACHING TRACK\n${track.archetype} — ${track.core_belief}`,
  ].join("\n\n---\n\n");
}

// ---------------------------------------------------------------------------
// MAIN GENERATOR
// ---------------------------------------------------------------------------

function generateCoachingOutputs() {
  const rows = db
    .prepare(
      `
    SELECT
      a.id          AS assessment_id,
      a.agent_id,
      a.score_json,
      a.responses_json,
      d.primary_bottleneck,
      d.campaign_id,
      d.confidence_score,
      al.engagement_score
    FROM assessments a
    LEFT JOIN diagnoses d      ON d.assessment_id = a.id
    LEFT JOIN agent_lifecycle al ON al.agent_id   = a.agent_id
  `,
    )
    .all();

  if (!rows.length) {
    console.log("No assessments found. Nothing to generate.");
    return;
  }

  const del = db.prepare("DELETE FROM coaching_outputs WHERE agent_id = ?");
  const insert = db.prepare(`
    INSERT INTO coaching_outputs (
      agent_id, phase, focus, top_action, daily_ritual,
      weekly_target, supporting_actions_json, message,
      character_type, version, generated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  let generated = 0,
    errors = 0;

  for (const row of rows) {
    try {
      const signals = readSignals(
        row.responses_json,
        row.score_json,
        row.primary_bottleneck,
        row.campaign_id,
      );
      const profileKey = routeProfile(signals);
      const profile = PROFILES[profileKey];
      const tier = selectTacticTier(row.engagement_score);
      const tone = selectTone(row.engagement_score, signals);
      const style = detectStyle(signals);
      const tactics = profile.tactics[tier];
      const weeklyObj = deriveWeeklyObjective(signals.bottleneck, tier);
      const fullMessage = buildMessage(
        profile,
        tactics,
        weeklyObj,
        tone,
        style,
      );
      const version = deriveVersion(signals);
      const phase = derivePhase(profileKey);

      del.run(row.agent_id);
      insert.run(
        row.agent_id,
        phase,
        profile.focus,
        profile.top_action,
        profile.daily_ritual,
        weeklyObj,
        JSON.stringify(profile.supporting_actions),
        fullMessage,
        profile.character_type,
        version,
      );

      console.log(
        [
          `  GEN    ${row.agent_id}`,
          `profile:${profileKey}`,
          `tier:${tier}`,
          `tone:"${tone}"`,
          `style:${style}`,
          `version:${version}`,
        ].join(" | "),
      );

      generated++;
    } catch (err) {
      console.error(`  ERROR  ${row.agent_id}: ${err.message}`);
      errors++;
    }
  }

  console.log("\n========================================");
  console.log(`  Generated : ${generated}`);
  console.log(`  Errors    : ${errors}`);
  console.log("========================================");
}

generateCoachingOutputs();
