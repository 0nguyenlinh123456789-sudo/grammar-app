import { courseData } from '../src/data/oxfordPreIntData.js';

courseData.forEach((unit, idx) => {
  console.log(`${idx + 1}. ${unit.title} (${unit.id})`);
});
