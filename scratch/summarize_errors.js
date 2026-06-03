// File: scratch/summarize_errors.js
import { grammarDataB1 } from '../src/data/grammarDataB1.js';
import { grammarDataB2 } from '../src/data/grammarDataB2.js';
import { grammarDataC1C2 } from '../src/data/grammarDataC1C2.js';

const allLevels = [
  { level: 'B1', data: grammarDataB1 },
  { level: 'B2', data: grammarDataB2 },
  { level: 'C1C2', data: grammarDataC1C2 }
];

allLevels.forEach(({ level, data }) => {
  console.log(`\n=== Level ${level} ===`);
  data.forEach((topic, idx) => {
    let topicErrors = 0;
    const missingKeys = [];
    
    if (!topic.theory) missingKeys.push('theory');
    if (!topic.sentenceGame) missingKeys.push('sentenceGame');
    if (!topic.exercises) missingKeys.push('exercises');

    if (missingKeys.length > 0) {
      console.log(`Topic: ${topic.title} (${topic.id}) - MISSING ENTIRE KEYS: ${missingKeys.join(', ')}`);
      return;
    }

    // Check sentenceGame items
    let badSentenceGames = 0;
    topic.sentenceGame.forEach((s, sIdx) => {
      if (!s.text || !s.trans) {
        badSentenceGames++;
        topicErrors++;
      }
    });

    // Check exercises items
    let badExercises = 0;
    topic.exercises.forEach((ex, exIdx) => {
      if (!ex.q || !ex.opts || !Array.isArray(ex.opts) || ex.opts.length === 0 || !ex.a || !ex.opts.includes(ex.a)) {
        badExercises++;
        topicErrors++;
      }
    });

    if (topicErrors > 0) {
      console.log(`Topic: ${topic.title} (${topic.id}) has ${topicErrors} errors (bad sentenceGame items: ${badSentenceGames}, bad exercises: ${badExercises})`);
    }
  });
});
