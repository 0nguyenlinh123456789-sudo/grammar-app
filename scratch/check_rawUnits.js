// File: scratch/check_rawUnits.js
import fs from 'fs';

const fileContent = fs.readFileSync('generate_preint_data.js', 'utf8');

// Match all title: "..."
const titles = [];
const titleRegex = /title:\s*["']([^"']+)["']/g;
let match;
while ((match = titleRegex.exec(fileContent)) !== null) {
  titles.push(match[1]);
}

console.log('Total titles found in generate_preint_data.js:', titles.length);
titles.forEach((title, idx) => {
  console.log(`${idx + 1}: ${title}`);
});
