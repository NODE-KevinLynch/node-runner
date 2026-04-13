const { parseCSV } = require("./import");
const { getCampaign } = require("./selector");
const BOTTLENECK_LABELS = {
  lead_engine: "Lead Generation",
  foundation: "Business Structure",
  pipeline_repair: "Follow-Up & Conversion",
  scale_25: "Scaling",
  unknown: "Unclear / Needs More Data",
};
const LABELS = {
  SOLO_LEAD_ENGINE: "Lead Generation Constraint",
  SOLO_FOUNDATION: "Business Structure Constraint",
  SOLO_PIPELINE_REPAIR: "Follow-Up & Conversion Constraint",
  SOLO_SCALE_25: "Scaling Constraint",
  PRE_GENERAL_NURTURE: "Nurture / Early Stage",
};

const filePath = process.argv[2] || "agents.csv";

function runBatch() {
  const agents = parseCSV(filePath);
  const summary = {};
  const bottlenecks = {};

  console.log("\n" + "=".repeat(60));
  console.log(`BROKERAGE PERFORMANCE AUDIT: ${filePath.toUpperCase()}`);
  console.log("=".repeat(60));

  agents.forEach((agent) => {
    const result = getCampaign(agent);

    const campaignId = result.campaignId || "UNASSIGNED";
    const campaignLabel = LABELS[campaignId] || campaignId;

    const bottleneck = result.profile.primaryBottleneck || "unknown";

    summary[campaignId] = (summary[campaignId] || 0) + 1;
    bottlenecks[bottleneck] = (bottlenecks[bottleneck] || 0) + 1;

    console.log(
      `AGENT: ${agent.firstName.padEnd(12)} | DIAGNOSIS: ${campaignLabel.padEnd(32)} | BOTTLENECK: ${bottleneck}`,
    );
  });

  console.log("\n" + "=".repeat(60));
  console.log("OFFICE-LEVEL INSIGHT SUMMARY");
  console.log("=".repeat(60));

  Object.entries(summary).forEach(([id, count]) => {
    const label = LABELS[id] || id;
    console.log(`${label.padEnd(35)} : ${count} Agents`);
  });

  console.log("-".repeat(60));
  console.log("BOTTLENECK SUMMARY");

  Object.entries(bottlenecks).forEach(([id, count]) => {
    console.log(`${id.padEnd(35)} : ${count} Agents`);
  });

  // 🔥 PRIMARY BOTTLENECK (THIS IS THE MONEY LINE)
  const topBottleneck = Object.entries(bottlenecks).sort(
    (a, b) => b[1] - a[1],
  )[0];

  if (topBottleneck) {
    const primaryLabel =
      BOTTLENECK_LABELS[topBottleneck[0]] || topBottleneck[0];

    console.log("\n" + "-".repeat(60));
    console.log(`PRIMARY OFFICE BOTTLENECK: ${primaryLabel}`);
  }

  console.log("=".repeat(60) + "\n");
}

runBatch();
