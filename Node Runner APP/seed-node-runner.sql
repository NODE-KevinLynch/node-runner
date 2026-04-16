-- ============================================================
-- Node Runner — Postgres Seed
-- 3 confirmed demo agents: Marcus, Jordan, Rachel
-- Run with:
-- psql "postgresql://kevinlynch:tXdvkhaP2LltqxiWnSlijyLUBx86mDVF@dpg-d7g43nt7vvec73eks60g-a.oregon-postgres.render.com/node_runner_db" -f seed-node-runner.sql
-- ============================================================

-- ── SCHEMA ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS agents (
  id           TEXT PRIMARY KEY,
  name         TEXT,
  email        TEXT,
  phone        TEXT,
  brokerage    TEXT,
  region       TEXT,
  created_at   TEXT,
  updated_at   TEXT
);

CREATE TABLE IF NOT EXISTS agent_lifecycle (
  id               SERIAL PRIMARY KEY,
  agent_id         TEXT UNIQUE,
  stage            TEXT,
  engagement_score INTEGER,
  notes            TEXT,
  created_at       TEXT,
  updated_at       TEXT
);

CREATE TABLE IF NOT EXISTS assessments (
  id           SERIAL PRIMARY KEY,
  agent_id     TEXT,
  question_key TEXT,
  answer       TEXT,
  score        INTEGER,
  created_at   TEXT
);

CREATE TABLE IF NOT EXISTS diagnoses (
  id          SERIAL PRIMARY KEY,
  agent_id    TEXT UNIQUE,
  bottleneck  TEXT,
  profile     TEXT,
  signals     TEXT,
  created_at  TEXT
);

CREATE TABLE IF NOT EXISTS coaching_outputs (
  id                  SERIAL PRIMARY KEY,
  agent_id            TEXT UNIQUE,
  the_truth           TEXT,
  the_strategy        TEXT,
  rpm_plan            TEXT,
  primary_constraint  TEXT,
  coaching_directive  TEXT,
  quote_of_the_day    TEXT,
  engagement_score    INTEGER,
  created_at          TEXT,
  updated_at          TEXT
);

CREATE TABLE IF NOT EXISTS campaign_send_log (
  id            TEXT PRIMARY KEY,
  agent_id      TEXT,
  campaign_type TEXT,
  campaign_step INTEGER,
  subject       TEXT,
  send_status   TEXT,
  send_mode     TEXT,
  sent_at       TEXT
);

-- ── AGENTS ───────────────────────────────────────────────────

INSERT INTO agents (id, name, email, phone, brokerage, region, created_at, updated_at)
VALUES
  ('agent_marcus_jordan_demo', 'Marcus Jordan', 'marcus@demo.noderunner.ca', '604-555-0101', 'Sutton Group', 'Vancouver', '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z'),
  ('agent_jordan_demo',        'Jordan Reeves', 'jordan@demo.noderunner.ca', '604-555-0102', 'Sutton Group', 'Vancouver', '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z'),
  ('agent_rachel_demo',        'Rachel Kim',    'rachel@demo.noderunner.ca', '604-555-0103', 'Sutton Group', 'Vancouver', '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- ── AGENT LIFECYCLE ──────────────────────────────────────────

INSERT INTO agent_lifecycle (agent_id, stage, engagement_score, notes, created_at, updated_at)
VALUES
  ('agent_marcus_jordan_demo', 'active', 72, 'Sphere saturation profile — strong relationships, undermonetized database', '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z'),
  ('agent_jordan_demo',        'active', 68, 'Direct market authority profile — transactional closer, needs positioning to scale', '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z'),
  ('agent_rachel_demo',        'active', 61, 'Pipeline discipline profile — busy agent leaking pipeline, needs follow-up structure', '2026-04-15T00:00:00Z', '2026-04-15T00:00:00Z')
ON CONFLICT (agent_id) DO NOTHING;

-- ── DIAGNOSES ────────────────────────────────────────────────

INSERT INTO diagnoses (agent_id, bottleneck, profile, signals, created_at)
VALUES
  ('agent_marcus_jordan_demo', 'database_size',  'sphere_saturation',      '{"database":"large","referrals":"low","outreach":"inconsistent"}', '2026-04-15T00:00:00Z'),
  ('agent_jordan_demo',        'conversion',      'direct_market_authority','{"conversion":"high","positioning":"weak","lead_source":"diverse"}', '2026-04-15T00:00:00Z'),
  ('agent_rachel_demo',        'pipeline_repair', 'pipeline_discipline',    '{"pipeline":"leaking","followup":"inconsistent","volume":"high"}',  '2026-04-15T00:00:00Z')
ON CONFLICT (agent_id) DO NOTHING;

-- ── COACHING OUTPUTS ─────────────────────────────────────────

INSERT INTO coaching_outputs (
  agent_id, the_truth, the_strategy, rpm_plan,
  primary_constraint, coaching_directive, quote_of_the_day,
  engagement_score, created_at, updated_at
)
VALUES
(
  'agent_marcus_jordan_demo',
  'You have built one of the most valuable assets in real estate — a database full of people who know, like, and trust you. But you are leaving serious money on the table because you are not systematically activating that relationships capital. Your sphere is full of potential referrals and repeat clients who simply have not heard from you lately.',
  'The strategy is Sphere Activation. Your entire focus is on re-engaging your existing database with intentional, high-value touchpoints. Every conversation you have this quarter should have a purpose: reconnect, provide value, and earn the referral.',
  '{"action":"Contact 10 people from your database this week with a personal, value-driven message — not a mass email","result":"Reactivate dormant relationships and surface 2-3 warm referral opportunities","purpose":"Your database is your business. Every contact is a potential transaction within 90 days."}',
  'Sphere Saturation — your database is underleveraged',
  'Block 60 minutes every morning this week and personally reach out to 10 past clients or sphere contacts. No mass emails. Personal messages only.',
  'The fortune is in the follow-up — but only if the follow-up feels like it came from a friend.',
  72,
  '2026-04-15T00:00:00Z',
  '2026-04-15T00:00:00Z'
),
(
  'agent_jordan_demo',
  'You can close. That is not the problem. The problem is that without a clear market positioning, you are competing on price and availability instead of authority and expertise. Buyers and sellers do not yet see you as the obvious choice — they see you as one of many options.',
  'The strategy is Market Authority. You need to own a niche — a neighbourhood, a property type, a buyer profile — and become the undisputed expert in that space. When you are known for something specific, you stop competing and start attracting.',
  '{"action":"Identify your one target market niche and create one piece of hyper-local market content this week","result":"Begin establishing visible expertise that differentiates you from every other agent in your market","purpose":"Authority converts faster than availability. When clients see you as the expert, price becomes secondary."}',
  'Market Positioning — competing on availability instead of authority',
  'Define your niche this week: pick one neighbourhood or property type, then post one piece of specific market insight content that demonstrates you know it better than anyone.',
  'You do not need more leads. You need the right leads — and those come from being known for something.',
  68,
  '2026-04-15T00:00:00Z',
  '2026-04-15T00:00:00Z'
),
(
  'agent_rachel_demo',
  'You are busy. The problem is that busy is not the same as productive. You have leads in your pipeline that have gone cold not because they were not interested — but because life got in the way and you did not follow up. Every cold lead in your pipeline is a transaction you almost had.',
  'The strategy is Pipeline Discipline. You need a systematic follow-up cadence that runs whether you are busy or not. The goal is to make follow-up automatic — not something you get to when you have time.',
  '{"action":"Audit your pipeline today and identify every lead that has not been contacted in 14+ days","result":"Recover 2-3 warm leads who went cold due to lack of follow-up","purpose":"Your pipeline is only as strong as your follow-up system. Structure creates conversions."}',
  'Pipeline Discipline — leads going cold due to inconsistent follow-up',
  'Set aside 30 minutes today to audit your full pipeline. Flag every lead untouched in 14+ days and send a personal re-engagement message to each one before end of day.',
  'A lead does not go cold because they lost interest. They go cold because you stopped showing up.',
  61,
  '2026-04-15T00:00:00Z',
  '2026-04-15T00:00:00Z'
)
ON CONFLICT (agent_id) DO NOTHING;
