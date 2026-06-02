// File: scratch/test_pdf_parse2.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

console.log('Type of pdf.PDFParse:', typeof pdf.PDFParse);
if (typeof pdf.PDFParse === 'function') {
  console.log('Methods on PDFParse:', Object.getOwnPropertyNames(pdf.PDFParse));
}
