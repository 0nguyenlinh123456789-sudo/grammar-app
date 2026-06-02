// File: scratch/test_pdf_parse.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf:', Object.keys(pdf));
if (typeof pdf !== 'function' && pdf.default) {
  console.log('Type of pdf.default:', typeof pdf.default);
}
