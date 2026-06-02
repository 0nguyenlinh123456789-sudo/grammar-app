// File: scratch/test_pdf_parse3.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

console.log('Trying pdf.PDFParse as a function...');
try {
  const result = pdf.PDFParse(dataBuffer);
  console.log('Result type:', typeof result);
  if (result && typeof result.then === 'function') {
    result.then(d => console.log('Promise resolved. Text length:', d.text ? d.text.length : 'no text')).catch(e => console.error('Promise error:', e));
  } else {
    console.log('Result:', result);
  }
} catch (e) {
  console.log('Function call failed:', e.message);
}

console.log('Trying new pdf.PDFParse()...');
try {
  const parser = new pdf.PDFParse();
  console.log('Parser instance methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
  // Try to parse using instance if it has a parse method
  if (typeof parser.parse === 'function') {
    const res = parser.parse(dataBuffer);
    console.log('parse() result type:', typeof res);
  }
} catch (e) {
  console.log('Constructor call failed:', e.message);
}
