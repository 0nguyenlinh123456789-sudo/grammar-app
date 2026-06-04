// File: scratch/addLevelsToVocab.js
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// 1. Update src/data/vocabExtendedData.js
const extendedPath = path.join(projectRoot, 'src', 'data', 'vocabExtendedData.js');
let extendedContent = fs.readFileSync(extendedPath, 'utf8');

const extendedReplacements = [
  { target: '"id": "health-medical",', replacement: '"id": "health-medical",\n    "level": "B2-C1",' },
  { target: '"id": "business-office",', replacement: '"id": "business-office",\n    "level": "B1-B2",' },
  { target: '"id": "kids-starter",', replacement: '"id": "kids-starter",\n    "level": "A1",' }
];

extendedReplacements.forEach(({ target, replacement }) => {
  if (extendedContent.includes(target) && !extendedContent.includes(replacement)) {
    extendedContent = extendedContent.replace(target, replacement);
  }
});

fs.writeFileSync(extendedPath, extendedContent, 'utf8');
console.log('Updated vocabExtendedData.js with levels!');

// 2. Update src/data/vocabVstepData.js
const vstepPath = path.join(projectRoot, 'src', 'data', 'vocabVstepData.js');
let vstepContent = fs.readFileSync(vstepPath, 'utf8');

const vstepReplacements = [
  { target: '"id": "travel-transport",', replacement: '"id": "travel-transport",\n    "level": "A2-B1",' },
  { target: '"id": "health-basics",', replacement: '"id": "health-basics",\n    "level": "A2",' },
  { target: '"id": "energy-resources",', replacement: '"id": "energy-resources",\n    "level": "B2",' },
  { target: '"id": "education-learning-advanced",', replacement: '"id": "education-learning-advanced",\n    "level": "A2-B1",' },
  { target: '"id": "economy-money",', replacement: '"id": "economy-money",\n    "level": "B2",' },
  { target: '"id": "daily-routine-time-management",', replacement: '"id": "daily-routine-time-management",\n    "level": "B1",' },
  { target: '"id": "nature-countryside",', replacement: '"id": "nature-countryside",\n    "level": "A2",' },
  { target: '"id": "city-urban-life",', replacement: '"id": "city-urban-life",\n    "level": "A2-B1",' },
  { target: '"id": "family-relationships",', replacement: '"id": "family-relationships",\n    "level": "A1-A2",' },
  { target: '"id": "food-cooking",', replacement: '"id": "food-cooking",\n    "level": "A1-A2",' },
  { target: '"id": "emotions-personality",', replacement: '"id": "emotions-personality",\n    "level": "B1",' },
  { target: '"id": "animals-pets",', replacement: '"id": "animals-pets",\n    "level": "A1",' },
  { target: '"id": "weather-seasons",', replacement: '"id": "weather-seasons",\n    "level": "A1",' },
  { target: '"id": "technology-internet",', replacement: '"id": "technology-internet",\n    "level": "B1-B2",' }
];

vstepReplacements.forEach(({ target, replacement }) => {
  if (vstepContent.includes(target) && !vstepContent.includes(replacement)) {
    vstepContent = vstepContent.replace(target, replacement);
  }
});

fs.writeFileSync(vstepPath, vstepContent, 'utf8');
console.log('Updated vocabVstepData.js with levels!');
