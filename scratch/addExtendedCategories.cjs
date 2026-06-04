// Add category to extended vocab files
const fs = require('fs');

const fileCategoryMap = {
  'src/data/vocabExtendedData.js': {
    'health-medical': 'ielts',
    'business-office': 'ielts',
    'kids-starter': 'beginner',
  },
  'src/data/vocabMoreData.js': {
    'environment-nature': 'vstep',
    'education-academic': 'ielts',
    'home-daily-life': 'daily',
    'arts-entertainment': 'entertainment',
    'food-nutrition': 'daily',
    'society-law-rights': 'vstep',
    'globalization-culture': 'vstep',
  },
  'src/data/vocabFinalData.js': {
    'sports-fitness': 'entertainment',
    'career-workplace': 'ielts',
    'science-tech-advanced': 'ielts',
    'shopping-finance': 'daily',
    'psychology-emotions': 'ielts',
    'kids-nature-animals': 'beginner',
    'media-journalism': 'ielts',
    'ielts-academic-vocab': 'ielts',
  }
};

for (const [filePath, categories] of Object.entries(fileCategoryMap)) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = 0;
  
  for (const [topicId, category] of Object.entries(categories)) {
    const idStr = `"id": "${topicId}"`;
    if (!content.includes(idStr)) {
      console.log(`  ⚠️ ${topicId}: Not found in ${filePath}`);
      continue;
    }
    
    if (content.substring(content.indexOf(idStr), content.indexOf(idStr) + 500).includes('"category"')) {
      console.log(`  ⏭️ ${topicId}: Already has category`);
      continue;
    }
    
    content = content.replace(`"id": "${topicId}"`, `"id": "${topicId}",\n    "category": "${category}"`);
    modified++;
    console.log(`  ✅ ${topicId}: Added "${category}"`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ${filePath}: ${modified} modified\n`);
}
