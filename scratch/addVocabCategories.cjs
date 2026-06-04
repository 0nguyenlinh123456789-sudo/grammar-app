// Add category field to all vocab topics
const fs = require('fs');
const filePath = 'src/data/vocabVstepData.js';
let content = fs.readFileSync(filePath, 'utf8');

// Category mapping: topic id -> category
const categoryMap = {
  // 📚 Chủ đề thi VSTEP
  "travel-transport": "vstep",
  "health-basics": "vstep",
  "education-learning-advanced": "vstep",
  "city-urban-life": "vstep",
  "energy-resources": "vstep",
  "economy-money": "vstep",
  "technology-internet": "vstep",
  "environment-nature": "vstep",
  "society-law-rights": "vstep",
  "globalization-culture": "vstep",
  
  // 🗣️ Giao tiếp Hằng ngày
  "family-relationships": "daily",
  "food-cooking": "daily",
  "daily-routine-time-management": "daily",
  "emotions-personality": "daily",
  "nature-countryside": "daily",
  "home-daily-life": "daily",
  "shopping-finance": "daily",
  "food-nutrition": "daily",
  
  // 🎯 Chủ đề thi IELTS
  "health-medical": "ielts",
  "business-office": "ielts",
  "education-academic": "ielts",
  "science-tech-advanced": "ielts",
  "career-workplace": "ielts",
  "media-journalism": "ielts",
  "ielts-academic-vocab": "ielts",
  "psychology-emotions": "ielts",
  
  // 🌱 Dành cho người mới bắt đầu
  "kids-starter": "beginner",
  "animals-pets": "beginner",
  "weather-seasons": "beginner",
  "kids-nature-animals": "beginner",
  
  // 🎭 Giải trí & Nghệ thuật
  "arts-entertainment": "entertainment",
  "sports-fitness": "entertainment",
};

let modified = 0;
for (const [topicId, category] of Object.entries(categoryMap)) {
  const idStr = `"id": "${topicId}"`;
  const idx = content.indexOf(idStr);
  if (idx === -1) {
    console.log(`  ⚠️ ${topicId}: Not found`);
    continue;
  }
  
  // Check if category already exists
  const topicSection = content.substring(idx, idx + 500);
  if (topicSection.includes('"category"')) {
    console.log(`  ⏭️ ${topicId}: Already has category`);
    continue;
  }
  
  // Insert category right after the id line
  const insertStr = `"id": "${topicId}",\n    "category": "${category}"`;
  content = content.replace(`"id": "${topicId}"`, insertStr);
  modified++;
  console.log(`  ✅ ${topicId}: Added category "${category}"`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\nTotal modified: ${modified} topics`);
