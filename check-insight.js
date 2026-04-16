require('dotenv').config();
const { getPostAnalysisEmail } = require('./src/services/postAnalysisCampaign');
const e = getPostAnalysisEmail('agent_mnw4oi77_zuz633h1', 'Kevin', 1);
console.log('insight:', JSON.stringify(e.insight, null, 2));
console.log('subject:', e.subject);
