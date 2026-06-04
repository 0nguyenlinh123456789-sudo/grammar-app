// Audit script - checks all grammar topics for missing data fields
// and all vocab topics
const fs = require('fs');
const path = require('path');

// Read grammar files manually (they use ESM export, we parse with regex)
function extractArrayFromFile(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Find the array and eval it
  try {
    // Replace export const with const
    let code = content.replace(/export\s+const\s+/g, 'const ');
    code = code.replace(/export\s+default\s+/g, 'module.exports = ');
    code = code.replace(/import\s+.*?from\s+.*?;/g, '');
    // Create a function that returns the data
    const fn = new Function(code + `\nreturn ${varName};`);
    return fn();
  } catch(e) {
    console.error(`Error parsing ${filePath}:`, e.message);
    return [];
  }
}

// Parse grammar data files
const b1 = extractArrayFromFile(path.join(__dirname, '../src/data/grammarDataB1.js'), 'grammarDataB1');
const b2 = extractArrayFromFile(path.join(__dirname, '../src/data/grammarDataB2.js'), 'grammarDataB2');
const c1c2 = extractArrayFromFile(path.join(__dirname, '../src/data/grammarDataC1C2.js'), 'grammarDataC1C2');

console.log('=== GRAMMAR DATA AUDIT ===');
console.log(`B1 topics: ${b1.length}`);
console.log(`B2 topics: ${b2.length}`);
console.log(`C1/C2 topics: ${c1c2.length}`);
console.log(`Total grammar topics: ${b1.length + b2.length + c1c2.length}`);

const allGrammar = [...b1, ...b2, ...c1c2];

// Check which topics are missing exercises
const fields = ['theory', 'sentenceGame', 'exercises', 'fillBlanks', 'errorCorrection', 'transformation', 'matching', 'trueFalse'];

const missing = {};
fields.forEach(f => missing[f] = []);

allGrammar.forEach(t => {
  fields.forEach(f => {
    if (!t[f] || (Array.isArray(t[f]) && t[f].length === 0)) {
      missing[f].push(t.id);
    }
  });
});

console.log('\n=== MISSING FIELDS SUMMARY ===');
fields.forEach(f => {
  console.log(`${f}: ${missing[f].length} topics missing`);
  if (missing[f].length > 0 && missing[f].length <= 30) {
    missing[f].forEach(id => console.log(`  - ${id}`));
  }
});

// Check roadmap
const roadmapContent = fs.readFileSync(path.join(__dirname, '../src/data/roadmapData.js'), 'utf8');
const targetIds = [];
const regex = /targetId:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(roadmapContent)) !== null) {
  targetIds.push(match[1]);
}

console.log(`\n=== ROADMAP AUDIT ===`);
console.log(`Total roadmap milestones: ${targetIds.length}`);

const grammarIds = allGrammar.map(t => t.id);
const missingGrammar = targetIds.filter(id => {
  // Check if it's a grammar type milestone
  const lineIdx = roadmapContent.indexOf(`'${id}'`);
  const before = roadmapContent.substring(Math.max(0, lineIdx - 200), lineIdx);
  return before.includes("type: 'grammar'") && !grammarIds.includes(id);
});

console.log(`Grammar IDs in roadmap not found in data: ${missingGrammar.length}`);
missingGrammar.forEach(id => console.log(`  MISSING: ${id}`));

console.log('\n=== ALL GRAMMAR IDS ===');
allGrammar.forEach(t => console.log(`  ${t.id} | ${t.title} | theory:${t.theory?.length || 0} sent:${t.sentenceGame?.length || 0} ex:${t.exercises?.length || 0} fill:${t.fillBlanks?.length || 0} err:${t.errorCorrection?.length || 0} trans:${t.transformation?.length || 0} match:${t.matching?.length || 0} tf:${t.trueFalse?.length || 0}`));
