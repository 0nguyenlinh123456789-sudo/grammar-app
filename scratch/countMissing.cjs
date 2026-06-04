// Count remaining topics that still need exercises in B1
const fs = require('fs');
const content = fs.readFileSync('src/data/grammarDataB1.js', 'utf8');
const lines = content.split('\n');
let missing = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/"id": "(b1_\d+)"/);
  if (m) {
    const id = m[1];
    let j = i + 1;
    let hasFill = false;
    while (j < lines.length) {
      if (lines[j].match(/"id": "b1_\d+"/)) break;
      if (lines[j].includes('fillBlanks')) { hasFill = true; break; }
      j++;
    }
    if (!hasFill) missing.push({ id, line: i + 1, endLine: j });
  }
}
console.log('Missing fillBlanks in B1:', missing.length);
missing.forEach(m => console.log(`  ${m.id} (line ${m.line} to ${m.endLine})`));
