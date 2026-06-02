// File: scratch/list_ids.js
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scratch/missing_list.json', 'utf8'));
const ids = Array.from(new Set(data.map(item => item.unitId))).sort((a,b) => a-b);
console.log('Unit IDs in missing_list.json:', ids);
