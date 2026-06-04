import vocabMoreData from '../src/data/vocabMoreData.js';
import vocabFinalData from '../src/data/vocabFinalData.js';

const soc = vocabMoreData.find(t => t.id === 'society-law-rights');
if (soc) {
  console.log('--- society-law-rights words ---');
  console.log(soc.words.map(w => w.en));
}

const glob = vocabMoreData.find(t => t.id === 'globalization-culture');
if (glob) {
  console.log('--- globalization-culture words ---');
  console.log(glob.words.map(w => w.en));
}

const med = vocabFinalData.find(t => t.id === 'media-journalism');
if (med) {
  console.log('--- media-journalism words ---');
  console.log(med.words.map(w => w.en));
}
