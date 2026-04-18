/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * THE MASTER COUNCIL — 10-Master Coaching Library (FULL 300-POINT EDITION)
 * Node Runner: Performance Architect Suite
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 30 Wisdom Points per Master × 10 Masters = 300 Points of Architectural Wisdom
 *
 * Each wisdom point is multi-sentence where the concept demands depth,
 * and includes direct attribution ("As Robbins teaches...", "Blount warns...")
 * so the portal can cite the source naturally.
 *
 * Each Master contains:
 *   - id, name, title, focus
 *   - bottlenecks[]        — which diagnosis bottlenecks trigger this master
 *   - wisdomPoints[]       — 30 deep insights (with keys for scoring)
 *   - truthTemplates[]     — "The Truth" paragraphs (woven with master citation)
 *   - strategyTemplates[]  — "The Strategy" paragraphs (woven with master citation)
 *   - directives[]         — single-line coaching directives
 *   - quotes[]             — attributed quotes
 *   - rpmTemplates[]       — Result / Purpose / Massive Action structures
 */

const MASTERS = {

// ═══════════════════════════════════════════════════════════════════════════════
// 1. TONY ROBBINS — The RPM & Mindset Master
// ═══════════════════════════════════════════════════════════════════════════════
robbins: {
  id: "robbins",
  name: "Tony Robbins",
  title: "The RPM & Mindset Master",
  focus: "Time Management / Personal Vision / State Mastery",
  bottlenecks: ["time_management", "mindset_state", "personal_vision", "overwhelm", "consistency_habits"],
  wisdomPoints: [
    // ── RPM Framework (1-8) ──
    { key: "rpm_core", text: "Robbins says the RPM system is the antidote to the 'Niagara Syndrome'—most people jump into the river of life without deciding where they want to end up. RPM forces you to define the Result before you plan the activity. Without a result, you're just busy." },
    { key: "rpm_result", text: "The 'R' in RPM stands for Result. As Robbins teaches: 'Never begin a task, conversation, or day without being crystal clear on what you want to achieve.' A result is not a task—it's an outcome you can feel, measure, and celebrate." },
    { key: "rpm_purpose", text: "The 'P' in RPM stands for Purpose. Robbins insists that purpose is the fuel: 'Reasons come first, answers come second.' When your reason for achieving something is strong enough, you'll find the strategy. When it's weak, every obstacle becomes an excuse." },
    { key: "rpm_massive_action", text: "The 'M' in RPM stands for Massive Action Plan. Robbins distinguishes between passive action (learning, planning, preparing) and massive action (doing the thing that scares you). He says: 'The only impossible journey is the one you never begin.' MAP is about execution velocity, not perfection." },
    { key: "outcome_first", text: "Robbins teaches Outcome-First Thinking: before you open your calendar, your inbox, or your CRM, ask one question—'What is my outcome today?' If you can't answer that in one sentence, you are not ready to start working. You're ready to start drifting." },
    { key: "chunking", text: "Robbins' Chunking method transforms overwhelm into clarity. Instead of managing 47 individual tasks, group them under 4-5 outcome categories. As Robbins puts it: 'Complexity is the enemy of execution.' Chunk by result, not by activity—and watch the paralysis dissolve." },
    { key: "hour_of_power", text: "The Hour of Power is Robbins' non-negotiable morning ritual: 20 minutes of movement (to change your physiology), 20 minutes of gratitude and incantation (to change your focus), and 20 minutes of learning (to sharpen your edge). Robbins says: 'If you don't have 10 minutes for yourself, you don't have a life—you have a job.'" },
    { key: "time_mastery", text: "Robbins reframes time management entirely: 'It's not about managing time—it's about managing your state and your focus.' A peak-state hour produces more than an entire day of distracted grinding. The question isn't 'How do I find more time?' It's 'How do I bring more of myself to the time I have?'" },

    // ── Psychology & State (9-16) ──
    { key: "three_pillars", text: "Robbins' Three Pillars of Mastery: Strategy, Story, and State. Strategy is the plan. Story is the meaning you assign to events. State is your emotional and physical condition in the moment. As Robbins says: 'The strongest strategy in the world will fail if your story is 'I can't' and your state is depleted.'" },
    { key: "psychology_80_20", text: "Success is 80% psychology, 20% mechanics. Robbins makes this point relentlessly: 'You don't need a better script—you need a better state. You don't need a better CRM—you need a better belief about what's possible.' Mechanics without mindset is a Ferrari with no fuel." },
    { key: "emotional_home", text: "Robbins defines your 'Emotional Home' as the emotional state you default to when nothing is pulling you in a particular direction. Most agents live in stress, anxiety, or frustration as their baseline. Robbins teaches that gratitude, determination, and curiosity are learnable emotional homes—but only through daily conditioning." },
    { key: "identity_shift", text: "As Robbins says: 'We act consistent with who we believe we are.' If your identity is 'I'm not a natural salesperson,' no script will save you. The shift isn't behavioral—it's ontological. You must become the person who prospects naturally before the prospecting will flow naturally." },
    { key: "decision_power", text: "Robbins teaches that decisions—not conditions—determine your destiny. 'It is in your moments of decision that your destiny is shaped.' The agent who decides to become a fanatical prospector today changes everything. The agent who 'plans to start Monday' changes nothing." },
    { key: "primary_question", text: "Robbins' Primary Question exercise: 'What question do you habitually ask yourself?' If your default question is 'Why is this so hard?' your brain will find evidence of difficulty everywhere. Replace it with 'How can I make this work?' and your reticular activating system starts finding solutions." },
    { key: "standard_of_excellence", text: "Robbins says: 'Your life is a direct reflection of the standards you set, not the goals you dream about.' Goals are things you'd like to achieve. Standards are things you refuse to live below. When you raise your standard from 'I should prospect' to 'I will never start a day without prospecting,' behavior changes permanently." },
    { key: "conditioning", text: "Robbins compares peak performance to physical fitness: 'You don't get strong by going to the gym once. You get strong through daily conditioning.' Mental toughness, emotional resilience, and prospecting discipline are muscles. Skip a day and they atrophy. Condition them daily and they become automatic." },

    // ── Applied Strategy (17-24) ──
    { key: "massive_action_cycle", text: "Robbins' Massive Action Cycle has four steps: (1) Know your outcome, (2) Take massive action, (3) Notice what's working and what isn't, (4) Change your approach until you get the result. Most agents fail at step 4—they take action, it doesn't work, and they stop. Robbins says the only real failure is stopping." },
    { key: "modeling", text: "Robbins teaches Modeling as a shortcut to mastery: 'Find someone who's already getting the results you want, find out what they're doing, do the same thing, and you'll get the same results.' In real estate, this means studying the top producer in your office—not their personality, but their daily system." },
    { key: "six_human_needs", text: "Robbins' 6 Human Needs framework (Certainty, Variety, Significance, Connection, Growth, Contribution) explains why clients behave the way they do. The agent who can identify which need a prospect is trying to meet can position their service as the solution—not just to a real estate transaction, but to a life problem." },
    { key: "pain_pleasure", text: "The Pain-Pleasure Principle is Robbins' core behavioral driver: people move toward pleasure and away from pain. If the pain of staying inactive is less than the pain of prospecting, you'll procrastinate. Robbins teaches you to consciously link massive pain to inaction and massive pleasure to execution. Rewrite the associations." },
    { key: "incantations", text: "Robbins distinguishes between affirmations (which he considers weak) and incantations (which engage your physiology). 'An incantation is said with your whole body—with conviction, with movement, with volume.' 'I am an unstoppable prospecting machine' said with a clenched fist at 7am hits differently than a whispered affirmation in the mirror." },
    { key: "priming", text: "Priming is Robbins' 10-minute daily ritual for conditioning your state: 3 minutes of breathing, 3 minutes of gratitude, 3 minutes of visualizing your top 3 outcomes. As Robbins says: 'If you don't prime yourself, the world will prime you—and it probably won't prime you for greatness.'" },
    { key: "the_gap", text: "Robbins identifies 'The Gap' as the space between where you are and where you want to be. Most people focus on the gap and feel inadequate. Robbins teaches: focus on how far you've come, celebrate the progress, then use that momentum to close the remaining distance. Gratitude for progress fuels future progress." },
    { key: "peer_group", text: "Robbins says: 'Your income is the average of the 5 people you spend the most time with.' This isn't metaphorical—it's mathematical. If your peer group accepts mediocre prospecting discipline, you will too. Upgrade your peer group, upgrade your standard." },

    // ── Deep Philosophy (25-30) ──
    { key: "certainty_confidence", text: "Robbins teaches that certainty is a choice, not a circumstance. 'Confidence doesn't come from always being right—it comes from not being afraid to be wrong.' The agent who picks up the phone with certainty in their value proposition converts at a fundamentally different rate than the one who dials apologetically." },
    { key: "resourceful_not_resources", text: "As Robbins famously says: 'It's not about resources—it's about resourcefulness.' The agent who says 'I don't have leads' is focused on resources. The agent who says 'How can I create opportunities right now with what I have?' is focused on resourcefulness. The second agent always wins." },
    { key: "raising_standards", text: "Robbins draws a sharp line between 'shoulds' and 'musts.' 'When something is a should, you'll find a way to avoid it. When it becomes a must, you'll find a way to make it happen.' Prospecting should be a 'must' in your vocabulary. If it's still a 'should,' you haven't raised your standard far enough." },
    { key: "energy_mastery", text: "Robbins teaches that energy is the foundation of all performance: 'The higher your energy, the higher your capacity for focus, creativity, and resilience.' He recommends alkaline nutrition, daily movement, proper sleep, and eliminating energy vampires (people, habits, and environments that drain you)." },
    { key: "contribution", text: "Robbins' ultimate insight: 'The secret to living is giving.' When an agent shifts from 'What can I get from this client?' to 'How can I serve this person at the highest level?', the entire dynamic changes. Contribution-driven agents don't chase—they attract. Service is the ultimate conversion strategy." },
    { key: "immersion", text: "Robbins recommends total immersion for breakthrough: 'If you want to take the island, burn the boats.' Half-measures in prospecting, in habit change, in identity shifts—they all fail. Commit fully for 30 days. Eliminate the backup plan. As Robbins puts it: 'Stay committed to your decisions, but stay flexible in your approach.'" },
  ],
  truthTemplates: [
    "As Tony Robbins teaches: you don't have a time problem—you have a priority problem. Your calendar is full of activities, but your outcomes are undefined. Until every block on your schedule answers the question 'What result does this produce?', you're running on a hamster wheel disguised as productivity. Robbins calls this the 'Niagara Syndrome'—you jumped into the river without deciding where you want to end up.",
    "Robbins' 80/20 rule applies directly to your situation: 80% of your stagnation is psychological, not tactical. You know what to do—your state is preventing you from doing it. Robbins says: 'You don't need a better script—you need a better state.' The shift starts with your Hour of Power, not your CRM.",
    "Your standards, not your goals, determine your results. Robbins is unambiguous: 'People don't get what they want—they get what they tolerate.' Right now, you're tolerating mediocre prospecting discipline because you haven't raised the floor on what 'acceptable' looks like. The moment prospecting becomes a 'must' instead of a 'should,' the behavior changes permanently.",
    "Robbins identifies your core gap as an identity problem, not a skill problem: 'We act consistent with who we believe we are.' You're trying to change your behavior without changing your self-concept. The prospecting system you need is already available to you. The identity that would execute it consistently is the missing piece.",
    "Tony Robbins would diagnose this as a State problem, not a Strategy problem. His Three Pillars framework—Strategy, Story, State—reveals that your strategy is fine, but your story ('this market is tough,' 'I'm not a natural prospector') is undermining your state. Fix the story, fix the state, and the strategy finally gets executed.",
  ],
  strategyTemplates: [
    "Apply Robbins' RPM framework immediately: define one clear Result for this week, connect it to a Purpose that moves you emotionally (the 'why behind the why'), then map 3 Massive Actions that make the result inevitable. Post this where you see it every morning. As Robbins says: 'Reasons come first, answers come second.'",
    "Implement Robbins' Hour of Power as your non-negotiable morning ritual: 20 minutes of movement, 20 minutes of gratitude and incantation, 20 minutes of learning. Robbins' research shows this single ritual shifts your emotional home from survival to creation. 'If you don't have 10 minutes for yourself,' Robbins warns, 'you don't have a life—you have a job.'",
    "Use Robbins' Chunking method to eliminate your overwhelm: stop managing 47 individual tasks and start managing 4-5 outcome categories. Group every activity under its parent result. If an activity doesn't serve a defined result, it's not productivity—Robbins calls it 'creative avoidance.' Delete it or delegate it.",
    "Execute Robbins' Massive Action Cycle: (1) Define your outcome for the next 30 days, (2) Take massive, imperfect action starting today, (3) Observe results without judgment, (4) Adjust your approach based on feedback. Robbins says: 'The only real failure is the failure to act. Everything else is just learning.'",
    "Apply Robbins' Pain-Pleasure Principle: right now, the pain of prospecting feels greater than the pain of an empty pipeline. That's because the pipeline pain is 90 days away and the prospecting pain is now. Consciously link massive pain to inaction ('In 90 days, I'll have no closings') and massive pleasure to today's calls ('Every dial brings me closer to my family's security').",
  ],
  directives: [
    "Define your #1 Result for this week and write the Purpose behind it before you open your inbox.",
    "Complete your Hour of Power (move, gratitude, learn) before any client contact today.",
    "Audit your calendar: delete or delegate every activity that doesn't serve a defined outcome.",
    "Ask yourself Robbins' Primary Question every morning: 'What am I focusing on, and does it serve my result?'",
    "Replace one 'should' in your language with 'must' today. 'I should prospect' becomes 'I must prospect.'",
    "Write your RPM plan on paper: Result, Purpose, Massive Action. Post it at your desk.",
    "Do 10 minutes of Robbins' Priming before your first call: breathe, gratitude, visualize outcomes.",
    "Identify your emotional home this week. If it's stress, consciously shift it to determination.",
  ],
  quotes: [
    { text: "It is in your moments of decision that your destiny is shaped.", author: "Tony Robbins" },
    { text: "Where focus goes, energy flows.", author: "Tony Robbins" },
    { text: "The path to success is to take massive, determined action.", author: "Tony Robbins" },
    { text: "Setting goals is the first step in turning the invisible into the visible.", author: "Tony Robbins" },
    { text: "It's not about resources—it's about resourcefulness.", author: "Tony Robbins" },
    { text: "Stay committed to your decisions, but stay flexible in your approach.", author: "Tony Robbins" },
    { text: "The secret to living is giving.", author: "Tony Robbins" },
    { text: "If you do what you've always done, you'll get what you've always gotten.", author: "Tony Robbins" },
  ],
  rpmTemplates: [
    { result: "Close 2 qualified appointments this week", purpose: "So I build pipeline momentum that compounds over 90 days", massive_action: "Block 2 hours daily for outbound calls; no inbox until 10am" },
    { result: "Establish my non-negotiable Hour of Power for 7 consecutive days", purpose: "So I operate from creation, not reaction, every single day", massive_action: "Set alarm 60 minutes earlier, prepare ritual sequence tonight, execute without negotiation" },
    { result: "Eliminate all 'should' language from my business vocabulary", purpose: "So every commitment becomes a standard, not a wish", massive_action: "Write down my top 5 'shoulds,' convert each to a 'must,' post at desk, recite daily" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 2. MICHAEL MAHER — 7L: Relationship Capital
// ═══════════════════════════════════════════════════════════════════════════════
maher: {
  id: "maher",
  name: "Michael Maher",
  title: "7L: Relationship Capital Architect",
  focus: "Database Size / Referral Quality / Sphere of Influence",
  bottlenecks: ["relationship_deficit", "referral_quality", "database_size", "sphere_awareness", "retention"],
  wisdomPoints: [
    // ── The 7 Levels of Communication (1-8) ──
    { key: "seven_levels", text: "Maher's 7 Levels of Communication is the hierarchy of influence: Level 1 is advertising (lowest trust), Level 2 is direct mail, Level 3 is electronic communication, Level 4 is handwritten notes, Level 5 is phone calls, Level 6 is events and seminars, Level 7 is one-on-one meetings (highest trust). As Maher says: 'The agents who dominate operate at Levels 5-7. Everyone else fights for scraps at Levels 1-3.'" },
    { key: "pyramid_power", text: "The Communication Pyramid is Maher's central framework: the higher you operate on the pyramid, the fewer people you reach—but the deeper the impact. One face-to-face coffee meeting produces more referral potential than 10,000 email impressions. Maher teaches: 'Stop trying to reach everyone. Start trying to deeply connect with the right 150.'" },
    { key: "generosity_generation", text: "The Generosity Generation is Maher's business philosophy: give first, expect nothing, receive everything. This isn't idealism—it's strategy. Maher's data shows that agents who lead with generosity (gifts, introductions, referrals to others) generate 3-5x more inbound referrals than agents who lead with asks. As Maher puts it: 'Generosity is the ultimate business strategy because it's the one thing your competition can't copy.'" },
    { key: "power_note", text: "The handwritten note is what Maher calls 'the most powerful marketing tool in existence.' He calculates it as a 1,000% ROI activity: a 60-cent stamp and 3 minutes of your time produces a touchpoint that people keep, display, and talk about. Maher says: 'In a world drowning in digital noise, a handwritten note is a voice that cuts through everything.'" },
    { key: "e_to_p", text: "Maher's E-to-P transition is the shift from Entrepreneurial communication (transactional, self-serving) to Purposeful communication (relational, other-serving). Entrepreneurial communication sounds like 'I just closed a deal—send me your referrals!' Purposeful communication sounds like 'I was thinking about you—how's your daughter's college search going?' The first repels. The second attracts." },
    { key: "hub_of_wealth", text: "As Maher teaches: 'Your database is the hub of your entire financial life.' Every dollar you will earn in the next 5 years is connected to a person you already know—or a person they know. Neglecting your database isn't just poor marketing; it's financial malpractice. The hub must be maintained, segmented, and nurtured with the same discipline you'd give an investment portfolio." },
    { key: "referral_vs_lead", text: "Maher draws a sharp distinction: 'A lead is a name on a list. A referral is a pre-endorsed opportunity backed by someone's personal reputation.' Leads convert at 1-3%. Referrals convert at 15-25%. The math is unambiguous: an agent with 50 quality referrals per year will outproduce an agent with 500 cold leads—and do it with less stress, lower cost, and more joy." },
    { key: "trust_velocity", text: "Trust Velocity is Maher's term for the speed at which trust is built in a relationship. High trust velocity means the prospect moves from 'Who is this person?' to 'I trust them completely' in days instead of months. The primary accelerator? Personal referrals. When someone's trusted friend says 'Call this agent,' trust velocity is nearly instant." },

    // ── The Rituals (9-16) ──
    { key: "ritual_554", text: "The 5-5-4 Ritual is Maher's weekly non-negotiable: 5 handwritten notes, 5 personal phone calls, 4 face-to-face coffees or meetings. Maher says: 'This is not a suggestion—this is the minimum viable relationship maintenance for a referral-based business.' Miss a week, and you're leaking relationship capital you can't easily replace." },
    { key: "appreciation_party", text: "Maher considers the Client Appreciation Party the single highest-leverage event in real estate. One party per year, inviting your entire A-List and encouraging them to bring friends, generates more referral conversations in 3 hours than 6 months of cold calling. Maher says: 'The party isn't marketing. It's the physical manifestation of your gratitude—and gratitude, expressed publicly, is magnetic.'" },
    { key: "database_segregation", text: "Maher's Database Segregation principle: not all contacts deserve equal energy. Segment into A-List (people who have referred or will refer), B-List (people who like you but haven't referred yet), and C-List (acquaintances). The A-List gets the 5-5-4 treatment. The B-List gets monthly touches. The C-List gets quarterly. As Maher says: 'Stop giving your best energy to people who will never send you business.'" },
    { key: "b2b_alliances", text: "Your Power Team—the lender, the lawyer, the inspector, the financial planner—are what Maher calls your 'B2B Alliances.' These aren't vendors; they're co-marketers. Maher teaches: 'A strong Power Team member who believes in you will send you 5-10 referrals per year without you asking. That's a $50,000+ relationship. Treat it accordingly.'" },
    { key: "annual_plan", text: "Maher recommends a 12-month relationship marketing calendar: themed monthly touchpoints (January = goal-setting resources, February = Valentine's notes, March = spring cleaning guides, etc.) that give you a reason to stay in front of your database consistently. 'Consistency beats creativity,' Maher says. 'A boring monthly touch beats a brilliant annual one.'" },
    { key: "ambassador_program", text: "Maher's Ambassador Program identifies your top 10-15 referral sources and treats them like business partners: quarterly lunches, annual gifts, first access to new listings, public recognition. These ambassadors become your unpaid sales force. Maher says: 'Your ambassadors should feel like insiders, not customers.'" },
    { key: "introduction_ritual", text: "Maher teaches the Introduction Ritual: every week, introduce two people in your network who should know each other. This costs you nothing, takes 5 minutes (one email), and positions you as a connector—the most valuable identity in any network. 'The person who makes the introduction,' Maher says, 'always stays top of mind with both parties.'" },
    { key: "give_to_give", text: "Maher distinguishes between 'Give to Get' and 'Give to Give.' Most agents give strategically—they're generous because they expect a return. Maher says the masters give without expectation: 'When you give to give, with no strings attached, the universe overpays you. Not because of karma—because people can feel the difference between authentic generosity and transactional generosity.'" },

    // ── Philosophy & Depth (17-24) ──
    { key: "love_language", text: "Maher applies Gary Chapman's Love Languages to business relationships: some clients respond to gifts (Pop-Bys), some to words of affirmation (handwritten notes), some to quality time (coffee meetings), some to acts of service (solving a problem for them). The agent who identifies a client's love language and communicates through it builds bonds that are nearly unbreakable." },
    { key: "community_gravity", text: "Maher teaches Community Gravity: the more value you add to your community—through events, volunteering, sponsorships, introductions—the more business gravitates toward you without active pursuit. 'You don't chase clients in your community,' Maher says. 'You become so embedded, so valuable, so present, that calling anyone else feels wrong.'" },
    { key: "relational_capital", text: "Relational Capital is Maher's core concept: every interaction either deposits or withdraws from your relationship bank account. A helpful phone call is a deposit. A pushy listing pitch is a withdrawal. The agents with the deepest relationship capital can weather any market downturn because their sphere's trust is recession-proof." },
    { key: "content_creation", text: "Maher encourages agents to create original content—not canned marketing—that reflects their genuine personality and expertise. 'People don't refer agents because of their headshot or their tagline,' Maher says. 'They refer agents they feel they know, like, and trust. Original content is the vehicle for demonstrating all three—at scale.'" },
    { key: "listening_as_currency", text: "Maher says: 'The most underrated business skill is listening. Not listening to respond—listening to understand.' When you truly listen to a client's dreams, fears, and priorities, you earn permission to advise them. Advisors don't need to pitch—they get asked. Listening is the fastest path from salesperson to advisor." },
    { key: "follow_up_philosophy", text: "Maher reframes follow-up as follow-through: 'Follow-up sounds like you're chasing them. Follow-through sounds like you're keeping a promise.' The language matters because the mindset matters. When you follow through, you're demonstrating reliability—the second pillar of trust." },
    { key: "lifetime_value", text: "Maher calculates the lifetime value of a single deeply-connected relationship: the initial transaction ($8-15K commission), plus repeat business (every 7-10 years), plus referrals (1-2 per year for life), plus their children's transactions, plus estate referrals. A single relationship, maintained by the 7L system, can be worth $100,000+ over a career." },
    { key: "magnetic_personality", text: "Maher teaches that a 'magnetic personality' isn't a personality type—it's a practiced discipline. Warmth, genuine curiosity, remembering details about people's lives, and consistent follow-through create a persona that people want to be around. 'Charisma,' Maher says, 'is just empathy at scale.'" },

    // ── Advanced Application (25-30) ──
    { key: "event_architecture", text: "Maher's Event Architecture goes beyond the Appreciation Party: he recommends a portfolio of events—client happy hours, community service days, kids' holiday parties, homeowner workshops—each designed to deepen a specific segment of your sphere. The key principle: 'Events create shared experiences, and shared experiences create bonds that no competitor can break.'" },
    { key: "referral_confidence", text: "Maher addresses the #1 reason agents don't get referrals: they don't ask. Not because they're shy, but because they lack Referral Confidence—the deep belief that asking for a referral is an act of service, not an act of selfishness. 'When you ask for a referral,' Maher teaches, 'you're saying: I believe I can help the people you care about as much as I've helped you. That's generous, not greedy.'" },
    { key: "digital_amplification", text: "While Maher prioritizes high-touch communication, he acknowledges digital amplification: use social media and email to stay visible (Levels 1-3), but use that visibility to create opportunities for Levels 5-7 conversations. 'Digital warms the relationship,' Maher says. 'Personal contact closes it.'" },
    { key: "systematic_gratitude", text: "Maher's Systematic Gratitude is the practice of building gratitude into your operational workflow—not just feeling grateful, but expressing it in scheduled, tracked, tangible ways. Every closing triggers a thank-you note. Every referral triggers a gift. Every anniversary triggers a call. Gratitude as a system, not a sentiment." },
    { key: "150_rule", text: "Maher references Dunbar's Number: most people can maintain about 150 meaningful relationships. For an agent, this means your active database should be roughly 150 people—your 'tribe.' These 150 people, properly nurtured with the 7L system, will generate more business than 5,000 cold contacts in a CRM you never touch." },
    { key: "next_gen_referrals", text: "Maher teaches agents to think generationally: 'Your client's children will buy homes. Their friends will buy homes. If you serve the parent with excellence, you become the family's agent for life.' This long-view relationship building is what separates a career from a series of transactions." },
  ],
  truthTemplates: [
    "Maher's 7L framework reveals your core gap: you're operating at Level 1-2 communication (mass emails, social posts) when your business needs Level 6-7 (personal calls, face-to-face meetings). As Maher says: 'The agents who dominate referrals aren't better marketers—they're better connectors.' You have the contacts. You lack the cadence.",
    "Your database isn't a list—it's what Maher calls 'the hub of your entire financial life.' Every dollar you will earn in the next 5 years is sitting in your contact list right now, waiting for a handwritten note and a coffee invitation. Maher's data shows that a properly nurtured database of 150 people generates more income than 5,000 untouched CRM contacts.",
    "The Generosity Generation is the principle you're missing. Maher teaches: 'Give first, expect nothing, receive everything.' You're trying to 'get' business when you should be 'giving' value. The agents who lead with generosity—introductions, resources, referrals to others—generate 3-5x more inbound referrals. Generosity isn't soft—it's your hardest competitive advantage.",
    "Maher calculates the lifetime value of a single relationship: initial commission ($10K), repeat business every 7-10 years, 1-2 referrals per year, their children's transactions, and estate referrals. One deeply-nurtured relationship can be worth $100,000+ over a career. You're not losing deals—you're losing fortunes by neglecting the people who already trust you.",
    "As Maher puts it: 'Charisma is just empathy at scale.' Your conversion problem isn't about closing techniques—it's about connection depth. The 5-5-4 ritual (5 notes, 5 calls, 4 coffees per week) builds the kind of relational capital that makes closing unnecessary. When trust is deep enough, clients ask YOU to help them—you never have to pitch.",
  ],
  strategyTemplates: [
    "Launch Maher's 5-5-4 Ritual immediately: write 5 handwritten notes today (what Maher calls 'the 1,000% ROI activity'), schedule 5 personal phone calls to your A-List this week, and book 4 face-to-face coffees before Friday. As Maher says: 'This is not a suggestion—it's the minimum viable relationship maintenance for a referral-based business.'",
    "Apply Maher's Database Segregation: identify your top 50 contacts who have referred or could refer (A-List), 50 who like you but haven't referred yet (B-List), and everyone else (C-List). The A-List gets the 5-5-4 treatment weekly. The B-List gets monthly touches. The C-List gets quarterly newsletters. Maher's rule: 'Stop giving your best energy to people who will never send you business.'",
    "Build your Power Team using Maher's B2B Alliance model: identify your top lender, lawyer, and inspector. Take each one to lunch this month. Create a mutual referral agreement. Maher's data shows: 'A strong Power Team member who believes in you will send 5-10 referrals per year. That's a $50,000+ relationship.'",
    "Execute Maher's Introduction Ritual: every week, introduce two people in your network who should know each other. One email, 5 minutes, zero cost—and it positions you as the connector. 'The person who makes the introduction,' Maher teaches, 'always stays top of mind with both parties.' This is influence compounding at zero expense.",
    "Plan your Client Appreciation Event using Maher's Event Architecture: invite your entire A-List, encourage them to bring friends, create a genuine community experience (not a sales pitch). Maher considers this the single highest-leverage activity in real estate: 'One party generates more referral conversations in 3 hours than 6 months of cold calling.'",
  ],
  directives: [
    "Write 5 handwritten notes to your A-List contacts before the end of today.",
    "Identify your top 50 referral sources and separate them from the rest of your database.",
    "Schedule 4 face-to-face coffees this week with people who know people.",
    "Call your top lender and propose a mutual referral partnership.",
    "Introduce two people in your network who should know each other—one email, right now.",
    "Calculate the lifetime value of your top 5 client relationships. Let the number reshape your priorities.",
    "Ask one client this week: 'Who do you know that might be thinking about buying or selling?'",
    "Plan your Pop-By theme for this month and execute your first 5 drop-offs before Friday.",
  ],
  quotes: [
    { text: "Your network is your net worth—but only if you nurture it.", author: "Michael Maher" },
    { text: "The most powerful form of marketing is a handwritten note.", author: "Michael Maher" },
    { text: "Give first, expect nothing, and you will receive everything.", author: "Michael Maher" },
    { text: "A referral is not just a lead—it is a pre-endorsed relationship.", author: "Michael Maher" },
    { text: "Stop trying to reach everyone. Start trying to deeply connect with the right 150.", author: "Michael Maher" },
    { text: "Generosity is the ultimate business strategy because it's the one thing your competition can't copy.", author: "Michael Maher" },
    { text: "Charisma is just empathy at scale.", author: "Michael Maher" },
    { text: "Consistency beats creativity. A boring monthly touch beats a brilliant annual one.", author: "Michael Maher" },
  ],
  rpmTemplates: [
    { result: "Generate 3 new referral conversations this week", purpose: "So my pipeline is fed by trust, not by ad spend", massive_action: "Execute the 5-5-4 ritual: 5 notes, 5 calls, 4 coffees — starting today" },
    { result: "Identify and segment my A-List database of 50 contacts", purpose: "So every ounce of relationship energy goes where it compounds", massive_action: "Export contacts, rank by referral potential, tag top 50 as A-List in CRM today" },
    { result: "Launch my Power Team with 3 B2B alliances this month", purpose: "So I have a referral engine that works even when I'm not actively prospecting", massive_action: "Identify top lender, lawyer, inspector. Schedule lunch with each. Propose mutual referral agreement." },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 3. JEB BLOUNT — Fanatical Prospecting
// ═══════════════════════════════════════════════════════════════════════════════
blount: {
  id: "blount",
  name: "Jeb Blount",
  title: "The Pipeline Discipline Enforcer",
  focus: "Low Lead Volume / Pipeline Leakage / Prospecting Consistency",
  bottlenecks: ["pipeline_volume", "prospecting_consistency", "lead_volume", "accountability", "pipeline_leakage"],
  wisdomPoints: [
    // ── The Laws of Prospecting (1-10) ──
    { key: "thirty_day_rule", text: "Blount's 30-Day Rule is the iron law of pipeline management: 'Prospecting you do in any given 30-day window directly impacts your income 90 days from now.' Skip January, and April starves. The pipeline has a memory—and it never forgets what you didn't do." },
    { key: "law_of_replacement", text: "The Law of Replacement: you must prospect at a rate higher than your churn. Blount says: 'The pipeline is a leaky bucket. Clients close, deals fall through, life events happen. If you're not filling it faster than it drains, you're engineering your own feast-famine cycle.'" },
    { key: "prospecting_paradox", text: "Blount warns of the Prospecting Paradox: 'The better you do, the more you need to prospect. Success breeds complacency.' Your best quarter is actually your most dangerous quarter, because the adrenaline of closings masks the fact that you've stopped filling the top of the funnel. The paradox kills more careers than bad markets do." },
    { key: "three_ps", text: "Blount identifies the 3 Ps that murder prospecting: Procrastination ('I'll call tomorrow'), Perfectionism ('I need a better script first'), and Paralysis by Analysis ('Let me study the CRM data one more time'). All three are fear wearing a disguise. The cure for all three is identical: pick up the phone now." },
    { key: "universal_law_of_need", text: "Blount's Universal Law of Need: 'The more you need a deal, the less likely you are to get it. Desperation repels prospects.' The only antidote to neediness is a full pipeline. When you have 20 active prospects, you can be relaxed, confident, and authentic with each one. When you have 2, you reek of commission breath." },
    { key: "telephone_rules", text: "Blount's telephone rules are non-negotiable: stand up when you call (it changes your voice), smile (they can hear it), have your outcome defined before you dial (appointment, not sale), and never, ever apologize for calling. 'When you apologize for interrupting,' Blount says, 'you've told them your call isn't worth their time.'" },
    { key: "fanatical_defined", text: "Blount defines 'fanatical' precisely: 'Fanatical prospecting isn't about being obnoxious or aggressive. It's about being relentlessly consistent. It's about doing the work that others won't—every single day—so you get the results that others don't.' The word is fanatical, not frantic. Consistency, not chaos." },
    { key: "emotional_resilience", text: "Blount's approach to rejection is mechanical, not emotional: 'Rejection is just data, not a directive. Every no brings you mathematically closer to yes.' He teaches agents to track their rejection-to-appointment ratio, then use the math to remove the emotion. If 1 in 10 calls books an appointment, then each 'no' is 10% of the way to 'yes.'" },
    { key: "the_ask", text: "Blount says the most common prospecting failure is the failure to ask: 'You make a great connection, have a wonderful conversation, build real rapport—and then you hang up without asking for the appointment. Every prospecting call must end with an ask. No ask, no appointment. No appointment, no commission.'" },
    { key: "prospecting_is_interruption", text: "Blount is unapologetic about interruption: 'Prospecting is, by definition, an interruption. You are interrupting someone's day to help them. Accept it. Embrace it. Because the alternative—waiting for inbound—is not a strategy. It's a prayer.' The agents who prosper are the ones who interrupt with confidence and value." },

    // ── Time & Structure (11-18) ──
    { key: "golden_hours", text: "Blount's Golden Hours doctrine: 'The first 2-3 hours of your workday are your highest-energy, highest-value hours. They must be dedicated exclusively to revenue-generating prospecting activity. No email. No admin. No meetings. Protect your Golden Hours like a surgeon protects operating time—because that's exactly what they are.'" },
    { key: "time_blocking", text: "Blount says: 'A calendar without a prospecting block is a fantasy, not a plan.' Time blocking is the single most important structural discipline for pipeline health. If prospecting isn't a blocked, recurring, non-negotiable appointment with yourself on your calendar, it will be consumed by everything else. Every. Single. Time." },
    { key: "block_structure", text: "Blount recommends a specific block structure: Power Block (1-2 hours of concentrated outbound dials), followed by a Recovery Block (30 minutes of admin and follow-up), followed by another Power Block. He says: 'The human brain can maintain peak prospecting intensity for about 60-90 minutes. Work in sprints, recover, sprint again.'" },
    { key: "social_selling_myth", text: "Blount is blunt about social media: 'Likes don't pay bills. Comments don't pay mortgages. Shares don't pay tuition. Only conversations pay.' Social selling is a supplement to prospecting, not a substitute for it. Use LinkedIn, use Facebook, use Instagram—but never confuse digital visibility with actual pipeline-building activity." },
    { key: "objection_framework", text: "Blount's objection turnaround framework: (1) Acknowledge the concern, (2) Associate with the prospect ('I understand—many of my clients felt the same way'), (3) Ask a question that reframes ('What would it look like if you could find the right home at the right price?'). He says: 'Objections aren't walls—they're doors. But you have to turn the handle.'" },
    { key: "voicemail_strategy", text: "Blount's voicemail strategy: keep it under 30 seconds, state your name and number at the beginning AND end, give one compelling reason to call back, and always follow up with a text. 'Most agents leave voicemails that are 90 seconds of rambling,' Blount says. 'The prospect deletes it at second 15. Be short, be clear, be gone.'" },
    { key: "multi_channel", text: "Blount teaches multi-channel prospecting: phone calls are the primary weapon, but they must be supported by email, text, social touches, video messages, and in-person visits. 'The modern prospect is reached through a combination of channels,' Blount says. 'The agent who masters all five channels owns the relationship. The agent who relies on one channel loses to the agent who uses all five.'" },
    { key: "crm_discipline", text: "Blount on CRM discipline: 'Your CRM is not a storage closet—it's your cockpit. Every contact, every call, every outcome must be logged immediately. Not at the end of the day. Not tomorrow. Now.' He warns: 'An unlogged call is an unlearned lesson. If you can't see your activity data, you can't improve your ratios.'" },

    // ── Pipeline Mathematics (19-24) ──
    { key: "pipeline_math", text: "Blount forces agents to do the math: 'If your average commission is $8,000, and you need $200,000 this year, you need 25 closings. At a 25% listing-to-close ratio, you need 100 listings. At a 10% appointment-to-listing ratio, you need 1,000 appointments. At a 5% dial-to-appointment ratio, you need 20,000 dials. That's 77 dials per working day. Now you know your number. Work backward from income to daily activity.'" },
    { key: "qualifying_first", text: "Blount says: 'Qualifying is the first act of prospecting, not the last. Only talk to people who can say yes.' Time spent with unqualified prospects is time stolen from qualified ones. Before every call, ask: 'Is this person in a position to make a decision?' If not, move on." },
    { key: "the_objective", text: "Blount is relentless about objective clarity: 'The objective of prospecting is to get the appointment, not to sell the house. Separate the steps.' Most agents try to sell on the first call—they pitch properties, discuss pricing, explain market conditions. All of that belongs in the appointment, not on the phone." },
    { key: "high_value_vs_low_value", text: "Blount categorizes activities as High-Value (prospecting, presenting, negotiating, closing) and Low-Value (email, admin, social media, organizing). He says: 'The average agent spends 80% of their time on low-value activities and 20% on high-value activities—then wonders why they earn an average income. Flip the ratio and watch what happens.'" },
    { key: "referral_prospecting", text: "Blount acknowledges that referral prospecting is the highest-converting channel, but warns: 'You cannot rely solely on referrals. Referrals are dessert, not the main course. The main course is outbound activity that fills the pipeline regardless of whether referrals come in.' Fanatical prospectors use referrals AND outbound—never just one." },
    { key: "pipeline_stages", text: "Blount teaches pipeline stage management: Prospect → Contact → Qualify → Appointment → Presentation → Negotiate → Close. He says: 'Most agents have zero visibility into where their deals actually sit. They call everything a 'lead' whether it's a cold name or a signed listing agreement. Name the stage, manage the stage, advance the stage.'" },

    // ── Mindset & Discipline (25-30) ──
    { key: "discipline_bridge", text: "Blount says: 'The bridge between goals and accomplishment is discipline. Not motivation, not inspiration, not talent—discipline. And in prospecting, discipline looks like a phone in your hand at 8:01 AM, whether you feel like it or not. Especially when you don't feel like it.'" },
    { key: "discomfort_zone", text: "Blount teaches the Discomfort Zone principle: 'Everything you want in your career exists just outside your comfort zone. The listing you want, the client you want, the income you want—they all require you to do something uncomfortable. Growth happens in discomfort. Comfort is where careers go to die.'" },
    { key: "legacy_impact", text: "Blount connects prospecting to legacy: 'Your children don't know or care about your call reluctance. They care about whether Dad or Mom showed up as a provider, a protector, and a role model. Every call you don't make is a gift you can't give your family. Prospect for them if you can't do it for yourself.'" },
    { key: "weekly_scorecard", text: "Blount's Weekly Scorecard tracks five numbers: Dials, Contacts, Conversations, Appointments Booked, and Appointments Kept. He says: 'These five numbers tell you everything about your pipeline health. If any one of them drops, your income drops 90 days later. The scorecard is your early warning system.'" },
    { key: "own_the_morning", text: "Blount says: 'Own the morning, own the pipeline. The agents who start prospecting at 8 AM book 3x more appointments than agents who start at 10 AM.' The morning advantage isn't just about energy—it's about reaching decision-makers before their day gets busy and their guard goes up." },
    { key: "no_excuses_cadence", text: "Blount's 'No Excuses' cadence: rain or shine, busy or slow, motivated or not—the prospecting block happens. He says: 'You don't negotiate with gravity, and you don't negotiate with prospecting. It's not something you do when you have time. It's the reason you have time, money, and a career.'" },
  ],
  truthTemplates: [
    "Blount's 30-Day Rule is your honest diagnosis: the pipeline drought you're feeling right now is the direct consequence of what you didn't do 90 days ago. As Blount says: 'The pipeline has a memory—and it never forgets what you didn't do.' This isn't bad luck. It's arithmetic.",
    "You're suffering from Blount's Prospecting Paradox: your last good quarter convinced you that you could coast. Blount warns: 'Success breeds complacency. Your best quarter is actually your most dangerous quarter.' The pipeline doesn't care about your past performance—it only respects today's activity.",
    "Blount identifies the 3 Ps killing your pipeline: Procrastination ('I'll call tomorrow'), Perfectionism ('I need a better script'), and Paralysis by Analysis ('Let me study the data one more time'). All three are fear wearing a disguise. Blount's cure is the same for all three: 'Pick up the phone now.'",
    "The Universal Law of Need is working against you: Blount says 'The more you need a deal, the less likely you are to get it.' Your thin pipeline is creating desperation that prospects can feel. The only antidote is a full funnel—and the only way to fill a funnel is to prospect when you don't need to, not when you're already starving.",
    "Blount's pipeline math exposes the gap: if you need 25 closings this year and your dial-to-appointment ratio is 5%, you need roughly 77 dials per working day. You're currently doing 10-15. The math isn't opinion—it's physics. 'Work backward from income to daily activity,' Blount teaches. 'Then do the activity. No negotiation.'",
  ],
  strategyTemplates: [
    "Implement Blount's Golden Hours discipline: block the first 2-3 hours of every workday exclusively for outbound prospecting. No email, no admin, no 'quick meetings.' Blount says: 'Protect your Golden Hours like a surgeon protects operating time.' If your calendar doesn't reflect this, you don't actually prioritize lead gen—you just talk about it.",
    "Apply Blount's Law of Replacement: calculate your current client churn rate, then prospect at 1.5x that rate. Blount says: 'The pipeline is a leaky bucket—your only job is to fill it faster than it drains.' If you lose 2 clients per month, you need minimum 3 new conversations per week.",
    "Use Blount's objective separation: the goal of every prospecting call is ONE thing—get the appointment. As Blount teaches: 'You are not selling the house on the phone. You are not qualifying the lead exhaustively. You are earning 30 minutes of face time. That's it.' Separate the steps.",
    "Build Blount's Weekly Scorecard: track Dials, Contacts, Conversations, Appointments Booked, and Appointments Kept every single week. Blount says: 'These five numbers tell you everything about your pipeline health. If any drops, your income follows 90 days later.' The scorecard is your early warning system.",
    "Execute Blount's Power Block structure: 60-90 minutes of concentrated outbound dials (stand up, smile, define your outcome before each call), followed by a 30-minute Recovery Block (admin, follow-up, log in CRM), then another Power Block. Blount's research: 'Sprint, recover, sprint. The brain can sustain peak prospecting intensity for about 90 minutes.'",
  ],
  directives: [
    "Block your first 2 Golden Hours tomorrow morning for outbound prospecting only. No exceptions.",
    "Make 10 prospecting calls before noon today. Track connects, conversations, and appointments booked.",
    "Delete the word 'perfect' from your prospecting vocabulary. Dial now, refine later.",
    "Calculate your pipeline replacement rate: how many conversations per week to outpace churn?",
    "Build your Weekly Scorecard: Dials, Contacts, Conversations, Appointments Booked, Appointments Kept.",
    "Do the Blount pipeline math: work backward from your annual income goal to daily dials. Write down the number.",
    "Follow Blount's voicemail rule: under 30 seconds, name and number at start AND end, one compelling reason.",
    "Log every call in your CRM immediately after hanging up. Not tonight. Not tomorrow. Now.",
  ],
  quotes: [
    { text: "Fanatical prospectors are the ones who eat. Everyone else fights for scraps.", author: "Jeb Blount" },
    { text: "The bridge between goals and accomplishment is discipline.", author: "Jeb Blount" },
    { text: "Rejection is not failure. It is the fast lane to success.", author: "Jeb Blount" },
    { text: "There is no easy button in sales. There is only the hard work of prospecting.", author: "Jeb Blount" },
    { text: "You don't negotiate with gravity, and you don't negotiate with prospecting.", author: "Jeb Blount" },
    { text: "Likes don't pay bills. Comments don't pay mortgages. Only conversations pay.", author: "Jeb Blount" },
    { text: "Own the morning, own the pipeline.", author: "Jeb Blount" },
    { text: "The pipeline has a memory—and it never forgets what you didn't do.", author: "Jeb Blount" },
  ],
  rpmTemplates: [
    { result: "Book 5 qualified appointments this week", purpose: "So my 90-day pipeline is full regardless of market conditions", massive_action: "Execute 2-hour Golden Hour prospecting block every morning; minimum 15 dials per block" },
    { result: "Eliminate the Prospecting Paradox from my business", purpose: "So success compounds instead of creating complacency", massive_action: "Set non-negotiable daily dial minimums even on closing days; track on Weekly Scorecard" },
    { result: "Know my pipeline math cold and execute against it daily", purpose: "So my income is a result of arithmetic, not hope", massive_action: "Calculate annual income ÷ avg commission ÷ close rate ÷ appointment rate ÷ contact rate = daily dials. Execute." },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 4. LARRY KENDALL — Ninja Selling
// ═══════════════════════════════════════════════════════════════════════════════
kendall: {
  id: "kendall",
  name: "Larry Kendall",
  title: "The Ninja Selling Flow Master",
  focus: "High Stress / Low Conversion / Cold Call Aversion",
  bottlenecks: ["high_stress", "low_conversion", "sphere_awareness", "cold_call_aversion", "lead_conversion"],
  wisdomPoints: [
    // ── The Ninja System (1-10) ──
    { key: "flow_principle", text: "Kendall's central teaching: 'If you aren't in flow with your database, someone else is.' Every contact you neglect isn't just a missed opportunity—it's an active transfer of trust to your competitor. The Ninja doesn't chase; the Ninja stays in flow. Flow means consistent, genuine, value-adding contact that keeps you top of mind." },
    { key: "cadence_16_5_2_1", text: "The 16-5-2-1 monthly cadence is the Ninja's operational rhythm: 16 total touches per year (roughly monthly), 5 handwritten notes, 2 face-to-face meetings, and 1 closing or anniversary gift. Kendall says: 'This cadence isn't arbitrary—it's the mathematically optimal contact frequency for referral dominance without feeling overbearing.'" },
    { key: "ford_method", text: "FORD—Family, Occupation, Recreation, Dreams—is Kendall's conversational framework. These four pillars drive every meaningful human connection. 'When you ask about someone's dreams,' Kendall teaches, 'you move from small talk to soul talk. And people refer agents who know their soul, not agents who know the MLS.'" },
    { key: "ask_dont_tell", text: "Kendall's golden rule: 'Questions control the conversation. The person asking questions is the person in power.' The Ninja never leads with a pitch. They lead with curiosity. 'Tell me about your dream home' beats 'I have a great listing for you' every single time. Questions open doors; statements close them." },
    { key: "value_proposition_identity", text: "Kendall redefines the agent's identity: 'You are a trusted advisor, not a salesperson. When you stop selling and start serving, resistance disappears.' The moment an agent internalizes this shift, their conversations change, their body language changes, their close rate changes. It's not a technique—it's a transformation." },
    { key: "stop_chasing_start_attracting", text: "As Kendall teaches: 'Stop chasing, start attracting.' The Ninja model is fundamentally different from the hunter model. Instead of pursuing cold leads aggressively, you create conditions—through consistent value, genuine connection, and systematic nurturing—where opportunities come to you. 'The energy of chasing repels,' Kendall says. 'The energy of attraction compels.'" },
    { key: "reticular_activator", text: "Kendall uses neuroscience to explain the Ninja's advantage: the Reticular Activating System (RAS) is the brain's filter that determines what you notice. 'Train your RAS to spot opportunity by focusing on abundance, not scarcity,' Kendall says. 'Agents who focus on what's wrong see problems everywhere. Agents who focus on service see opportunities everywhere.' It's not positive thinking—it's cognitive programming." },
    { key: "warm_list_90", text: "The Warm List is Kendall's highest-priority pipeline tool: 'At any given time, you should know exactly who in your database is likely to move in the next 90 days.' Most agents have no idea. They treat their database as a flat list. The Ninja constantly updates the Warm List through FORD conversations, life event monitoring, and genuine curiosity about people's plans." },
    { key: "ninja_nine", text: "Kendall's 'Ninja Nine' is the daily routine: (1) Gratitude, (2) Affirmations, (3) Write 2 personal notes, (4) Review your Hot/Warm list, (5) Customer service call, (6) Add/update 2 contacts, (7) Send a thing of value, (8) Preview property, (9) Personal development. Kendall says: 'The Ninja Nine isn't a to-do list—it's a way of being. Do it daily and your business transforms in 90 days.'" },
    { key: "soft_eyes_philosophy", text: "Kendall's 'Soft Eyes' philosophy: approach real estate with a service-first heart. Soft eyes see the person, not the commission. They notice what the client needs, not what the agent wants. Kendall says: 'Hard eyes are always calculating: What can I get? Soft eyes are always asking: How can I help? The agent with soft eyes wins, because clients can feel the difference instantly.'" },

    // ── Conversion & Mastery (11-20) ──
    { key: "market_timing_response", text: "Kendall teaches market intelligence as service: 'You don't create the market; you respond to it. The Ninja reads conditions and adapts—never forces.' In a hot market, the Ninja helps clients move quickly and avoid overpaying. In a slow market, the Ninja helps clients find opportunity others miss. The market is never the problem; the response is." },
    { key: "listing_dominance", text: "As Kendall says: 'He who controls the inventory controls the market.' The Ninja prioritizes listings over buyers because listings generate inbound calls, build market authority, and create leverage. Kendall teaches: 'One listing generates an average of 2.5 additional client relationships. A buyer generates one transaction. The math is clear: list to last.'" },
    { key: "gratitude_ritual", text: "The Ninja morning begins with gratitude: 'Start every day with 10 things you are grateful for, written down.' Kendall teaches that gratitude isn't just emotional wellness—it's a performance hack. 'Gratitude activates the prefrontal cortex, the part of your brain responsible for clear thinking and creative problem-solving. Scarcity shuts it down. Gratitude opens it up.'" },
    { key: "abundance_vs_scarcity", text: "Kendall's abundance mindset is foundational: 'There are enough clients, enough listings, enough deals for everyone. The agent who operates from scarcity competes. The agent who operates from abundance collaborates.' Scarcity thinking leads to aggressive, commission-breath tactics. Abundance thinking leads to the relaxed confidence that attracts high-quality referrals." },
    { key: "real_estate_reviews", text: "Kendall teaches the 'Real Estate Review' as a structured client service: a 15-minute annual call where you review the client's home value, neighborhood trends, and equity position. 'This isn't a sales call,' Kendall says. 'It's a service call. But it's the service call that generates the referral, because it reminds the client that you're their advisor for life.'" },
    { key: "buyer_conversion_system", text: "Kendall's buyer conversion system: the Ninja Interview is a structured first meeting where you ask about their dreams, their timeline, their motivations, and their fears—before you ever open the MLS. 'When you understand the dream,' Kendall says, 'you can present properties as solutions to life goals, not just square footage and school districts.'" },
    { key: "price_positioning", text: "Kendall on pricing: 'The Ninja never argues about price. The Ninja asks questions until the client arrives at the right price themselves.' By asking 'What do you think a buyer would pay for your home?' and 'What evidence supports that number?', the Ninja lets the market data do the convincing. 'People accept conclusions they reach themselves,' Kendall teaches." },
    { key: "negotiation_philosophy", text: "Kendall's negotiation philosophy: 'Negotiation is not a battle—it's a collaboration toward a shared goal.' The Ninja reframes every negotiation as two parties working together to solve a problem. 'When both sides feel heard and respected,' Kendall says, 'deals close faster, with fewer complications, and generate more referrals.'" },
    { key: "life_transitions", text: "Kendall teaches agents to position themselves as life transition specialists: 'People don't buy and sell houses. They navigate life transitions—marriage, divorce, retirement, growing families, empty nesting. The agent who understands the transition can serve the whole person, not just the transaction.' This positioning creates a depth of connection that transactional agents can never match." },
    { key: "sphere_of_influence_math", text: "Kendall's Sphere Math: the average person knows 200 people. If you have a nurtured sphere of 200 contacts, and each knows 200 people, you are one introduction away from 40,000 potential clients. 'Your sphere isn't 200 people,' Kendall says. 'It's 40,000 people—connected through trust. Your only job is to be referable.'" },

    // ── Advanced Ninja (21-30) ──
    { key: "prospecting_without_prospecting", text: "Kendall's highest-level teaching: 'The best prospecting doesn't look like prospecting.' When you help a neighbor with their yard, attend community events, coach Little League, volunteer at the school—you're building the kind of organic visibility that generates referrals without ever making a cold call. The Ninja is omnipresent, never aggressive." },
    { key: "customer_for_life", text: "Kendall's Customer for Life system: every client who closes becomes part of your 16-5-2-1 cadence permanently. 'Most agents celebrate the closing and then disappear,' Kendall says. 'The Ninja celebrates the closing and says: this is just the beginning of our relationship.' A 20-year career of consistent post-closing nurturing builds a self-sustaining referral machine." },
    { key: "energy_management", text: "Kendall prioritizes energy management over time management: 'You can't manage time—it moves at the same rate for everyone. But you can manage your energy. High-energy hours go to high-value activities. Low-energy hours go to admin.' The Ninja doesn't prospect at 4 PM when their energy is depleted. They prospect at 9 AM when their state is peak." },
    { key: "installation_vs_information", text: "Kendall distinguishes between information and installation: 'Knowing what to do isn't the same as having it installed in your daily behavior. Information is what you learn at a seminar. Installation is what happens when you practice it every day for 90 days until it becomes unconscious.' Most agents are over-informed and under-installed." },
    { key: "ninja_selling_process", text: "Kendall's Ninja Selling Process has four phases: (1) Build your database, (2) Nurture it with the 16-5-2-1 cadence, (3) Have FORD conversations to identify needs, (4) Offer solutions when the timing is right. 'Phase 4 happens naturally,' Kendall says, 'when you execute Phases 1-3 consistently. You never have to force the sale.'" },
    { key: "pre_listing_package", text: "Kendall's pre-listing package is designed to demonstrate advisory value before the first meeting: market analysis, neighborhood data, preparation checklist, and a personal introduction letter. 'Before you walk in the door,' Kendall says, 'the seller should already believe you're the most prepared, most knowledgeable agent they've ever met.'" },
    { key: "open_house_ninja", text: "Kendall reimagines the open house: 'The open house isn't about selling that house. It's about meeting 10-20 new people and starting FORD conversations.' The Ninja uses open houses as database-building events, not listing-selling events. Every visitor gets a follow-up note within 24 hours." },
    { key: "team_building", text: "Kendall teaches team development through the Ninja lens: 'A team of Ninjas operates on shared values, not just shared goals. When every team member practices gratitude, operates with soft eyes, and follows the Ninja Nine, the culture becomes the competitive advantage—not any individual's talent.'" },
    { key: "market_position", text: "Kendall on market position: 'The Ninja doesn't compete on price. The Ninja competes on trust. And trust is built through time, consistency, and genuine care—not through discounts or flashy marketing.' When your market position is 'the most trusted advisor in the neighborhood,' price becomes irrelevant." },
    { key: "joy_in_the_work", text: "Kendall's ultimate teaching: 'If you're not enjoying this business, you're doing it wrong. The Ninja system is designed to make real estate joyful—not through avoidance of hard work, but through alignment of your work with your values.' When prospecting becomes service, and service becomes connection, and connection becomes joy—the entire business transforms." },
  ],
  truthTemplates: [
    "Kendall's Ninja philosophy reveals what's really happening: you're chasing when you should be attracting. The stress you feel isn't from too much work—it's from the wrong kind of work. As Kendall teaches: 'The energy of chasing repels. The energy of attraction compels.' Cold outreach without relationship context is exhausting because it violates how trust actually works.",
    "The Ninja 16-5-2-1 cadence is the answer to your conversion problem. You're not converting because you're not in flow with your database. Kendall is clear: 'Every contact you neglect isn't just a missed opportunity—it's an active transfer of trust to your competitor.' The agents who 'effortlessly' get referrals have a system. You need one too.",
    "Your stress comes from operating as a salesperson instead of a trusted advisor. Kendall teaches: 'When you stop selling and start serving, resistance disappears.' The FORD method—Family, Occupation, Recreation, Dreams—replaces pitch pressure with genuine curiosity. 'People refer agents who know their soul,' Kendall says, 'not agents who know the MLS.'",
    "Kendall diagnoses your problem as over-information and under-installation: 'You know what to do—you've been to the seminars, read the books, watched the videos. But knowing isn't the same as having it installed in your daily behavior.' The Ninja Nine daily practice is the installation mechanism. Ninety days of consistent execution turns information into habit.",
    "Kendall's Sphere Math reveals your hidden asset: you know 200 people. Each of them knows 200 people. You're one introduction away from 40,000 potential clients. 'Your sphere isn't 200 people,' Kendall says. 'It's 40,000—connected through trust.' Your only job is to be so consistently valuable that referring you becomes automatic.",
  ],
  strategyTemplates: [
    "Implement Kendall's Ninja Nine daily routine: Gratitude, Affirmations, 2 personal notes, review Hot/Warm list, one customer service call, update 2 contacts, send something of value, preview property, personal development. Kendall says: 'Do the Ninja Nine daily for 90 days and your business transforms.' Start tomorrow morning.",
    "Build your Warm List using Kendall's method: review your entire database and flag everyone who might move in the next 90 days. Then use FORD conversations (Family, Occupation, Recreation, Dreams) to reconnect—not as a salesperson, but as someone who genuinely cares about their life. 'When you ask about someone's dreams,' Kendall says, 'you move from small talk to soul talk.'",
    "Replace cold call anxiety with Kendall's 'Soft Eyes' approach: start every prospecting session with your Gratitude Ritual (10 things you're grateful for, written down), then call from a place of service, not desperation. The Ninja doesn't chase—the Ninja creates conditions where opportunities emerge naturally.",
    "Launch Kendall's Real Estate Review program: schedule 15-minute annual calls with your top 100 contacts where you review their home value, neighborhood trends, and equity position. 'This isn't a sales call,' Kendall teaches. 'It's a service call. But it's the service call that generates the referral.'",
    "Apply Kendall's energy management principle: map your peak energy hours (usually 8-11 AM) and assign them exclusively to high-value activities (prospecting, client meetings, presentations). Low-energy hours (after lunch, late afternoon) get admin and CRM updates. 'The Ninja doesn't prospect at 4 PM,' Kendall says. 'They prospect when their state is peak.'",
  ],
  directives: [
    "Write your Warm List right now: who in your database could move in the next 90 days?",
    "Start tomorrow with Kendall's Gratitude Ritual: 10 things you're grateful for, written down, before any calls.",
    "Use FORD in your next 3 client conversations. Zero pitch. Pure curiosity.",
    "Map your top 100 contacts against the 16-5-2-1 cadence. Where are the gaps?",
    "Complete the full Ninja Nine before noon tomorrow. Track it on paper.",
    "Schedule a Real Estate Review call with 3 past clients this week.",
    "Replace 'What can I get?' with 'How can I help?' in every conversation today.",
    "Write 2 personal notes before lunch. Not typed. Not emailed. Handwritten.",
  ],
  quotes: [
    { text: "Stop selling. Start solving. The rest takes care of itself.", author: "Larry Kendall" },
    { text: "The person asking the questions is the person in control.", author: "Larry Kendall" },
    { text: "If you aren't in flow with your database, someone else is.", author: "Larry Kendall" },
    { text: "Gratitude is not just a feeling—it is a business strategy.", author: "Larry Kendall" },
    { text: "Stop chasing. Start attracting. The energy changes everything.", author: "Larry Kendall" },
    { text: "People refer agents who know their soul, not agents who know the MLS.", author: "Larry Kendall" },
    { text: "Your sphere isn't 200 people. It's 40,000—connected through trust.", author: "Larry Kendall" },
    { text: "If you're not enjoying this business, you're doing it wrong.", author: "Larry Kendall" },
  ],
  rpmTemplates: [
    { result: "Install the Ninja Nine as my daily operating system for 90 days", purpose: "So my business runs on a system of service, not on bursts of desperation", massive_action: "Print the Ninja Nine checklist, execute every day before noon, review weekly" },
    { result: "Build my active Warm List of 90-day movers", purpose: "So I always know where my next deal is coming from", massive_action: "Review full database, flag potential movers, schedule FORD conversations with top 10" },
    { result: "Launch the Real Estate Review program for my top 100 contacts", purpose: "So every past client sees me as their advisor for life, not their agent from 2019", massive_action: "Script the 15-minute review call, schedule 5 this week, follow each with a handwritten note" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 5. CHRIS SMITH — The Conversion Code
// ═══════════════════════════════════════════════════════════════════════════════
smith: {
  id: "smith",
  name: "Chris Smith",
  title: "The Speed-to-Lead Conversion Specialist",
  focus: "Digital Leads / Speed to Lead / Online Conversion",
  bottlenecks: ["lead_conversion", "digital_leads", "speed_to_lead", "follow_up", "online_conversion"],
  wisdomPoints: [
    // ── Speed & First Contact (1-10) ──
    { key: "five_minute_rule", text: "Smith's 5-Minute Rule is backed by MIT research: 'Call within 5 minutes or lose the lead. After 5 minutes, your chance of connecting drops by 400%.' Smith says: 'The prospect is on your website right now, looking at homes, emotionally engaged. In 30 minutes, they'll be at dinner. In 24 hours, they won't remember your name. Speed is the strategy.'" },
    { key: "first_to_contact", text: "Smith cites National Association of Realtors data: 'The first agent to make meaningful contact with a lead wins the business 78% of the time.' Not the best agent. Not the most experienced agent. The fastest agent. As Smith says: 'Speed to the lead is speed to the money. Period.'" },
    { key: "initial_ask", text: "Smith's first-call framework: close for the appointment within the first 2 minutes. 'Don't educate on the phone. Don't give a market update. Don't discuss properties in detail. Your only goal is to earn 30 minutes of face time.' Smith says: 'The phone is a bridge, not a destination. Get across it fast.'" },
    { key: "digging_deeper", text: "Smith's 'Digging Deeper' technique: ask 'Why?' three times to find the real motivation. Surface answers ('We want a bigger house') hide the emotional driver ('We're having twins and my mother-in-law is moving in'). Smith says: 'The first answer is the logical answer. The third answer is the emotional answer. Emotion is what drives the decision.'" },
    { key: "omnichannel_attack", text: "Smith teaches the omnichannel attack: when a new lead comes in, call, text, AND email within 5 minutes. 'The modern consumer lives across three channels simultaneously,' Smith says. 'Hit all three, and you're impossible to ignore. Use one channel, and you're easy to miss—or dismiss.'" },
    { key: "speed_to_value", text: "Speed to Value is Smith's first-call principle: 'Solve their problem before they hang up.' If a prospect asks about a listing, have the answer ready. If they want a market update, give them one number that matters. Smith says: 'Value delivered in 30 seconds earns you 30 minutes. Value promised for later earns you nothing.'" },
    { key: "the_framework_not_script", text: "Smith reframes the 'sales script' debate: 'It's not a script—it's a framework for conversion. Know the structure, personalize the delivery.' The framework has four parts: (1) Build rapport in 30 seconds, (2) Ask 2-3 qualifying questions, (3) Provide immediate value, (4) Close for the appointment. Smith says: 'Scripts sound robotic. Frameworks sound human.'" },
    { key: "voicemail_text_combo", text: "Smith's voicemail strategy: leave a 15-second voicemail that ends with 'I'm going to text you the details right now,' then immediately send a text with your name, one sentence of value, and a question. 'The voicemail gets ignored,' Smith says. 'The text gets read. But the voicemail gives the text context and credibility.'" },
    { key: "video_differentiation", text: "Smith teaches video as a conversion weapon: 'A 30-second personalized video text to a new lead converts at 3x the rate of a text-only message.' Record yourself saying their name, reference the property they inquired about, and ask one question. 'Video builds trust in seconds,' Smith says. 'Text messages build nothing.'" },
    { key: "lead_source_intelligence", text: "Smith insists on lead source tracking: 'You must know which sources produce appointments and which produce tire-kickers. A $5 Facebook lead that converts is worth more than a $50 Zillow lead that doesn't.' Smith says: 'Spend time where the money is, not where the volume is. Score leads by conversion rate, not by cost per lead.'" },

    // ── Follow-Up & Persistence (11-20) ──
    { key: "follow_up_loop", text: "Smith's Follow-Up Loop: 10 touches in 10 days. Day 1: call + text + email. Day 2: text. Day 3: call. Day 4: email with value. Day 5: text. Day 6: call. Day 7: video message. Day 8: text. Day 9: call. Day 10: 'breakup' email. Smith says: 'Most agents quit after touch 2. The money lives between touch 5 and touch 12.'" },
    { key: "breakup_email", text: "Smith's 'breakup email' is the final touch in the Follow-Up Loop—and often the most effective: 'Hi [Name], I've tried reaching you a few times. I don't want to be a bother, so this will be my last message. If your plans change, I'm here.' Smith says: 'The breakup email gets a 25-30% response rate because it triggers loss aversion. People don't want to lose access to help.'" },
    { key: "long_term_nurture", text: "For leads that don't convert in the 10-day loop, Smith moves them into long-term nurture: monthly market updates, quarterly personal check-ins, and automated listing alerts. 'The average buyer takes 6-12 months to transact,' Smith says. 'If you disappear after 10 days, you've lost them. If you nurture for 12 months, you've won them.'" },
    { key: "crm_as_cockpit", text: "Smith on CRM usage: 'Your CRM is your cockpit. If you can't see your entire pipeline—every lead, every stage, every next action—in 10 seconds, your tech stack is failing you.' He says: 'The CRM doesn't generate leads. It prevents you from losing the ones you already have. And losing leads you've already paid for is the most expensive mistake in real estate.'" },
    { key: "automation_with_soul", text: "Smith balances automation with personalization: 'Automate the reminders, the drip sequences, the listing alerts. But personalize the calls, the texts, the videos.' He says: 'Automation is the skeleton. Personalization is the soul. A business with only skeleton is creepy. A business with only soul is chaotic. You need both.'" },
    { key: "rebuttal_reframe", text: "Smith reframes objections: 'An objection is not rejection—it's a request for more information.' When a prospect says 'I'm not ready,' Smith hears 'I don't have enough information to be ready.' The response isn't to push harder—it's to ask better questions: 'What would need to be true for you to feel ready?'" },
    { key: "logical_emotional", text: "Smith's conversion psychology: 'People buy on emotion and justify with logic.' The listing presentation that starts with 'Here's the market data' loses. The one that starts with 'Tell me about the life you want to create in your new home' wins. Smith says: 'Lead with the dream. Close with the data. Never reverse the order.'" },
    { key: "appointment_confirmation", text: "Smith's appointment confirmation protocol: confirm 24 hours before (text), confirm 2 hours before (text), and send a 'Looking forward to meeting you' message 30 minutes before. 'No-shows drop by 60%,' Smith says, 'when you confirm three times. It seems excessive until you calculate the revenue cost of a no-show.'" },
    { key: "post_appointment_speed", text: "Smith extends speed-to-lead to post-appointment: 'Send a personalized follow-up within 60 minutes of every meeting. Not a template—a specific message referencing something they said.' He says: 'The hour after the meeting is when emotional engagement is highest. Strike while the iron is hot—or someone else will.'" },
    { key: "conversion_rate_obsession", text: "Smith teaches conversion rate obsession: 'Track your conversion rate at every stage—lead to contact, contact to conversation, conversation to appointment, appointment to listing, listing to close. A 1% improvement at each stage compounds dramatically.' He says: 'Most agents obsess about lead volume. Top producers obsess about conversion rate.'" },

    // ── Digital Strategy (21-30) ──
    { key: "landing_page_principles", text: "Smith's landing page rules: one offer, one call-to-action, zero navigation menu. 'Every link on your landing page that isn't the CTA is a leak,' Smith says. 'Simplicity converts. Complexity confuses. And confused visitors click away.'" },
    { key: "facebook_lead_gen", text: "Smith considers Facebook lead generation the highest-ROI digital channel for agents: 'A well-targeted Facebook ad with a compelling offer can generate leads for $2-5 each. But the lead is worthless if you don't call in 5 minutes and follow up for 10 days.' He says: 'Facebook fills the top of the funnel. Your phone fills your bank account.'" },
    { key: "content_that_converts", text: "Smith on content marketing: 'Stop posting 'Just Sold' photos. Start posting content that solves problems: how to negotiate repairs, what closing costs look like, how to prepare for an appraisal.' He says: 'Educational content builds authority. Authority builds trust. Trust builds conversion. It's a chain—and most agents break it at step one by posting self-congratulatory content.'" },
    { key: "text_messaging_rules", text: "Smith's text messaging rules: keep it under 160 characters, always end with a question, never use all caps, and always identify yourself. 'A text from a stranger that says 'Are you still interested in homes in Oakville?' with no name or context gets deleted,' Smith says. 'A text that says 'Hi Sarah, it\'s [Name] from [Company]. I found 3 homes that match your search—want me to send them?' gets a reply.'" },
    { key: "zillow_strategy", text: "Smith on Zillow leads: 'Zillow leads are expensive, but they're high-intent. The prospect has already self-selected by searching actively. Your only job is to be faster and more helpful than the other 5 agents who received the same lead.' He says: 'Zillow is not a lead source—it's a speed-and-skill test. Win the test, win the client.'" },
    { key: "retargeting", text: "Smith teaches retargeting as a conversion accelerator: 'Someone visits your website, doesn't convert, and then sees your ad on Facebook for the next 30 days. By touch 7, they feel like they know you.' He says: 'Retargeting is the digital version of the Ninja's flow—staying in front of people until the timing is right.'" },
    { key: "open_relationship_not_close", text: "Smith's closing philosophy: 'You don't close a sale—you open a relationship. The transaction is the beginning, not the end.' He says: 'The agent who treats closing day as graduation gets one commission. The agent who treats closing day as orientation gets referrals for life.'" },
    { key: "team_response_system", text: "Smith advocates for team-based lead response: 'If you can't guarantee a 5-minute response time solo, build a response team. One person monitors leads during business hours, another during evenings and weekends.' He says: 'The lead doesn't care about your dinner. They care about their question. Answer it, or your competitor will.'" },
    { key: "data_driven_decisions", text: "Smith insists on data over intuition: 'Your gut tells you Zillow leads are bad. Your data might tell you they convert at 8%. Your gut tells you Facebook leads are good. Your data might tell you they convert at 2%.' He says: 'Feelings about lead sources are irrelevant. Numbers about lead sources are everything. Track. Measure. Decide.'" },
    { key: "consumer_psychology", text: "Smith on understanding the modern consumer: 'Today's buyer has already researched 20 homes, read 15 reviews, and watched 10 virtual tours before they ever talk to you. You are not their first source of information—you are their last. Your job isn't to inform them. It's to advise them.' He says: 'The informed consumer doesn't need a tour guide. They need a trusted advisor.'" },
  ],
  truthTemplates: [
    "Smith's data is brutal and clear: you're losing leads because you're slow. The 5-Minute Rule isn't a suggestion—MIT research shows contact rates drop by 400% after 5 minutes. Smith says: 'The prospect is on your website right now, emotionally engaged. In 30 minutes, they'll be at dinner.' Your competitors aren't better than you. They're just faster.",
    "The Conversion Code exposes your follow-up gap: most agents quit after 2 touches. Smith's research shows that 80% of sales happen between touch 5 and 12. His 10-day Follow-Up Loop (call-text-email-call-text-email-call-video-call-breakup) is the system you're missing. You're not failing at conversion—you're quitting before conversion can happen.",
    "Smith reveals the speed-to-value problem: you're trying to sell houses on the phone instead of earning appointments. The objective of the first call is one thing—get them to say yes to 30 minutes of your time. Smith says: 'The phone is a bridge, not a destination. Get across it fast.'",
    "Smith identifies your core issue: you're tracking lead volume when you should be tracking conversion rate. 'A 1% improvement at each pipeline stage compounds dramatically,' Smith teaches. Most agents obsess about getting more leads. Top producers obsess about converting the leads they already have.",
    "As Smith puts it: 'The modern consumer has already researched 20 homes and read 15 reviews before they ever talk to you. You are not their first source of information—you are their last.' Your approach is still 'Let me show you homes.' The winning approach is 'Let me advise you on decisions.' Smith says informed consumers don't need tour guides. They need trusted advisors.",
  ],
  strategyTemplates: [
    "Implement Smith's 5-Minute Rule as a non-negotiable: set up instant notifications for every new lead, and call within 5 minutes. Simultaneously send a text and an email—Smith's omnichannel attack. 'The first agent to make meaningful contact,' Smith says, 'wins the business 78% of the time. Be that agent.'",
    "Build Smith's 10-Day Follow-Up Loop: Day 1 (call+text+email), Day 2 (text), Day 3 (call), Day 4 (value email), Day 5 (text), Day 6 (call), Day 7 (video message), Day 8 (text), Day 9 (call), Day 10 (breakup email). Smith says: 'The breakup email alone gets a 25-30% response rate because it triggers loss aversion.'",
    "Apply Smith's Digging Deeper technique: when a lead says 'I'm just looking,' ask 'What's prompting you to look right now?' When they answer, ask 'Why is that important to you?' Three layers of 'Why' gets you to the emotional driver. Smith says: 'The first answer is logical. The third answer is emotional. Emotion drives the decision.'",
    "Upgrade your CRM into what Smith calls your 'cockpit': every lead should show stage, source, next action, and days since last contact in one view. 'If you can't see your entire pipeline in 10 seconds,' Smith says, 'your tech stack is failing you.' The CRM doesn't generate leads—it prevents you from losing ones you've already paid for.",
    "Launch Smith's video differentiation strategy: for every new lead, record a 30-second personalized video text. Say their name, reference the property they inquired about, ask one question. 'Personalized video converts at 3x the rate of text-only,' Smith says. 'Video builds trust in seconds. Text messages build nothing.'",
  ],
  directives: [
    "Set up instant lead notifications on your phone. Your goal: call within 5 minutes, every time.",
    "Build your 10-Day Follow-Up Loop today. Map out all 10 touches for new leads.",
    "On your next lead call, ask 'Why' three times to find the real motivation.",
    "Audit your average response time to new leads this month. If it's over 5 minutes, fix it today.",
    "Send one personalized video text to a new lead today. Say their name. Reference their search.",
    "Confirm every appointment 3 times: 24 hours before, 2 hours before, 30 minutes before.",
    "Track your conversion rate at every stage this week. Lead→Contact, Contact→Conversation, Conversation→Appointment.",
    "Write your 'breakup email' template right now. Smith says it gets 25-30% response rates.",
  ],
  quotes: [
    { text: "Speed to the lead is speed to the money.", author: "Chris Smith" },
    { text: "You don't close a sale—you open a relationship.", author: "Chris Smith" },
    { text: "Most agents quit after 2 follow-ups. The money is in touch 5 through 12.", author: "Chris Smith" },
    { text: "Objections are not rejection. They are requests for more information.", author: "Chris Smith" },
    { text: "The phone is a bridge, not a destination. Get across it fast.", author: "Chris Smith" },
    { text: "Automate the skeleton. Personalize the soul.", author: "Chris Smith" },
    { text: "Lead with the dream. Close with the data. Never reverse the order.", author: "Chris Smith" },
    { text: "Track. Measure. Decide. Your gut is not a strategy.", author: "Chris Smith" },
  ],
  rpmTemplates: [
    { result: "Respond to every new lead within 5 minutes this week", purpose: "So I capture the 78% first-contact advantage before any competitor", massive_action: "Set up instant notifications, prepare omnichannel templates (call + text + email), block response time" },
    { result: "Build and activate a 10-Day Follow-Up Loop for all active leads", purpose: "So no lead falls through the cracks between touch 2 and touch 12", massive_action: "Map the 10-touch sequence, load templates into CRM, activate for all current pipeline leads" },
    { result: "Improve my lead-to-appointment conversion rate by 2% this month", purpose: "So the leads I'm already paying for generate more revenue", massive_action: "Track every stage conversion daily, implement video texts and 3x appointment confirmations" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 6. DARREN HARDY — The Compound Effect
// ═══════════════════════════════════════════════════════════════════════════════
hardy: {
  id: "hardy",
  name: "Darren Hardy",
  title: "The Compound Effect Strategist",
  focus: "Discipline / Daily Habits / Tracking / Momentum",
  bottlenecks: ["consistency_habits", "discipline", "tracking", "momentum", "accountability"],
  wisdomPoints: [
    // ── The Compound Effect Core (1-10) ──
    { key: "compound_effect_core", text: "Hardy's central thesis: 'Small, smart choices + consistency + time = radical results.' You don't need a revolution—you need a routine. Hardy says: 'The Compound Effect is the principle of reaping huge rewards from a series of small, smart choices, repeated consistently over time. It's not sexy. But it works when nothing else does.'" },
    { key: "big_mo", text: "Big Mo—Hardy's term for Momentum—is the most powerful force in business. 'Once momentum starts rolling, everything accelerates—leads, confidence, referrals, income. But here's the catch: Big Mo takes enormous energy to start and very little energy to maintain. Most agents give up right before Big Mo kicks in.' Hardy says the tipping point is usually around day 21-30 of consistent action." },
    { key: "bookend_routines", text: "Hardy's Bookend Routines: a precise morning routine that sets your trajectory and an evening routine that locks in the gains. 'Your morning routine determines the quality of your day. Your evening routine determines the quality of your morning.' Hardy says: 'The bookends are the container. Without them, the middle of your day collapses into chaos.'" },
    { key: "tracking_scorecard", text: "Hardy insists on tracking everything: 'What you measure, you manage. What you manage, you master. What you don't measure, you're guessing about.' His Rhythm Register is a daily tracking chart where you mark every key behavior. Hardy says: 'Visual tracking increases consistency by 300% compared to mental tracking. Your scorecard is your mirror—it doesn't lie.'" },
    { key: "the_ripple", text: "Hardy's Ripple Effect: every choice has a compound consequence. 'The donut today is 5 lbs in 6 months. The skipped call today is an empty pipeline in Q4. The handwritten note today is a referral in 90 days.' Hardy teaches agents to think in ripples, not in moments: 'Every small choice ripples forward in time. Choose wisely, because you're programming your future right now.'" },
    { key: "no_shortcuts", text: "Hardy is blunt about shortcuts: 'There are no shortcuts. The Compound Effect punishes those who seek hacks and rewards those who commit to the mundane.' He says: 'The Instagram guru selling '5 Easy Steps to 100 Listings' is lying to you. The truth is: there are 5 boring steps, repeated 1,000 times, with relentless consistency. That's the shortcut.'" },
    { key: "microwave_vs_crockpot", text: "Hardy uses the Microwave vs. Crockpot metaphor: 'Most agents want microwave success—instant results from minimal effort. But lasting wealth is a crockpot process—slow, steady, and compound.' He says: 'The agents who compound are the agents who win. The agents who microwave are the agents who burn out.'" },
    { key: "daily_disciplines", text: "Hardy defines Daily Disciplines as the non-negotiable behaviors that compound: 'Your 5 daily disciplines should be so small they seem insignificant—2 prospecting calls, 1 handwritten note, 15 minutes of learning, 30 minutes of exercise, 5 minutes of planning. Individually, they're nothing. Compounded over 365 days, they're everything.'" },
    { key: "multiplier_effect", text: "Hardy's Multiplier Effect: 'Consistency isn't addition—it's multiplication.' 2 calls per day × 250 working days = 500 calls. At 5% conversion = 25 appointments. At 40% close rate = 10 deals. At $10,000 average commission = $100,000—from 2 calls per day. 'Do the compound math,' Hardy says. 'Then do the calls.'" },
    { key: "preparation_ritual", text: "Hardy's evening preparation ritual: 'Every night before bed, lay out tomorrow's clothes, prep your meals, review your calendar, and write your top 3 priorities.' He says: 'Winners win before the alarm goes off. By the time most agents are deciding what to wear, you've already decided what to accomplish.'" },

    // ── Influences & Environment (11-18) ──
    { key: "input_influences", text: "Hardy's Input Audit: 'You are the average of what you consume. Guard your inputs: what you read, watch, listen to, and who you spend time with.' He says: 'If you spend 30 minutes a day consuming news, that's 182 hours a year of fear, outrage, and distraction injected directly into your psychology. Replace it with 30 minutes of learning and watch what compounds.'" },
    { key: "peer_group_audit", text: "Hardy says: 'Your peer group is either pulling you up or dragging you down. There is no neutral.' He recommends a Peak Performance Partner—someone who shares your standards, not your excuses. 'Find someone who makes you uncomfortable with their discipline,' Hardy says. 'Then spend more time with them.'" },
    { key: "elimination_principle", text: "Hardy's Elimination Principle: 'Success is not about adding more—it's about eliminating everything that doesn't compound.' He says: 'Every 'yes' is a 'no' to something else. Say yes to the social media rabbit hole and you've said no to 30 prospecting calls. Subtraction is the most underrated success strategy.'" },
    { key: "environment_design_hardy", text: "Hardy on environment: 'Your environment is either a tailwind or a headwind. Design it deliberately.' Put your call list on your desk, not in a drawer. Put your goals on the wall, not in a notebook. Remove the apps that steal your attention. 'Environment beats willpower every time,' Hardy says. 'Stop relying on discipline and start engineering your surroundings.'" },
    { key: "five_year_vision", text: "Hardy's 5-Year Vision Exercise: 'Define your life in vivid detail—income, relationships, health, lifestyle—5 years from now. Then reverse-engineer the daily disciplines that make it inevitable.' He says: 'Most agents have vague goals. Top producers have vivid pictures of their future self, and they engineer their daily behavior to match that picture.'" },
    { key: "gratitude_practice_hardy", text: "Hardy connects gratitude to compound success: 'Gratitude is the reset button for your psychology. When you're grateful, you operate from abundance. When you're entitled, you operate from scarcity.' He recommends writing 3 specific things you're grateful for every morning—not generic ('my family') but specific ('my daughter's laugh at breakfast today')." },
    { key: "energy_management_hardy", text: "Hardy treats energy as the primary resource: 'Time is fixed. Energy is variable. The agent with the most energy wins—not the agent with the most hours.' He says: 'Sleep, nutrition, exercise, and mental diet are the four pillars of energy. Neglect any one of them, and your Compound Effect slows to a crawl.'" },
    { key: "accountability_partner", text: "Hardy insists on external accountability: 'Public commitment increases follow-through by 65%. Lone wolves don't compound.' Find an accountability partner—not a cheerleader, a truth-teller. 'Someone who will look you in the eye and say: Did you do what you said you'd do? Yes or no?' Hardy says: 'Accountability isn't comfortable. That's why it works.'" },

    // ── Advanced Compounding (19-30) ──
    { key: "rhythm_register", text: "The Rhythm Register is Hardy's physical tracking tool: a printed chart where you mark every key daily behavior with a checkmark. 'The chain of checkmarks becomes its own motivation,' Hardy says. 'After 14 consecutive days, you won't want to break the chain. After 30 days, the chain becomes your identity.'" },
    { key: "weekly_rhythm", text: "Hardy teaches Weekly Rhythm: 'Every Sunday, review the previous week's scorecard, celebrate wins, identify gaps, and plan the coming week's 5 priorities.' He says: 'The Sunday Review is where compounding becomes conscious. Without it, you're compounding by accident—and accident usually compounds the wrong things.'" },
    { key: "monthly_assessment", text: "Hardy's Monthly Assessment: 'Once a month, zoom out. Review your 30-day trends. Are your numbers going up, down, or flat? Flat is the most dangerous—it feels okay but it's actually slow decay.' He says: 'Monthly assessment catches the drift before it becomes a crisis.'" },
    { key: "quarterly_recalibration", text: "Hardy recommends quarterly recalibration: 'Every 90 days, revisit your annual goals, adjust your daily disciplines if needed, and reset your Big Mo.' He says: 'The market changes. Your life changes. Your system should evolve—but your commitment to consistency should never waver.'" },
    { key: "compound_math_applied", text: "Hardy applies compound math to relationships: 'Send 1 handwritten note per day for a year. That's 365 notes. At a 5% referral rate, that's 18 referrals. At $8,000 average commission, that's $144,000—from one note per day.' He says: 'The math is embarrassingly simple. The execution is where everyone quits.'" },
    { key: "keystone_habit", text: "Hardy identifies Keystone Habits: the one habit that triggers a cascade of other good habits. 'For most agents, the keystone habit is the morning routine. When you nail the morning, you nail the prospecting block. When you nail the prospecting block, you nail the pipeline. When you nail the pipeline, you nail the income.' He says: 'Find your keystone and protect it.'" },
    { key: "winning_edge", text: "Hardy's Winning Edge principle: 'The difference between the #1 agent and the #10 agent is often less than 5%—but the income difference is 500%.' He says: 'You don't need to be dramatically better. You need to be consistently slightly better. That's the compound edge.'" },
    { key: "decision_fatigue", text: "Hardy on Decision Fatigue: 'Every decision you make depletes your willpower. That's why Steve Jobs wore the same outfit. That's why your morning routine should be automatic—so you don't waste decisions on breakfast and clothing when you need them for prospecting and negotiation.'" },
    { key: "streaks_and_chains", text: "Hardy teaches the power of streaks: 'A streak creates its own gravity. After 7 consecutive days of prospecting, you have momentum. After 21 days, you have a habit. After 90 days, you have an identity.' He says: 'Protect the streak. Miss one day and restart immediately—because two consecutive misses ends the streak and kills the momentum.'" },
    { key: "legacy_compounding", text: "Hardy's ultimate frame: 'You're not just compounding for this quarter. You're compounding for your legacy—your children's opportunities, your family's financial foundation, your community's strength.' He says: 'When the daily discipline gets boring (and it will), remember: you're not just building a business. You're building a life that outlasts you.'" },
    { key: "motivation_is_garbage", text: "Hardy is famous for saying: 'Motivation is garbage. Motivation is like a bath—you need it daily, but it never sticks.' He says: 'Stop waiting to feel motivated. Start acting disciplined. Motivation follows action, not the other way around. The agents who wait to feel inspired are the agents who starve.'" },
    { key: "compound_in_reverse", text: "Hardy warns about the Compound Effect in reverse: 'The same principle that builds wealth also builds poverty. Skip one call today—no big deal. Skip one call every day for a year—that's 250 missed opportunities. The Compound Effect is always working. The question is: is it working for you or against you?'" },
  ],
  truthTemplates: [
    "Hardy's Compound Effect is your honest diagnosis: you don't have a talent problem or a market problem—you have a consistency problem. As Hardy says: 'Small, smart choices + consistency + time = radical results.' The small disciplines you're skipping today are compounding against you. In 90 days, you'll feel the gap. In a year, you'll see it in your income.",
    "Your momentum—what Hardy calls 'Big Mo'—has stalled because you broke the chain. Hardy warns: 'Momentum takes enormous energy to start and very little to maintain. Most agents give up right before Big Mo kicks in.' The tipping point is usually around day 21-30 of consistent action. You quit at day 14.",
    "Hardy's tracking principle exposes the truth: you're guessing instead of measuring. You think you made 'a lot' of calls this week, but you can't tell me the exact number. Hardy says: 'What you measure, you manage. What you manage, you master. What you don't measure, you're guessing about.' Your scorecard is your mirror—and right now, you're avoiding the mirror.",
    "Hardy warns about the Compound Effect in reverse: 'The same principle that builds wealth also builds poverty.' Your skipped calls aren't harmless—they're compounding into future scarcity. Hardy says: 'The Compound Effect is always working. The question is: is it working for you or against you?' Right now, it's working against you.",
    "As Hardy puts it: 'Motivation is garbage. It's like a bath—you need it daily, but it never sticks.' You're waiting to feel inspired before you prospect. Hardy's solution: 'Stop waiting to feel motivated. Start acting disciplined. Motivation follows action, not the other way around.'",
  ],
  strategyTemplates: [
    "Implement Hardy's Bookend Routines: design a specific morning routine (wake time, movement, gratitude, top 3 priorities) and an evening routine (review scorecard, prep tomorrow, write 3 gratitudes). Hardy says: 'Your morning routine determines the quality of your day. Your evening routine determines the quality of your morning.'",
    "Build your Rhythm Register: create a physical tracking chart for your 5 non-negotiable daily actions. Mark each one done every day with a checkmark. Hardy's data: 'Visual tracking increases consistency by 300% compared to mental tracking.' After 14 days, the chain becomes its own motivation.",
    "Apply Hardy's Compound Math to your business: 2 extra calls per day = 500 per year. At 5% conversion = 25 appointments. At 40% close = 10 deals. At $10K commission = $100,000. Hardy says: 'Do the compound math. Then do the calls. The math is embarrassingly simple. The execution is where everyone quits.'",
    "Execute Hardy's Weekly Rhythm: every Sunday, review the previous week's scorecard, celebrate wins, identify gaps, and plan the coming week's top 5 priorities. Hardy says: 'The Sunday Review is where compounding becomes conscious. Without it, you're compounding by accident.'",
    "Run Hardy's Input Audit: track what you consume for 3 days—news, social media, podcasts, conversations. Then ask: 'Is this input making me more or less likely to execute my daily disciplines?' Hardy says: 'Replace 30 minutes of news with 30 minutes of learning and watch what compounds over a year.'",
  ],
  directives: [
    "Build your Rhythm Register today: 5 daily non-negotiables, tracked on paper, visible at your desk.",
    "Design your Bookend Routines: write out your exact morning and evening sequences tonight.",
    "Calculate your personal Compound Math: what do 2 extra daily actions equal in 12 months?",
    "Find an accountability partner this week. Share your scorecard with them every Friday.",
    "Run Hardy's Input Audit: what are you consuming that's working against your compound growth?",
    "Execute the Sunday Review this weekend: celebrate wins, identify gaps, plan next week's top 5.",
    "Identify your one keystone habit—the domino that triggers all other good habits—and protect it.",
    "Write your 5-Year Vision in vivid detail. Then reverse-engineer the daily disciplines that get you there.",
  ],
  quotes: [
    { text: "Small, smart choices + consistency + time = radical results.", author: "Darren Hardy" },
    { text: "You will never change your life until you change something you do daily.", author: "Darren Hardy" },
    { text: "Motivation is garbage. It's like a bath—you need it daily.", author: "Darren Hardy" },
    { text: "Track it to crack it. What you measure, you can manage.", author: "Darren Hardy" },
    { text: "The Compound Effect is always working. The question is: for you or against you?", author: "Darren Hardy" },
    { text: "There are no shortcuts. There is only the mundane, repeated with relentless consistency.", author: "Darren Hardy" },
    { text: "Consistency isn't addition—it's multiplication.", author: "Darren Hardy" },
    { text: "The winning edge is less than 5%—but the income difference is 500%.", author: "Darren Hardy" },
  ],
  rpmTemplates: [
    { result: "Establish unbreakable Bookend Routines for 21 consecutive days", purpose: "So discipline becomes automatic and Big Mo starts compounding", massive_action: "Write out morning and evening routines tonight, set alarms, track on Rhythm Register starting tomorrow" },
    { result: "Build and maintain my Rhythm Register for 30 consecutive days", purpose: "So I always know exactly where I stand and can course-correct in real time", massive_action: "Create physical tracker with 5 daily non-negotiables, mark them every day, share with accountability partner" },
    { result: "Execute Hardy's compound math: 2 extra prospecting calls per day for 90 days", purpose: "So I add $50,000+ in projected annual income through small, consistent action", massive_action: "Add 2 calls to daily minimum, track on Rhythm Register, review compound projections weekly" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 7. JAMES CLEAR — Atomic Habits
// ═══════════════════════════════════════════════════════════════════════════════
clear: {
  id: "clear",
  name: "James Clear",
  title: "The Atomic Habits Engineer",
  focus: "Habit Formation / Systems Design / Identity Change",
  bottlenecks: ["consistency_habits", "discipline", "mindset_state", "overwhelm", "systems_design"],
  wisdomPoints: [
    // ── Core Framework (1-10) ──
    { key: "one_percent", text: "Clear's 1% Rule: 'Get 1% better every day, and in one year you'll be 37 times better.' The math is exponential, not linear. Clear says: 'People overestimate what they can do in a day and underestimate what they can do in a year. One percent improvements are invisible in the moment and unstoppable over time.'" },
    { key: "identity_based", text: "Clear's most powerful insight: 'Don't set goals—build identity.' He says: 'The goal is not to prospect more. The goal is to become the type of person who prospects daily. Every action is a vote for the type of person you wish to become. Cast enough votes, and the election is decided.'" },
    { key: "systems_over_goals", text: "Clear says: 'You do not rise to the level of your goals. You fall to the level of your systems.' Goals are about results. Systems are about processes. The agent with a goal of 20 closings and no system will underperform the agent with no goal and a relentless daily prospecting system. Build the system. Trust the process." },
    { key: "four_laws", text: "Clear's 4 Laws of Behavior Change are the engineering blueprint for any habit: (1) Make it Obvious, (2) Make it Attractive, (3) Make it Easy, (4) Make it Satisfying. To break a bad habit, invert them: make it invisible, unattractive, difficult, unsatisfying. Clear says: 'Habits aren't about willpower. They're about design.'" },
    { key: "habit_stacking", text: "Habit Stacking is Clear's linking method: 'After I [CURRENT HABIT], I will [NEW HABIT].' Examples: 'After I pour my coffee, I will write 3 handwritten notes.' 'After I park at the office, I will review my Warm List.' Clear says: 'You don't build habits in a vacuum. You attach them to existing anchors. The anchor does the heavy lifting.'" },
    { key: "two_minute_rule", text: "Clear's 2-Minute Rule: 'When you start a new habit, it should take less than 2 minutes to do.' Don't commit to 'prospect for an hour.' Commit to 'open my call list.' Clear says: 'The point is not to do one push-up—it's to become the type of person who doesn't miss workouts. Start absurdly small, then let the behavior scale naturally.'" },
    { key: "environment_design", text: "Clear's Environment Design principle: 'Make good habits obvious and easy, bad habits invisible and hard.' Put your call list printed on your desk (obvious). Move your phone to another room during Golden Hours (invisible). Pre-load your CRM with today's calls the night before (easy). Clear says: 'Environment beats willpower. Every time.'" },
    { key: "plateau_of_latent_potential", text: "Clear's Plateau of Latent Potential explains why agents quit: 'You expect progress to be linear—I did the work, where are the results? But results are delayed. Ice doesn't melt at 31 degrees. It melts at 32. All the work you did from 20 to 31 degrees wasn't wasted—it was stored.' Clear says: 'You're doing the work but not seeing results yet. That doesn't mean it's not working.'" },
    { key: "habit_tracking", text: "Clear's habit tracking rule: 'Never miss twice. If you miss one day, recover immediately. Two consecutive misses is the start of a new (bad) habit.' He says: 'Missing once is an accident. Missing twice is the beginning of a pattern. The first miss is human. The second miss is a choice. Don't let a stumble become a fall.'" },
    { key: "decisive_moments", text: "Clear identifies Decisive Moments: 'Each day has a handful of choices that deliver outsized impact on the rest of the day.' The moment you wake up—do you check your phone or do your morning routine? The first hour at the office—do you open email or open your call list? Clear says: 'Master these 5-6 decisive moments, and the rest of the day follows.'" },

    // ── Applied Mechanics (11-20) ──
    { key: "temptation_bundling", text: "Temptation Bundling is Clear's method for making hard habits attractive: 'Pair something you need to do with something you enjoy.' Make prospecting calls at your favorite coffee shop. Do CRM updates while listening to your favorite playlist. Clear says: 'You don't need discipline if the habit is enjoyable. Make it enjoyable.'" },
    { key: "pointing_calling", text: "Clear's Pointing-and-Calling technique: 'Make unconscious habits conscious by verbalizing them.' Before opening Instagram during prospecting time, say out loud: 'I am about to open social media instead of making my next call.' Clear says: 'The act of speaking forces awareness. Awareness creates choice. Choice breaks the autopilot.'" },
    { key: "implementation_intention", text: "Clear's Implementation Intention: 'I will [BEHAVIOR] at [TIME] in [LOCATION].' Not 'I'll prospect more,' but 'I will make 10 prospecting calls at 8:30 AM in my office with the door closed.' Clear says: 'People who use implementation intentions are 2-3x more likely to follow through. Specificity eliminates ambiguity, and ambiguity is where habits die.'" },
    { key: "friction_reduction", text: "Clear teaches Friction Reduction: 'Reduce the number of steps between you and your good habits.' Want to prospect first thing? Open your CRM before you leave the office, with tomorrow's call list loaded. Want to write notes? Keep cards, stamps, and pens on your desk, not in a drawer. Clear says: 'Every step of friction is a chance to quit. Remove the steps.'" },
    { key: "variable_reward", text: "Clear on Variable Rewards: 'The habits that stick are the ones with occasional, unpredictable rewards.' Prospecting has this built in—you never know which call will land the listing. Clear says: 'It's the slot machine effect. The uncertainty of the reward makes the behavior more addictive, not less. Lean into the variability.'" },
    { key: "habit_shaping", text: "Clear's Habit Shaping: start with the easiest version of a habit and gradually increase difficulty. Week 1: open your call list every morning. Week 2: dial 3 numbers. Week 3: have 3 conversations. Week 4: book 1 appointment. Clear says: 'You're not building the final version of the habit on day one. You're building the runway.'" },
    { key: "visual_cues", text: "Clear on Visual Cues: 'People are more likely to notice visual cues than any other type.' Put a sticky note on your monitor that says 'Did you make your calls?' Put your quarterly goal on the bathroom mirror. Clear says: 'Motivation fades. Visual cues persist. Design your environment to remind you who you're becoming.'" },
    { key: "social_proof", text: "Clear says: 'We tend to adopt habits that are praised and approved by our culture.' If your office culture celebrates prospecting activity, you'll prospect more. If it celebrates complaints about the market, you'll complain more. Clear teaches: 'Join a group where your desired behavior is the normal behavior. The group will do the work that willpower can't.'" },
    { key: "reflection_and_review", text: "Clear recommends Regular Reflection: 'Without reflection, good habits become mindless and bad habits become invisible.' He practices an Annual Review (what went well? what didn't?) and a mid-year Integrity Report (am I living by my values?). Clear says: 'Habits + reflection = continuous improvement. Habits without reflection = plateau.'" },
    { key: "boredom_mastery", text: "Clear on mastering boredom: 'The greatest threat to success is not failure—it's boredom. We get bored with habits that are working because the results are no longer novel.' He says: 'The ability to keep doing the thing when it gets boring is what separates professionals from amateurs. Fall in love with boredom. That's where mastery lives.'" },

    // ── Deep Philosophy (21-30) ──
    { key: "goldilocks_zone", text: "Clear's Goldilocks Rule: 'Humans experience peak motivation when working on tasks that are right on the edge of their current abilities—not too hard, not too easy.' He says: 'If prospecting feels overwhelming, you've set the bar too high. If it feels pointless, you've set it too low. Find the Goldilocks zone: challenging enough to engage you, achievable enough to sustain you.'" },
    { key: "outcomes_processes_identity", text: "Clear's three layers of behavior change: Outcomes (what you get), Processes (what you do), Identity (what you believe). Most agents start with outcomes ('I want 20 closings'). Clear says: 'Start with identity: I am a relentless prospector. The processes follow naturally. The outcomes follow inevitably.'" },
    { key: "valley_of_disappointment", text: "Clear describes the Valley of Disappointment: 'You expect results to follow a linear path. When they don't show up on schedule, you enter the valley—where most people quit.' He says: 'The valley is not evidence that your system is broken. It's evidence that compounding hasn't broken through yet. Stay in the valley. The breakthrough is coming.'" },
    { key: "aggregation_of_gains", text: "Clear's Aggregation of Marginal Gains: 'Look for every 1% improvement available—in your scripts, your timing, your follow-up, your CRM workflow, your morning routine, your energy, your sleep.' He says: 'Individually, each improvement is almost meaningless. Collectively, they're transformational. The British cycling team won the Tour de France by improving everything by 1%.'" },
    { key: "habit_graduation", text: "Clear teaches Habit Graduation: 'Once a habit is established at level 1, graduate it to level 2.' Level 1: open call list daily. Level 2: dial 5 numbers daily. Level 3: have 3 conversations daily. Level 4: book 1 appointment daily. Clear says: 'Graduation is how you go from doing the minimum to doing the meaningful—without ever overwhelming yourself.'" },
    { key: "motion_vs_action", text: "Clear distinguishes Motion from Action: 'Motion is planning, strategizing, and learning. Action is the behavior that produces results.' He says: 'Reading about prospecting is motion. Picking up the phone is action. Motion feels productive but produces nothing. Action feels uncomfortable but produces everything. Don't confuse the two.'" },
    { key: "feedback_loops", text: "Clear on feedback loops: 'Good habits create positive feedback loops. A successful call builds confidence, which makes the next call easier, which builds more confidence.' He says: 'The hardest call is always the first one. After that, the feedback loop takes over. Your only job is to make the first call. Momentum handles the rest.'" },
    { key: "automaticity", text: "Clear's concept of Automaticity: 'A habit is fully formed when the behavior becomes automatic—when you do it without thinking.' He says: 'It takes an average of 66 days (not 21) for a behavior to become automatic. The range is 18 to 254 days depending on the person and the behavior. Be patient. You're building neural pathways, not just checklists.'" },
    { key: "priming_tomorrow", text: "Clear's tomorrow-priming technique: 'Set up your environment tonight for tomorrow's habits.' Load tomorrow's call list. Lay out your workout clothes. Prep your morning coffee. Clear says: 'The best way to guarantee tomorrow's behavior is to make tonight's preparation automatic. When tomorrow arrives, the path of least resistance should be the productive path.'" },
    { key: "never_zero", text: "Clear's Never Zero principle: 'On your worst day, do the minimum. On your best day, do the maximum. But never do zero.' He says: 'Even on days when you're sick, exhausted, or demoralized—make one call, write one note, review one contact. Zero breaks the identity. One preserves it.'" },
  ],
  truthTemplates: [
    "Clear's framework reveals the real issue: you're setting goals when you should be building systems. 'I want to close 20 deals this year' is an outcome. 'I am an agent who prospects for 90 minutes every morning' is an identity. Clear says: 'You do not rise to the level of your goals. You fall to the level of your systems.' Build the system.",
    "You're trapped on what Clear calls the 'Plateau of Latent Potential': you've been putting in work, but the results haven't shown up yet, so you're tempted to quit. Clear says: 'The valley is not evidence that your system is broken. It's evidence that compounding hasn't broken through yet.' The ice is at 31 degrees. Don't stop now.",
    "Clear's Environment Design principle explains your inconsistency: your environment is set up for distraction, not for production. Your phone is on your desk, your call list is buried in your CRM, and your prospecting block has no physical cue. Clear teaches: 'Environment beats willpower. Every time.' Redesign your workspace to make the right behavior automatic.",
    "Clear diagnoses your core issue as Motion vs. Action confusion: 'Reading about prospecting is motion. Picking up the phone is action.' He says: 'Motion feels productive but produces nothing. Action feels uncomfortable but produces everything.' You've been in motion for months. It's time to take action.",
    "Clear identifies your struggle as an identity problem: 'Every action is a vote for the type of person you wish to become.' Right now, each skipped prospecting call is a vote for 'I am not a prospector.' Each completed call is a vote for 'I am relentless.' Clear says: 'Cast enough votes, and the election is decided.'",
  ],
  strategyTemplates: [
    "Apply Clear's 2-Minute Rule to your biggest resistance point: if prospecting feels overwhelming, scale it down to 'Open my call list and dial one number.' Clear says: 'The point is not to do one push-up—it's to become the type of person who doesn't miss workouts. Start absurdly small. Let the behavior scale naturally.'",
    "Build a Habit Stack for your morning using Clear's formula: 'After I pour my coffee [existing habit], I will open my call list [new habit]. After I open my call list, I will dial my first number. After my first call, I will write one handwritten note.' Clear says: 'The anchor does the heavy lifting.'",
    "Redesign your environment using Clear's 4 Laws: Make it Obvious (call list printed on desk), Make it Attractive (prospect at your favorite coffee shop), Make it Easy (pre-load CRM nightly), Make it Satisfying (mark each call on a visible tracker). Clear says: 'Habits aren't about willpower. They're about design.'",
    "Adopt Clear's 'Never Miss Twice' rule: if you skip your prospecting block one day, that's human. If you skip it two consecutive days, that's a pattern. Clear says: 'The first miss is an accident. The second miss is a choice. Don't let a stumble become a fall.'",
    "Run Clear's Decisive Moments audit: identify the 5-6 moments each day where a small choice determines the direction of hours. Wake up: phone or routine? Arrive at office: email or call list? After lunch: CRM or social media? Clear says: 'Master these moments, and the rest of the day follows.'",
  ],
  directives: [
    "Identify your #1 habit resistance point and apply Clear's 2-Minute Rule to it right now.",
    "Write one Habit Stack: 'After [existing habit], I will [new productive habit].'",
    "Redesign your desk: put your call list visible, move your phone to another room during Golden Hours.",
    "Adopt the 'Never Miss Twice' rule starting today. One miss is human. Two is a new pattern.",
    "Say out loud before your next distraction: 'I am about to [distraction] instead of [productive habit].'",
    "Write your implementation intention: 'I will [behavior] at [time] in [location].'",
    "Identify one thing you can make 1% better today. Script? Timing? Follow-up speed?",
    "Prime your tomorrow tonight: load call list, lay out clothes, prep morning routine.",
  ],
  quotes: [
    { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
    { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
    { text: "Habits are not about having something. They are about becoming someone.", author: "James Clear" },
    { text: "Be the designer of your world and not merely the consumer of it.", author: "James Clear" },
    { text: "The greatest threat to success is not failure—it is boredom.", author: "James Clear" },
    { text: "Missing once is an accident. Missing twice is the beginning of a new habit.", author: "James Clear" },
    { text: "Motion feels productive. Action produces results. Don't confuse the two.", author: "James Clear" },
    { text: "Start with who you wish to become. The habits follow naturally.", author: "James Clear" },
  ],
  rpmTemplates: [
    { result: "Build 3 unbreakable habit stacks for my morning routine", purpose: "So productive behavior becomes automatic, not effortful", massive_action: "Write 3 habit stacks tonight, redesign desk environment, start tomorrow with the 2-Minute Rule" },
    { result: "Sustain my core habits for 66 days without missing twice", purpose: "So my identity shifts from 'trying to improve' to 'I am someone who executes daily'", massive_action: "Install visible habit tracker, set 'Never Miss Twice' rule, review chain every evening" },
    { result: "Redesign my workspace using Clear's 4 Laws of Behavior Change", purpose: "So my environment pulls me toward productive behavior instead of fighting against it", massive_action: "Print call list for desk, remove phone during prospecting, pre-load CRM nightly, install visual tracker" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 8. BRIAN BUFFINI — Referral Mastery & The Mayor Campaign
// ═══════════════════════════════════════════════════════════════════════════════
buffini: {
  id: "buffini",
  name: "Brian Buffini",
  title: "The Referral Mastery Mayor",
  focus: "Sphere Nurture / Retention / Community Presence",
  bottlenecks: ["relationship_deficit", "referral_quality", "retention", "sphere_awareness", "database_size"],
  wisdomPoints: [
    // ── The Mayor Campaign (1-10) ──
    { key: "mayor_campaign", text: "Buffini's Mayor Campaign: 'Become the most known, liked, and trusted person in your neighborhood—not just your office, but your geographic farm.' He says: 'The Mayor doesn't chase votes. The Mayor is so embedded in the community that people come to them. That's the model. Visibility equals viability.'" },
    { key: "pop_bys_system", text: "Buffini's Pop-By system is a 12-month touchpoint calendar: themed, personal drop-offs to your A-List every single month. January: hot cocoa with a 'Warm wishes for the new year' card. March: seed packets with 'Planting seeds for your future.' October: pumpkins. Buffini says: 'A $3 Pop-By produces more referral conversation than a $300 ad. The math isn't even close.'" },
    { key: "hundred_days", text: "Buffini's 100-Days System: commit to 100 consecutive days of at least one referral-generating activity—a note, a call, a pop-by, a referral ask. Buffini says: '100 days transforms your business from transactional to relational. It rewires your brain, your calendar, and your income source. After 100 days, you'll never go back to cold calling.'" },
    { key: "good_life_branding", text: "Buffini's 'It's a Good Life' branding philosophy: your clients should associate you with positivity, gratitude, and excellence—not desperation or commission pressure. Every touchpoint—note, call, pop-by, email—should reinforce the message: 'My agent makes my life better.' Buffini says: 'Your brand isn't your logo. It's how people feel when they think of you.'" },
    { key: "referral_dialogue_exact", text: "Buffini's Referral Dialogue is direct and unapologetic: 'I've built my business on referrals from great clients like you. Who do you know that might be thinking about buying or selling real estate?' He says: 'Ask directly. Ask often. Ask without apology. The reason agents don't get referrals is the same reason most salespeople fail—they don't ask.'" },
    { key: "client_party_system", text: "Buffini's Client Appreciation Event system: one major party per year (summer BBQ, holiday gathering, or themed event), invite your entire A-List plus a guest, provide food, fun, and genuine connection—zero sales pitch. Buffini says: 'The appreciation event is your annual relationship audit. Everyone who shows up is invested. Everyone who doesn't needs more nurturing.'" },
    { key: "personal_note_system", text: "Buffini's Personal Note System: handwritten notes after every meeting, every referral received, every referral given, every birthday, every anniversary, and every life milestone. Buffini says: 'The handwritten note is the cheapest, most powerful tool in your marketing arsenal. It costs 60 cents and it earns you a lifetime of loyalty. No digital tool comes close.'" },
    { key: "themed_monthly_mailer", text: "Buffini's Themed Monthly Mailers combine market intelligence with personal branding: a monthly postcard or letter that includes one market insight, one personal story or photo, and a call-to-action. Buffini says: 'Your sphere should hear from you 12 times per year minimum. If they don't, someone else is filling that space.'" },
    { key: "power_of_one", text: "Buffini's Power of One More: 'One more call per day, one more note per day, one more pop-by per week compounds into 365 extra touchpoints per year.' He says: 'The difference between a $200K agent and a $500K agent isn't talent—it's one more. One more conversation. One more follow-up. One more act of care. The margin is tiny. The impact is massive.'" },
    { key: "relationship_income_ratio", text: "Buffini tracks Relationship Income: 'What percentage of your business comes from repeat clients and referrals? If it's under 60%, your system is broken. If it's over 80%, you've built something that lasts.' He says: 'The goal is 80% relationship income. At that level, you're recession-proof, market-proof, and competition-proof.'" },

    // ── Philosophy & Depth (11-20) ──
    { key: "immigrant_edge", text: "Buffini's 'Immigrant Edge' draws from his own story of immigrating from Ireland with nothing: 'Nobody is coming to save your business. That's not a curse—it's your greatest advantage.' He says: 'Outwork everyone. Out-care everyone. Out-serve everyone. When you take full ownership—no excuses, no blame, no waiting—you become unstoppable.'" },
    { key: "peak_producers", text: "Buffini defines Peak Producers: 'Peak Producers don't wait for leads—they cultivate them. Your database is a garden, not a vending machine.' He says: 'A garden requires planting, watering, weeding, and patience. A vending machine requires inserting money and hoping something comes out. Peak Producers garden. Average agents vend.'" },
    { key: "turnkey_system", text: "Buffini's Turnkey Referral System has 5 components: (1) A-List identification, (2) Monthly Pop-Bys, (3) Monthly notes, (4) Quarterly calls, (5) Annual appreciation event. Buffini says: 'This system runs on 30 minutes per day. That's it. 30 minutes of intentional relationship nurturing produces more income than 3 hours of cold calling.'" },
    { key: "gratitude_as_fuel", text: "Buffini teaches gratitude as professional fuel: 'Start every morning by writing down 3 things you're grateful for about your business. Not generic gratitude—specific: this client, this closing, this referral.' He says: 'Grateful agents radiate positive energy. Positive energy attracts referrals. It's not woo-woo—it's neuroscience. Gratitude rewires your brain for opportunity.'" },
    { key: "follow_through_not_up", text: "Like Maher, Buffini reframes follow-up as follow-through: 'Follow-up sounds like you're stalking someone. Follow-through sounds like you're keeping a promise.' He says: 'When a client gives you a referral and you follow through with a thank-you note, an update, and a result—that client will refer you again. And again. And again. Follow-through is the compounding mechanism.'" },
    { key: "closing_day_protocol", text: "Buffini's Closing Day Protocol: (1) Hand-deliver a personalized closing gift, (2) Write a handwritten note expressing genuine gratitude, (3) Take a photo with the client at their new home, (4) Add them to your A-List with monthly touchpoint schedule. He says: 'Closing day is not the end of the relationship. It's the first day of your referral program with that client.'" },
    { key: "sphere_expansion", text: "Buffini teaches systematic sphere expansion: 'Every month, add 5 new people to your A-List through intentional networking—community events, volunteer work, children's activities, gym, church.' He says: 'Your database should grow by 60 people per year. Not random names—real relationships with people who know your face, your name, and your profession.'" },
    { key: "neighborhood_specialist", text: "Buffini's Geographic Farm strategy: 'Pick one neighborhood of 200-500 homes. Become the Mayor of that neighborhood. Pop-bys, door knocking, community events, market updates.' He says: 'After 12 months of consistent farming, you should be the #1 agent in that neighborhood by name recognition. After 24 months, you should own it.'" },
    { key: "mastermind_group", text: "Buffini recommends Mastermind Groups: '5-8 agents from different markets who meet monthly to share wins, challenges, and strategies.' He says: 'Iron sharpens iron. The mastermind group provides accountability, fresh ideas, and the kind of honest feedback you can't get from your broker or your spouse.'" },
    { key: "generational_wealth", text: "Buffini connects referral mastery to generational impact: 'When you build a referral-based business, you're not just building income—you're building an asset. A database of 500 nurtured relationships is worth $2-5 million in lifetime commissions.' He says: 'That's generational wealth. And it starts with one handwritten note.'" },

    // ── Advanced Systems (21-30) ──
    { key: "pop_by_calendar", text: "Buffini's full Pop-By Calendar: Jan (hot cocoa), Feb (Valentine's cookies), Mar (seed packets), Apr (spring cleaning checklist), May (sunscreen), Jun (popsicles), Jul (flag/patriotic item), Aug (back-to-school supplies), Sep (apple cider), Oct (pumpkins), Nov (pie), Dec (ornament). He says: 'The calendar removes the guesswork. You never have to wonder what to bring—just execute the system.'" },
    { key: "video_notes", text: "Buffini has evolved to include Video Notes: a 30-60 second personalized video sent via text or email that serves the same purpose as a handwritten note—personal, genuine, memorable. He says: 'The handwritten note is still king. But a video note is the prince. Use both, and you're the royal family of referrals.'" },
    { key: "referral_tracking", text: "Buffini insists on Referral Source Tracking: 'Know exactly where every referral came from—which client, which event, which touchpoint. Then double down on what's working.' He says: 'Most agents can't tell you which of their activities generate referrals. That's like a farmer who doesn't know which field produces the most crops.'" },
    { key: "annual_review_meeting", text: "Buffini recommends an Annual Review Meeting with your top 20 clients: a 15-minute meeting (in person or virtual) where you review their home's value, discuss their goals, and ask for referrals directly. He says: 'This single meeting generates more business than 100 cold calls. But most agents never schedule it because they're afraid to ask.'" },
    { key: "client_segmentation_advanced", text: "Buffini's Advanced Client Segmentation: A+ (referred 3+ times), A (referred 1-2 times), B (would refer but hasn't yet), C (acquaintance), D (met once). He says: 'Your A+ clients should be treated like royalty—quarterly dinners, premium gifts, first access to listings. They're your unpaid sales force, and they deserve to be treated like partners.'" },
    { key: "social_media_strategy", text: "Buffini on social media: 'Use it, but don't depend on it. Social media is Level 3 communication—it keeps you visible but doesn't build deep trust.' He says: 'Post 3 times per week: one market insight, one personal moment, one client celebration. Then close the app and go make real connections.'" },
    { key: "morning_motivation", text: "Buffini's morning routine includes what he calls 'Feeding your mind before feeding your body': 10 minutes of motivational or educational content before checking any device. He says: 'The first thing you consume in the morning sets the trajectory for the day. News fills you with fear. Education fills you with power. Choose wisely.'" },
    { key: "value_proposition_buffini", text: "Buffini's Value Proposition: 'I don't just sell homes. I guide families through one of the most important financial decisions of their lives. My clients become friends, and my friends become clients.' He says: 'When your value proposition focuses on them, not you—referrals become inevitable.'" },
    { key: "consistency_over_intensity", text: "Buffini's golden rule: 'Consistency beats intensity. Every single time.' He says: 'The agent who makes 5 calls every day for a year (1,250 calls) will outperform the agent who makes 50 calls in one week and then burns out (50 calls). The tortoise wins. Always.'" },
    { key: "it_starts_with_one", text: "Buffini's encouragement for agents who feel overwhelmed: 'Don't think about the 500 contacts in your database. Think about the one person you're going to call right now.' He says: 'The journey of 500 referrals starts with one handwritten note. Write it now. Everything else follows.'" },
  ],
  truthTemplates: [
    "Buffini's diagnosis is clear: you're treating your database like a vending machine instead of a garden. You're inserting coins (ads, cold calls) and expecting instant results, when the real wealth is in the relationships you already have. As Buffini says: 'Peak Producers don't wait for leads—they cultivate them.' Every past client who hasn't heard from you in 6 months is a referral you've forfeited.",
    "Your Relationship Income ratio reveals the problem: Buffini's benchmark is 60-80% of business from repeat and referral. If you're below that, you're spending money to replace trust you've already earned. Buffini says: 'At 80% relationship income, you're recession-proof, market-proof, and competition-proof.' You're currently buying what you should be growing.",
    "Buffini's Pop-By system isn't 'nice to do'—it's your highest-ROI activity. A $3 monthly drop-off to 50 A-List contacts generates more pipeline than a $5,000 ad budget. But it requires consistency, planning, and what Buffini calls 'the willingness to show up at people's doors with cookies and a smile.' The system is simple. The commitment is the challenge.",
    "As Buffini teaches from his own immigrant story: 'Nobody is coming to save your business. That's not a curse—it's your greatest advantage.' He says: 'Outwork everyone. Out-care everyone. Out-serve everyone.' Your referral drought isn't a market problem. It's an activity problem. And the activity that solves it costs $3 per month per contact.",
    "Buffini connects your current struggle to a long-term truth: 'A database of 500 nurtured relationships is worth $2-5 million in lifetime commissions. That's generational wealth. And it starts with one handwritten note.' You're not just losing deals—you're losing the compounding potential of every relationship you're neglecting.",
  ],
  strategyTemplates: [
    "Launch Buffini's Pop-By system using his 12-month calendar: plan themed monthly drop-offs for your top 50 contacts. This month, pick the simplest theme (popcorn bags with 'Just popping by to say thanks'). Buffini says: 'The calendar removes the guesswork. Just execute the system.' 50 Pop-Bys × 12 months = 600 high-touch impressions per year.",
    "Build Buffini's 100-Days System: commit to 100 consecutive days of at least one referral-generating activity. Buffini says: '100 days transforms your business from transactional to relational.' Track it on a physical chart. After 100 days, you'll have a new identity—and a pipeline fed by trust instead of advertising.",
    "Calculate your Relationship Income: review your last 12 months of closings. What percentage came from repeat clients or referrals? If it's under 60%, Buffini's prescription is clear: launch the Mayor Campaign, execute the Pop-By calendar, and stop buying leads you should be earning.",
    "Execute Buffini's Closing Day Protocol with your next closing: (1) Hand-deliver a personalized gift, (2) Write a handwritten note, (3) Take a photo together, (4) Add them to your A-List with monthly touchpoint schedule. Buffini says: 'Closing day is not the end. It's the first day of your referral program with that client.'",
    "Use Buffini's Referral Dialogue in every client conversation this week: 'I've built my business on referrals from great clients like you. Who do you know that might be thinking about buying or selling?' Buffini says: 'Ask directly. Ask often. Ask without apology. The reason agents don't get referrals is they don't ask.'",
  ],
  directives: [
    "Plan your Pop-By theme for this month and execute 10 drop-offs this week.",
    "Start Buffini's 100-Days System today. One referral-generating activity per day for 100 days.",
    "Ask every client you speak with this week: 'Who do you know that might be thinking about buying or selling?'",
    "Calculate your Relationship Income ratio right now. What percentage of last year's closings came from referrals?",
    "Write 3 handwritten notes to past clients today. Mention something specific about them—not about real estate.",
    "Schedule your Annual Review Meeting with your top 5 clients. Review home values and ask for referrals.",
    "Add 5 new genuine contacts to your A-List this month through community involvement.",
    "Plan your Client Appreciation Event for this quarter. Pick a date, book a venue, and start the invite list.",
  ],
  quotes: [
    { text: "Your database is a garden, not a vending machine. Cultivate it.", author: "Brian Buffini" },
    { text: "Nobody is coming to save your business. That's your greatest advantage.", author: "Brian Buffini" },
    { text: "The Power of One More: one more call, one more note, one more connection.", author: "Brian Buffini" },
    { text: "It's a good life when you build a business around relationships, not transactions.", author: "Brian Buffini" },
    { text: "Consistency beats intensity. Every single time. The tortoise wins.", author: "Brian Buffini" },
    { text: "Your brand isn't your logo. It's how people feel when they think of you.", author: "Brian Buffini" },
    { text: "Closing day is not the end. It's the first day of your referral program.", author: "Brian Buffini" },
    { text: "The journey of 500 referrals starts with one handwritten note. Write it now.", author: "Brian Buffini" },
  ],
  rpmTemplates: [
    { result: "Launch the Pop-By system for my top 50 contacts this month", purpose: "So I become the most known, liked, and trusted agent in my sphere", massive_action: "Choose this month's theme, purchase supplies, execute 10 pop-bys before Friday" },
    { result: "Complete 100 consecutive days of referral-generating activity", purpose: "So my business model permanently shifts from transactional to relational", massive_action: "Create physical tracker, define qualifying activities, start Day 1 today with a handwritten note" },
    { result: "Achieve 70%+ Relationship Income within 12 months", purpose: "So my business is recession-proof and my marketing cost approaches zero", massive_action: "Launch Pop-By calendar, execute 5-5-4 weekly, implement Closing Day Protocol, track referral sources" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 9. GARY KELLER — The ONE Thing & Lead Generation Dominance
// ═══════════════════════════════════════════════════════════════════════════════
keller: {
  id: "keller",
  name: "Gary Keller",
  title: "The ONE Thing Focus Commander",
  focus: "Focus / Lead Generation / Prioritization / Scale",
  bottlenecks: ["time_management", "pipeline_volume", "overwhelm", "lead_volume", "personal_vision"],
  wisdomPoints: [
    // ── The ONE Thing Framework (1-10) ──
    { key: "focusing_question", text: "Keller's Focusing Question is the most powerful prioritization tool in business: 'What's the ONE Thing I can do such that by doing it everything else will be easier or unnecessary?' Keller says: 'This question forces extraordinary results by eliminating everything that doesn't matter. Ask it every morning. Ask it every hour. Ask it for every decision.'" },
    { key: "domino_effect", text: "Keller's Domino Effect: 'A single domino can knock over a domino 50% larger than itself. Line up a chain of dominoes, and the 57th one is as tall as the moon.' Applied to real estate: one lead generation habit, executed daily, topples every other business problem in sequence. Keller says: 'Find the lead domino. Everything else falls from there.'" },
    { key: "time_blocking_keller", text: "Keller's Time Blocking is the most sacred discipline: 'Block your ONE Thing first—before anything else enters your calendar. Protect it like a doctor protects surgery time.' He says: 'If your ONE Thing is lead generation, then your first 4 hours every day are lead generation. Not sometimes. Not when convenient. Every day. Non-negotiable.'" },
    { key: "gps_model", text: "Keller's GPS Model: Goals set your destination, Priorities keep you on the road, Strategies are the vehicle. He says: 'Most agents have goals but no priorities. They know where they want to go but have no discipline about which activities get them there. Goals without priorities are wishes. Priorities without strategies are intentions. You need all three.'" },
    { key: "lead_gen_is_the_one_thing", text: "Keller is unambiguous: 'Lead Generation is THE ONE Thing in real estate. Without leads, nothing else matters—not your marketing, not your CRM, not your brand, not your systems, not your team.' He says: 'Everything in this business starts with a lead. The agent who generates the most leads controls the most inventory, earns the most commissions, and builds the most wealth. Period.'" },
    { key: "millionaire_model", text: "The Millionaire Real Estate Agent model is Keller's blueprint: 'Leads → Listings → Leverage. In that order. Always.' He says: 'Most agents try to build leverage before they've solved lead generation. That's building a roof before the foundation. Leads first. Then listings. Then—and only then—leverage through systems and people.'" },
    { key: "three_feet_rule", text: "Keller's 3-Foot Rule: 'Everyone within 3 feet of you is a potential lead. The barista, the parent at soccer practice, the person next to you in line.' He says: 'The market is everywhere if you're paying attention. Jay Papasan puts it this way: 'You don\'t need more leads—you need more awareness of the leads already around you.''" },
    { key: "four_hour_workday", text: "Keller's 4-Hour Lead Gen Workday: 'Dedicate the first 4 hours of every workday exclusively to lead generation activities—calls, door knocking, networking, follow-up.' He says: 'After your 4 hours, you can do admin, marketing, education—whatever. But the first 4 hours are sacred. They are the engine that drives your entire business.'" },
    { key: "papasan_on_appointments", text: "Jay Papasan, Keller's co-author, teaches: 'The # of appointments you go on is the leading indicator of your success. Not leads, not calls, not conversations—appointments.' Papasan says: 'Track appointments per week. That's your #1 metric. Everything upstream (leads, calls) feeds it. Everything downstream (listings, closings) follows from it.'" },
    { key: "success_is_sequential", text: "Keller says: 'Success is sequential, not simultaneous. It's about doing the right thing at the right time—not about doing everything at the same time.' He says: 'The agent who tries to master marketing, lead gen, social media, CRM, listing presentations, and buyer consults simultaneously masters none. Pick the ONE thing that matters most right now. Master it. Then move to the next.'" },

    // ── Systems & Scale (11-20) ──
    { key: "six_perspectives", text: "Keller's 6 Personal Perspectives for mastering real estate, in order: (1) Lead Generation, (2) Lead Conversion, (3) Database Management, (4) Client Experience, (5) Finance & Administration, (6) Self-Education. He says: 'Master them in this order. Most agents start at #6 (reading books and attending seminars) when they should start at #1 (picking up the phone).'" },
    { key: "leverage_defined", text: "Keller defines leverage: 'Leverage is doing less to get more. It comes from three sources: systems, people, and tools that multiply your effort.' He says: 'But leverage without leads is like having a factory with no raw materials. Build your lead flow first, then leverage it with systems and team. Never reverse the order.'" },
    { key: "goal_setting_retreat", text: "Keller's Annual Goal Setting Retreat: spend one full day per year in solitude, defining your ONE Thing for the next 12 months. He says: 'Most people spend more time planning their vacation than planning their life. One focused day per year—away from the office, away from family, away from distractions—can redirect your entire trajectory.'" },
    { key: "accountability_keller", text: "Keller on accountability: 'Accountability is the bridge between intention and results. Find your accountability partner—not a cheerleader, a truth-teller who will ask the uncomfortable questions.' He says: 'The best accountability partner is someone who makes you slightly uncomfortable with their discipline. They set the standard you aspire to.'" },
    { key: "talent_vs_systems", text: "Keller says: 'Talent without systems produces inconsistent results. Systems without talent produce reliable mediocrity. Talent PLUS systems produces exponential growth.' He teaches: 'Your morning routine is a system. Your prospecting block is a system. Your follow-up cadence is a system. Stack enough systems, and talent becomes almost irrelevant.'" },
    { key: "economic_model", text: "Keller's Economic Model requires agents to know their numbers cold: revenue per transaction, transactions per year, cost per lead, lead conversion rate, expenses as a percentage of revenue. He says: 'If you can't recite your economic model from memory, you're not running a business—you're running a hobby.'" },
    { key: "protect_the_asset", text: "Keller teaches 'Protect the Asset'—you are the asset. 'Sleep, nutrition, exercise, and mental health are not luxuries—they are the infrastructure that supports your ONE Thing.' He says: 'The agent who works 80 hours a week and burns out in 3 years produces less lifetime income than the agent who works 50 hours a week for 20 years.'" },
    { key: "saying_no", text: "Keller on saying no: 'Behind every successful person is a trail of things they said no to.' He says: 'Saying yes to your ONE Thing means saying no to everything else. That feels uncomfortable. It feels rude. It feels like you're missing out. But the people who say yes to everything end up doing nothing well. The power is in the no.'" },
    { key: "ceiling_of_achievement", text: "Keller identifies the Ceiling of Achievement: 'At some point, doing more of the same stops producing more results. That's when you need to change what you do, not just do more of it.' He says: 'The ceiling is a sign of growth, not failure. Breaking through requires new skills, new systems, or new team members—not just more effort.'" },
    { key: "models_and_systems", text: "Keller insists on Models and Systems: 'Every successful agent operates from proven models—economic model, lead generation model, budget model, organizational model.' He says: 'A model is a proven pattern of success. A system is the implementation of that model. Without a model, you're guessing. Without a system, you're not executing the model.'" },

    // ── Advanced Keller (21-30) ──
    { key: "energy_plan", text: "Keller's Energy Plan: 'Block your time so that your highest-energy hours align with your highest-value activities. For most people, that's 8 AM to noon for lead generation and 1-3 PM for client service.' He says: 'When you misalign energy and activity, you produce mediocre results from peak hours and exhausted effort during your lowest-energy periods.'" },
    { key: "bunching", text: "Keller's concept of 'Bunching': group similar activities together. All calls in one block. All admin in one block. All meetings in one block. He says: 'Context switching is the silent killer of productivity. Every time you switch from calling to email to social media, you lose 15-20 minutes of recalibration. Bunch your activities and protect your flow.'" },
    { key: "production_before_perfection", text: "Keller says: 'Production before perfection. Action before analysis. Revenue before systems.' He says: 'The agent who makes 100 imperfect calls this week will outperform the agent who spends the week perfecting their script. You learn by doing, not by preparing to do.'" },
    { key: "quantum_leap", text: "Keller teaches the Quantum Leap: 'At some point, incremental improvement isn't enough. You need to quantum leap to the next level—which usually requires a fundamentally different approach, not just more of the same.' He says: 'The leap from 10 deals to 25 deals usually requires a shift in lead gen strategy. The leap from 25 to 50 requires a team. The leap from 50 to 100 requires true leverage.'" },
    { key: "environment_of_productivity", text: "Keller on your work environment: 'Your environment should scream productivity. Your desk should have your ONE Thing visible. Your calendar should reflect your priorities. Your office should make focused work easy and distraction hard.' He says: 'If your environment allows procrastination, you will procrastinate. Design it for production.'" },
    { key: "profit_first", text: "Keller teaches Profit First thinking: 'Revenue is vanity. Profit is sanity. Track your net—not just your gross.' He says: 'An agent who closes $5M in volume with 60% expenses earns less than an agent who closes $3M with 30% expenses. Know your margins. Protect your profit. Revenue without profit is just expensive exercise.'" },
    { key: "extraordinary_results", text: "Keller's definition of extraordinary results: 'Extraordinary is not about doing extraordinary things. It's about doing ordinary things extraordinarily consistently.' He says: 'The extraordinary agent isn't doing magic. They're making calls, writing notes, meeting clients—the same things everyone else does. They just do them every single day without fail.'" },
    { key: "purpose_priority_productivity", text: "Keller's Purpose-Priority-Productivity cascade: 'Purpose drives priority. Priority drives productivity. Without purpose, you have no filter for saying no. Without priority, you have no focus for saying yes. Without productivity, you have no results to show for either.' He says: 'Start with purpose. The rest follows.'" },
    { key: "1000_houses", text: "Keller and Papasan reference the concept of mastering 1,000 houses: 'After you've sold 1,000 houses, you'll know everything there is to know about real estate. But you have to start with house #1.' Papasan says: 'Every master was once a beginner who showed up when they didn't feel like it.'" },
    { key: "think_big_aim_small", text: "Keller's paradox: 'Think big, but aim small.' He says: 'Your vision should be enormous—change your family's financial trajectory for generations. But your daily aim should be microscopic—make the next call, write the next note, prepare the next presentation. Big thinking provides motivation. Small aiming provides traction. You need both.'" },
  ],
  truthTemplates: [
    "Keller's Focusing Question cuts through your noise: 'What's the ONE Thing you can do today such that by doing it everything else becomes easier or unnecessary?' You have 15 priorities, which means you have zero priorities. As Keller says: 'Success is sequential, not simultaneous.' Until you pick ONE and protect it with time-blocking, everything stays chaotic.",
    "The Domino Effect is your unlock: Keller teaches that one lead generation habit, executed daily, topples every other problem in your business. Your income problem, your stress problem, your confidence problem—they all trace back to one root cause: inconsistent lead gen. As Keller says: 'Find the lead domino. Everything else falls from there.'",
    "Keller's Millionaire Model is unambiguous: 'Leads → Listings → Leverage. In that order. Always.' You're trying to build leverage (systems, marketing, automation) before you've solved lead generation. Keller says: 'That's building a roof before you've poured the foundation.' Lead gen comes first. Everything else is premature optimization.",
    "As Jay Papasan teaches: 'The number of appointments you go on is the leading indicator of your success.' Not leads, not calls, not social media impressions—appointments. Papasan says: 'Track appointments per week. That's your #1 metric.' Right now, you're tracking everything except the one thing that predicts your income.",
    "Keller identifies your ceiling: 'At some point, doing more of the same stops producing more results.' He says: 'The ceiling is a sign of growth, not failure. Breaking through requires new skills, new systems, or new team members—not just more effort.' You've hit your ceiling. The next level requires a fundamentally different approach to lead gen.",
  ],
  strategyTemplates: [
    "Apply Keller's Time-Blocking discipline: block 4 hours every morning for lead generation and protect that block like a surgeon protects surgery. Keller says: 'No meetings, no email, no admin. The first 4 hours are sacred. They are the engine that drives your entire business.' If your calendar doesn't reflect this, you don't actually prioritize lead gen.",
    "Answer Keller's Focusing Question for this quarter: 'What is the ONE Thing I can do in the next 90 days such that by doing it everything else becomes easier or unnecessary?' Write it down. Post it at your desk. Evaluate every decision against it. Keller says: 'If an activity doesn't serve the ONE Thing, it waits.'",
    "Follow Keller's GPS Model: your Goal is your annual revenue target. Your Priorities are the 2-3 weekly actions that drive revenue (calls, appointments, presentations). Your Strategies are the daily systems that ensure those priorities happen. Keller says: 'Most agents have goals but no priorities. Fix that today.'",
    "Execute Keller's 6 Personal Perspectives in order: start with Lead Generation (perspective #1). Keller says: 'Most agents start at perspective #6—reading books and attending seminars—when they should start at perspective #1: picking up the phone.' Master lead gen first. Everything else follows.",
    "Apply Keller's 'Think Big, Aim Small' paradox: write your 5-year vision (big thinking) and your daily ONE Thing (small aiming). As Keller says: 'Big thinking provides motivation. Small aiming provides traction. You need both.' Today's small aim: make your first call within 30 minutes of arriving at the office.",
  ],
  directives: [
    "Answer Keller's Focusing Question right now: 'What's the ONE Thing that makes everything else easier or unnecessary?'",
    "Block 4 hours tomorrow morning for lead generation. Put it in your calendar and mark it sacred.",
    "Review your last week: how many hours did you spend on actual lead generation vs. everything else?",
    "Identify your ONE lead gen domino and commit to it for 30 days without exception.",
    "Know your economic model cold: revenue per deal, deals per year, cost per lead, conversion rate.",
    "Apply the 3-Foot Rule today: have a genuine conversation with every person within 3 feet.",
    "Say no to one thing this week that isn't serving your ONE Thing. Protect your time block.",
    "Schedule your annual Goal Setting Retreat—one full day of solitude to plan the next 12 months.",
  ],
  quotes: [
    { text: "What's the ONE Thing you can do such that by doing it everything else will be easier or unnecessary?", author: "Gary Keller" },
    { text: "Success is sequential, not simultaneous. It's one thing at a time.", author: "Gary Keller" },
    { text: "Until my ONE Thing is done, everything else is a distraction.", author: "Gary Keller" },
    { text: "Leads, Listings, Leverage. In that order. Always.", author: "Gary Keller" },
    { text: "Behind every successful person is a trail of things they said no to.", author: "Gary Keller" },
    { text: "Extraordinary is not about doing extraordinary things. It's about doing ordinary things extraordinarily consistently.", author: "Gary Keller" },
    { text: "You don't need more leads—you need more awareness of the leads already around you.", author: "Jay Papasan" },
    { text: "The number of appointments you go on is the leading indicator of your success.", author: "Jay Papasan" },
  ],
  rpmTemplates: [
    { result: "Identify and protect my ONE Thing for the next 90 days", purpose: "So every hour I invest serves the single domino that topples everything else", massive_action: "Answer the Focusing Question, time-block 4 morning hours, eliminate competing priorities" },
    { result: "Execute 4 hours of daily lead gen for 30 consecutive days", purpose: "So my pipeline becomes self-sustaining and I stop the feast-famine cycle", massive_action: "Block 8am-noon daily, prep call lists nightly, track contacts/conversations/appointments on scorecard" },
    { result: "Know my economic model cold and run my business by the numbers", purpose: "So every decision is driven by data, not emotion or hope", massive_action: "Calculate all metrics this week, build a dashboard, review weekly with accountability partner" },
  ],
},

// ═══════════════════════════════════════════════════════════════════════════════
// 10. TODD DUNCAN — High Trust Selling
// ═══════════════════════════════════════════════════════════════════════════════
duncan: {
  id: "duncan",
  name: "Todd Duncan",
  title: "The High Trust Advisor",
  focus: "Trust / Positioning / Identity / Client Experience",
  bottlenecks: ["low_conversion", "mindset_state", "high_stress", "retention", "personal_vision"],
  wisdomPoints: [
    // ── The Trust Framework (1-10) ──
    { key: "law_of_the_ladder", text: "Duncan's Law of the Ladder defines three levels of professional identity: Salesperson → Expert → Advisor. He says: 'Each rung multiplies your income and reduces your stress. The salesperson competes on price. The expert competes on knowledge. The advisor competes on trust. At the advisor level, clients don't shop around—they follow your recommendation. Climb deliberately.'" },
    { key: "high_trust_interview", text: "The High Trust Interview is Duncan's most important tool: a structured first meeting where you ask 10 diagnostic questions before making any recommendation. Duncan says: 'The agent who asks the most questions in the first meeting wins the listing 85% of the time. The one who talks the most loses it 85% of the time. Diagnose before you prescribe.'" },
    { key: "five_non_negotiables", text: "Duncan's 5 Non-Negotiables are daily disciplines you commit to regardless of mood, market, or circumstance: (1) Morning ritual, (2) Lead generation block, (3) One handwritten note, (4) One relationship call, (5) Evening review. He says: 'These are your professional vows. They don't flex. They don't negotiate. They are the bedrock that holds everything together when motivation fails.'" },
    { key: "trust_equation", text: "Duncan's Trust Equation: Trust = (Credibility + Reliability + Intimacy) ÷ Self-Interest. He says: 'Every element you increase in the numerator builds trust. Every reduction in self-interest multiplies it. The agent who removes commission breath from their conversations—who genuinely prioritizes the client's needs over their own—becomes untouchable in their market.'" },
    { key: "advisor_identity", text: "Duncan redefines the agent's core identity: 'You are not a salesperson who helps people with real estate. You are a trusted advisor who happens to sell real estate.' He says: 'This is not wordplay. This is a fundamental shift in how you show up, how you listen, how you advise, and how you close. When the identity changes, every conversation changes.'" },
    { key: "relationship_roi", text: "Duncan teaches Relationship ROI calculation: 'Take the average commission ($10K), multiply by average referrals per client over their lifetime (3-5), multiply by average repeat transactions (2-3). A single deeply-trusted relationship is worth $50,000-$100,000.' Duncan says: 'When you see each client as a $75K relationship instead of a $10K transaction, your entire approach transforms.'" },
    { key: "sales_surgery", text: "Duncan's Sales Surgery metaphor: 'A doctor would never prescribe medicine without diagnosing the patient first. Yet most agents prescribe listings, properties, and price reductions without understanding the client's real situation.' He says: 'The High Trust agent asks 10 questions before making 1 recommendation. The low-trust agent makes 10 recommendations before asking 1 question.'" },
    { key: "emotional_bank_account", text: "Duncan uses Stephen Covey's Emotional Bank Account: 'Every interaction with a client is either a deposit (adding value, listening, following through) or a withdrawal (being pushy, forgetting details, breaking promises).' Duncan says: 'Most agents overdraw without realizing it. One missed callback, one broken promise, one moment of commission breath—and the trust balance goes negative.'" },
    { key: "under_promise_over_deliver", text: "Duncan's delivery principle: 'Under-promise and over-deliver. Consistently. The gap between what you promise and what you deliver is where trust is built—or destroyed.' He says: 'Tell the client the process will take 45 days, then close in 30. Tell them you'll call Tuesday, then call Monday. The positive gap creates the 'wow' that generates referrals.'" },
    { key: "fee_conversation_mastery", text: "Duncan on the fee conversation: 'Never apologize for your fee. If you can't justify your value in 60 seconds, you haven't built enough trust in the preceding conversation.' He says: 'The fee conversation isn't about price—it's about positioning. If the client sees you as a salesperson, they'll negotiate your fee. If they see you as a trusted advisor, they'll pay it without question.'" },

    // ── Business & Life Integration (11-20) ──
    { key: "life_plan_first", text: "Duncan starts with life design: 'Your business should serve your life, not consume it. Start with the life you want—time with family, financial freedom, travel, health—then build the business that funds it.' He says: 'Most agents do it backward: they let the business dictate their life. That's how you end up making $300K a year and hating every minute of it.'" },
    { key: "mastery_path", text: "Duncan's Mastery Path: 'Spend 80% of your time on your top 20% of activities—the activities that generate 80% of your income.' He says: 'If your top 20% is lead generation and client presentations, those should consume the majority of your workday. Everything else should be delegated, automated, or eliminated.'" },
    { key: "capacity_management", text: "Duncan teaches Capacity Management: 'Know your number—the maximum number of clients you can serve at the highest level simultaneously.' He says: 'If your capacity is 12 active clients and you take on 20, your service level drops, your stress rises, and your referrals dry up. It's better to serve 12 extraordinarily than 20 mediocrely.'" },
    { key: "time_wealth", text: "Duncan introduces Time Wealth: 'True wealth isn't just money—it's time freedom. The agent earning $500K who works 70 hours a week is poorer than the agent earning $300K who works 40 hours a week.' He says: 'Measure your income per hour, not your income per year. That's the metric that tells you whether your business is serving your life.'" },
    { key: "deliberate_practice", text: "Duncan on skill development: 'The High Trust agent practices their craft deliberately—role-playing listing presentations, rehearsing the High Trust Interview, refining their fee conversation.' He says: 'Professionals practice. Amateurs wing it. Every minute of practice translates to thousands of dollars of performance. Yet most agents haven't role-played since their licensing class.'" },
    { key: "burnout_prevention", text: "Duncan addresses burnout directly: 'Burnout is not a badge of honor—it's a sign of poor design.' He says: 'If you're exhausted, resentful, and dreading Monday morning, your business model is broken. The solution isn't more willpower—it's a redesign. Start with: What would my ideal week look like if I got to design it from scratch?'" },
    { key: "trust_builders", text: "Duncan identifies 7 Trust Builders: (1) Show up prepared, (2) Listen more than you talk, (3) Follow through on every promise, (4) Be transparent about challenges, (5) Admit when you don't know, (6) Put their timeline above yours, (7) Celebrate their wins publicly. He says: 'Master all seven, and you'll never compete on price again.'" },
    { key: "high_trust_marketing", text: "Duncan on marketing: 'High Trust marketing isn't about your face on a bus bench. It's about testimonials, case studies, community involvement, and educational content that demonstrates your advisory competence.' He says: 'Your marketing should answer one question for the prospect: Can I trust this person with the biggest financial decision of my life?'" },
    { key: "referral_by_design", text: "Duncan teaches Referral by Design: 'Don't hope for referrals—engineer them. At every milestone in the client journey (listing agreement, first showing, offer accepted, inspection, closing), there's an opportunity to exceed expectations and earn a referral.' He says: 'Referrals aren't random—they're the natural byproduct of systematic excellence.'" },
    { key: "legacy_business", text: "Duncan's Legacy Business concept: 'Build a business that could run without you for 30 days.' He says: 'If your business collapses when you take a vacation, you don't have a business—you have a job that you own. The Legacy Business has systems, team, and client relationships that sustain it independently.'" },

    // ── Deep Trust Philosophy (21-30) ──
    { key: "radical_transparency", text: "Duncan practices Radical Transparency: 'Tell the client the truth about the market, about their home's value, about the timeline—even when the truth is uncomfortable.' He says: 'Short-term, transparency might cost you a listing. Long-term, it makes you the only agent anyone trusts. And the trusted agent wins every time.'" },
    { key: "service_heart", text: "Duncan on the service heart: 'The High Trust agent serves with no expectation of return. Not because they're naive—because they understand that pure service creates a gravitational pull that attracts business naturally.' He says: 'When you serve genuinely, people feel it. They can't articulate what's different about you, but they know they trust you more than anyone else.'" },
    { key: "compound_trust", text: "Duncan teaches Compound Trust: 'Trust compounds like interest. One trustworthy act builds on the last. Over time, the compound trust creates a moat around your business that no competitor can cross.' He says: 'It takes years to build compound trust and seconds to destroy it. That's why the 5 Non-Negotiables exist—to prevent the second-destroying moment.'" },
    { key: "coaching_the_client", text: "Duncan positions the agent as coach: 'You're not just selling a house—you're coaching a family through a life transition. The buying or selling process is stressful, emotional, and complex. Your role is to be the calm in their storm.' He says: 'When you coach instead of sell, the client feels supported instead of pressured. Supported clients refer. Pressured clients flee.'" },
    { key: "pricing_truth", text: "Duncan on pricing conversations: 'The hardest truth an agent has to deliver is: your home isn't worth what you think it's worth. Most agents avoid this conversation. High Trust agents lean into it.' He says: 'The agent who tells the truth about price, loses 10% of listings and wins 90% of trust. The agent who inflates price wins the listing and loses the relationship.'" },
    { key: "competitive_advantage", text: "Duncan's ultimate competitive advantage: 'In a world of noise, trust is the signal. In a market of 1 million agents, the trusted advisor stands alone.' He says: 'You don't need to be the most marketed. You don't need to be the most technological. You need to be the most trusted. Trust is the ultimate differentiator—and it can never be copied.'" },
    { key: "client_journey_mapping", text: "Duncan maps the High Trust Client Journey: (1) First impression (within 5 minutes, they decide if they trust you), (2) Discovery (High Trust Interview), (3) Commitment (the moment they choose you), (4) Service (exceed every expectation), (5) Celebration (close the deal with gratitude), (6) Nurture (maintain the relationship for life). He says: 'Most agents focus on step 3 and ignore the rest.'" },
    { key: "income_per_relationship", text: "Duncan shifts the metric from income per transaction to income per relationship: 'The transactional agent earns $10K per deal. The relational agent earns $75K per relationship. Same client, same house, wildly different economics.' He says: 'The only difference is whether you see the client as a transaction or a relationship. Your economics follow your perception.'" },
    { key: "inner_game", text: "Duncan addresses the agent's Inner Game: 'Your external results will never exceed your internal self-image.' He says: 'If you secretly believe you're not worth your fee, clients will sense it. If you secretly doubt your expertise, prospects will feel it. The inner game—confidence, self-worth, purpose—is the foundation that everything else is built on.'" },
    { key: "simplicity_principle", text: "Duncan's Simplicity Principle: 'The most trustworthy agents are the ones who make complex things simple.' He says: 'Explain the process in plain language. Use analogies. Draw it on a whiteboard. The client's trust in you is directly proportional to their understanding of what you're doing and why. Complexity creates confusion. Confusion erodes trust.'" },
  ],
  truthTemplates: [
    "Duncan's Law of the Ladder is your wake-up call: you're operating as a salesperson when you need to be an advisor. Duncan says: 'The salesperson competes on price. The expert competes on knowledge. The advisor competes on trust.' Each rung multiplies your income and reduces your stress. The shift isn't about what you do—it's about who you become.",
    "The High Trust framework reveals your conversion problem: clients aren't choosing your competitor because they're better—they're choosing them because they feel more trusted. Duncan's Trust Equation (Credibility + Reliability + Intimacy ÷ Self-Interest) shows exactly where your gap is. 'Lower the self-interest,' Duncan teaches, 'and trust rises automatically.'",
    "Duncan asks the question you've been avoiding: 'Is your business serving your life, or consuming it?' You got into real estate for freedom, but you've built a trap. Duncan says: 'Start with the life you want, then reverse-engineer the business that funds it—not the other way around.'",
    "Duncan diagnoses your inner game: 'Your external results will never exceed your internal self-image.' He says the agents who struggle with conversion often don't have a skills problem—they have a self-worth problem. 'If you secretly believe you're not worth your fee, clients will sense it.' The inner game is the foundation.",
    "As Duncan teaches: 'In a world of noise, trust is the signal. In a market of 1 million agents, the trusted advisor stands alone.' Your competitive advantage isn't your marketing budget or your tech stack—it's your trustworthiness. Duncan says: 'Trust can never be copied. It's the ultimate moat.'",
  ],
  strategyTemplates: [
    "Implement Duncan's High Trust Interview for every new client: prepare 10 diagnostic questions that explore their timeline, motivation, concerns, and dreams—before you make any recommendation. Duncan says: 'The agent who asks the most questions wins the listing 85% of the time. Diagnose before you prescribe.'",
    "Define your 5 Non-Negotiables using Duncan's framework: five daily disciplines you will execute regardless of mood, market, or circumstance. Duncan says: 'These are your professional vows—the bedrock that holds everything together when motivation fails.' Write them tonight. Execute them tomorrow.",
    "Calculate your Relationship ROI: average commission × lifetime referrals × repeat transactions. Duncan says a single deeply-trusted relationship can be worth $50,000-$100,000. 'When you see each client as a $75K relationship instead of a $10K transaction, your approach transforms.'",
    "Apply Duncan's Trust Equation to every client interaction this week: increase Credibility (show expertise), Reliability (follow through on promises), and Intimacy (remember personal details)—while deliberately reducing Self-Interest (put their timeline above yours). Duncan says: 'The math is simple. Lower the denominator and everything multiplies.'",
    "Design your Ideal Week using Duncan's life-first approach: start with non-negotiable personal time (family dinner, exercise, weekend mornings), then build your business around it. Duncan says: 'The agent earning $300K who works 40 hours is wealthier than the agent earning $500K who works 70 hours. Measure income per hour, not income per year.'",
  ],
  directives: [
    "Write your 5 Non-Negotiables today. These are the daily actions you commit to regardless of circumstances.",
    "Prepare your High Trust Interview: 10 questions that diagnose before you prescribe.",
    "Calculate the lifetime value of your top 5 client relationships. Let that number reshape your priorities.",
    "Ask yourself Duncan's identity question: 'Am I a salesperson who helps with real estate, or a trusted advisor who happens to sell it?'",
    "Review your last 5 client interactions using Duncan's Trust Equation. Where did you build trust? Where did you withdraw it?",
    "Design your Ideal Week on paper: block personal time first, then build your business schedule around it.",
    "Practice your fee conversation until you can justify your value in 60 seconds without apologizing.",
    "Identify one promise you made to a client this week and over-deliver on it. Close the gap between expectation and experience.",
  ],
  quotes: [
    { text: "Your income is determined by the trust others place in you, not the hours you work.", author: "Todd Duncan" },
    { text: "Diagnose before you prescribe. The best agents ask ten questions before making one recommendation.", author: "Todd Duncan" },
    { text: "Climb the ladder: from salesperson to expert to advisor. Each rung multiplies your impact.", author: "Todd Duncan" },
    { text: "Build a business that serves your life. Not a life that serves your business.", author: "Todd Duncan" },
    { text: "Trust is the ultimate competitive advantage—it can never be copied.", author: "Todd Duncan" },
    { text: "Under-promise, over-deliver. The gap is where trust is built.", author: "Todd Duncan" },
    { text: "If you can't justify your value in 60 seconds, you haven't built enough trust.", author: "Todd Duncan" },
    { text: "The highest level of selling is not selling at all—it's advising.", author: "Todd Duncan" },
  ],
  rpmTemplates: [
    { result: "Implement the High Trust Interview with every new client this month", purpose: "So I'm positioned as an advisor from day one, eliminating price competition", massive_action: "Write 10 diagnostic questions, practice the flow, use it in my next 3 consultations" },
    { result: "Define and lock in my 5 Non-Negotiables", purpose: "So my daily discipline holds firm regardless of mood, market, or circumstance", massive_action: "Write 5 professional vows tonight, post them at my desk, execute tomorrow without exception" },
    { result: "Design my Ideal Week and protect it for 30 days", purpose: "So my business serves my life instead of consuming it", massive_action: "Map ideal week tonight: personal time first, lead gen second, admin last. Defend it for 30 days." },
  ],
},

}; // END OF MASTERS OBJECT

// ═══════════════════════════════════════════════════════════════════════════════
// BOTTLENECK → MASTER MAPPING
// Weighted relevance: primary = 3, secondary = 2, tertiary = 1
// The generator selects the top 3 masters for each bottleneck (Full Council mode)
// ═══════════════════════════════════════════════════════════════════════════════
const BOTTLENECK_MAP = {
  // ── Pipeline & Prospecting ──
  pipeline_volume:          [{ id: "blount", w: 3 }, { id: "keller", w: 2 }, { id: "hardy", w: 1 }],
  lead_volume:              [{ id: "blount", w: 3 }, { id: "keller", w: 2 }, { id: "smith", w: 1 }],
  prospecting_consistency:  [{ id: "blount", w: 3 }, { id: "hardy", w: 2 }, { id: "clear", w: 1 }],
  pipeline_leakage:         [{ id: "blount", w: 3 }, { id: "smith", w: 2 }, { id: "keller", w: 1 }],

  // ── Conversion & Speed ──
  lead_conversion:          [{ id: "smith", w: 3 }, { id: "kendall", w: 2 }, { id: "duncan", w: 1 }],
  digital_leads:            [{ id: "smith", w: 3 }, { id: "blount", w: 2 }, { id: "keller", w: 1 }],
  speed_to_lead:            [{ id: "smith", w: 3 }, { id: "blount", w: 2 }, { id: "clear", w: 1 }],
  follow_up:                [{ id: "smith", w: 3 }, { id: "hardy", w: 2 }, { id: "blount", w: 1 }],
  online_conversion:        [{ id: "smith", w: 3 }, { id: "kendall", w: 2 }, { id: "buffini", w: 1 }],
  low_conversion:           [{ id: "kendall", w: 3 }, { id: "duncan", w: 2 }, { id: "smith", w: 1 }],

  // ── Relationships & Referrals ──
  relationship_deficit:     [{ id: "maher", w: 3 }, { id: "buffini", w: 2 }, { id: "kendall", w: 1 }],
  referral_quality:         [{ id: "maher", w: 3 }, { id: "buffini", w: 2 }, { id: "duncan", w: 1 }],
  database_size:            [{ id: "maher", w: 3 }, { id: "buffini", w: 2 }, { id: "keller", w: 1 }],
  sphere_awareness:         [{ id: "kendall", w: 3 }, { id: "maher", w: 2 }, { id: "buffini", w: 1 }],
  retention:                [{ id: "buffini", w: 3 }, { id: "duncan", w: 2 }, { id: "maher", w: 1 }],

  // ── Discipline & Habits ──
  consistency_habits:       [{ id: "hardy", w: 3 }, { id: "clear", w: 2 }, { id: "robbins", w: 1 }],
  discipline:               [{ id: "hardy", w: 3 }, { id: "clear", w: 2 }, { id: "blount", w: 1 }],
  tracking:                 [{ id: "hardy", w: 3 }, { id: "clear", w: 2 }, { id: "keller", w: 1 }],
  momentum:                 [{ id: "hardy", w: 3 }, { id: "robbins", w: 2 }, { id: "keller", w: 1 }],
  systems_design:           [{ id: "clear", w: 3 }, { id: "hardy", w: 2 }, { id: "keller", w: 1 }],

  // ── Mindset & Identity ──
  mindset_state:            [{ id: "robbins", w: 3 }, { id: "clear", w: 2 }, { id: "duncan", w: 1 }],
  personal_vision:          [{ id: "robbins", w: 3 }, { id: "keller", w: 2 }, { id: "duncan", w: 1 }],
  overwhelm:                [{ id: "robbins", w: 3 }, { id: "keller", w: 2 }, { id: "clear", w: 1 }],
  high_stress:              [{ id: "kendall", w: 3 }, { id: "duncan", w: 2 }, { id: "robbins", w: 1 }],

  // ── Time & Accountability ──
  time_management:          [{ id: "robbins", w: 3 }, { id: "keller", w: 2 }, { id: "hardy", w: 1 }],
  accountability:           [{ id: "hardy", w: 3 }, { id: "blount", w: 2 }, { id: "keller", w: 1 }],
  cold_call_aversion:       [{ id: "kendall", w: 3 }, { id: "blount", w: 2 }, { id: "robbins", w: 1 }],
};


// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get the top N masters for a given bottleneck, sorted by weight.
 * @param {string} bottleneck - The diagnosed bottleneck key
 * @param {number} topN - Number of masters to return (default: 3)
 * @returns {{ master: object, weight: number }[]}
 */
function getMastersForBottleneck(bottleneck, topN = 3) {
  const mapping = BOTTLENECK_MAP[bottleneck];
  if (!mapping) {
    // Fallback: return Robbins, Hardy, Keller (general performance)
    return [
      { master: MASTERS.robbins, weight: 3 },
      { master: MASTERS.hardy, weight: 2 },
      { master: MASTERS.keller, weight: 1 },
    ].slice(0, topN);
  }
  return mapping.slice(0, topN).map((entry) => ({
    master: MASTERS[entry.id],
    weight: entry.w,
  }));
}

/**
 * Get a specific master by ID.
 */
function getMaster(id) {
  return MASTERS[id] || null;
}

/**
 * Get all master IDs.
 */
function getAllMasterIds() {
  return Object.keys(MASTERS);
}

/**
 * Get all recognized bottleneck keys.
 */
function getAllBottlenecks() {
  return Object.keys(BOTTLENECK_MAP);
}

/**
 * Count total wisdom points across all masters.
 */
function getTotalWisdomPoints() {
  return Object.values(MASTERS).reduce((sum, m) => sum + m.wisdomPoints.length, 0);
}

module.exports = {
  MASTERS,
  BOTTLENECK_MAP,
  getMastersForBottleneck,
  getMaster,
  getAllMasterIds,
  getAllBottlenecks,
  getTotalWisdomPoints,
};
