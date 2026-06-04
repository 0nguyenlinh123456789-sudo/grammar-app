const fs = require('fs');

const roadmapContent = fs.readFileSync('../src/data/roadmapData.js', 'utf8');
const c1c2Content = fs.readFileSync('../src/data/grammarDataC1C2.js', 'utf8');
const b1Content = fs.readFileSync('../src/data/grammarDataB1.js', 'utf8');
const b2Content = fs.readFileSync('../src/data/grammarDataB2.js', 'utf8');

// Extract all targetIds from roadmap
const targetIds = [...roadmapContent.matchAll(/targetId:\s*'([^']+)'/g)].map(m => m[1]);

// Extract all grammar ids from grammar data
const c1c2Ids = [...c1c2Content.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
const b1Ids = [...b1Content.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
const b2Ids = [...b2Content.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);

const allGrammarIds = [...b1Ids, ...b2Ids, ...c1c2Ids];

// Filter grammar topics where 'title' is present
const grammarTitlesC1C2 = [...c1c2Content.matchAll(/"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)"/g)];
const grammarTitlesB1 = [...b1Content.matchAll(/"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)"/g)];
const grammarTitlesB2 = [...b2Content.matchAll(/"id":\s*"([^"]+)",\s*"title":\s*"([^"]+)"/g)];

const allGrammarTopics = [...grammarTitlesB1, ...grammarTitlesB2, ...grammarTitlesC1C2].map(m => ({ id: m[1], title: m[2] }));

console.log("Grammar topics NOT in roadmap:");
allGrammarTopics.forEach(t => {
  if (!targetIds.includes(t.id)) {
    console.log(`Missing: ${t.id} - ${t.title}`);
  }
});

console.log("\nRoadmap targetIds NOT in grammar data:");
targetIds.forEach(id => {
  if (!allGrammarIds.includes(id) && !id.includes('travel') && !id.includes('family') && !id.includes('food') && !id.includes('animals') && !id.includes('weather') && !id.includes('nature') && !id.includes('technology') && !id.includes('kids') && !id.includes('emotions') && !id.includes('economy') && !id.includes('education') && !id.includes('science') && !id.includes('daily')) {
    console.log(`Missing Data for Roadmap Target: ${id}`);
  }
});
