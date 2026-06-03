// File: scratch/validate_data_files.js
import { grammarDataB1 } from '../src/data/grammarDataB1.js';
import { grammarDataB2 } from '../src/data/grammarDataB2.js';
import { grammarDataC1C2 } from '../src/data/grammarDataC1C2.js';

const allLevels = [
  { level: 'B1', data: grammarDataB1 },
  { level: 'B2', data: grammarDataB2 },
  { level: 'C1C2', data: grammarDataC1C2 }
];

let totalErrors = 0;
const seenIds = new Set();

allLevels.forEach(({ level, data }) => {
  console.log(`\n=== Validating Level ${level} (${data?.length || 0} topics) ===`);
  if (!Array.isArray(data)) {
    console.error(`ERROR: Data for level ${level} is not an array!`);
    totalErrors++;
    return;
  }

  data.forEach((topic, idx) => {
    const topicPath = `${level}[idx:${idx}, id:${topic?.id}, title:${topic?.title}]`;

    if (!topic.id) {
      console.error(`ERROR: Missing topic ID at index ${idx} in ${level}`);
      totalErrors++;
    } else {
      if (seenIds.has(topic.id)) {
        console.error(`ERROR: Duplicate topic ID '${topic.id}' in ${topicPath}`);
        totalErrors++;
      }
      seenIds.add(topic.id);
    }

    if (!topic.title) {
      console.error(`ERROR: Missing title in ${topicPath}`);
      totalErrors++;
    }

    if (!topic.color) {
      console.warn(`WARN: Missing color in ${topicPath}`);
    }

    // Validate theory
    if (!topic.theory) {
      console.error(`ERROR: Missing 'theory' in ${topicPath}`);
      totalErrors++;
    } else if (!Array.isArray(topic.theory)) {
      console.error(`ERROR: 'theory' is not an array in ${topicPath}`);
      totalErrors++;
    } else {
      topic.theory.forEach((t, tIdx) => {
        if (!t.h || typeof t.h !== 'string') {
          console.error(`ERROR: theory[${tIdx}] is missing heading 'h' in ${topicPath}`);
          totalErrors++;
        }
        if (t.c === undefined || t.c === null) {
          console.error(`ERROR: theory[${tIdx}] is missing content 'c' in ${topicPath}`);
          totalErrors++;
        }
      });
    }

    // Validate sentenceGame
    if (!topic.sentenceGame) {
      console.error(`ERROR: Missing 'sentenceGame' in ${topicPath}`);
      totalErrors++;
    } else if (!Array.isArray(topic.sentenceGame)) {
      console.error(`ERROR: 'sentenceGame' is not an array in ${topicPath}`);
      totalErrors++;
    } else {
      topic.sentenceGame.forEach((s, sIdx) => {
        if (!s.text) {
          console.error(`ERROR: sentenceGame[${sIdx}] is missing 'text' in ${topicPath}`);
          totalErrors++;
        }
        if (!s.trans) {
          console.error(`ERROR: sentenceGame[${sIdx}] is missing 'trans' in ${topicPath}`);
          totalErrors++;
        }
      });
    }

    // Validate exercises
    if (!topic.exercises) {
      console.error(`ERROR: Missing 'exercises' in ${topicPath}`);
      totalErrors++;
    } else if (!Array.isArray(topic.exercises)) {
      console.error(`ERROR: 'exercises' is not an array in ${topicPath}`);
      totalErrors++;
    } else {
      topic.exercises.forEach((ex, exIdx) => {
        if (!ex.q) {
          console.error(`ERROR: exercises[${exIdx}] is missing question 'q' in ${topicPath}`);
          totalErrors++;
        }
        if (!ex.opts || !Array.isArray(ex.opts) || ex.opts.length === 0) {
          console.error(`ERROR: exercises[${exIdx}] is missing options 'opts' or it's empty in ${topicPath}`);
          totalErrors++;
        }
        if (!ex.a) {
          console.error(`ERROR: exercises[${exIdx}] is missing answer 'a' in ${topicPath}`);
          totalErrors++;
        } else if (!ex.opts?.includes(ex.a)) {
          console.error(`ERROR: exercises[${exIdx}] correct answer '${ex.a}' not found in options [${ex.opts?.join(', ')}] in ${topicPath}`);
          totalErrors++;
        }
      });
    }
  });
});

console.log(`\n=== Validation Completed. Total errors found: ${totalErrors} ===`);
