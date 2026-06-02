// File: scratch/extract_pdf_info.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse;

console.log('Type of PDFParse:', typeof PDFParse);

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

PDFParse(dataBuffer, {
  max: 10 // parse the first 10 pages where the Table of Contents should be
}).then(function(data) {
  fs.writeFileSync('scratch/toc_text.txt', data.text);
  console.log('Successfully extracted first 10 pages of the PDF to scratch/toc_text.txt');
}).catch(err => {
  console.error('Error parsing PDF:', err);
});
