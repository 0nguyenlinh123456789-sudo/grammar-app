const fs = require('fs');

const b1 = require('../src/data/grammarDataB1.js').grammarDataB1;
const b2 = require('../src/data/grammarDataB2.js').grammarDataB2;
const c1 = require('../src/data/grammarDataC1C2.js').grammarDataC1C2;

const all = [...b1, ...b2, ...c1];

all.forEach(t => {
  if (!t.theory) console.log(`Missing theory: ${t.id}`);
  if (!t.sentenceGame) console.log(`Missing sentenceGame: ${t.id}`);
  if (!t.exercises) console.log(`Missing exercises: ${t.id}`);
});
console.log("Check complete.");
