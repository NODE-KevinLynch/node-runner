const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('openclaw.db');

const count = db.prepare('SELECT COUNT(*) as n FROM coaching_outputs').get();
console.log('coaching_outputs rows:', count.n);

const sample = db.prepare('SELECT * FROM coaching_outputs LIMIT 2').all();
sample.length
  ? sample.forEach(r => console.log(JSON.stringify(r, null, 2)))
  : console.log('EMPTY');

const aCount = db.prepare('SELECT COUNT(*) as n FROM assessments').get();
console.log('assessments rows:', aCount.n);

const dCount = db.prepare('SELECT COUNT(*) as n FROM diagnoses').get();
console.log('diagnoses rows:', dCount.n);
