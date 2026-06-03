// File: scratch/fix_data_programmatically.js
import fs from 'fs';
import { grammarDataC1C2 } from '../src/data/grammarDataC1C2.js';
import { grammarDataB2 } from '../src/data/grammarDataB2.js';

// 1. Fix C1/C2 data keys: eng -> text, vie -> trans
const fixedC1C2 = grammarDataC1C2.map(topic => {
  const sentenceGame = (topic.sentenceGame || []).map(item => {
    const newItem = { id: item.id };
    if (item.hasOwnProperty('eng')) {
      newItem.text = item.eng;
    } else {
      newItem.text = item.text;
    }
    if (item.hasOwnProperty('vie')) {
      newItem.trans = item.vie;
    } else {
      newItem.trans = item.trans;
    }
    return newItem;
  });
  return {
    ...topic,
    sentenceGame
  };
});

fs.writeFileSync('src/data/grammarDataC1C2.js', `// File: src/data/grammarDataC1C2.js
// Auto-generated C1/C2 Grammar Data (Advanced Level)

export const grammarDataC1C2 = ${JSON.stringify(fixedC1C2, null, 2)};
`);

// 2. Fix B2 topic b2_10 exercise 8: change "needn't" to "might" in opts
const fixedB2 = grammarDataB2.map(topic => {
  if (topic.id === 'b2_10') {
    const exercises = (topic.exercises || []).map(ex => {
      if (ex.id === 8) {
        const newOpts = [...ex.opts];
        const idx = newOpts.indexOf("needn't");
        if (idx !== -1) {
          newOpts[idx] = "might";
        }
        return {
          ...ex,
          opts: newOpts
        };
      }
      return ex;
    });
    return {
      ...topic,
      exercises
    };
  }
  return topic;
});

fs.writeFileSync('src/data/grammarDataB2.js', `// File: src/data/grammarDataB2.js
// Auto-generated B2 Grammar Data (Medium Level)

export const grammarDataB2 = ${JSON.stringify(fixedB2, null, 2)};
`);

console.log("Grammar data fixed successfully!");
