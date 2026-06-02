// File: scratch/inspect_pdf_parse.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');

console.log('pdfModule keys:', Object.keys(pdfModule));
for (const key of Object.keys(pdfModule)) {
  console.log(`Type of ${key}:`, typeof pdfModule[key]);
}
