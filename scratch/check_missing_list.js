// File: scratch/check_missing_list.js
import fs from 'fs';

const missingList = JSON.parse(fs.readFileSync('scratch/missing_list.json', 'utf8'));

const unitsMap = {};
missingList.forEach(item => {
  const uId = item.unitId;
  if (!unitsMap[uId]) {
    unitsMap[uId] = {
      title: item.unitTitle,
      count: 0,
      sections: {}
    };
  }
  unitsMap[uId].count++;
  if (!unitsMap[uId].sections[item.sectionHeading]) {
    unitsMap[uId].sections[item.sectionHeading] = [];
  }
  unitsMap[uId].sections[item.sectionHeading].push(item.word);
});

console.log('Total items in missing_list:', missingList.length);
console.log('Number of unique units covered:', Object.keys(unitsMap).length);
console.log('Units mapping details:');
Object.keys(unitsMap).sort((a,b) => Number(a) - Number(b)).forEach(uId => {
  const u = unitsMap[uId];
  console.log(`Unit ${uId}: ${u.title} (Words count: ${u.count})`);
  Object.keys(u.sections).forEach(sec => {
    console.log(`  - Section [${sec}]: ${u.sections[sec].join(', ')}`);
  });
});
