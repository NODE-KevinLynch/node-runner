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

module.exports = { logCampaignActivity };
