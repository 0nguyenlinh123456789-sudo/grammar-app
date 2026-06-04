import vocabVstepData from '../src/data/vocabVstepData.js';

console.log('--- VOCABULARY AUDIT ---');
vocabVstepData.forEach((topic, idx) => {
  console.log(`${idx + 1}. Topic ID: ${topic.id}`);
  console.log(`   Title: ${topic.title}`);
  console.log(`   Word Count: ${topic.words ? topic.words.length : 0}`);
  if (topic.words && topic.words.length < 100) {
    console.log(`   WARNING: Under 100 words! Need to add ${100 - topic.words.length} words.`);
  }
});
