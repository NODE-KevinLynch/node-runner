// src/routes/emailPreview.js
// Admin-only email preview page
// Renders all email sequences as styled HTML for review
// Mount at /admin/emails

const express = require("express");
const router = express.Router();
const db = require("../db/db");

const { getPreActivationEmail } = require("../services/preActivationCampaign");
const {
  getSuttonPreActivationEmail,
} = require("../services/suttonPreActivationCampaign");

// Try to load optional sequences — wrapped in try so missing files don't crash the route
let getDynamicCoachingEmail = null;
let getPostAnalysisEmail = null;

try {
  ({ getDynamicCoachingEmail } = require("../services/dynamicCoachingEmail"));
} catch (e) {
  console.log("dynamicCoachingEmail not available for preview:", e.message);
}

try {
  ({ getPostAnalysisEmail } = require("../services/postAnalysisCampaign"));
} catch (e) {
  console.log("postAnalysisCampaign not available for preview:", e.message);
}

// ── Demo agent IDs (used to render dynamic coaching emails with real data) ──
const DEMO_AGENT_IDS = [
  "agent_marcus_jordan_demo",
  "agent_jordan_demo",
  "agent_rachel_demo",
];

// ── Sequence configs ────────────────────────────────────────────────────────
const SEQUENCES = {
  sutton: {
    label: "Sutton Pre-Activation (26 weekly emails)",
    description:
      "For agents imported with source = sutton_import. Cycles after week 26 if they have not activated.",
    color: "#1a2b4a",
    accent: "#c9a050",
    isStatic: true,
    count: 26,
    generator: (step) => getSuttonPreActivationEmail(step, "Sarah"),
  },
  cold: {
    label: "Cold / Non-Sutton Pre-Activation (12 weekly emails)",
    description:
      "For agents imported with source = cold_import or any non-Sutton source.",
    color: "#444",
    accent: "#888",
    isStatic: true,
    count: 12,
    generator: (step) => getPreActivationEmail(step),
  },
  coaching: {
    label: "Coaching Active — Dynamic, Personalized, Daily M-F",
    description:
      "After an agent activates Co.Pilot, they receive personalized coaching emails every weekday — adapted to their actual engagement, bottleneck, and data. Runs indefinitely while they remain in the program.",
    color: "#2a4a2b",
    accent: "#50a060",
    isDynamic: true,
  },
  postAnalysis: {
    label: "Post-Analysis (21 emails after diagnosis)",
    description:
      "For agents who have completed the analysis but not yet activated coaching.",
    color: "#4a2a2b",
    accent: "#a05060",
    isStatic: true,
    count: 21,
    generator: (step) =>
      getPostAnalysisEmail
        ? getPostAnalysisEmail("demo_agent", "Sarah", step)
        : null,
  },
};

// ── Index page: list all sequences ──────────────────────────────────────────
router.get("/", (req, res) => {
  const cards = Object.entries(SEQUENCES)
    .map(([key, seq]) => {
      let available = true;
      let badge = "";
      if (seq.isStatic) {
        try {
          available = seq.generator(1) !== null;
        } catch (e) {
          available = false;
        }
        badge = available ? `${seq.count} EMAILS` : "NOT AVAILABLE";
      } else if (seq.isDynamic) {
        available = !!getDynamicCoachingEmail;
        badge = available ? "DYNAMIC + LIVE DATA" : "NOT AVAILABLE";
      }

      return `
        <a href="/admin/emails/${key}" style="text-decoration:none;color:inherit;display:block">
          <div style="border:1px solid #ddd;border-left:6px solid ${seq.color};padding:24px;margin-bottom:16px;background:#fff;transition:box-shadow .15s">
            <div style="display:flex;justify-content:space-between;align-items:start;gap:16px">
              <div>
                <div style="font-size:18px;font-weight:bold;color:${seq.color};margin-bottom:8px">${seq.label}</div>
                <div style="color:#666;font-size:14px">${seq.description}</div>
              </div>
              <div style="background:${available ? seq.accent : "#ccc"};color:#fff;padding:6px 12px;border-radius:4px;font-size:12px;font-weight:bold;white-space:nowrap">
                ${badge}
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
    <div class="sub">Review every email in every campaign sequence. Click a sequence to see emails rendered as they will appear to recipients.</div>
    ${cards}
  </div>
</body>
</html>
  `);
});

// ── Static sequence detail page ─────────────────────────────────────────────
async function renderStaticSequence(req, res, seq) {
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
          </div>`;
      }
      return `
        <div style="margin-bottom:48px">
          <div style="background:${seq.color};color:#fff;padding:16px 24px;border-radius:8px 8px 0 0">
            <div style="font-size:12px;opacity:0.8;letter-spacing:1px">EMAIL ${e.step} OF ${seq.count}</div>
            <div style="font-size:18px;font-weight:bold;margin-top:4px">Subject: ${e.subject}</div>
          </div>
          <div style="border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;background:#fff">
            <iframe srcdoc="${(e.html || "").replace(/"/g, "&quot;")}" style="width:100%;border:none;min-height:600px" onload="this.style.height = (this.contentDocument.body.scrollHeight + 60) + 'px'"></iframe>
          </div>
        </div>`;
    })
    .join("");

  res.send(
    sequencePageHtml(
      seq,
      `
    <div class="toolbar">
      <strong>Preview note:</strong> First-name placeholders use "Sarah" as a sample. Live emails use each recipient's actual first name. CTA buttons go to agentanalysis.kevinlynch.ca.
    </div>
    ${emailBlocks}
  `,
    ),
  );
}

// ── Dynamic coaching sequence detail page ───────────────────────────────────
async function renderDynamicCoaching(req, res, seq) {
  if (!getDynamicCoachingEmail) {
    return res.status(503).send("Dynamic coaching email service not available");
  }

  // Find a demo agent to use for rendering
  let demoAgentId = null;
  let demoAgentName = null;
  for (const id of DEMO_AGENT_IDS) {
    try {
      const row = await db
        .prepare("SELECT id, name FROM agents WHERE id = $1")
        .get(id);
      if (row) {
        demoAgentId = row.id;
        demoAgentName = row.name;
        break;
      }
    } catch (e) {
      /* try next */
    }
  }

  if (!demoAgentId) {
    return res.send(
      sequencePageHtml(
        seq,
        `
      <div class="toolbar" style="border-color:#c33;background:#fff5f5">
        <strong>No demo agent found.</strong> The dynamic coaching email preview needs at least one of: ${DEMO_AGENT_IDS.join(", ")}.
      </div>
    `,
      ),
    );
  }

  // The dynamic email uses step + the agent's actual last_engaged_at to choose tone.
  // For preview purposes we render at representative milestones across the lifecycle.
  const previewSteps = [
    {
      step: 1,
      label: "Day 1 — Welcome (first email after activation)",
      note: "Sent when an agent first activates Co.Pilot. Sets the foundation: bottleneck, RPM plan, first-week challenge. Always 'welcome' tone.",
    },
    {
      step: 5,
      label: "Week 1 — Early coaching cycle",
      note: "Tone is determined by the agent's actual engagement at send time. Shown below using the live demo agent's current state.",
    },
    {
      step: 12,
      label: "Week 2-3 — Building habit",
      note: "Continues to adapt tone based on engagement. RPM plan and directive pulled live.",
    },
    {
      step: 30,
      label: "Week 6 — Booking CTA active",
      note: "Booking CTA now appears at the bottom of every email (step ≥ 8 trigger). Coaching deepens.",
    },
    {
      step: 60,
      label: "Week 12 — Three months in",
      note: "Long-term engagement. Tone is fully driven by actual portal activity patterns.",
    },
    {
      step: 120,
      label: "Week 24 — Six months in",
      note: "Continues indefinitely while agent remains in program. No expiry on coaching emails.",
    },
  ];

  const emailBlocks = [];
  for (const ps of previewSteps) {
    try {
      const email = await getDynamicCoachingEmail(
        demoAgentId,
        ps.step,
        `https://node-runner.onrender.com/portal/${demoAgentId}`,
      );
      if (email) {
        emailBlocks.push({
          step: ps.step,
          label: ps.label,
          note: ps.note,
          tone: email.tone,
          daysDark: email.daysDark,
          ...email,
        });
      }
    } catch (e) {
      emailBlocks.push({ step: ps.step, label: ps.label, error: e.message });
    }
  }

  const rendered = emailBlocks
    .map((e) => {
      if (e.error) {
        return `
          <div style="border:2px solid #c33;padding:16px;margin-bottom:32px;background:#fff5f5">
            <strong>${e.label}:</strong> Error — ${e.error}
          </div>`;
      }
      const toneBadge = e.tone
        ? `<span style="background:#fff;color:${seq.color};padding:3px 10px;border-radius:4px;font-size:11px;font-weight:bold;letter-spacing:1px;margin-left:8px">TONE: ${e.tone.toUpperCase()}</span>`
        : "";
      const dayBadge =
        typeof e.daysDark === "number"
          ? `<span style="background:rgba(255,255,255,0.2);color:#fff;padding:3px 10px;border-radius:4px;font-size:11px;margin-left:8px">DAYS DARK: ${e.daysDark}</span>`
          : "";

      return `
        <div style="margin-bottom:48px">
          <div style="background:${seq.color};color:#fff;padding:16px 24px;border-radius:8px 8px 0 0">
            <div style="font-size:12px;opacity:0.8;letter-spacing:1px">${e.label.toUpperCase()}${toneBadge}${dayBadge}</div>
            <div style="font-size:18px;font-weight:bold;margin-top:6px">Subject: ${e.subject}</div>
          </div>
          <div style="background:#f9f7f0;padding:10px 24px;border-left:1px solid #ddd;border-right:1px solid #ddd;font-size:13px;color:#666">
            <strong>Preview note:</strong> ${e.note}
          </div>
          <div style="border:1px solid #ddd;border-top:none;border-radius:0 0 8px 8px;background:#fff">
            <iframe srcdoc="${(e.html || "").replace(/"/g, "&quot;")}" style="width:100%;border:none;min-height:600px" onload="this.style.height = (this.contentDocument.body.scrollHeight + 60) + 'px'"></iframe>
          </div>
        </div>`;
    })
    .join("");

  const toneLegend = `
    <div class="toolbar">
      <strong>How dynamic coaching emails work:</strong>
      <p style="margin:8px 0 0">Every weekday (Mon-Fri), the system runs through each active coaching agent and sends a personalized email. The <strong>tone</strong> is selected automatically based on how recently the agent has engaged with their Co.Pilot portal.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;font-size:13px">
        <tr style="background:#1a2b4a;color:#fff"><th style="padding:6px 10px;text-align:left">Tone</th><th style="padding:6px 10px;text-align:left">Triggered When</th><th style="padding:6px 10px;text-align:left">Voice</th></tr>
        <tr><td style="padding:6px 10px;border-bottom:1px solid #eee">welcome</td><td style="padding:6px 10px;border-bottom:1px solid #eee">First email after activation</td><td style="padding:6px 10px;border-bottom:1px solid #eee">Foundational, sets the plan</td></tr>
        <tr><td style="padding:6px 10px;border-bottom:1px solid #eee">celebration</td><td style="padding:6px 10px;border-bottom:1px solid #eee">Agent active today or yesterday</td><td style="padding:6px 10px;border-bottom:1px solid #eee">Affirming, reinforcing momentum</td></tr>
        <tr><td style="padding:6px 10px;border-bottom:1px solid #eee">momentum</td><td style="padding:6px 10px;border-bottom:1px solid #eee">1 day since portal activity</td><td style="padding:6px 10px;border-bottom:1px solid #eee">Keep the rhythm going</td></tr>
        <tr><td style="padding:6px 10px;border-bottom:1px solid #eee">encouragement</td><td style="padding:6px 10px;border-bottom:1px solid #eee">2 days dark</td><td style="padding:6px 10px;border-bottom:1px solid #eee">Gentle reset, low-friction ask</td></tr>
        <tr><td style="padding:6px 10px;border-bottom:1px solid #eee">nudge</td><td style="padding:6px 10px;border-bottom:1px solid #eee">3-4 days dark</td><td style="padding:6px 10px;border-bottom:1px solid #eee">Direct, coach-style accountability</td></tr>
        <tr><td style="padding:6px 10px">wakeup</td><td style="padding:6px 10px">5+ days dark</td><td style="padding:6px 10px">Hard truth, no judgment</td></tr>
      </table>
      <p style="margin:12px 0 0;color:#666;font-size:13px"><strong>FORD blocks</strong> (Dream Board vision check) auto-inserted on the 1st and 15th of every month. <strong>Booking CTA</strong> appears from step 8 onward.</p>
      <p style="margin:8px 0 0;color:#666;font-size:13px">Below: 6 sample renderings using demo agent <strong>${demoAgentName || demoAgentId}</strong>. The tone may vary based on this agent's current engagement state.</p>
    </div>
  `;

  res.send(sequencePageHtml(seq, toneLegend + rendered));
}

// ── Shared page wrapper ─────────────────────────────────────────────────────
function sequencePageHtml(seq, contentHtml) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${seq.label} — Email Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f5f6f8; margin:0; padding:0; color:#222 }
    .wrap { max-width:820px; margin:0 auto; padding:40px 24px }
    h1 { margin:0 0 8px 0; color:${seq.color}; font-size:28px }
    .sub { color:#666; margin-bottom:32px; font-size:15px }
    .back { color:${seq.color}; text-decoration:none; font-size:14px; display:inline-block; margin-bottom:16px }
    .toolbar { background:#fff; border:1px solid #ddd; border-radius:8px; padding:20px 24px; margin-bottom:32px; font-size:14px; color:#444 }
    .toolbar strong { color:#222 }
  </style>
</head>
<body>
  <div class="wrap">
    <a href="/admin/emails" class="back">← Back to all sequences</a>
    <h1>${seq.label}</h1>
    <div class="sub">${seq.description}</div>
    ${contentHtml}
  </div>
</body>
</html>`;
}

// ── Route dispatcher ────────────────────────────────────────────────────────
router.get("/:seqKey", async (req, res) => {
  const seq = SEQUENCES[req.params.seqKey];
  if (!seq) return res.status(404).send("Sequence not found");

  try {
    if (seq.isDynamic) {
      await renderDynamicCoaching(req, res, seq);
    } else {
      await renderStaticSequence(req, res, seq);
    }
  } catch (err) {
    console.error("Email preview error:", err.message);
    res.status(500).send("Preview error: " + err.message);
  }
});

module.exports = router;
