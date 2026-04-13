const lifecycleRepo = require('../repositories/lifecycleRepo');
const phaseHistoryRepo = require('../repositories/phaseHistoryRepo');

const PROGRESSION_RULES = {
  ACTIVE_PIPELINE: { minScore: 10, nextPhase: 'COACHING' },
  COACHING: { minScore: 25, nextPhase: 'CONVERTED' },
};

const STAGNATION_DAYS = 7;

function checkProgression(agentId) {
  const lifecycle = lifecycleRepo.getLifecycleByAgentId(agentId);
  const rule = PROGRESSION_RULES[lifecycle.current_phase];
  const now = new Date();
  const lastEngaged = new Date(lifecycle.last_engaged_at);
  const daysSince = (now - lastEngaged) / (1000 * 60 * 60 * 24);
  if (daysSince > STAGNATION_DAYS && lifecycle.current_phase !== 'CONVERTED') {
    return flagStagnant(lifecycle, daysSince);
  }
  if (rule && lifecycle.engagement_score >= rule.minScore) {
    return advancePhase(lifecycle, rule.nextPhase);
  }
  return { action: 'no_change', agent_id: agentId, current_phase: lifecycle.current_phase, engagement_score: lifecycle.engagement_score };
}

function advancePhase(lifecycle, nextPhase) {
  const now = new Date().toISOString();
  lifecycleRepo.updateLifecycle({ agent_id: lifecycle.agent_id, current_phase: nextPhase, phase_entered_at: now, last_engaged_at: lifecycle.last_engaged_at, last_sync_at: now, engagement_score: lifecycle.engagement_score, status: 'active' });
  phaseHistoryRepo.createPhaseHistory({ id: 'phase_' + Math.random().toString(36).slice(2), agent_id: lifecycle.agent_id, from_phase: lifecycle.current_phase, to_phase: nextPhase, changed_at: now, reason: 'Score threshold reached' });
  return { action: 'phase_advanced', agent_id: lifecycle.agent_id, from_phase: lifecycle.current_phase, to_phase: nextPhase, engagement_score: lifecycle.engagement_score };
}

function flagStagnant(lifecycle, daysSince) {
  const now = new Date().toISOString();
  lifecycleRepo.updateLifecycle({ agent_id: lifecycle.agent_id, current_phase: 'STAGNANT', phase_entered_at: now, last_engaged_at: lifecycle.last_engaged_at, last_sync_at: now, engagement_score: lifecycle.engagement_score, status: 'stagnant' });
  phaseHistoryRepo.createPhaseHistory({ id: 'phase_' + Math.random().toString(36).slice(2), agent_id: lifecycle.agent_id, from_phase: lifecycle.current_phase, to_phase: 'STAGNANT', changed_at: now, reason: 'No engagement for ' + Math.floor(daysSince) + ' days' });
  return { action: 'flagged_stagnant', agent_id: lifecycle.agent_id, days_inactive: Math.floor(daysSince) };
}

module.exports = { checkProgression };
