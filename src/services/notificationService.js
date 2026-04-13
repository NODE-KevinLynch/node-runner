const PHASE_VOICE = {
  ACTIVE_PIPELINE: { subject: 'Your momentum is building', message: 'You are actively moving leads through your pipeline. Keep engaging your prospects daily.' },
  COACHING: { subject: 'You have unlocked Coaching support', message: 'Your engagement has earned you dedicated coaching. A session is being prepared for you.' },
  CONVERTED: { subject: 'Congratulations - you have converted', message: 'Outstanding work. Your consistency has paid off. Let us build on this momentum.' },
  STAGNANT: { subject: 'We miss you - let us re-engage', message: 'It has been a while. Your pipeline is waiting. One small action today can restart your momentum.' },
};

async function sendEmail({ to, phase, extra = {} }) {
  try {
    const voice = PHASE_VOICE[phase] || { subject: 'Update from your coaching system', message: 'You have a new update.' };
    console.log('');
    console.log('==================================================');
    console.log('  NOTIFICATION SERVICE - MOCK MODE');
    console.log('==================================================');
    console.log('  Recipient : ' + to);
    console.log('  Subject   : ' + voice.subject);
    console.log('  Phase     : ' + phase);
    console.log('  Message   : ' + voice.message);
    if (extra.from_phase) console.log('  Promoted  : ' + extra.from_phase + ' -> ' + phase);
    if (extra.days_inactive) console.log('  Inactive  : ' + extra.days_inactive + ' days');
    console.log('==================================================');
    console.log('');
    return { sent: true, mode: 'mock', to, phase };
  } catch (err) {
    console.error('Notification error (non-fatal):', err.message);
    return { sent: false, error: err.message };
  }
}

module.exports = { sendEmail };
