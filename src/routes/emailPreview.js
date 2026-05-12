// src/routes/emailPreview.js
// Admin-only email preview page
// Renders all email sequences (sutton, cold, post-analysis, coaching) as styled HTML
// Mount at /admin/emails

const express = require("express");
const router = express.Router();

const { getPreActivationEmail } = require("../services/preActivationCampaign");
const {
  getSuttonPreActivationEmail,
} = require("../services/suttonPreActivationCampaign");

// Try to load optional sequences — wrapped in try so missing files don't crash the route
let getCoachingActiveEmail = null;
let getPostAnalysisEmail = null;

try {
  ({ getCoachingActiveEmail } = require("../services/coachingActiveCampaign"));
} catch (e) {
  console.log("coachingActiveCampaign not available for preview:", e.message);
}

try {
  ({ getPostAnalysisEmail } = require("../services/postAnalysisCampaign"));
} catch (e) {
  console.log("postAnalysisCampaign not available for preview:", e.message);
}

// ── Sequence configs ──────────────────────────────────────────────
const SEQUENCES = {
  sutton: {
    label: "Sutton Pre-Activation (26 weekly emails)",
    description:
      "For agents imported with source = sutton_import. Cycles after week 26.",
    color: "#1a2b4a",
    accent: "#c9a050",
    count: 26,
    generator: (step) => getSuttonPreActivationEmail(step, "Sarah"),
  },
  cold: {
    label: "Cold / Non-Sutton Pre-Activation (12 weekly emails)",
    description:
      "For agents imported with source = cold_import or any non-Sutton source.",
    color: "#444",
    accent: "#888",
    count: 12,
    generator: (step) => getPreActivationEmail(step),
  },
  coaching: {
    label: "Coaching Active (12 daily emails, Mon-Fri)",
    description: "For agents who have activated Co.Pilot. Cycles for 26 weeks.",
    color: "#2a4a2b",
    accent: "#50a060",
    count: 12,
    generator: (step) =>
      getCoachingActiveEmail
        ? getCoachingActiveEmail(
            step,
            "https://node-runner.onrender.com/portal/demo",
          )
        : null,
  },
  postAnalysis: {
    label: "Post-Analysis (after diagnosis complete)",
    description:
      "For agents who have completed the analysis but not activated coaching.",
    color: "#4a2a2b",
    accent: "#a05060",
    count: 21,
    generator: (step) =>
      getPostAnalysisEmail
        ? getPostAnalysisEmail("demo_agent", "Sarah", step)
        : null,
  },
};

// ── Index page: list all sequences ────────────────────────────────
router.get("/", (req, res) => {
  const cards = Object.entries(SEQUENCES)
    .map(([key, seq]) => {
      const available = seq.generator(1) !== null;
      return `
        <a href="/admin/emails/${key}" style="text-decoration:none;color:inherit;display:block">
          <div style="border:1px solid #ddd;border-left:6px solid ${seq.color};padding:24px;margin-bottom:16px;background:#fff;transition:box-shadow .15s">
            <div style="display:flex;justify-content:space-between;align-items:start">
              <div>
                <div style="font-size:18px;font-weight:bold;color:${seq.color};margin-bottom:8px">${seq.label}</div>
                <div style="color:#666;font-size:14px">${seq.description}</div>
              </div>
              <div style="background:${available ? seq.accent : "#ccc"};color:#fff;padding:6px 12px;border-radius:4px;font-size:12px;font-weight:bold">
                ${available ? `${seq.count} EMAILS` : "NOT AVAILABLE"}
              </div>
            </div>
          </div>
        </a>
      `;
    })
    .join("");

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Preview — Co.Pilot Admin</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f6f8; margin:0; padding:0; color:#222 }
    .wrap { max-width:900px; margin:0 auto; padding:40px 24px }
    h1 { margin:0 0 8px 0; color:#1a2b4a; font-size:32px }
    .sub { color:#666; margin-bottom:32px; font-size:15px }
    a:hover > div { box-shadow: 0 4px 12px rgba(0,0,0,0.08) }
    .back { color:#1a2b4a; text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="/admin" class="back">← Back to Admin</a>
    <h1>Email Sequence Preview</h1>
    <div class="sub">Review every email in every campaign sequence. Click a sequence to see all emails rendered as they will appear to recipients.</div>
    ${cards}
  </div>
</body>
</html>
  `);
});

// ── Sequence detail page: render all emails in a sequence ─────────
router.get("/:seqKey", (req, res) => {
  const seq = SEQUENCES[req.params.seqKey];
  if (!seq) return res.status(404).send("Sequence not found");

  const emails = [];
  for (let step = 1; step <= seq.count; step++) {
    try {
      const email = seq.generator(step);
      if (email) emails.push({ step, ...email });
    } catch (e) {
      emails.push({ step, error: e.message });
    }
  }

  const emailBlocks = emails
    .map((e) => {
      if (e.error) {
        return `
          <div style="border:2px solid #c33;padding:16px;margin-bottom:32px;background:#fff5f5">
            <strong>Email ${e.step}:</strong> Error rendering — ${e.error}
          </div>
        `;
      }
      return `
        <div style="margin-bottom:48px">
          <div style="background:${seq.color};color:#fff;padding:16px 24px;border-radius:8px 8px 0 0">
            <div style="font-size:12px;opacity:0.8;letter-spacing:1px">EMAIL ${e.step} OF ${seq.count}</div>
            <div style="font-size:18px;font-weight:bold;margin-top:4px">Subject: ${e.subject}</div>
          </div>
          <div style="border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;background:#fff">
            <iframe
              srcdoc="${(e.html || "").replace(/"/g, "&quot;")}"
              style="width:100%;border:none;min-height:600px"
              onload="this.style.height = (this.contentDocument.body.scrollHeight + 60) + 'px'"
            ></iframe>
          </div>
        </div>
      `;
    })
    .join("");

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${seq.label} — Email Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f6f8; margin:0; padding:0; color:#222 }
    .wrap { max-width:760px; margin:0 auto; padding:40px 24px }
    h1 { margin:0 0 8px 0; color:${seq.color}; font-size:28px }
    .sub { color:#666; margin-bottom:32px; font-size:15px }
    .back { color:${seq.color}; text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px }
    .toolbar { background:#fff; border:1px solid #ddd; border-radius:8px; padding:16px; margin-bottom:32px; font-size:13px; color:#666 }
    .toolbar strong { color:#222 }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="/admin/emails" class="back">← Back to all sequences</a>
    <h1>${seq.label}</h1>
    <div class="sub">${seq.description}</div>
    <div class="toolbar">
      <strong>Preview note:</strong> First-name placeholders use "Sarah" as a sample. Live emails will use each recipient's actual first name. CTA buttons go to agentanalysis.kevinlynch.ca.
    </div>
    ${emailBlocks}
  </div>
</body>
</html>
  `);
});

module.exports = router;
