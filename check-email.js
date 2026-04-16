require('dotenv').config();
const { getPostAnalysisEmail } = require('./src/services/postAnalysisCampaign');
const e = getPostAnalysisEmail('agent_mnw4oi77_zuz633h1', 'Kevin', 1);
console.log('Keys:', Object.keys(e));
console.log('Has .text?', !!e.text);
console.log('HTML preview:', e.html ? e.html.slice(0, 150) : 'none');
console.log('Text preview:', e.text ? e.text.slice(0, 150) : 'none');
