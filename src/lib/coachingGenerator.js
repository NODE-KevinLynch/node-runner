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
  var primary = council[0];
  var secondary = council[1];
  var credits = [
    "Supported by",
    "Informed by",
    "As per",
    "Drawing from",
    "Rooted in",
    "Anchored by",
    "Built on",
    "Guided by",
    "Grounded in",
    "Aligned with",
  ];
  var line = pick(credits) + " the " + primary.master.name + " framework";
  if (secondary) {
    line = line + " and the " + secondary.master.name + " methodology";
  }
  return line + ".";
}

function buildMasterStrategySupport(council) {
  var primary = council[0];
  var secondary = council[1];
  var line = "Informed by the " + primary.master.name + " framework";
  if (secondary) {
    line = line + " and " + secondary.master.name;
  }
  return line + ".";
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

  // ── Kevin's Straight Talk (70%) — Two paragraphs ──
  const architectTruths =
    ARCHITECT_TRUTHS[bottleneck] || ARCHITECT_TRUTHS.pipeline_volume;
  const primaryIndex = Math.floor(Math.random() * architectTruths.length);
  const secondaryIndex = (primaryIndex + 1) % architectTruths.length;
  const selectedTruths = [architectTruths[primaryIndex], architectTruths[secondaryIndex]];
  const architectTruth1 = selectedTruths[0];
  const architectTruth2 = selectedTruths[1] || selectedTruths[0];
  const profileLine = profile
    ? "Your diagnostic profile: " + profile + "."
    : "";

  // ── Master Validation (30%) ──
  const masterValidation = buildMasterValidation(council);

  const the_truth = [
    profileLine,
    "── Keeping it Real ──",
    architectTruth1,
    architectTruth2,
    masterValidation,
  ]
    .filter(Boolean)
    .join("\n\n");

  // ── The Strategy (70% Architect + 30% Master) ──
  const architectStrategies =
    ARCHITECT_STRATEGIES[bottleneck] || ARCHITECT_STRATEGIES.pipeline_volume;
  // Use same primaryIndex to pair truth with strategy
  const architectStrategy =
    architectStrategies[primaryIndex % architectStrategies.length] || pick(architectStrategies);
  const masterStrategySupport = buildMasterStrategySupport(council);

  const the_strategy = ["── Your Action Plan ──", "", architectStrategy]
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
    .prepare("DELETE FROM coaching_outputs WHERE agent_id = $1")
    .run(output.agent_id);
  var actionScriptsJson = JSON.stringify(output.action_scripts || []);
  await db
    .prepare(
      "INSERT INTO coaching_outputs (id, agent_id, the_truth, the_strategy, rpm_plan, primary_constraint, coaching_directive, quote_of_the_day, engagement_score, action_scripts, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
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
      actionScriptsJson,
      output.created_at,
      output.updated_at,
    );
  return output;
}

// ── STAGED COACHING ENGINE ───────────────────────────────────────────────────
// Coaching depth scales with data maturity:
//   STAGE 1 Foundation       (week 1 / no track record)  -> onboarding framing, no adjustments
//   STAGE 2 Early Adjustments (weeks 2-4 / first signal)  -> frameworks + light callouts
//   STAGE 3 Granular          (month 2+ / real history)    -> frameworks + full callouts + B2 overrides
//
// Detector reads days-active + logged scorecard days + deal count.
async function getCoachingStage(db, agentId) {
  try {
    var a = await db
      .prepare("SELECT created_at FROM agents WHERE id = $1")
      .get(agentId);
    var daysActive = 0;
    if (a && a.created_at) {
      daysActive = Math.floor((Date.now() - new Date(a.created_at).getTime()) / 86400000);
    }
    var sc = await db
      .prepare("SELECT COUNT(*) AS days FROM daily_scorecard WHERE agent_id = $1")
      .get(agentId);
    var scDays = sc ? Number(sc.days) : 0;
    var dl = await db
      .prepare("SELECT COUNT(*) AS n FROM deals WHERE agent_id = $1")
      .get(agentId);
    var dealCount = dl ? Number(dl.n) : 0;

    // STAGE 3: real track record — a month in AND meaningful logged history.
    if (daysActive >= 30 && (scDays >= 8 || dealCount >= 3)) return 3;
    // STAGE 2: some signal — past first week with at least a little data.
    if (daysActive >= 7 && (scDays >= 2 || dealCount >= 1)) return 2;
    // STAGE 1: foundation — brand new or no data yet.
    return 1;
  } catch (e) {
    console.error("getCoachingStage non-fatal:", e.message);
    return 1;
  }
}

// Builds dynamic "here's what's actually happening" callouts from live data.
// Priority order (Kevin): ACTIVITY 1) 7-day effort 2) funnel snapshot 3) wk-vs-wk
//                         RESULTS  1) listings+advancing 2) closed vs pace 3) pipeline 4) stale
// Returns { activity: string|null, results: string|null }.
async function buildDataCallouts(db, agentId, stage) {
  var out = { activity: null, results: null };
  try {
    // ── Last 7 days effort ──
    var w0 = await db
      .prepare(
        "SELECT COALESCE(SUM(calls),0) AS calls, COALESCE(SUM(contacts),0) AS contacts, " +
        "COALESCE(SUM(appt_set),0) AS appts " +
        "FROM daily_scorecard WHERE agent_id = $1 AND log_date >= NOW() - INTERVAL '7 days'"
      )
      .get(agentId);
    // ── Prior 7 days (for momentum) ──
    var w1 = await db
      .prepare(
        "SELECT COALESCE(SUM(contacts),0) AS contacts " +
        "FROM daily_scorecard WHERE agent_id = $1 " +
        "AND log_date >= NOW() - INTERVAL '14 days' AND log_date < NOW() - INTERVAL '7 days'"
      )
      .get(agentId);
    var calls7 = w0 ? Number(w0.calls) : 0;
    var contacts7 = w0 ? Number(w0.contacts) : 0;
    var appts7 = w0 ? Number(w0.appts) : 0;
    var contactsPrev = w1 ? Number(w1.contacts) : 0;

    // ── Deal funnel ──
    var d = await db
      .prepare(
        "SELECT " +
        "COUNT(*) FILTER (WHERE type='listing') AS listings, " +
        "COUNT(*) FILTER (WHERE type='listing' AND stage IN ('C','F')) AS listings_adv, " +
        "COUNT(*) FILTER (WHERE status='pending') AS pending, " +
        "COALESCE(SUM(est_value) FILTER (WHERE status='pending'),0) AS pending_val, " +
        "COALESCE(SUM(est_gci) FILTER (WHERE status='pending'),0) AS pending_gci, " +
        "COUNT(*) FILTER (WHERE status='closed' AND EXTRACT(YEAR FROM closed_date)=EXTRACT(YEAR FROM NOW())) AS closed_ytd, " +
        "COALESCE(SUM(gci) FILTER (WHERE status='closed' AND EXTRACT(YEAR FROM closed_date)=EXTRACT(YEAR FROM NOW())),0) AS gci_ytd, " +
        "COUNT(*) FILTER (WHERE stage='L' AND status='pending' AND signed_date <= NOW() - INTERVAL '90 days') AS stale90 " +
        "FROM deals WHERE agent_id = $1"
      )
      .get(agentId);
    var listings = d ? Number(d.listings) : 0;
    var listingsAdv = d ? Number(d.listings_adv) : 0;
    var pending = d ? Number(d.pending) : 0;
    var pendingVal = d ? Number(d.pending_val) : 0;
    var pendingGci = d ? Number(d.pending_gci) : 0;
    var closedYtd = d ? Number(d.closed_ytd) : 0;
    var gciYtd = d ? Number(d.gci_ytd) : 0;
    var stale90 = d ? Number(d.stale90) : 0;

    // ── Goal pace ──
    var g = await db
      .prepare("SELECT gci_goal, transaction_goal FROM agent_goals WHERE agent_id = $1 AND goal_year = 2026")
      .get(agentId);
    var txnGoal = g ? Number(g.transaction_goal) : 0;

    var money = function (n) { return "$" + Math.round(n).toLocaleString(); };

    // ── ACTIVITY callout (priority 1 = 7-day effort; add momentum if stage 3) ──
    if (calls7 + contacts7 + appts7 > 0) {
      var act = "Last 7 days: " + calls7 + " calls, " + contacts7 + " contacts, " + appts7 + " appointments set.";
      if (stage >= 3 && contactsPrev > 0) {
        var delta = contacts7 - contactsPrev;
        if (delta > 0) act += " Contacts up " + delta + " vs the week before — momentum is building.";
        else if (delta < 0) act += " Contacts down " + Math.abs(delta) + " vs the week before — protect your prospecting block.";
        else act += " Contacts flat vs last week — consistency is good; now push the volume.";
      }
      out.activity = act;
    }

    // ── RESULTS callout (priority order; richer at stage 3) ──
    var resParts = [];
    if (listings > 0) {
      resParts.push(listings + " listing(s) taken, " + listingsAdv + " advancing to offer.");
    }
    if (stage >= 3) {
      if (txnGoal > 0) {
        resParts.push(closedYtd + " of " + txnGoal + " sides closed YTD (" + money(gciYtd) + " GCI).");
      } else if (closedYtd > 0) {
        resParts.push(closedYtd + " sides closed YTD (" + money(gciYtd) + " GCI).");
      }
      if (pending > 0) {
        resParts.push(pending + " in pipeline worth " + money(pendingVal) + " (" + money(pendingGci) + " potential GCI).");
      }
      if (stale90 > 0) {
        resParts.push(stale90 + " listing(s) 90+ days old — these need attention now.");
      }
    }
    if (resParts.length) out.results = resParts.join(" ");

    return out;
  } catch (e) {
    console.error("buildDataCallouts non-fatal:", e.message);
    return out;
  }
}

// ── PERFORMANCE OVERRIDE LAYER (B2) ──────────────────────────────────────────
// Lets LIVE performance data override the frozen intake bottleneck when the
// data is decisive. Reads `deals` (listing age + stage) and `daily_scorecard`
// (recent contacts). Returns an override bottleneck string, or null to keep intake.
//
// Trust gate: only acts once there is enough live signal
//   (>=3 scorecard days OR >=3 deals in the trailing 30 days).
// Rule priority (first match wins):
//   RULE 2  contacts < 20 / 30 days        -> 'pipeline_volume'  (empty funnel beats all)
//   RULE 1  stale 90+ day listings AND     -> 'lead_conversion'  (with stale-listing scripts)
//           <20% of listings advanced to C/F
// 60-90 day aging is surfaced as a softer signal carried on the override meta.

// ── ACTION SCRIPT LIBRARY ────────────────────────────────────────────────────
// Every directive/RPM that asks the agent to DO something gets backup:
//   type "talk"  -> a talk track (what to SAY) for client-facing actions
//   type "steps" -> execution steps (how to DO it) for internal rituals/systems
// Matched by keyword against the directive + RPM massive_action text.
const ACTION_SCRIPTS = {
  five_five_four: {
    type: "steps",
    title: "The 5-5-4 Ritual — How To Execute",
    body:
      "Maher's weekly minimum for a referral business. Block 90 minutes, same day each week:\n" +
      "• 5 HANDWRITTEN NOTES — pull 5 A-list names. One line each: \"Was thinking of you — hope [specific detail] is going well. — [you]\". Stamp, mail same day.\n" +
      "• 5 PERSONAL CALLS — not pitches. \"Hey [name], no agenda — you crossed my mind and I wanted to see how you're doing.\" Let them talk. Reference it next time.\n" +
      "• 4 FACE-TO-FACE COFFEES — text 4 people: \"I'd love to catch up — coffee on me this week? Tue or Thu?\" One genuine question about their life per meeting.",
  },
  power_note: {
    type: "talk",
    title: "The Handwritten Note — What To Write",
    body:
      "Keep it to 3 lines, specific, zero ask:\n" +
      "\"[Name] — I saw [specific thing: your reno, your daughter's grad, the new puppy] and it made me smile. " +
      "No reason for this note other than I'm grateful to know you. Talk soon — [You].\"\n" +
      "Maher's rule: the note that sells is the note that asks for nothing.",
  },
  referral_ask: {
    type: "talk",
    title: "The Referral Ask — What To Say",
    body:
      "At a natural high point (post-close, a thank-you, a happy check-in):\n" +
      "\"Can I ask you something? I've built my business almost entirely on referrals from people like you, rather than chasing strangers online. " +
      "Who's the next person in your life you think might be thinking about a move — even a year out?\"\n" +
      "Then stop talking. Let the silence work.",
  },
  ford_conversation: {
    type: "talk",
    title: "The FORD Conversation — What To Ask",
    body:
      "FORD = Family, Occupation, Recreation, Dreams. People reveal moves through life, not real estate:\n" +
      "• FAMILY: \"How are the kids — anyone heading off to school or moving back home?\"\n" +
      "• OCCUPATION: \"How's work — any change on the horizon, a promotion, a relocation?\"\n" +
      "• RECREATION: \"What are you into these days — still at the [hobby/cabin/travel]?\"\n" +
      "• DREAMS: \"If everything went right the next couple years, what would that look like?\"\n" +
      "Listen for the move hiding inside the answer. Note it, follow up.",
  },
  prospecting_call: {
    type: "talk",
    title: "The Prospecting Call — Opening Track",
    body:
      "Frame every call as a service call, not a sales call:\n" +
      "\"Hi [name], it's [you] with [brokerage] — I'll be quick. I'm reaching out to a handful of people in [area] " +
      "because [specific market reason: inventory's tight / a home just sold on your street]. " +
      "Quick question — have you given any thought to what your place might be worth in today's market?\"\n" +
      "Goal of the call is the next conversation, not the listing.",
  },
  follow_up_sequence: {
    type: "steps",
    title: "The 10-Touch Follow-Up — How To Run It",
    body:
      "Most agents quit at touch 2. The deal lives between touch 5 and 12. Over 10 days:\n" +
      "Day 1 call + text. Day 2 email (value, not 'just checking in'). Day 3 call. Day 4 text. " +
      "Day 6 video text. Day 7 call. Day 9 email. Day 10 the final-touch message:\n" +
      "\"I don't want to be a bother, so this'll be my last note for now. If anything changes, I'm one text away. " +
      "Either way, I'm rooting for you.\" — recovers 20-30% of silent leads.",
  },
  listing_presentation: {
    type: "talk",
    title: "The Listing Consultation — Diagnostic Open",
    body:
      "Win by asking, not pitching. Open with:\n" +
      "\"Before I show you anything about me, I want to understand you. " +
      "Walk me through why you're thinking of moving, what the ideal timeline looks like, " +
      "and what would make this a great outcome for your family.\"\n" +
      "Ask 10 questions before you make a single recommendation. The agent who asks most, wins most.",
  },
  price_reduction: {
    type: "talk",
    title: "The Price-Reduction Conversation — What To Say",
    body:
      "\"When we listed, we agreed the market would tell us if we were positioned right. " +
      "We've now had [X] showings and [Y] weeks with no offer — that IS the market talking. " +
      "The longer a home sits, the more buyers assume something's wrong with it, not the price. " +
      "I'd rather adjust now from strength than chase the market down. Let's reposition to [price] this week.\"",
  },
  sphere_checkin: {
    type: "talk",
    title: "The Sphere Check-In — What To Say",
    body:
      "No pitch, pure relationship:\n" +
      "\"Hey [name] — you popped into my head today and I realized it's been too long. " +
      "No agenda at all, just wanted to say hi and see how things are with you and the family.\"\n" +
      "If a move surfaces naturally, follow the FORD thread. If not, you've still made a deposit in the relationship.",
  },
  annual_review: {
    type: "steps",
    title: "The Annual Client Review — How To Run It",
    body:
      "15-minute call with each A-list past client, once a year:\n" +
      "1) Lead with their equity: \"I ran the numbers — your home's likely worth about [range] now, up from [purchase].\"\n" +
      "2) Ask about plans: \"Any changes on the horizon — staying put, upsizing, helping family?\"\n" +
      "3) Offer value: a market report, a contractor referral, a tax-time reminder.\n" +
      "4) Soft referral ask before you hang up. One call. More business than 100 cold dials.",
  },
  hour_of_power: {
    type: "steps",
    title: "The Hour of Power — How To Execute",
    body:
      "Robbins' state-setting ritual, before any client contact:\n" +
      "• MOVE (20 min): walk, workout, anything that changes your physiology.\n" +
      "• GRATITUDE (3 min): write 3 specific things you're grateful for — specificity is what shifts state.\n" +
      "• VISUALIZE (5 min): see your top 3 outcomes for the day already done.\n" +
      "• PRIME (2 min): one incantation, out loud, with conviction. State first, then strategy.",
  },
  rpm_plan: {
    type: "steps",
    title: "Writing Your RPM Plan — How To",
    body:
      "Robbins' Result-Purpose-Massive Action, on paper, posted at your desk:\n" +
      "• RESULT: what specifically, by when. \"3 listing appointments booked by Friday.\"\n" +
      "• PURPOSE: the why that makes it a must. \"So my pipeline is full going into spring.\"\n" +
      "• MASSIVE ACTION: the concrete moves. \"30 calls/day to expireds + FSBOs, 9-11am, no inbox first.\"\n" +
      "Purpose is the fuel — if the result isn't pulling you, the purpose isn't big enough.",
  },
};

// Detect which action scripts back a given directive + RPM massive_action.
// Keyword match against combined text; returns an array of {title, type, body}.
function matchActionScripts(directive, rpmMassiveAction, bottleneck) {
  var hay = ((directive || "") + " " + (rpmMassiveAction || "")).toLowerCase();
  var hits = [];
  var seen = {};
  function add(key) {
    if (ACTION_SCRIPTS[key] && !seen[key]) { seen[key] = true; hits.push(ACTION_SCRIPTS[key]); }
  }
  // Keyword → script mappings (order = priority).
  if (/5-?5-?4|five.?five.?four/.test(hay)) add("five_five_four");
  if (/handwritten|power note|note to|thank-?you note/.test(hay)) add("power_note");
  if (/referral/.test(hay)) add("referral_ask");
  if (/ford|family.*occupation|recreation.*dream/.test(hay)) add("ford_conversation");
  if (/prospect|cold call|outbound|dial|fanatical/.test(hay)) add("prospecting_call");
  if (/follow.?up|touch sequence|cadence|10.?touch|ten.?touch/.test(hay)) add("follow_up_sequence");
  if (/listing presentation|consultation|diagnostic|first meeting/.test(hay)) add("listing_presentation");
  if (/price reduction|reposition|stale|reduce the price|price adjustment/.test(hay)) add("price_reduction");
  if (/sphere|check.?in|past client|database touch|reconnect/.test(hay)) add("sphere_checkin");
  if (/annual review|equity review|home anniversary/.test(hay)) add("annual_review");
  if (/hour of power|priming|prime|morning routine|incantation|gratitude/.test(hay)) add("hour_of_power");
  if (/rpm|result.*purpose|massive action/.test(hay)) add("rpm_plan");

  // Bottleneck fallback: if nothing matched, attach the most relevant script.
  if (hits.length === 0) {
    var fb = {
      pipeline_volume: "prospecting_call", lead_volume: "prospecting_call",
      prospecting_consistency: "prospecting_call", cold_call_aversion: "prospecting_call",
      lead_conversion: "follow_up_sequence", follow_up: "follow_up_sequence",
      low_conversion: "listing_presentation", speed_to_lead: "follow_up_sequence",
      relationship_deficit: "five_five_four", referral_quality: "referral_ask",
      database_size: "sphere_checkin", sphere_awareness: "sphere_checkin",
      retention: "annual_review", mindset_state: "hour_of_power",
      high_stress: "hour_of_power", personal_vision: "rpm_plan",
    };
    if (fb[bottleneck]) add(fb[bottleneck]);
  }
  // Cap at 3 so we never overwhelm.
  return hits.slice(0, 3);
}

// Stale-listing client-conversation scripts injected when RULE 1 fires.
const STALE_LISTING_SCRIPTS = {
  price_reduction:
    "PRICE-REDUCTION CONVERSATION: \"When we listed, we agreed the market would tell us if we were positioned right. " +
    "We've now had [X] showings and [Y] weeks with no accepted offer — that IS the market talking. " +
    "The longer a home sits, the more buyers assume something's wrong with it, not the price. " +
    "I'd rather adjust now from a position of strength than chase the market down. " +
    "Let's reposition to [new price] this week and create fresh urgency.\"",
  stale_checkin:
    "STALE-LISTING CHECK-IN: \"I want to be straight with you because that's what you hired me for. " +
    "Your home has been active [N] days. Homes that sell in our market typically go in the first 21. " +
    "We're past that window, so we have three levers: price, presentation, or promotion. " +
    "Here's what I'm seeing and what I recommend we change this week...\"",
  relist_refresh:
    "RE-LIST / REFRESH TALK: \"A listing that's been on the market a while goes 'stale' in the search portals — " +
    "it stops showing up as new and buyers scroll past it. Refreshing the listing, new photos, a price improvement, " +
    "and a coming-soon-style relaunch puts you back in front of every active buyer as if you're brand new. " +
    "Let's build that relaunch plan together.\"",
};

async function performanceOverride(db, agentId) {
  try {
    // Trailing-30-day contacts from the scorecard.
    var sc = await db
      .prepare(
        "SELECT COALESCE(SUM(contacts),0) AS contacts, COUNT(*) AS days " +
        "FROM daily_scorecard WHERE agent_id = $1 AND log_date >= NOW() - INTERVAL '30 days'"
      )
      .get(agentId);
    var contacts30 = sc ? Number(sc.contacts) : 0;
    var scDays = sc ? Number(sc.days) : 0;

    // Active listings (status pending, stage L) with their age, plus advanced counts.
    var listings = await db
      .prepare(
        "SELECT COUNT(*) FILTER (WHERE stage = 'L' AND status = 'pending') AS active_l, " +
        "COUNT(*) FILTER (WHERE stage = 'L' AND status = 'pending' AND signed_date <= NOW() - INTERVAL '90 days') AS stale90, " +
        "COUNT(*) FILTER (WHERE stage = 'L' AND status = 'pending' AND signed_date <= NOW() - INTERVAL '60 days' AND signed_date > NOW() - INTERVAL '90 days') AS aging60, " +
        "COUNT(*) FILTER (WHERE type = 'listing' AND stage IN ('C','F')) AS advanced, " +
        "COUNT(*) FILTER (WHERE type = 'listing') AS total_listings " +
        "FROM deals WHERE agent_id = $1"
      )
      .get(agentId);

    var activeL = listings ? Number(listings.active_l) : 0;
    var stale90 = listings ? Number(listings.stale90) : 0;
    var aging60 = listings ? Number(listings.aging60) : 0;
    var advanced = listings ? Number(listings.advanced) : 0;
    var totalListings = listings ? Number(listings.total_listings) : 0;

    var dealCount = totalListings; // proxy for "enough deal signal"

    // Trust gate — too little live signal, keep intake.
    if (scDays < 3 && dealCount < 3) {
      return null;
    }

    // RULE 2 — prospecting first. Empty top-of-funnel beats everything.
    if (scDays >= 3 && contacts30 < 20) {
      return {
        bottleneck: "pipeline_volume",
        reason: "Live data: only " + contacts30 + " contacts in the last 30 days. Top-of-funnel is the constraint.",
        scripts: null,
      };
    }

    // RULE 1 — listing aging. 90+ day stale + weak advance rate => conversion.
    var advanceRate = totalListings > 0 ? advanced / totalListings : 0;
    if (activeL >= 3 && stale90 >= 1 && advanceRate < 0.20) {
      return {
        bottleneck: "lead_conversion",
        reason: "Live data: " + stale90 + " listing(s) 90+ days old and only " +
          Math.round(advanceRate * 100) + "% advancing. Conversion, not lead-gen, is the constraint.",
        scripts: [
          STALE_LISTING_SCRIPTS.stale_checkin,
          STALE_LISTING_SCRIPTS.price_reduction,
          STALE_LISTING_SCRIPTS.relist_refresh,
        ],
        agingNote: aging60 > 0 ? (aging60 + " more listing(s) entering the 60-90 day window.") : null,
      };
    }

    return null;
  } catch (e) {
    // Override is best-effort; never break the coaching pipeline.
    console.error("performanceOverride non-fatal:", e.message);
    return null;
  }
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

  // ── STAGED COACHING: detect data maturity ──
  var stage = await getCoachingStage(db, agentId);

  // ── B2 override fires ONLY at Stage 3 (real track record).
  //    New agents (Stage 1) get foundation coaching, never adjustments. ──
  var effectiveBottleneck = diagnosis.bottleneck;
  var override = null;
  if (stage >= 3) {
    override = await performanceOverride(db, agentId);
    if (override && override.bottleneck) {
      effectiveBottleneck = override.bottleneck;
    }
  }

  var output = generateCoachingOutput({
    agentId: agentId,
    agentName: agentName,
    bottleneck: effectiveBottleneck,
    profile: diagnosis.profile,
    signals: signals,
    engagementScore: agent.engagement_score || 0,
  });

  // ── Stage-appropriate framing + dynamic data callouts ──
  var callouts = await buildDataCallouts(db, agentId, stage);

  if (stage === 1) {
    // Foundation: welcome framing, no adjustment language.
    output.the_strategy =
      "FOUNDATION WEEK — Your first job is building the rhythm, not chasing results yet. " +
      "Lock in your daily prospecting block, log your activity every day, and let the scoreboard start telling the truth. " +
      "Adjustments come once you have a track record to adjust.\n\n" +
      (output.the_strategy || "");
  } else {
    // Stage 2 & 3: layer the live read on top of the framework.
    var liveBits = [];
    if (callouts.activity) liveBits.push(callouts.activity);
    if (callouts.results) liveBits.push(callouts.results);
    if (liveBits.length) {
      var header = stage === 3 ? "[Live read — your actual numbers]" : "[Early read]";
      output.the_strategy =
        (output.the_strategy || "") +
        "\n\n" + header + " " + liveBits.join(" ");
    }
  }

  // If the Stage-3 override carried stale-listing scripts, append them.
  if (override) {
    if (override.reason) {
      output.the_strategy =
        (output.the_strategy || "") +
        "\n\n[Why this focus] " + override.reason +
        (override.agingNote ? " " + override.agingNote : "");
    }
    if (override.scripts && override.scripts.length) {
      output.the_strategy =
        (output.the_strategy || "") +
        "\n\nUSE THESE SCRIPTS THIS WEEK:\n\n" +
        override.scripts.join("\n\n");
    }
  }

  // ── Attach backup ACTION SCRIPTS for the directive + RPM (talk tracks / steps) ──
  try {
    var rpmAction = "";
    try {
      var rpmObj = JSON.parse(output.rpm_plan);
      rpmAction = rpmObj.massive_action || "";
    } catch (e) { rpmAction = output.rpm_plan || ""; }
    output.action_scripts = matchActionScripts(
      output.coaching_directive,
      rpmAction,
      effectiveBottleneck,
    );
  } catch (e) {
    console.error("matchActionScripts non-fatal:", e.message);
    output.action_scripts = [];
  }

  await writeCoachingOutput(db, output);

  await db
    .prepare(
      "UPDATE agent_lifecycle SET campaign_state = 'coaching_active', updated_at = $1 WHERE agent_id = $2",
    )
    .run(output.updated_at, agentId);

  return { output: output, council: output._meta.council };
}
// ═════════════════════════════════════════════════════════════════════════════
// DAILY WIN OPTIONS — 8 per bottleneck, agent picks top 3 weekly
// ═════════════════════════════════════════════════════════════════════════════

const DAILY_WIN_OPTIONS = {
  pipeline_volume: [
    { id: "pv1", text: "Complete 2-hour morning prospecting block", pts: 5 },
    { id: "pv2", text: "Make 25 outbound calls", pts: 5 },
    { id: "pv3", text: "Book 2 new appointments today", pts: 5 },
    { id: "pv4", text: "Add 3 new contacts to active database", pts: 3 },
    { id: "pv5", text: "Follow up on 5 pending leads", pts: 3 },
    { id: "pv6", text: "Send 5 personalized video texts", pts: 3 },
    { id: "pv7", text: "Review and update pipeline scorecard", pts: 2 },
    { id: "pv8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  lead_volume: [
    { id: "lv1", text: "Hit daily contact minimum (15 conversations)", pts: 5 },
    { id: "lv2", text: "Prospect from 3 different lead sources", pts: 5 },
    { id: "lv3", text: "Complete morning prospecting block", pts: 5 },
    { id: "lv4", text: "Send 10 outreach messages before 10am", pts: 3 },
    { id: "lv5", text: "Follow up on every lead from yesterday", pts: 3 },
    { id: "lv6", text: "Book 1 appointment from cold outreach", pts: 5 },
    { id: "lv7", text: "Add 5 new names to contact database", pts: 3 },
    { id: "lv8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  prospecting_consistency: [
    { id: "pc1", text: "Prospect at the same time as yesterday", pts: 5 },
    {
      id: "pc2",
      text: "Complete prospecting block before checking email",
      pts: 5,
    },
    {
      id: "pc3",
      text: "Make 10 calls within first 60 minutes of work",
      pts: 5,
    },
    {
      id: "pc4",
      text: "Share daily numbers with accountability partner",
      pts: 3,
    },
    { id: "pc5", text: "Track every dial on your scorecard", pts: 2 },
    { id: "pc6", text: "Set tomorrow's call list before end of day", pts: 3 },
    { id: "pc7", text: "Follow up on 3 leads from this week", pts: 3 },
    { id: "pc8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  lead_conversion: [
    { id: "lc1", text: "Respond to every new lead within 5 minutes", pts: 5 },
    {
      id: "lc2",
      text: "Follow up on 5 unconverted leads from this week",
      pts: 5,
    },
    { id: "lc3", text: "Send a personalized video text to 3 leads", pts: 3 },
    { id: "lc4", text: "Schedule 2 buyer/seller consultations", pts: 5 },
    { id: "lc5", text: "Review and advance every deal in pipeline", pts: 3 },
    { id: "lc6", text: "Practice consultation scripts for 15 minutes", pts: 2 },
    { id: "lc7", text: "Ask 1 past client for a referral", pts: 3 },
    { id: "lc8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  digital_leads: [
    {
      id: "dl1",
      text: "Respond to every online lead within 5 minutes",
      pts: 5,
    },
    {
      id: "dl2",
      text: "Send 5 personalized video texts to digital leads",
      pts: 5,
    },
    {
      id: "dl3",
      text: "Call + text + email every new lead (triple touch)",
      pts: 5,
    },
    { id: "dl4", text: "Follow up on 3 digital leads past day 2", pts: 3 },
    { id: "dl5", text: "Review online lead conversion rate this week", pts: 2 },
    { id: "dl6", text: "Schedule 1 appointment from online source", pts: 5 },
    { id: "dl7", text: "Update CRM notes on 10 active leads", pts: 3 },
    { id: "dl8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  speed_to_lead: [
    { id: "sl1", text: "Set up instant notifications on all devices", pts: 3 },
    { id: "sl2", text: "Respond to every lead within 5 minutes today", pts: 5 },
    { id: "sl3", text: "Prepare 3 response templates for quick reply", pts: 3 },
    { id: "sl4", text: "Triple-confirm every appointment today", pts: 3 },
    {
      id: "sl5",
      text: "Call back every missed inquiry from yesterday",
      pts: 5,
    },
    {
      id: "sl6",
      text: "Send a video text within 2 minutes of new lead",
      pts: 5,
    },
    { id: "sl7", text: "Track response times for every lead today", pts: 2 },
    { id: "sl8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  follow_up: [
    { id: "fu1", text: "Complete 10-touch sequence on 1 active lead", pts: 5 },
    { id: "fu2", text: "Send final-touch message to 3 cold leads", pts: 3 },
    { id: "fu3", text: "Follow up on every lead between touch 2-5", pts: 5 },
    { id: "fu4", text: "Schedule 5 follow-up calls for tomorrow", pts: 3 },
    { id: "fu5", text: "Send a check-in text to 5 past prospects", pts: 3 },
    { id: "fu6", text: "Update CRM with next action for 10 leads", pts: 2 },
    { id: "fu7", text: "Book 1 appointment from follow-up activity", pts: 5 },
    { id: "fu8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  relationship_deficit: [
    { id: "rd1", text: "Make 5 personal phone calls to sphere", pts: 5 },
    { id: "rd2", text: "Schedule 2 coffee meetings this week", pts: 5 },
    { id: "rd3", text: "Write 3 handwritten thank-you notes", pts: 3 },
    {
      id: "rd4",
      text: "Send a genuine check-in text to 5 past clients",
      pts: 3,
    },
    { id: "rd5", text: "Attend 1 community or networking event", pts: 5 },
    { id: "rd6", text: "Call your top referral source today", pts: 3 },
    { id: "rd7", text: "Add 3 people to your A-list nurture group", pts: 2 },
    { id: "rd8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  referral_quality: [
    { id: "rq1", text: "Ask 2 clients for a referral directly", pts: 5 },
    { id: "rq2", text: "Send thank-you note to last referral source", pts: 3 },
    { id: "rq3", text: "Provide update to someone who referred you", pts: 3 },
    { id: "rq4", text: "Call your top lender about mutual referrals", pts: 5 },
    { id: "rq5", text: "Identify 3 people to add to referral network", pts: 3 },
    {
      id: "rq6",
      text: "Send a value piece to 5 past referral sources",
      pts: 3,
    },
    { id: "rq7", text: "Schedule 1 strategic alliance meeting", pts: 5 },
    { id: "rq8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  database_size: [
    { id: "ds1", text: "Add 5 genuine new contacts to database", pts: 5 },
    { id: "ds2", text: "Make 5 personal phone calls to sphere", pts: 5 },
    { id: "ds3", text: "Schedule 2 face-to-face coffees this week", pts: 5 },
    {
      id: "ds4",
      text: "Send a check-in message to 10 database contacts",
      pts: 3,
    },
    { id: "ds5", text: "Segment 20 contacts into A/B/C tiers", pts: 3 },
    {
      id: "ds6",
      text: "Call 3 people you haven't spoken to in 6 months",
      pts: 3,
    },
    { id: "ds7", text: "Attend 1 networking event or community group", pts: 5 },
    { id: "ds8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  sphere_awareness: [
    {
      id: "sa1",
      text: "Post 1 valuable piece of content on social media",
      pts: 3,
    },
    { id: "sa2", text: "Make 5 personal calls to sphere contacts", pts: 5 },
    { id: "sa3", text: "Send a monthly touchpoint to top 20 contacts", pts: 5 },
    {
      id: "sa4",
      text: "Schedule 1 face-to-face meeting with a sphere member",
      pts: 5,
    },
    { id: "sa5", text: "Write 3 personal notes to past clients", pts: 3 },
    { id: "sa6", text: "Check in with 5 people from your warm list", pts: 3 },
    { id: "sa7", text: "Share a market update with 10 contacts", pts: 2 },
    { id: "sa8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  retention: [
    { id: "rt1", text: "Call 3 past clients for an annual check-in", pts: 5 },
    { id: "rt2", text: "Send a home anniversary message to 5 clients", pts: 3 },
    {
      id: "rt3",
      text: "Schedule 1 annual review call with a past client",
      pts: 5,
    },
    {
      id: "rt4",
      text: "Send a personalized gift or note to a recent close",
      pts: 3,
    },
    { id: "rt5", text: "Update CRM with life events for 10 clients", pts: 2 },
    {
      id: "rt6",
      text: "Ask 2 past clients for a review or testimonial",
      pts: 3,
    },
    { id: "rt7", text: "Invite 3 past clients to an upcoming event", pts: 3 },
    { id: "rt8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  consistency_habits: [
    { id: "ch1", text: "Complete all 5 non-negotiable daily actions", pts: 5 },
    {
      id: "ch2",
      text: "Start prospecting within 30 minutes of waking",
      pts: 5,
    },
    { id: "ch3", text: "Track every activity on your daily scorecard", pts: 3 },
    { id: "ch4", text: "Do not check email before prospecting block", pts: 3 },
    { id: "ch5", text: "Review tomorrow's plan before leaving today", pts: 2 },
    { id: "ch6", text: "Complete one task you've been avoiding", pts: 5 },
    { id: "ch7", text: "End work at your committed time — no drift", pts: 3 },
    { id: "ch8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  discipline: [
    {
      id: "dp1",
      text: "Follow your morning routine exactly as designed",
      pts: 5,
    },
    {
      id: "dp2",
      text: "Complete prospecting block regardless of mood",
      pts: 5,
    },
    { id: "dp3", text: "Say no to 1 distraction or low-value request", pts: 3 },
    {
      id: "dp4",
      text: "Execute your #1 priority before anything else",
      pts: 5,
    },
    { id: "dp5", text: "Track your time in 30-minute blocks today", pts: 3 },
    { id: "dp6", text: "Do not browse social media during work hours", pts: 3 },
    {
      id: "dp7",
      text: "Review your vision statement before starting work",
      pts: 2,
    },
    { id: "dp8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  tracking: [
    {
      id: "tk1",
      text: "Record every dial, contact, and appointment today",
      pts: 5,
    },
    {
      id: "tk2",
      text: "Calculate your conversion rate at one pipeline stage",
      pts: 5,
    },
    { id: "tk3", text: "Update your weekly scorecard by end of day", pts: 3 },
    { id: "tk4", text: "Review last week's numbers for 10 minutes", pts: 3 },
    { id: "tk5", text: "Set a specific numerical target for today", pts: 3 },
    {
      id: "tk6",
      text: "Share your numbers with your accountability partner",
      pts: 3,
    },
    { id: "tk7", text: "Compare this week's activity to last week", pts: 2 },
    { id: "tk8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  momentum: [
    {
      id: "mm1",
      text: "Execute your daily routine without modification",
      pts: 5,
    },
    {
      id: "mm2",
      text: "Make your first call within 15 minutes of starting",
      pts: 5,
    },
    {
      id: "mm3",
      text: "Complete 1 task immediately when you think of it",
      pts: 3,
    },
    { id: "mm4", text: "Stack 3 productive activities back to back", pts: 3 },
    { id: "mm5", text: "Celebrate 1 win from today — write it down", pts: 2 },
    {
      id: "mm6",
      text: "Call someone who energizes you professionally",
      pts: 3,
    },
    { id: "mm7", text: "Set tomorrow's top 3 before you finish today", pts: 3 },
    { id: "mm8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  mindset_state: [
    { id: "ms1", text: "Complete 10-minute morning state ritual", pts: 5 },
    {
      id: "ms2",
      text: "Write 3 things you're grateful for before work",
      pts: 3,
    },
    {
      id: "ms3",
      text: "Visualize your top 3 outcomes before first call",
      pts: 3,
    },
    {
      id: "ms4",
      text: "Take 1 action from a peak state, not obligation",
      pts: 5,
    },
    {
      id: "ms5",
      text: "Rewrite your business story in empowering language",
      pts: 5,
    },
    {
      id: "ms6",
      text: "Move your body for 20 minutes before prospecting",
      pts: 3,
    },
    {
      id: "ms7",
      text: "Disconnect from news/social for first 2 hours",
      pts: 2,
    },
    { id: "ms8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  personal_vision: [
    {
      id: "vi1",
      text: "Spend 15 minutes reviewing your 5-year vision",
      pts: 5,
    },
    { id: "vi2", text: "Write your ideal week on paper", pts: 5 },
    {
      id: "vi3",
      text: "Identify 1 daily action aligned with your vision",
      pts: 3,
    },
    {
      id: "vi4",
      text: "Say no to 1 thing that doesn't serve your goal",
      pts: 3,
    },
    { id: "vi5", text: "Share your goal with 1 person today", pts: 3 },
    { id: "vi6", text: "Block personal time on this week's calendar", pts: 3 },
    { id: "vi7", text: "Review your income goal and reverse the math", pts: 2 },
    { id: "vi8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  overwhelm: [
    {
      id: "ow1",
      text: "Identify your single most important task — do it first",
      pts: 5,
    },
    {
      id: "ow2",
      text: "Audit today's calendar — cancel 1 low-value meeting",
      pts: 5,
    },
    {
      id: "ow3",
      text: "Batch all email into 2 windows (11am and 3pm)",
      pts: 3,
    },
    { id: "ow4", text: "Delegate or delete 1 task from your list", pts: 3 },
    { id: "ow5", text: "Write tomorrow's top 3 priorities tonight", pts: 3 },
    {
      id: "ow6",
      text: "Say no to 1 request that isn't revenue-generating",
      pts: 3,
    },
    { id: "ow7", text: "Take a 15-minute reset between tasks", pts: 2 },
    { id: "ow8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  high_stress: [
    {
      id: "hs1",
      text: "Start the day with 10 genuine gratitude items",
      pts: 5,
    },
    { id: "hs2", text: "Approach every call as service, not sales", pts: 5 },
    {
      id: "hs3",
      text: "Take 3 deep breaths before each prospecting call",
      pts: 2,
    },
    { id: "hs4", text: "Complete 20 minutes of movement before work", pts: 3 },
    { id: "hs5", text: "End work at your committed time today", pts: 3 },
    {
      id: "hs6",
      text: "Have 1 conversation purely to help, not to close",
      pts: 3,
    },
    { id: "hs7", text: "Write down what went well at end of day", pts: 3 },
    { id: "hs8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  time_management: [
    {
      id: "tm1",
      text: "Block your peak hours (8-11am) for revenue activities",
      pts: 5,
    },
    {
      id: "tm2",
      text: "Say no to 1 meeting or task that isn't essential",
      pts: 5,
    },
    {
      id: "tm3",
      text: "Batch all admin into one 90-minute afternoon block",
      pts: 3,
    },
    { id: "tm4", text: "Do not check email before 10am", pts: 3 },
    {
      id: "tm5",
      text: "Time-block tomorrow's calendar before leaving today",
      pts: 3,
    },
    {
      id: "tm6",
      text: "Complete your top priority in the first 60 minutes",
      pts: 5,
    },
    { id: "tm7", text: "Track how you spend every hour today", pts: 2 },
    { id: "tm8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  accountability: [
    {
      id: "ac1",
      text: "Share your daily numbers with your partner today",
      pts: 5,
    },
    { id: "ac2", text: "Review your weekly scorecard honestly", pts: 5 },
    { id: "ac3", text: "Make a public commitment to your 30-day goal", pts: 5 },
    { id: "ac4", text: "Schedule your Friday accountability check-in", pts: 3 },
    {
      id: "ac5",
      text: "Write down exactly what you will accomplish today",
      pts: 3,
    },
    {
      id: "ac6",
      text: "Report your results to your partner before 6pm",
      pts: 3,
    },
    {
      id: "ac7",
      text: "Score yourself honestly on yesterday's plan (1-10)",
      pts: 2,
    },
    { id: "ac8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  cold_call_aversion: [
    { id: "ca1", text: "Make your first 3 calls to warm contacts", pts: 3 },
    {
      id: "ca2",
      text: "Reframe: make 5 service calls, not sales calls",
      pts: 5,
    },
    {
      id: "ca3",
      text: "Set a timer for 30 minutes and dial until it rings",
      pts: 5,
    },
    {
      id: "ca4",
      text: "Practice your opening script 5 times out loud",
      pts: 3,
    },
    {
      id: "ca5",
      text: "Call 1 person who already likes you — build confidence",
      pts: 3,
    },
    { id: "ca6", text: "Make 5 calls before allowing any other task", pts: 5 },
    { id: "ca7", text: "Celebrate after every completed call session", pts: 2 },
    { id: "ca8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  systems_design: [
    { id: "sd1", text: "Create a checklist for 1 repeating process", pts: 5 },
    { id: "sd2", text: "Automate 1 administrative task today", pts: 5 },
    { id: "sd3", text: "Map your ideal client journey on paper", pts: 5 },
    { id: "sd4", text: "Set up 1 automated follow-up sequence", pts: 3 },
    {
      id: "sd5",
      text: "Document your listing appointment prep process",
      pts: 3,
    },
    { id: "sd6", text: "Review and clean up your CRM for 20 minutes", pts: 2 },
    {
      id: "sd7",
      text: "Identify 1 task you do manually that could be templated",
      pts: 3,
    },
    { id: "sd8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  online_conversion: [
    {
      id: "oc1",
      text: "Send a personalized video text to 3 online leads",
      pts: 5,
    },
    {
      id: "oc2",
      text: "Respond to every online inquiry within 5 minutes",
      pts: 5,
    },
    {
      id: "oc3",
      text: "Position as advisor in 1 digital conversation today",
      pts: 3,
    },
    {
      id: "oc4",
      text: "Follow up on 5 online leads past initial contact",
      pts: 3,
    },
    { id: "oc5", text: "Review your online profile — update 1 thing", pts: 2 },
    {
      id: "oc6",
      text: "Schedule 1 virtual consultation from digital lead",
      pts: 5,
    },
    {
      id: "oc7",
      text: "Add value to 3 online leads beyond property info",
      pts: 3,
    },
    { id: "oc8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  pipeline_leakage: [
    {
      id: "pl1",
      text: "Audit every deal — define next action and date",
      pts: 5,
    },
    { id: "pl2", text: "Follow up on 3 deals that have gone silent", pts: 5 },
    {
      id: "pl3",
      text: "Advance 1 stalled deal to the next pipeline stage",
      pts: 5,
    },
    {
      id: "pl4",
      text: "Review fall-off rate at your weakest pipeline stage",
      pts: 3,
    },
    {
      id: "pl5",
      text: "Update CRM status on every active opportunity",
      pts: 3,
    },
    {
      id: "pl6",
      text: "Call 2 leads that fell out in the last 30 days",
      pts: 3,
    },
    { id: "pl7", text: "Remove 3 dead leads and focus your pipeline", pts: 2 },
    { id: "pl8", text: "Execute coaching directive before noon", pts: 5 },
  ],
  low_conversion: [
    {
      id: "lo1",
      text: "Prepare 10 diagnostic questions for your next meeting",
      pts: 5,
    },
    {
      id: "lo2",
      text: "Listen more than you talk in every consultation",
      pts: 5,
    },
    {
      id: "lo3",
      text: "Practice your consultation script for 15 minutes",
      pts: 3,
    },
    {
      id: "lo4",
      text: "Ask 3 questions before making any recommendation",
      pts: 3,
    },
    {
      id: "lo5",
      text: "Follow up with 2 prospects who chose another agent",
      pts: 5,
    },
    { id: "lo6", text: "Review your last 3 lost deals for patterns", pts: 3 },
    {
      id: "lo7",
      text: "Role-play a listing presentation with a colleague",
      pts: 3,
    },
    { id: "lo8", text: "Execute coaching directive before noon", pts: 5 },
  ],
};

// Dynamic Stage-3 wins injected from live data (live read on deals + scorecard).
// ── DAILY WINS v2 — WEIGHTED & ROTATING COMPOSER ─────────────────────────────
// The shown list is composed per-agent each week from a larger pool:
//   - A couple of universal ANCHORS always present.
//   - A WEIGHTED pool from the agent's stage + bottleneck + live data
//     (categories most relevant to the agent appear more often).
//   - WEEKLY rotation seeded by week_start, so it varies week-to-week
//     and between agents, without thrashing mid-week.

// Universal anchors — always available, the non-negotiable fundamentals.
const WIN_ANCHORS = [
  { id: "anchor_prospect", text: "Complete a 2-hour prospecting block before noon", pts: 5, cat: "anchor" },
  { id: "anchor_log", text: "Log every conversation in your CRM today", pts: 3, cat: "anchor" },
];

// Categorized win pool. The composer weights these by the agent's live read.
const WIN_POOL = {
  prospecting: [
    { id: "pw_calls25", text: "Make 25 outbound calls today", pts: 5 },
    { id: "pw_db5", text: "Add 5 new contacts to your active database", pts: 3 },
    { id: "pw_circle", text: "Call 10 people in your sphere just to check in", pts: 4 },
    { id: "pw_doorknock", text: "Knock 20 doors in a target neighbourhood", pts: 5 },
    { id: "pw_video", text: "Send 5 personalized video texts to leads", pts: 3 },
  ],
  conversion_ford: [
    { id: "cf_ford3", text: "Have 3 FORD conversations with your database (Family, Occupation, Recreation, Dreams)", pts: 8 },
    { id: "cf_past5", text: "Reconnect with 5 past clients using a FORD question to uncover a hidden move", pts: 8 },
    { id: "cf_leads5", text: "Generate 5 new buyer or seller leads this week", pts: 8 },
    { id: "cf_script", text: "Role-play your buyer/seller consultation script out loud", pts: 4 },
    { id: "cf_followup", text: "Follow up on every lead from the last 7 days", pts: 5 },
  ],
  stale_listing: [
    { id: "sl_price", text: "Call your oldest listing about a price adjustment", pts: 10 },
    { id: "sl_cma", text: "Prep a CMA refresh for a stale listing", pts: 8 },
    { id: "sl_relaunch", text: "Build a relaunch plan (new photos + price) for an aging listing", pts: 8 },
    { id: "sl_seller", text: "Hold a frank market-update conversation with a long-listed seller", pts: 7 },
  ],
  appointments: [
    { id: "ap_book2", text: "Book 2 new appointments today", pts: 5 },
    { id: "ap_confirm", text: "Confirm and prep for every appointment this week", pts: 3 },
    { id: "ap_pitch", text: "Deliver one listing presentation this week", pts: 6 },
  ],
  mindset: [
    { id: "md_review", text: "Review and update your pipeline scorecard", pts: 2 },
    { id: "md_directive", text: "Execute your coaching directive before noon", pts: 5 },
    { id: "md_gratitude", text: "Write down 3 wins from yesterday before starting today", pts: 2 },
  ],
};

// Map a bottleneck to which pool categories matter most (baseline weighting).
function bottleneckWeights(bottleneck) {
  var w = { prospecting: 1, conversion_ford: 1, stale_listing: 0, appointments: 1, mindset: 1 };
  switch (bottleneck) {
    case "pipeline_volume":
    case "lead_volume":
    case "prospecting_consistency":
      w.prospecting = 3; w.appointments = 2; break;
    case "lead_conversion":
    case "conversion":
    case "low_conversion":
    case "online_conversion":
      w.conversion_ford = 3; w.appointments = 2; break;
    case "follow_up":
    case "database_size":
    case "referral_quality":
    case "relationship_deficit":
      w.conversion_ford = 3; w.prospecting = 2; break;
    case "mindset_state":
    case "consistency_habits":
    case "accountability":
    case "overwhelm":
    case "high_stress":
      w.mindset = 3; w.prospecting = 2; break;
    default:
      w.prospecting = 2;
  }
  return w;
}

// Deterministic weekly shuffle: seeded by week_start so it's stable all week,
// fresh each Monday, and varied between agents (agentId mixed into the seed).
function seededShuffle(arr, seedStr) {
  var seed = 0;
  for (var i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  var a = arr.slice();
  for (var j = a.length - 1; j > 0; j--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    var k = seed % (j + 1);
    var t = a[j]; a[j] = a[k]; a[k] = t;
  }
  return a;
}

function currentWeekStart() {
  var now = new Date();
  var day = now.getDay();
  var diff = now.getDate() - day + (day === 0 ? -6 : 1);
  var monday = new Date(new Date(now).setDate(diff));
  return monday.toISOString().slice(0, 10);
}

// Legacy signature still works: getDailyWinOptions(bottleneck).
// Full signature: getDailyWinOptions(bottleneck, db, agentId, stage) — async, composed.
async function getDailyWinOptions(bottleneck, db, agentId, stage) {
  var weights = bottleneckWeights(bottleneck);

  // ── Live read adjusts weighting toward the agent's current reality ──
  if (db && agentId) {
    try {
      var d = await db
        .prepare(
          "SELECT " +
          "COUNT(*) FILTER (WHERE stage='L' AND status='pending' AND signed_date <= NOW() - INTERVAL '90 days') AS stale90, " +
          "COUNT(*) FILTER (WHERE status='closed' AND EXTRACT(YEAR FROM closed_date)=EXTRACT(YEAR FROM NOW())) AS closed_ytd " +
          "FROM deals WHERE agent_id = $1"
        )
        .get(agentId);
      var stale90 = d ? Number(d.stale90) : 0;
      var closedYtd = d ? Number(d.closed_ytd) : 0;

      var sc = await db
        .prepare(
          "SELECT COALESCE(SUM(contacts),0) AS contacts " +
          "FROM daily_scorecard WHERE agent_id = $1 AND log_date >= NOW() - INTERVAL '30 days'"
        )
        .get(agentId);
      var contacts30 = sc ? Number(sc.contacts) : 0;

      if (stale90 >= 1) weights.stale_listing += 3;
      if (contacts30 < 20) weights.prospecting += 3;
      if (closedYtd === 0) weights.conversion_ford += 2;
    } catch (e) {
      console.error("getDailyWinOptions live read non-fatal:", e.message);
    }
  }

  // ── Build a weighted candidate list: each category contributes copies
  //    proportional to its weight, then we shuffle and de-dupe. ──
  var weekSeed = currentWeekStart() + "|" + (agentId || "anon");
  var pooled = [];
  Object.keys(WIN_POOL).forEach(function (cat) {
    var weight = weights[cat] || 1;
    if (weight <= 0) return;
    // Shuffle within the category (week-seeded) and take more from heavier cats.
    var shuffled = seededShuffle(WIN_POOL[cat], weekSeed + cat);
    var take = Math.min(shuffled.length, Math.max(1, Math.round(weight)));
    for (var i = 0; i < take; i++) pooled.push(shuffled[i]);
  });

  // Shuffle the pooled candidates (week-seeded) for cross-category variety.
  pooled = seededShuffle(pooled, weekSeed + "mix");

  // Assemble: anchors first, then weighted picks, de-duped, capped ~8.
  var result = [];
  var seen = {};
  WIN_ANCHORS.forEach(function (a) {
    if (!seen[a.id]) { seen[a.id] = true; result.push({ id: a.id, text: a.text, pts: a.pts }); }
  });
  for (var i = 0; i < pooled.length && result.length < 8; i++) {
    var p = pooled[i];
    if (!seen[p.id]) { seen[p.id] = true; result.push({ id: p.id, text: p.text, pts: p.pts }); }
  }
  return result;
}
module.exports = {
  generateCoachingOutput: generateCoachingOutput,
  writeCoachingOutput: writeCoachingOutput,
  runCoachingPipeline: runCoachingPipeline,
  constraintLabel: constraintLabel,
  getDailyWinOptions: getDailyWinOptions,
  getCoachingStage: getCoachingStage,
};
