const fs = require('fs');

const roadmapContent = fs.readFileSync('../src/data/roadmapData.js', 'utf8');

const v1 = fs.readFileSync('../src/data/vocabExtendedData.js', 'utf8');
const v2 = fs.readFileSync('../src/data/vocabExtraData2.js', 'utf8');
const v3 = fs.readFileSync('../src/data/vocabFinalData.js', 'utf8');
const v4 = fs.readFileSync('../src/data/vocabMoreData.js', 'utf8');
const v5 = fs.readFileSync('../src/data/vocabVstepData.js', 'utf8');

const g1 = fs.readFileSync('../src/data/grammarDataC1C2.js', 'utf8');
const g2 = fs.readFileSync('../src/data/grammarDataB1.js', 'utf8');
const g3 = fs.readFileSync('../src/data/grammarDataB2.js', 'utf8');

const targetIds = [...roadmapContent.matchAll(/targetId:\s*'([^']+)'/g)].map(m => m[1]);

const getIds = (content) => [...content.matchAll(/\"?(?:id|topicId)\"?\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

const allIds = [
  ...getIds(v1), ...getIds(v2), ...getIds(v3), ...getIds(v4), ...getIds(v5),
  ...getIds(g1), ...getIds(g2), ...getIds(g3)
];

console.log("Missing targets in roadmap:");
targetIds.forEach(id => {
  if (!allIds.includes(id)) {
    console.log(`Missing: ${id}`);
  }
});
