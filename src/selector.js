const { isSuppressed, getOfferType } = require("./rules");

const CAMPAIGNS = {
  PRE_GENERAL_NURTURE: "PRE_GENERAL_NURTURE",
  SOLO_FOUNDATION: "SOLO_FOUNDATION",
  SOLO_LEAD_ENGINE: "SOLO_LEAD_ENGINE",
  SOLO_PIPELINE_REPAIR: "SOLO_PIPELINE_REPAIR",
  SOLO_SCALE_25: "SOLO_SCALE_25",
};

function inferPrimaryBottleneckFromTags(tags) {
  const normalized = tags.map((t) => String(t).toLowerCase());

  if (normalized.some((t) => t.includes("foundation") || t.includes("crm"))) {
    return "foundation";
  }
  if (normalized.some((t) => t.includes("lead"))) {
    return "lead_engine";
  }
  if (normalized.some((t) => t.includes("pipeline") || t.includes("follow"))) {
    return "pipeline_repair";
  }
  if (normalized.some((t) => t.includes("scale") || t.includes("stuck at 10") || t.includes("25"))) {
    return "scale_25";
  }

  return null;
}

function inferUrgencyFromTags(tags) {
  const normalized = tags.map((t) => String(t).toLowerCase());

  if (normalized.some((t) => t.includes("urgency: high") || t.includes("high urgency"))) {
    return "high";
  }
  if (normalized.some((t) => t.includes("urgency: medium"))) {
    return "medium";
  }

  return "low";
}

function buildProfile(person) {
  const custom = person?.custom_fields || {};

  return {
    fubId: String(person?.id || ""),
    firstName: person?.firstName || person?.name?.split(" ")?.[0] || "there",
    assessmentComplete:
      Boolean(custom.assessment_complete) ||
      Boolean(person?.assessment_complete) ||
      (Array.isArray(person?.tags) && person.tags.includes("AI-Assessment-Complete")),

    productionBand:
      custom.production_band ||
      custom.gci_band ||
      person?.production_band ||
      null,

    primaryBottleneck:
      custom.primary_bottleneck ||
      person?.primary_bottleneck ||
      inferPrimaryBottleneckFromTags(person?.tags || []),

    secondaryBottleneck:
      custom.secondary_bottleneck ||
      person?.secondary_bottleneck ||
      null,

    urgencyLevel:
      custom.urgency_level ||
      person?.urgency_level ||
      inferUrgencyFromTags(person?.tags || []),

    offerType: getOfferType(person),
    rawTags: Array.isArray(person?.tags) ? person.tags : [],
  };
}

function resolveCampaignFromBottleneck(profile) {
  const bottleneck = String(profile.primaryBottleneck || "").toLowerCase();

  if (["foundation", "crm", "systems", "setup"].includes(bottleneck)) {
    return CAMPAIGNS.SOLO_FOUNDATION;
  }

  if (["lead_engine", "lead generation", "leads", "lead gen"].includes(bottleneck)) {
    return CAMPAIGNS.SOLO_LEAD_ENGINE;
  }

  if (["pipeline_repair", "pipeline", "follow up", "follow-up", "conversion"].includes(bottleneck)) {
    return CAMPAIGNS.SOLO_PIPELINE_REPAIR;
  }

  if (["scale_25", "scale", "growth", "stuck at 10"].includes(bottleneck)) {
    return CAMPAIGNS.SOLO_SCALE_25;
  }

  return CAMPAIGNS.SOLO_FOUNDATION;
}

function getCampaign(person) {
  const suppression = isSuppressed(person);
  const profile = buildProfile(person);

  if (suppression.suppressed) {
    return {
      eligible: false,
      suppressionReason: suppression.reason,
      profile,
      campaignId: null,
    };
  }

  if (!profile.assessmentComplete) {
    return {
      eligible: true,
      suppressionReason: null,
      profile,
      campaignId: CAMPAIGNS.PRE_GENERAL_NURTURE,
    };
  }

  return {
    eligible: true,
    suppressionReason: null,
    profile,
    campaignId: resolveCampaignFromBottleneck(profile),
  };
}

module.exports = {
  CAMPAIGNS,
  buildProfile,
  getCampaign,
};