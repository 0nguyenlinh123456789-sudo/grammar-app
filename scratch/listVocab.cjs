// List all vocab topic IDs and their categories
const fs = require('fs');
const content = fs.readFileSync('src/data/vocabVstepData.js', 'utf8');

// Extract all topic objects - find id and title pairs
const idMatches = [...content.matchAll(/"id":\s*"([^"]+)"/g)];
const titleMatches = [...content.matchAll(/"title":\s*"([^"]+)"/g)];
const levelMatches = [...content.matchAll(/"level":\s*"([^"]+)"/g)];

// Filter out numeric IDs (exercise IDs)
const topicIds = idMatches.filter(m => !m[1].match(/^\d+$/));
console.log('Total vocab topics:', topicIds.length);
topicIds.forEach((m, i) => {
  const title = titleMatches[i] ? titleMatches[i][1] : 'N/A';
  const level = levelMatches[i] ? levelMatches[i][1] : 'N/A';
  console.log(`  ${m[1]} | ${level} | ${title}`);
});
