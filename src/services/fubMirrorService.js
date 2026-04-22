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

    // Find person in FUB by email
    const person = await findFubPersonByEmail(fub, agentEmail);

    if (!person) {
      console.warn(`FUB mirror skipped: no FUB person found for ${agentEmail}`);
      return { mirrored: false, reason: "person_not_found" };
    }

    // Build note content
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
    // Non-fatal — log and continue
    console.error("FUB mirror error (non-fatal):", err.message);
    return { mirrored: false, reason: err.message };
  }
}



// ── Assessment Completion → FUB Tags ─────────────────────────────────────────
async function syncAssessmentToFub(agentId, agentEmail, assessmentData) {
  try {
    const fub = getFubClient();
    if (!fub || !agentEmail) return { mirrored: false, reason: !fub ? "no_api_key" : "no_email" };

    const person = await findFubPersonByEmail(fub, agentEmail);
    if (!person) return { mirrored: false, reason: "person_not_found" };

    const tags = ["Co.Pilot-Assessment-Complete"];
    if (assessmentData?.bottleneck) tags.push("Bottleneck-" + assessmentData.bottleneck.replace(/\s+/g, "-"));
    if (assessmentData?.phase) tags.push("Phase-" + assessmentData.phase.replace(/\s+/g, "-"));

    // FUB tags API: merge with existing
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

// ── Coaching Generated → FUB Note ────────────────────────────────────────────
async function syncCoachingToFub(agentId, agentEmail, coachingData) {
  try {
    const fub = getFubClient();
    if (!fub || !agentEmail) return { mirrored: false, reason: !fub ? "no_api_key" : "no_email" };

    const person = await findFubPersonByEmail(fub, agentEmail);
    if (!person) return { mirrored: false, reason: "person_not_found" };

    const noteBody = [
      "[Node Runner — Coaching Generated]",
      "Bottleneck    : " + (coachingData.primary_constraint || "—"),
      "Directive     : " + (coachingData.coaching_directive || "—"),
      "Truth Preview : " + (coachingData.the_truth || "").slice(0, 200),
      "Strategy      : " + (coachingData.the_strategy || "").slice(0, 200),
      "Generated At  : " + new Date().toISOString(),
    ].join("\n");

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

    // Remove old phase tags, add current one
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
