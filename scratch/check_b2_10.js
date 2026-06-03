// File: scratch/check_b2_10.js
import { grammarDataB2 } from '../src/data/grammarDataB2.js';
const topic = grammarDataB2.find(t => t.id === 'b2_10');
topic.exercises.forEach((ex, idx) => {
  if (!ex.opts.includes(ex.a)) {
    console.log(`Exercise ${idx + 1} has answer '${ex.a}' which is NOT in opts: [${ex.opts.join(', ')}]`);
  }
});
