// src/services/fubMirrorService.js
// Mirrors campaign send events into FUB as notes
// Node Runner sends — FUB only records it happened
// Firewall: FUB failure NEVER blocks email or logging

const axios = require("axios");

function getFubClient() {
  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) return null;
  const b64Key = Buffer.from(apiKey + ":").toString("base64");
  return axios.create({
    baseURL: "https://api.followupboss.com/v1",
    headers: { Authorization: `Basic ${b64Key}` },
  });
}

async function findFubPersonByEmail(fub, email) {
  try {
    const response = await fub.get("/people", {
      params: { email, limit: 1 },
    });
    const people = response.data?.people || [];
    return people.length ? people[0] : null;
  } catch (err) {
    return null;
  }
}

// ── Helper: format bottleneck key for display ────────────────────────────────
function formatBottleneck(key) {
  if (!key) return "—";
  return key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ── Helper: format profile for display ───────────────────────────────────────
function formatProfile(profile) {
  if (!profile) return "—";
  const parts = profile.split("_");
  return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ");
}

// ── Campaign Activity → FUB Note ─────────────────────────────────────────────
async function logCampaignActivity(agentId, campaignData) {
  const {
    agentEmail,
    agentName,
    campaignType,
    campaignStep,
    subject,
    message = "",
    sendStatus,
  } = campaignData;

  try {
    const fub = getFubClient();

    if (!fub) {
      console.warn("FUB mirror skipped: FUB_API_KEY not set");
      return { mirrored: false, reason: "no_api_key" };
    }

    if (!agentEmail) {
      console.warn("FUB mirror skipped: no agent email provided");
      return { mirrored: false, reason: "no_email" };
    }

    const person = await findFubPersonByEmail(fub, agentEmail);

    if (!person) {
      console.warn(`FUB mirror skipped: no FUB person found for ${agentEmail}`);
      return { mirrored: false, reason: "person_not_found" };
    }

    const preview = campaignData.insight
      ? `Truth: ${campaignData.insight.truth} | Gap: ${campaignData.insight.gap}`
      : message.replace(/<[^>]*>/g, "").slice(0, 120);
    const noteBody = [
      "[Node Runner — Campaign Activity]",
      `Campaign Type : ${campaignType}`,
      `Campaign Step : ${campaignStep}`,
      `Email Subject : ${subject}`,
      `Send Status   : ${sendStatus}`,
      `Agent         : ${agentName || agentEmail}`,
      `Preview       : ${preview || "(HTML email)"}`,
      `Logged At     : ${new Date().toISOString()}`,
    ].join("\n");

    await fub.post("/notes", {
      personId: person.id,
      body: noteBody,
      isHtml: false,
    });

    console.log(`FUB mirror: note created for person ${person.id}`);
    return { mirrored: true, personId: person.id };
  } catch (err) {
    console.error("FUB mirror error (non-fatal):", err.message);
    return { mirrored: false, reason: err.message };
  }
}


// ── Assessment Completion → FUB Tags + Rich Note ─────────────────────────────
async function syncAssessmentToFub(agentId, agentEmail, assessmentData) {
  try {
    const fub = getFubClient();
    if (!fub || !agentEmail) return { mirrored: false, reason: !fub ? "no_api_key" : "no_email" };

    let person = await findFubPersonByEmail(fub, agentEmail);

    // Auto-create FUB contact if not found
    if (!person) {
      try {
        const createData = { emails: [{ value: agentEmail }] };
        if (assessmentData?.firstName) createData.firstName = assessmentData.firstName;
        if (assessmentData?.lastName) createData.lastName = assessmentData.lastName;
        if (assessmentData?.phone) createData.phones = [{ value: assessmentData.phone }];
        createData.source = "Co.Pilot Assessment";
        const createRes = await fub.post("/people", createData);
        person = createRes.data;
        console.log("FUB mirror: created new contact for " + agentEmail);
      } catch (createErr) {
        console.error("FUB contact creation failed:", createErr.message);
        return { mirrored: false, reason: "contact_creation_failed" };
      }
    }

    // Set tags
    const tags = ["Co.Pilot-Assessment-Complete"];
    if (assessmentData?.bottleneck) tags.push("Bottleneck-" + assessmentData.bottleneck.replace(/\s+/g, "-"));
    if (assessmentData?.phase) tags.push("Phase-" + assessmentData.phase.replace(/\s+/g, "-"));

    const existing = person.tags || [];
    const merged = [...new Set([...existing, ...tags])];
    await fub.put("/people/" + person.id, { tags: merged });

    console.log("FUB mirror: assessment tags set for person " + person.id + " → " + tags.join(", "));
    return { mirrored: true, personId: person.id, tags };
  } catch (err) {
    console.error("FUB mirror assessment error (non-fatal):", err.message);
    return { mirrored: false, reason: err.message };
  }
}


// ── Coaching Generated → FUB Rich Note ───────────────────────────────────────
async function syncCoachingToFub(agentId, agentEmail, coachingData) {
  try {
    const fub = getFubClient();
    if (!fub || !agentEmail) return { mirrored: false, reason: !fub ? "no_api_key" : "no_email" };

    const person = await findFubPersonByEmail(fub, agentEmail);
    if (!person) return { mirrored: false, reason: "person_not_found" };

    // ── Load additional data for rich note ────────────────────────────────
    const db = require("../db/db");

    const diagnosis = await db.prepare(
      "SELECT bottleneck, profile, signals FROM diagnoses WHERE agent_id = $1 ORDER BY created_at DESC LIMIT 1"
    ).get(agentId);

    const goals = await db.prepare(
      "SELECT gci_goal, transaction_goal FROM agent_goals WHERE agent_id = $1"
    ).get(agentId);

    const onboarding = await db.prepare(
      "SELECT units_2024, gci_2024, primary_challenge, prospecting_hours, has_business_plan, has_accountability, tracks_activities, has_morning_routine, has_listing_pres, repeat_client_pct FROM business_onboarding WHERE agent_id = $1"
    ).get(agentId);

    const agent = await db.prepare(
      "SELECT name, last_name, brokerage, region FROM agents WHERE id = $1"
    ).get(agentId);

    // ── Parse signals ────────────────────────────────────────────────────
    let signals = {};
    try { signals = JSON.parse(diagnosis?.signals || "{}"); } catch(e) {}

    // ── Parse RPM plan ───────────────────────────────────────────────────
    let rpmAction = "—";
    let rpmResult = "—";
    let rpmPurpose = "—";
    if (coachingData.rpm_plan) {
      try {
        const rpm = JSON.parse(coachingData.rpm_plan);
        rpmAction = rpm.action || rpm.massive_action || "—";
        rpmResult = rpm.result || "—";
        rpmPurpose = rpm.purpose || "—";
      } catch(e) {
        rpmAction = coachingData.rpm_plan;
      }
    }

    // ── Build signal flags ───────────────────────────────────────────────
    const flagYesNo = (val) => {
      if (!val) return "—";
      if (val === "yes") return "Yes ✓";
      if (val === "no") return "No ✗";
      return val.charAt(0).toUpperCase() + val.slice(1);
    };

    // ── Identify gaps ────────────────────────────────────────────────────
    const gaps = [];
    if (onboarding) {
      if (onboarding.has_business_plan === "no") gaps.push("No written business plan");
      if (onboarding.tracks_activities === "no") gaps.push("Not tracking daily activities");
      if (onboarding.has_morning_routine === "no") gaps.push("No morning routine");
      if (onboarding.has_listing_pres === "no") gaps.push("No listing presentation");
      if (onboarding.has_accountability === "no") gaps.push("No accountability partner");
      if (onboarding.prospecting_hours === "0-2") gaps.push("Under 2 hours prospecting/week");
      if (onboarding.repeat_client_pct === "under-10") gaps.push("Under 10% repeat/referral clients");
    }

    const gapsSection = gaps.length
      ? "TOP GAPS:\n" + gaps.map((g, i) => (i + 1) + ". " + g).join("\n")
      : "";

    // ── Portal URL ───────────────────────────────────────────────────────
    let portalUrl = "https://node-runner.onrender.com/portal/" + agentId;
    try {
      const { getTokenForAgent } = require("../utils/portalAuth");
      const tok = await getTokenForAgent(agentId);
      if (tok) portalUrl += "?token=" + tok;
    } catch(e) {}

    // ── Build the rich note ──────────────────────────────────────────────
    const agentName = ((agent?.name || "") + " " + (agent?.last_name || "")).trim() || agentEmail;
    const bottleneckDisplay = formatBottleneck(diagnosis?.bottleneck);
    const profileDisplay = formatProfile(diagnosis?.profile);

    const noteBody = [
      "========================================",
      "CO.PILOT COACHING REPORT",
      "========================================",
      "",
      "Agent: " + agentName,
      "Brokerage: " + (agent?.brokerage || "—"),
      "Market: " + (agent?.region || "—"),
      "",
      "----------------------------------------",
      "BUSINESS SNAPSHOT",
      "----------------------------------------",
      "Production (Last Year): " + (onboarding ? (onboarding.units_2024 || 0) + " units / $" + Number(onboarding.gci_2024 || 0).toLocaleString() + " GCI" : "—"),
      "Profile: " + profileDisplay,
      "Income Goal: " + (goals?.gci_goal ? "$" + Number(goals.gci_goal).toLocaleString() : "—"),
      "Transaction Goal: " + (goals?.transaction_goal || "—") + " units",
      "Primary Challenge: " + (onboarding?.primary_challenge || "—").replace(/_/g, " "),
      "",
      "----------------------------------------",
      "DIAGNOSIS",
      "----------------------------------------",
      "Primary Bottleneck: " + bottleneckDisplay,
      "Constraint: " + (coachingData.primary_constraint || "—"),
      "",
      "ASSESSMENT SIGNALS:",
      "  Business Plan:      " + flagYesNo(onboarding?.has_business_plan),
      "  Tracks Activities:  " + flagYesNo(onboarding?.tracks_activities),
      "  Morning Routine:    " + flagYesNo(onboarding?.has_morning_routine),
      "  Listing Pres:       " + flagYesNo(onboarding?.has_listing_pres),
      "  Accountability:     " + flagYesNo(onboarding?.has_accountability),
      "  Prospecting Hours:  " + (onboarding?.prospecting_hours || "—") + " hrs/week",
      "  Repeat/Referral %:  " + (onboarding?.repeat_client_pct || "—"),
      "",
      gapsSection ? "----------------------------------------" : "",
      gapsSection,
      "",
      "----------------------------------------",
      "COACHING PLAN",
      "----------------------------------------",
      "Coaching Directive: " + (coachingData.coaching_directive || "—"),
      "",
      "RPM PLAN:",
      "  Result:  " + rpmResult,
      "  Purpose: " + rpmPurpose,
      "  Action:  " + rpmAction,
      "",
      "THE TRUTH:",
      (coachingData.the_truth || "—").substring(0, 400) + (coachingData.the_truth && coachingData.the_truth.length > 400 ? "..." : ""),
      "",
      "THE STRATEGY:",
      (coachingData.the_strategy || "—").substring(0, 400) + (coachingData.the_strategy && coachingData.the_strategy.length > 400 ? "..." : ""),
      "",
      "----------------------------------------",
      "Quote: " + (coachingData.quote_of_the_day || "—"),
      "----------------------------------------",
      "",
      "Portal Link: " + portalUrl,
      "Generated: " + new Date().toISOString(),
    ].filter(line => line !== undefined).join("\n");

    await fub.post("/notes", {
      personId: person.id,
      body: noteBody,
      isHtml: false,
    });

    console.log("FUB mirror: coaching note created for person " + person.id);
    return { mirrored: true, personId: person.id };
  } catch (err) {
    console.error("FUB mirror coaching error (non-fatal):", err.message);
    return { mirrored: false, reason: err.message };
  }
}


// ── Engagement / Phase Change → FUB Tag Update ──────────────────────────────
async function syncEngagementToFub(agentId, agentEmail, score, phase) {
  try {
    const fub = getFubClient();
    if (!fub || !agentEmail) return { mirrored: false, reason: !fub ? "no_api_key" : "no_email" };

    const person = await findFubPersonByEmail(fub, agentEmail);
    if (!person) return { mirrored: false, reason: "person_not_found" };

    const existing = (person.tags || []).filter(t => !t.startsWith("Phase-"));
    if (phase) existing.push("Phase-" + phase.replace(/\s+/g, "-"));

    await fub.put("/people/" + person.id, { tags: existing });

    console.log("FUB mirror: phase tag updated for person " + person.id + " → Phase-" + phase);
    return { mirrored: true, personId: person.id, phase };
  } catch (err) {
    console.error("FUB mirror engagement error (non-fatal):", err.message);
    return { mirrored: false, reason: err.message };
  }
}


// ── Portal Activity → FUB Note ──────────────────────────────────────────────
async function syncPortalActivityToFub(agentId, agentEmail, activity) {
  try {
    const fub = getFubClient();
    if (!fub || !agentEmail) return { mirrored: false, reason: !fub ? "no_api_key" : "no_email" };
    const person = await findFubPersonByEmail(fub, agentEmail);
    if (!person) return { mirrored: false, reason: "person_not_found" };
    const noteBody = [
      "[Node Runner — Portal Activity]",
      "Activity : " + (activity || "portal_visit"),
      "Agent    : " + agentEmail,
      "Logged   : " + new Date().toISOString(),
    ].join("\n");
    await fub.post("/notes", {
      personId: person.id,
      body: noteBody,
      isHtml: false,
    });
    console.log("FUB mirror: portal activity note for person " + person.id);
    return { mirrored: true, personId: person.id };
  } catch (err) {
    console.error("FUB mirror portal error (non-fatal):", err.message);
    return { mirrored: false, reason: err.message };
  }
}

module.exports = { logCampaignActivity, syncAssessmentToFub, syncCoachingToFub, syncEngagementToFub, syncPortalActivityToFub };
