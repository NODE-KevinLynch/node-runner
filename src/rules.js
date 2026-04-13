const SUPPRESSION_TAGS = new Set([
  "DNC",
  "Do Not Contact",
  "Replied",
  "Booked Call",
  "Manual Pause",
  "OC_Paused",
]);

function hasAnySuppressionTag(person) {
  const tags = Array.isArray(person?.tags) ? person.tags : [];
  return tags.some((tag) => SUPPRESSION_TAGS.has(String(tag).trim()));
}

function isSuppressed(person) {
  if (!person) {
    return { suppressed: true, reason: "missing_person" };
  }

  if (hasAnySuppressionTag(person)) {
    return { suppressed: true, reason: "suppression_tag" };
  }

  if (person?.do_not_contact === true) {
    return { suppressed: true, reason: "do_not_contact_field" };
  }

  return { suppressed: false, reason: null };
}

function normalizeCountry(person) {
  const raw =
    person?.country ||
    person?.address?.country ||
    person?.custom_fields?.country ||
    "";

  const value = String(raw).trim().toLowerCase();

  if (["canada", "ca"].includes(value)) return "canada";
  if (["usa", "us", "united states"].includes(value)) return "usa";
  return value || "unknown";
}

function getOfferType(person) {
  return normalizeCountry(person) === "canada"
    ? "sutton"
    : "coaching_129";
}

module.exports = {
  isSuppressed,
  normalizeCountry,
  getOfferType,
};