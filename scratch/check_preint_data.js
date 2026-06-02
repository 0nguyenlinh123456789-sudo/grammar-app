// File: scratch/check_preint_data.js
import { courseData } from '../src/data/oxfordPreIntData.js';

console.log('Total units in courseData:', courseData.length);
const u1 = courseData[0];
console.log('Unit 1 properties:', Object.keys(u1));
console.log('Unit 1 theory structure:', typeof u1.theory, Array.isArray(u1.theory) ? 'Array' : 'Object');
if (Array.isArray(u1.theory)) {
  console.log('Unit 1 theory headings:', u1.theory.map(t => t.heading));
} else {
  console.log('Unit 1 theory keys:', Object.keys(u1.theory));
}
