require("dotenv").config();
const axios = require("axios");
const { getCampaign } = require("./selector");

const FUB_API_KEY = process.env.FUB_API_KEY;

if (!FUB_API_KEY) {
  console.error("Missing FUB_API_KEY in .env");
  process.exit(1);
}

const b64Key = Buffer.from(FUB_API_KEY + ":").toString("base64");

const fub = axios.create({
  baseURL: "https://api.followupboss.com/v1",
  headers: {
    Authorization: `Basic ${b64Key}`,
  },
});

function normalizeLead(data) {
  const tags = Array.isArray(data.tags) ? data.tags : [];

  return {
    id: data.id,
    firstName: data.firstName || "Unknown",
    tags,
    custom_fields: {
      assessment_complete: tags.includes("AI-Assessment-Complete"),
      primary_bottleneck: null,
      urgency_level: null,
      production_band: null,
      country:
        data?.addresses?.[0]?.country || data?.address?.country || "unknown",
    },
    raw: data,
  };
}

async function getNormalizedLead(id) {
  try {
    const response = await fub.get(`/people/${id}`);
    return normalizeLead(response.data);
  } catch (error) {
    console.error(
      "FUB API Error:",
      error.response ? error.response.status : error.message,
    );
    return null;
  }
}

// --- PRESENTATION LAYER ---
const TEST_ID = 1873; // Ensure this is your working Ju ID

const COACHING_INSIGHTS = {
  SOLO_LEAD_ENGINE: {
    focus: "Lead Flow & Conversations",
    action:
      "Increase daily outreach volume and database growth. Consistency is your current bottleneck.",
  },
  SOLO_FOUNDATION: {
    focus: "Systems & Structure",
    action:
      "Audit your CRM workflows. Your bottleneck is your follow-up process and daily minimum standards.",
  },
  SOLO_PIPELINE_REPAIR: {
    focus: "Follow-Up & Conversion",
    action:
      "Tighten your follow-up cadence and re-engage warm opportunities already in your world.",
  },
  SOLO_SCALE_25: {
    focus: "Scale & Leverage",
    action:
      "You need stronger systems, delegation, and repeatable routines to move to the next level.",
  },
  PRE_GENERAL_NURTURE: {
    focus: "Clarity & Assessment",
    action:
      "Complete the assessment and establish a clear baseline before prescribing a growth track.",
  },
};

getNormalizedLead(TEST_ID).then((leadProfile) => {
  if (!leadProfile) return;

  // IMPORTANT: Using getCampaign to match your selector.js
  const result = getCampaign(leadProfile);

  const insight = COACHING_INSIGHTS[result.campaignId] || {
    focus: "General Growth",
    action:
      "Review current business standards and identify the primary bottleneck.",
  };

  // Mapping to your actual object structure (result.profile)
  const band = result.profile.productionBand || "Emerging";
  const bottleneck = result.profile.primaryBottleneck || "general_growth";
  const urgency = result.profile.urgencyLevel || "medium";

  console.log("\n" + "=".repeat(44));
  console.log("        OPENCLAW COACHING DIAGNOSIS");
  console.log("=".repeat(44));
  console.log(`AGENT NAME:   ${leadProfile.firstName}`);
  console.log(`CURRENT BAND: ${band}`);
  console.log("-".repeat(44));
  console.log(
    `DIAGNOSIS:    ${String(bottleneck).toUpperCase().replace("_", " ")}`,
  );
  console.log(`CAMPAIGN:     ${result.campaignId}`);
  console.log(`URGENCY:      ${String(urgency).toUpperCase()}`);
  console.log("-".repeat(44));
  console.log(`CORE FOCUS:   ${insight.focus}`);
  console.log("RECOMMENDED ACTION:");
  console.log(insight.action);
  console.log("=".repeat(44) + "\n");
});
