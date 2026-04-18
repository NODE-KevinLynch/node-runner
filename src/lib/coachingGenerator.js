/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COACHING GENERATOR ENGINE
 * Node Runner: Performance Architect Suite
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Takes a diagnosis (bottleneck, profile, signals) and produces a complete
 * coaching_outputs record with master insights woven into every field.
 *
 * Architecture:
 *   1. Select top 3 masters weighted by bottleneck
 *   2. Pick truth/strategy/directive/quote from each master
 *   3. Assemble RPM plan from primary master
 *   4. Weave master citations directly into the_truth and the_strategy
 *   5. Return a ready-to-INSERT coaching_outputs object
 */

const crypto = require("crypto");
const uuidv4 = () => crypto.randomUUID();
const { getMastersForBottleneck } = require("./coachingLibrary");

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pick a random element from an array (with optional seed for determinism).
 */
function pick(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick N unique random elements from an array.
 */
function pickN(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}

/**
 * Determine the primary constraint label from a bottleneck key.
 */
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

// ─────────────────────────────────────────────────────────────────────────────
// THE GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a complete coaching output for an agent.
 *
 * @param {object} params
 * @param {string} params.agentId       - The agent's ID
 * @param {string} params.agentName     - Agent's display name (for personalization)
 * @param {string} params.bottleneck    - Diagnosed bottleneck key (e.g., "pipeline_volume")
 * @param {string} [params.profile]     - Diagnosed profile label (e.g., "The Inconsistent Hunter")
 * @param {object} [params.signals]     - Additional diagnostic signals
 * @param {number} [params.engagementScore] - Current engagement score
 *
 * @returns {object} A coaching_outputs-shaped record ready for DB insertion.
 */
function generateCoachingOutput({
  agentId,
  agentName = "Agent",
  bottleneck,
  profile = null,
  signals = null,
  engagementScore = 0,
}) {
  // ── Step 1: Select the Council (top 3 weighted masters) ─────────────────
  const council = getMastersForBottleneck(bottleneck, 3);
  const primary = council[0];
  const secondary = council[1];
  const tertiary = council[2];

  if (!primary || !primary.master) {
    throw new Error(`No master mapping found for bottleneck: ${bottleneck}`);
  }

  // ── Step 2: Select wisdom points from each master ───────────────────────
  const primaryWisdom = pickN(primary.master.wisdomPoints, 3);
  const secondaryWisdom = secondary ? pickN(secondary.master.wisdomPoints, 2) : [];
  const tertiaryWisdom = tertiary ? pickN(tertiary.master.wisdomPoints, 1) : [];

  // ── Step 3: Assemble "The Truth" (woven with master citations) ──────────
  const truthPrimary = pick(primary.master.truthTemplates);
  const truthSecondary = secondary ? pick(secondary.master.truthTemplates) : "";

  const wisdomBullets = [
    ...primaryWisdom.map((w) => `• ${primary.master.name}: "${w.text}"`),
    ...secondaryWisdom.map((w) => `• ${secondary.master.name}: "${w.text}"`),
    ...tertiaryWisdom.map((w) => `• ${tertiary.master.name}: "${w.text}"`),
  ].join("\n");

  const profileLine = profile ? `Your diagnostic profile: ${profile}.` : "";

  const the_truth = [
    profileLine,
    "",
    truthPrimary,
    "",
    truthSecondary,
    "",
    "── Master Council Insights ──",
    wisdomBullets,
  ]
    .filter(Boolean)
    .join("\n");

  // ── Step 4: Assemble "The Strategy" (woven with master citations) ───────
  const stratPrimary = pick(primary.master.strategyTemplates);
  const stratSecondary = secondary ? pick(secondary.master.strategyTemplates) : "";
  const stratTertiary = tertiary ? pick(tertiary.master.strategyTemplates) : "";

  const the_strategy = [
    `── Primary Framework: ${primary.master.name} (${primary.master.title}) ──`,
    stratPrimary,
    "",
    secondary
      ? `── Supporting Framework: ${secondary.master.name} (${secondary.master.title}) ──`
      : "",
    stratSecondary,
    "",
    tertiary
      ? `── Reinforcing Framework: ${tertiary.master.name} (${tertiary.master.title}) ──`
      : "",
    stratTertiary,
  ]
    .filter(Boolean)
    .join("\n");

  // ── Step 5: RPM Plan (from primary master) ──────────────────────────────
  const rpmTemplate = pick(primary.master.rpmTemplates);
  const rpm_plan = JSON.stringify({
    result: rpmTemplate.result,
    purpose: rpmTemplate.purpose,
    massive_action: rpmTemplate.massive_action,
    council: council.map((c) => ({
      master: c.master.name,
      role: c.weight === 3 ? "Primary" : c.weight === 2 ? "Supporting" : "Reinforcing",
    })),
  });

  // ── Step 6: Primary Constraint ──────────────────────────────────────────
  const primary_constraint = constraintLabel(bottleneck);

  // ── Step 7: Coaching Directive (from primary master) ────────────────────
  const coaching_directive = pick(primary.master.directives);

  // ── Step 8: Quote of the Day (rotate across all 3 masters) ─────────────
  const allQuotes = [
    ...primary.master.quotes,
    ...(secondary ? secondary.master.quotes : []),
    ...(tertiary ? tertiary.master.quotes : []),
  ];
  const selectedQuote = pick(allQuotes);
  const quote_of_the_day = `${selectedQuote.text} — ${selectedQuote.author}`;

  // ── Step 9: Assemble the record ─────────────────────────────────────────
  const now = new Date().toISOString();

  return {
    id: uuidv4(),
    agent_id: agentId,
    the_truth,
    the_strategy,
    rpm_plan,
    primary_constraint,
    coaching_directive,
    quote_of_the_day,
    engagement_score: engagementScore,
    created_at: now,
    updated_at: now,
    // Metadata (not stored in DB, useful for logging/debugging)
    _meta: {
      council: council.map((c) => ({
        master: c.master.id,
        name: c.master.name,
        weight: c.weight,
      })),
      bottleneck,
      profile,
      generatedAt: now,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DB WRITER — Inserts or updates a coaching_outputs record
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Write a generated coaching output to the database.
 *
 * @param {object} db      - The database module (with .prepare())
 * @param {object} output  - The output from generateCoachingOutput()
 * @returns {object} The written record
 */
async function writeCoachingOutput(db, output) {
  await db
    .prepare(
      `INSERT INTO coaching_outputs
        (id, agent_id, the_truth, the_strategy, rpm_plan,
         primary_constraint, coaching_directive, quote_of_the_day,
         engagement_score, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
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
      output.updated_at
    );

  return output;
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL PIPELINE — Diagnose → Generate → Write
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run the full coaching pipeline for an agent.
 * Reads the latest diagnosis, generates output, writes to DB.
 *
 * @param {object} db       - The database module
 * @param {string} agentId  - The agent ID
 * @returns {object} { output, council }
 */
async function runCoachingPipeline(db, agentId) {
  // 1. Fetch agent
  const agent = await db
    .prepare(
      `SELECT a.id, a.name, a.last_name,
              al.stage, al.engagement_score
       FROM agents a
       LEFT JOIN agent_lifecycle al ON a.id = al.agent_id
       WHERE a.id = $1`
    )
    .get(agentId);

  if (!agent) throw new Error(`Agent not found: ${agentId}`);

  // 2. Fetch latest diagnosis
  const diagnosis = await db
    .prepare(
      `SELECT bottleneck, profile, signals
       FROM diagnoses
       WHERE agent_id = $1
       ORDER BY created_at DESC LIMIT 1`
    )
    .get(agentId);

  if (!diagnosis) {
    throw new Error(`No diagnosis found for agent: ${agentId}. Run assessment first.`);
  }

  // Parse signals if stored as JSON string
  let signals = diagnosis.signals;
  if (typeof signals === "string") {
    try {
      signals = JSON.parse(signals);
    } catch (e) {
      signals = { raw: signals };
    }
  }

  // 3. Generate coaching output
  const agentName = `${agent.name || ""} ${agent.last_name || ""}`.trim();
  const output = generateCoachingOutput({
    agentId,
    agentName,
    bottleneck: diagnosis.bottleneck,
    profile: diagnosis.profile,
    signals,
    engagementScore: agent.engagement_score || 0,
  });

  // 4. Write to DB
  await writeCoachingOutput(db, output);

  // 5. Update lifecycle stage if needed
  await db
    .prepare(
      `UPDATE agent_lifecycle
       SET campaign_state = 'coaching_active', updated_at = $1
       WHERE agent_id = $2`
    )
    .run(output.updated_at, agentId);

  return {
    output,
    council: output._meta.council,
  };
}

module.exports = {
  generateCoachingOutput,
  writeCoachingOutput,
  runCoachingPipeline,
  constraintLabel,
};
