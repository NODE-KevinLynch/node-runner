function isTrialExpired(agent) {
  // Sutton agents bypass trial entirely
  if (agent.brokerage && agent.brokerage.toLowerCase().includes("sutton")) {
    return false;
  }

  // No trial start date means they haven't started yet — not expired
  if (!agent.trial_start_date) {
    return false;
  }

  const trialDays = 30;
  const started = new Date(agent.trial_start_date);
  const now = new Date();
  const diffDays = (now - started) / (1000 * 60 * 60 * 24);
  return diffDays > trialDays;
}

function getTrialDaysRemaining(agent) {
  if (agent.brokerage && agent.brokerage.toLowerCase().includes("sutton")) {
    return null; // no trial — full access
  }
  if (!agent.trial_start_date) return 30;
  const started = new Date(agent.trial_start_date);
  const now = new Date();
  const remaining = 30 - Math.floor((now - started) / (1000 * 60 * 60 * 24));
  return Math.max(0, remaining);
}

module.exports = { isTrialExpired, getTrialDaysRemaining };
