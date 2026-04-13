const fs = require("fs");

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const [headerLine, ...rows] = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const headers = headerLine.split(",").map((h) => h.trim());

  return rows.map((row, index) => {
    const values = row.split(",").map((v) => v.trim());
    const record = {};

    headers.forEach((header, i) => {
      record[header] = values[i] || "";
    });

    const tags = record.tags
      ? record.tags
          .split(";")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    return {
      id: `csv-${index + 1}`,
      firstName: record.firstName || "Unknown",
      tags,
      custom_fields: {
        assessment_complete: tags.includes("AI-Assessment-Complete"),
        production_band: record.productionBand || "Emerging",
        primary_bottleneck: record.primaryBottleneck || null,
        urgency_level: record.urgencyLevel || "medium",
        country: record.country || "Canada",
      },
    };
  });
}

module.exports = { parseCSV };
