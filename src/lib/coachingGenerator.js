/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COACHING GENERATOR ENGINE — The Architect's Voice (70/30 Synthesis Model)
 * Node Runner: Performance Architect Suite
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * THE SYNTHESIS MODEL:
 *   70% — "The Architect's Truth" — Node Runner's original diagnosis.
 *          Direct, authoritative, in YOUR voice. No attribution.
 *          "Your pipeline isn't empty because of the market.
 *           It's empty because you stopped filling it 90 days ago."
 *
 *   30% — "Master Council Support" — Credited references that validate.
 *          "This principle is what Jeb Blount calls the 30-Day Rule—
 *           the calls you miss today are the closings you lose in 3 months."
 *
 * WHY: You are the judge. The masters are the evidence.
 *       Node Runner is a coaching OS, not a reading list.
 */

const generateId = () => Math.floor(Math.random() * 2000000000) + 1;
const { getMastersForBottleneck } = require("./coachingLibrary");

// ── HELPERS ──────────────────────────────────────────────────────────────────

function pick(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}

function constraintLabel(bottleneck) {
  const labels = {
    pipeline_volume: "Pipeline Volume & Consistency",
    lead_volume: "Lead Generation Volume",
    prospecting_consistency: "Prospecting Discipline",
    pipeline_leakage: "Pipeline Retention",
    lead_conversion: "Lead Conversion Speed",
    digital_leads: "Digital Lead Management",
    speed_to_lead: "Speed to Lead Response",
    follow_up: "Follow-Up Cadence",
    online_conversion: "Online-to-Offline Conversion",
    low_conversion: "Consultation-to-Close Conversion",
    relationship_deficit: "Relationship Capital Building",
    referral_quality: "Referral Network Quality",
    database_size: "Database Development",
    sphere_awareness: "Sphere of Influence Activation",
    retention: "Client Retention & Loyalty",
    consistency_habits: "Daily Habit Consistency",
    discipline: "Professional Discipline",
    tracking: "Performance Tracking & Measurement",
    momentum: "Business Momentum",
    systems_design: "Systems & Process Design",
    mindset_state: "Mindset & Emotional State",
    personal_vision: "Personal Vision & Purpose",
    overwhelm: "Focus & Overwhelm Management",
    high_stress: "Stress Management & Flow",
    time_management: "Time & Priority Management",
    accountability: "Accountability Structure",
    cold_call_aversion: "Prospecting Comfort & Confidence",
  };
  return labels[bottleneck] || "Performance Foundation";
}

// ═════════════════════════════════════════════════════════════════════════════
// THE ARCHITECT'S VOICE — Node Runner Original Insights (70%)
// These are YOUR voice. No attribution. Direct. Authoritative.
// ═════════════════════════════════════════════════════════════════════════════

const ARCHITECT_TRUTHS = {
  pipeline_volume: [
    "Your pipeline is not a mystery. It is a math problem you have been refusing to solve. Every day without a prospecting block is a day you are programming future scarcity. The market did not do this to you. Your calendar did.",
    "You are not in a slump. You are experiencing the delayed consequence of decisions you made 90 days ago. The pipeline does not respond to intention. It responds to activity. And your activity log tells a story you have been avoiding.",
    "The feast-famine cycle in your business is not bad luck. It is a design flaw. You prospect when you are desperate, close a few deals, feel comfortable, stop prospecting, and the cycle restarts. This is not a revenue problem. It is an engineering problem.",
    "Your income is a trailing indicator of your daily discipline. Right now, the indicator is telling you something uncomfortable: the calls were not made, the blocks were not protected, and the top of the funnel went dry while you were busy with everything except the one thing that feeds your family.",
  ],
  lead_volume: [
    "You do not have a lead problem. You have an activity problem wearing a lead costume. The leads exist. The conversations exist. The appointments exist. But they require you to initiate them, and that is the part you keep postponing.",
    "The gap between where you are and where you want to be is not talent, market conditions, or your brokerage. It is the number of meaningful conversations you are having per day. That number is too low. You know it. Now fix it.",
    "Every agent in your market has access to the same leads, the same tools, and the same hours. The ones outperforming you are not smarter. They are simply having more conversations. Volume is the great equalizer in this business.",
  ],
  prospecting_consistency: [
    "Consistency is not a personality trait you were born without. It is a system you have not built yet. The agents who prospect every day do not have more willpower than you. They have better structures, better triggers, and better accountability.",
    "You are treating prospecting like an event when it needs to be an environment. An event happens when you feel like it. An environment surrounds you whether you feel like it or not. Build the environment. The consistency follows.",
    "Your inconsistency is costing you more than you realize. Run the compound math: 2 missed calls per day times 250 working days equals 500 missed opportunities per year. At even a 3% conversion rate, that is 15 deals you left on the table. What is that worth in commissions?",
  ],
  lead_conversion: [
    "You are generating leads. You are not converting them. That means the problem is not at the top of the funnel. It is in the middle, where speed, follow-up, and genuine curiosity turn a name into a relationship. The leads are not bad. Your response system is.",
    "Conversion is not a closing skill. It is a speed skill. The agent who responds first, follows up most, and listens deepest wins the client. Not the agent with the best pitch, the fanciest CRM, or the most experience. Speed and care. That is the formula.",
    "You are spending money to generate leads and then letting them die in your inbox. Every unworked lead is not just a missed opportunity. It is money you already spent, producing zero return. That is not a sales problem. It is an operational failure.",
  ],
  digital_leads: [
    "Digital leads are not worse than referrals. They are faster and more fragile. A referral arrives pre-warmed. A digital lead arrives curious but uncommitted. The skillset required is different: speed, persistence, and value delivery in the first 60 seconds.",
    "You are judging your digital leads by referral standards and finding them lacking. Stop. They are a different channel with different rules. Master the rules or stop paying for the leads. Half-committed is the most expensive strategy in real estate.",
  ],
  speed_to_lead: [
    "You are losing deals before you even know you had them. Every minute between a lead inquiry and your first contact is a minute your competitor is using to build the relationship you paid for. Speed is not a nice-to-have. It is the entire game.",
    "The data is not ambiguous: the first agent to make meaningful contact wins the business the vast majority of the time. Not the best agent. Not the most experienced. The fastest. If your response time is measured in hours instead of minutes, you are funding your competitor's pipeline.",
  ],
  follow_up: [
    "Your follow-up is not a system. It is a hope. You call once, maybe twice, and then the lead slides into the graveyard of your CRM, where good intentions go to die. The gap between your second touch and your competitor's tenth touch is the gap between your income and theirs.",
    "Most of your lost deals were not lost at the first contact. They were lost at the silence between contact two and contact five. That silence told the prospect everything they needed to know about what working with you would feel like.",
  ],
  relationship_deficit: [
    "You are sitting on a gold mine and complaining about the price of shovels. Your existing database, the people who already know your name and have seen your work, is the single most valuable asset in your business. And you are neglecting it while spending money on strangers.",
    "The agents who seem to effortlessly attract referrals are not more charming than you. They are more consistent. They write the notes, make the calls, show up at the events, and stay in flow with the people who already trust them. You stopped doing that. The referrals stopped too. Coincidence does not explain it.",
    "Every past client who has not heard from you in six months is not just a missed referral. They are an active transfer of trust to whichever agent does stay in touch. Your silence is not neutral. It is a recommendation for someone else.",
  ],
  referral_quality: [
    "Referrals do not happen by accident. They happen by design. The agents who receive consistent, high-quality referrals have engineered a system of gratitude, follow-through, and genuine connection that makes referring them feel natural. You have not built that system yet.",
    "You want better referrals but you have not earned them. Earning a referral requires that you exceed expectations so dramatically that your client feels compelled to share you with someone they care about. Average service produces zero referrals. Remarkable service produces a pipeline.",
  ],
  database_size: [
    "Your database is not a list. It is the financial infrastructure of your entire career. Every dollar you will earn in the next five years is connected to a person you already know, or a person they know. The question is whether you are nurturing that infrastructure or letting it rust.",
    "You do not need more contacts. You need deeper relationships with the contacts you already have. A database of 150 genuinely nurtured people will outproduce a CRM of 5,000 names you never call. Depth beats width. Every time.",
  ],
  sphere_awareness: [
    "You are invisible to your own sphere. Not because they forgot you, but because you gave them permission to forget you by disappearing after the closing. Visibility is not vanity. In this business, visibility is viability.",
    "Your sphere is not 200 people. It is 200 people who each know 200 people. That means you are one genuine conversation away from 40,000 potential clients. But only if your sphere remembers you exist, trusts you completely, and feels comfortable saying your name.",
  ],
  retention: [
    "You are spending all your energy hunting new clients while your existing clients quietly drift away. The cost of acquiring a new client is five to seven times higher than retaining an existing one. Your retention gap is your most expensive problem.",
    "Client retention is not about birthday cards and annual check-ins. It is about being so consistently present and valuable that calling anyone else feels wrong. That requires a system, not good intentions.",
  ],
  consistency_habits: [
    "You do not need more information. You need more installation. You have attended the seminars, read the books, and watched the videos. The knowledge is not the problem. The daily execution of that knowledge is the problem. And that is a systems issue, not a knowledge issue.",
    "The gap between who you are and who you want to be is not bridged by a single heroic effort. It is bridged by small, boring, daily actions repeated until they become automatic. The mundane is where mastery lives. And right now, you are avoiding the mundane.",
    "You are overcomplicating this. The agent who makes five calls, writes two notes, and has one face-to-face meeting every single day will outperform 95% of the market. Those are not complex activities. They are simple activities that require consistent execution. Simple is not the same as easy.",
  ],
  discipline: [
    "Discipline is not something you are born with. It is something you build with structure. The agents who seem naturally disciplined have simply removed the decision from the equation. They do not decide whether to prospect each morning. The calendar decides for them.",
    "You are waiting to feel motivated before you act. That is backwards. Action creates motivation, not the other way around. The call you do not want to make at 8am is the call that generates the momentum that carries you through the rest of the day.",
  ],
  tracking: [
    "You cannot improve what you do not measure. Right now, you think you are making a lot of calls, but you cannot tell me the exact number. You think your conversion rate is decent, but you have never calculated it. You are flying blind and wondering why you keep hitting mountains.",
    "Your business does not have a performance problem. It has a visibility problem. You cannot see your own numbers because you are not tracking them. And without numbers, every decision you make is a guess dressed up as a strategy.",
  ],
  momentum: [
    "Momentum is the most powerful force in your business, and you have let it stall. The hardest part is getting it started again. But here is the truth: it takes less energy to restart momentum than it took to build it originally. The neural pathways are still there. The muscle memory is still there. You just need to push.",
    "You had momentum once. You remember what it felt like: the calls were easy, the referrals were flowing, the confidence was high. You did not lose that because the market changed. You lost it because you stopped doing the daily things that created it.",
  ],
  mindset_state: [
    "Your problem is not tactical. It is psychological. You know what to do. You have known for months. But something between your knowledge and your execution is broken, and that something is the story you are telling yourself about why it is not working.",
    "You are operating from a state of reaction instead of creation. Every morning, you wake up and respond to whatever the world throws at you instead of deciding in advance what you are going to produce. That is not a schedule problem. That is a state problem.",
    "The scripts, the systems, the strategies, they all work. But they do not work when you bring the wrong version of yourself to them. A peak-state hour produces more than an entire day of depleted grinding. Before you fix your business, fix your state.",
  ],
  personal_vision: [
    "You do not have a clear picture of where you are going. And without a destination, every day is just movement without direction. Before you can build the business you want, you need to define the life you want the business to fund.",
    "Your goals are too vague to be useful. You want to make more money, close more deals, feel less stressed. Those are wishes, not goals. A goal has a number, a date, and a daily action plan that makes it inevitable.",
  ],
  overwhelm: [
    "You have fifteen priorities, which means you have zero priorities. The overwhelm you are feeling is not because you have too much to do. It is because you have not decided what matters most. One decision, what is the single most important thing, eliminates eighty percent of your stress.",
    "You are confusing activity with progress. Your calendar is full. Your inbox is overflowing. You are busy from seven to seven. But when you look at your production numbers, they do not reflect the effort. That is because most of your effort is going to the wrong things.",
  ],
  high_stress: [
    "The stress you are carrying is not from the work itself. It is from the way you are approaching the work. You are operating from pressure instead of service, from scarcity instead of abundance, and from fear instead of purpose. The activities are the same. The energy behind them changes everything.",
    "You got into this business for freedom. But somewhere along the way, you built a trap instead. The hours are long, the income is unpredictable, and the joy is gone. That is not the market's fault. It is a design problem in your business model, and it is fixable.",
  ],
  time_management: [
    "You do not have a time problem. You have a priority problem. There are enough hours in the day. There are not enough hours for everything, which is why the most important skill in your business is the ability to say no to good things so you can say yes to the right things.",
    "Your calendar does not reflect your priorities. It reflects your reactions. Look at last week: how many hours were devoted to revenue-generating activities versus admin, email, and meetings that could have been an email? The ratio tells you everything.",
  ],
  accountability: [
    "You are trying to hold yourself accountable, and it is not working. That is not a character flaw. Humans are terrible at self-accountability. You need an external structure: a partner, a scorecard, a weekly review that you cannot hide from. Accountability is not comfortable. That is why it works.",
    "The agents who consistently outperform do not have more talent. They have more accountability. Someone is watching their numbers, asking uncomfortable questions, and refusing to accept excuses. You need that person in your business.",
  ],
  cold_call_aversion: [
    "Your resistance to cold calling is not weakness. It is a signal that your approach does not match your personality. Not every top producer dials strangers all day. But every top producer has consistent conversations with potential clients. The method can change. The consistency cannot.",
    "The anxiety you feel before picking up the phone is not a stop sign. It is a toll booth. You pay the discomfort, and on the other side is the appointment, the listing, the commission, and the life you are building for your family. The agents who pay the toll eat. The ones who avoid it go hungry.",
  ],
  systems_design: [
    "You are relying on willpower when you should be relying on systems. Willpower is a depleting resource. Systems are infrastructure. The agent who designs their environment for production does not need to decide to be productive. The system decides for them.",
    "Your business runs on heroic effort instead of repeatable process. That works until you get sick, go on vacation, or simply have a bad week. A systems-driven business produces consistently regardless of your mood. A willpower-driven business produces only when you are at your best.",
  ],
  online_conversion: [
    "The gap between your online presence and your offline conversion tells a clear story: people find you, but they do not choose you. That means your digital-to-personal handoff is broken. Somewhere between the website visit and the first conversation, trust is leaking.",
    "Online leads are not tire-kickers by nature. They are informed consumers who have already done their research. They do not need a tour guide. They need a trusted advisor who can add value beyond what they already found on their own.",
  ],
  pipeline_leakage: [
    "Your pipeline is not empty. It is leaking. Deals are entering at the top and draining out the middle because your follow-up system has holes, your qualification process is vague, and your stage management is nonexistent. You do not need more leads. You need a tighter bucket.",
    "Every deal that falls out of your pipeline represents time, energy, and money already invested that produced zero return. Before you spend another dollar on lead generation, fix the leaks. A tighter pipeline with fewer leads will outproduce a wide pipeline that hemorrhages opportunity.",
  ],
  low_conversion: [
    "People are meeting you and choosing someone else. That is not about your knowledge or your market expertise. It is about trust. Something in those first thirty minutes is not landing. Either you are talking when you should be listening, or you are pitching when you should be diagnosing.",
    "Your conversion rate is a mirror of how your clients experience you. If they feel sold to, they resist. If they feel advised, they commit. The gap between selling and advising is not technique. It is identity. You need to decide which one you are.",
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// THE ARCHITECT'S STRATEGY — Node Runner Original Directives (70%)
// ═════════════════════════════════════════════════════════════════════════════

const ARCHITECT_STRATEGIES = {
  pipeline_volume: [
    "Block two hours every morning exclusively for outbound prospecting. Not after email. Not after your first meeting. First thing. Protect that block the way a surgeon protects operating time. Everything else fills the gaps around it, not the other way around.",
    "Calculate your pipeline math this week. Work backward from your annual income goal: how many closings do you need? How many listings? How many appointments? How many conversations? How many dials? Now you have a daily number. Hit it.",
    "Create a daily prospecting scorecard and track four numbers every single day: dials, conversations, appointments booked, and appointments kept. Review it every Friday. The scorecard does not lie, and it does not accept excuses.",
  ],
  lead_volume: [
    "Set a daily contact minimum and treat it as non-negotiable. Whether the number is 10, 15, or 25, it does not change based on your mood, your pipeline, or the day of the week. The minimum is the floor you never drop below.",
    "Diversify your lead sources across three channels. If all your leads come from one source, you are one algorithm change away from an empty pipeline. Spread across outbound calls, relationship nurture, and one digital channel.",
  ],
  prospecting_consistency: [
    "Build a morning routine that makes prospecting automatic. Attach it to an existing habit: after you pour your coffee, you open your call list. After you open your call list, you dial your first number. Chain the behaviors so the decision is made before you are awake enough to resist it.",
    "Find an accountability partner and share your daily numbers with them every Friday. Not a cheerleader. A truth-teller who will ask the uncomfortable question: did you do what you said you would do?",
  ],
  lead_conversion: [
    "Audit your response time to new leads this week. If the average is over ten minutes, that is your first fix. Set up instant notifications and commit to a five-minute response window. The first agent to make meaningful contact wins the majority of the time.",
    "Build a follow-up sequence that runs for at least ten touches over ten days. Call, text, email, call, text, email, call, video message, call, final message. Most agents quit after two. The deals live between touch five and touch twelve.",
  ],
  digital_leads: [
    "Respond to every digital lead with three channels simultaneously: phone call, text message, and email. Within five minutes. The omnichannel approach makes you impossible to miss and impossible to ignore.",
    "For every new online lead, record a 30-second personalized video text. Say their name, reference the property they searched, and ask one question. Video builds trust in seconds. Text builds nothing.",
  ],
  speed_to_lead: [
    "Set up instant lead notifications on every device. When a lead comes in, you have a five-minute window. Not ten. Not thirty. Five. Prepare templates for text and email so the only thing you need to do is dial.",
    "Confirm every appointment three times: 24 hours before, 2 hours before, and 30 minutes before. This eliminates sixty percent of no-shows and costs you nothing but ninety seconds of texting.",
  ],
  follow_up: [
    "Map out your follow-up sequence on paper today: ten specific touches over ten days, each with a defined channel and message type. Load the templates into your CRM and activate them for every lead in your current pipeline.",
    "Write a final-touch message for leads who have not responded after your sequence. Something like: I do not want to be a bother, so this will be my last message. If your plans change, I am here. This message alone recovers twenty to thirty percent of silent leads.",
  ],
  relationship_deficit: [
    "Launch a weekly relationship ritual: five handwritten notes, five personal phone calls, and four face-to-face coffees or meetings. This is the minimum viable relationship maintenance for a referral-based business. Do it every week without exception.",
    "Identify your top fifty contacts who have referred or could refer. These are your priority relationships. They get the handwritten notes, the phone calls, the coffee meetings. Everyone else gets a monthly newsletter. Stop distributing your relationship energy equally across people who will never send you business.",
  ],
  referral_quality: [
    "Ask for referrals directly and without apology. In every client conversation this week, say: I have built my business on referrals from great clients like you. Who do you know that might be thinking about buying or selling? The reason most agents do not get referrals is they never ask.",
    "Create a referral follow-through protocol: when you receive a referral, send a thank-you note within 24 hours, provide an update within one week, and report the outcome when it resolves. This loop tells the referrer that their trust was well-placed, and they will refer again.",
  ],
  database_size: [
    "Add five genuine new contacts to your active database every month through community involvement, networking events, or personal introductions. Not random names. Real relationships with people who know your face and your profession.",
    "Segment your database into three tiers: A-List (have referred or will refer), B-List (like you but have not referred yet), and C-List (acquaintances). Build your nurture cadence around these tiers so your best energy goes to your highest-value relationships.",
  ],
  sphere_awareness: [
    "Launch a monthly touchpoint program for your top one hundred contacts. It does not need to be expensive. A themed monthly drop-off, a personal note, a quick check-in call. The key is not creativity. It is consistency. Twelve touches per year, every year.",
    "Build your Warm List: review your entire database and flag everyone who might be considering a move in the next ninety days. Then call them. Not with a pitch. With genuine curiosity about their life. The Warm List is where your next three deals are hiding.",
  ],
  retention: [
    "Implement a closing-day protocol: deliver a personalized gift, write a handwritten note, take a photo together, and add them to your monthly touchpoint calendar. Closing day is not the end of the relationship. It is the beginning of your referral program with that client.",
    "Schedule an annual review call with your top twenty past clients: fifteen minutes to review their home value, discuss their plans, and ask for referrals. This single meeting generates more business than a hundred cold calls.",
  ],
  consistency_habits: [
    "Identify five non-negotiable daily actions and track them on a physical chart at your desk. Mark each one done with a checkmark every day. After fourteen consecutive days, the chain of checkmarks becomes its own motivation. After thirty, it becomes your identity.",
    "Scale your hardest habit down to its smallest possible version. If prospecting for an hour feels overwhelming, commit to opening your call list. That is it. The goal is not the call. It is the act of starting. Once you start, momentum carries you forward.",
  ],
  discipline: [
    "Design your morning so that the first sixty minutes are identical every single day. Wake time, movement, planning, and your first productive action. Remove all decisions from the morning. Decision fatigue is the silent killer of discipline.",
    "Stop waiting to feel ready. Execute your daily plan regardless of your emotional state. The bridge between where you are and where you want to be is not motivation. It is showing up on the days when you do not feel like it. Especially on those days.",
  ],
  tracking: [
    "Build a weekly scorecard that tracks five numbers: dials, contacts, conversations, appointments booked, and appointments kept. Review it every Sunday. These five numbers tell you everything about your pipeline health ninety days before your income reflects it.",
    "Calculate your conversion rate at every pipeline stage this month: lead to contact, contact to conversation, conversation to appointment, appointment to listing, listing to close. A one percent improvement at each stage compounds into a massive income difference.",
  ],
  momentum: [
    "Restart your daily routine tomorrow. Do not wait for Monday, the first of the month, or the new year. Momentum does not care about your calendar. It cares about consecutive execution. Start tomorrow. Then do it again the next day.",
    "Commit to twenty-one consecutive days of your core routine without missing once. If you miss a day, restart the count. After twenty-one days, you will have rebuilt the habit structure that momentum runs on.",
  ],
  mindset_state: [
    "Start every morning with a ten-minute ritual that sets your state: three minutes of intentional breathing, three minutes of writing what you are grateful for, and four minutes of visualizing your top three outcomes for the day. Do this before you check any device.",
    "Audit the story you are telling yourself about your business. Write it down. Then ask: is this story serving me or sabotaging me? If it is sabotaging you, write a new one. The story you tell yourself is the operating system your behavior runs on.",
  ],
  personal_vision: [
    "Spend one hour this week defining your life in vivid detail five years from now. Income, relationships, health, lifestyle, impact. Then reverse-engineer the daily disciplines that make it inevitable. Without a vivid picture, you have no filter for decisions.",
    "Write your ideal week on paper: block personal time first, then lead generation, then client service, then admin. Most agents do this backwards. Design the life first. Build the business around it.",
  ],
  overwhelm: [
    "Ask yourself one question before you open your calendar tomorrow: what is the single most important thing I can do today that would make everything else easier or unnecessary? Do that thing first. Before email, before meetings, before anything. One thing.",
    "Audit your last week: categorize every hour as revenue-generating or non-revenue-generating. If the ratio is not at least fifty-fifty, your overwhelm is self-inflicted. You are busy, but you are busy with the wrong things.",
  ],
  high_stress: [
    "Start every prospecting session by writing down ten things you are genuinely grateful for. Not generic gratitude. Specific. This practice activates the part of your brain responsible for clear thinking and creative problem-solving. Stress shuts it down. Gratitude opens it up.",
    "Redesign your business around service instead of sales. When every call is an opportunity to help someone instead of an opportunity to close someone, the stress transforms into energy. The activities are the same. The intention behind them changes everything.",
  ],
  time_management: [
    "Block your highest-energy hours for your highest-value activities. For most people, that means eight to eleven in the morning for lead generation and client-facing work. Do not waste your peak hours on email and admin. Those can happen at three in the afternoon when your energy is lower.",
    "Say no to one thing this week that does not serve your primary objective. A meeting, a committee, a task you have been doing out of obligation. Every yes to something unimportant is a no to something that matters.",
  ],
  accountability: [
    "Find a partner who will review your weekly scorecard with you every Friday. Not your spouse. Not your friend. Someone who operates at the standard you aspire to. Share your numbers honestly. The discomfort of that transparency is the point.",
    "Make a public commitment to your thirty-day goal. Tell your team, your partner, or your accountability group. Public commitment increases follow-through dramatically because you have added social consequence to private discipline.",
  ],
  cold_call_aversion: [
    "Reframe your prospecting calls as service calls. You are not interrupting someone's day to sell them something. You are checking whether someone you can help needs help right now. That shift in framing changes your energy, your tone, and your results.",
    "Start with your warmest contacts. Call five people who already know and like you. Have genuine conversations. Set one appointment. Build confidence through easy wins before you move to colder outreach. Confidence is built, not found.",
  ],
  systems_design: [
    "Map your ideal client journey from first contact to closed transaction. Identify every step. Then ask: which of these steps could happen automatically, and which require my personal touch? Automate the administrative. Personalize the relational.",
    "Create a checklist for every repeating process in your business: new lead intake, listing appointment preparation, closing day protocol, post-close follow-up. Checklists eliminate forgetting, reduce stress, and ensure consistency regardless of your energy level.",
  ],
  online_conversion: [
    "Bridge the gap between digital and personal: when an online lead engages, respond with a personalized video text within five minutes. The video creates a human connection that no automated response can match.",
    "Position yourself as an advisor in every digital interaction. The modern consumer has already researched twenty homes before they talk to you. They do not need a tour guide. They need someone who can help them make the decision they are already leaning toward.",
  ],
  pipeline_leakage: [
    "Audit every deal in your current pipeline. For each one, define the exact next action and the date it will happen. Any deal without a defined next action is already leaking. Any deal without a date is a wish, not a pipeline entry.",
    "Track your fall-off rate at every pipeline stage: what percentage of leads die between initial contact and appointment? Between appointment and listing? Between listing and close? The stage with the highest fall-off is your most profitable fix.",
  ],
  low_conversion: [
    "Prepare ten diagnostic questions for every first meeting. Ask about their timeline, their motivation, their concerns, and their dreams before you make any recommendation. The agent who asks the most questions in the first meeting wins the business the vast majority of the time.",
    "Shift your first-meeting objective from pitching to understanding. You are not there to show them what you can do. You are there to understand what they need. When they feel understood, they choose you. When they feel pitched, they shop around.",
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// MASTER COUNCIL SUPPORT — Paraphrased, Credited (30%)
// ═════════════════════════════════════════════════════════════════════════════

function buildMasterValidation(council) {
  const primary = council[0];
  const secondary = council[1];

  const primaryWisdom = pick(primary.master.wisdomPoints);
  const secondaryWisdom = secondary
    ? pick(secondary.master.wisdomPoints)
    : null;

  const lines = [];
  lines.push("── Supported by the Master Council ──");
  lines.push("");
  lines.push(
    primary.master.name +
      " (" +
      primary.master.title +
      ") reinforces this diagnosis: " +
      primaryWisdom.text,
  );

  if (secondaryWisdom) {
    lines.push("");
    lines.push(
      secondary.master.name +
        " adds a critical dimension: " +
        secondaryWisdom.text,
    );
  }

  return lines.join("\n");
}

function buildMasterStrategySupport(council) {
  const primary = council[0];
  const secondary = council[1];

  const primaryStrat = pick(primary.master.strategyTemplates);
  const secondaryStrat = secondary
    ? pick(secondary.master.strategyTemplates)
    : "";

  const lines = [];
  lines.push("── Master Framework Support ──");
  lines.push("");
  lines.push(primary.master.name + ": " + primaryStrat);

  if (secondaryStrat) {
    lines.push("");
    lines.push(secondary.master.name + ": " + secondaryStrat);
  }

  return lines.join("\n");
}

// ═════════════════════════════════════════════════════════════════════════════
// THE GENERATOR — 70/30 Synthesis Model
// ═════════════════════════════════════════════════════════════════════════════

function generateCoachingOutput({
  agentId,
  agentName = "Agent",
  bottleneck,
  profile = null,
  signals = null,
  engagementScore = 0,
}) {
  const council = getMastersForBottleneck(bottleneck, 3);
  const primary = council[0];
  const secondary = council[1];
  const tertiary = council[2];

  if (!primary || !primary.master) {
    throw new Error("No master mapping found for bottleneck: " + bottleneck);
  }

  // ── The Architect's Truth (70%) ──
  const architectTruths =
    ARCHITECT_TRUTHS[bottleneck] || ARCHITECT_TRUTHS.pipeline_volume;
  const architectTruth = pick(architectTruths);
  const profileLine = profile
    ? "Your diagnostic profile: " + profile + "."
    : "";

  // ── Master Validation (30%) ──
  const masterValidation = buildMasterValidation(council);

  const the_truth = [
    profileLine,
    "",
    "── The Architect's Truth ──",
    "",
    architectTruth,
    "",
    masterValidation,
  ]
    .filter(Boolean)
    .join("\n");

  // ── The Strategy (70% Architect + 30% Master) ──
  const architectStrategies =
    ARCHITECT_STRATEGIES[bottleneck] || ARCHITECT_STRATEGIES.pipeline_volume;
  const architectStrategy = pick(architectStrategies);
  const masterStrategySupport = buildMasterStrategySupport(council);

  const the_strategy = [
    "── Your Action Plan ──",
    "",
    architectStrategy,
    "",
    masterStrategySupport,
  ]
    .filter(Boolean)
    .join("\n");

  // ── RPM Plan ──
  const rpmTemplate = pick(primary.master.rpmTemplates);
  const rpm_plan = JSON.stringify({
    result: rpmTemplate.result,
    purpose: rpmTemplate.purpose,
    massive_action: rpmTemplate.massive_action,
    council: council.map(function (c) {
      return {
        master: c.master.name,
        role:
          c.weight === 3
            ? "Primary"
            : c.weight === 2
              ? "Supporting"
              : "Reinforcing",
      };
    }),
  });

  const primary_constraint = constraintLabel(bottleneck);
  const coaching_directive = pick(primary.master.directives);

  const allQuotes = [].concat(
    primary.master.quotes,
    secondary ? secondary.master.quotes : [],
    tertiary ? tertiary.master.quotes : [],
  );
  const selectedQuote = pick(allQuotes);
  const quote_of_the_day = selectedQuote.text + " — " + selectedQuote.author;

  const now = new Date().toISOString();

  return {
    id: generateId(),
    agent_id: agentId,
    the_truth: the_truth,
    the_strategy: the_strategy,
    rpm_plan: rpm_plan,
    primary_constraint: primary_constraint,
    coaching_directive: coaching_directive,
    quote_of_the_day: quote_of_the_day,
    engagement_score: engagementScore,
    created_at: now,
    updated_at: now,
    _meta: {
      model: "architects_voice_70_30",
      council: council.map(function (c) {
        return { master: c.master.id, name: c.master.name, weight: c.weight };
      }),
      bottleneck: bottleneck,
      profile: profile,
      generatedAt: now,
    },
  };
}

// ── DB WRITER ────────────────────────────────────────────────────────────────

async function writeCoachingOutput(db, output) {
  await db
    .prepare(
      "INSERT INTO coaching_outputs (id, agent_id, the_truth, the_strategy, rpm_plan, primary_constraint, coaching_directive, quote_of_the_day, engagement_score, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    )
    .run(
      output.id,
      output.agent_id,
      output.the_truth,
      output.the_strategy,
      output.rpm_plan,
      output.primary_constraint,
      output.coaching_directive,
      output.quote_of_the_day,
      output.engagement_score,
      output.created_at,
      output.updated_at,
    );
  return output;
}

// ── FULL PIPELINE ────────────────────────────────────────────────────────────

async function runCoachingPipeline(db, agentId) {
  var agent = await db
    .prepare(
      "SELECT a.id, a.name, a.last_name, al.stage, al.engagement_score FROM agents a LEFT JOIN agent_lifecycle al ON a.id = al.agent_id WHERE a.id = $1",
    )
    .get(agentId);

  if (!agent) throw new Error("Agent not found: " + agentId);

  var diagnosis = await db
    .prepare(
      "SELECT bottleneck, profile, signals FROM diagnoses WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 1",
    )
    .get(agentId);

  if (!diagnosis) {
    throw new Error(
      "No diagnosis found for agent: " + agentId + ". Run assessment first.",
    );
  }

  var signals = diagnosis.signals;
  if (typeof signals === "string") {
    try {
      signals = JSON.parse(signals);
    } catch (e) {
      signals = { raw: signals };
    }
  }

  var agentName = ((agent.name || "") + " " + (agent.last_name || "")).trim();
  var output = generateCoachingOutput({
    agentId: agentId,
    agentName: agentName,
    bottleneck: diagnosis.bottleneck,
    profile: diagnosis.profile,
    signals: signals,
    engagementScore: agent.engagement_score || 0,
  });

  await writeCoachingOutput(db, output);

  await db
    .prepare(
      "UPDATE agent_lifecycle SET campaign_state = 'coaching_active', updated_at = $1 WHERE agent_id = $2",
    )
    .run(output.updated_at, agentId);

  return { output: output, council: output._meta.council };
}

module.exports = {
  generateCoachingOutput: generateCoachingOutput,
  writeCoachingOutput: writeCoachingOutput,
  runCoachingPipeline: runCoachingPipeline,
  constraintLabel: constraintLabel,
};
