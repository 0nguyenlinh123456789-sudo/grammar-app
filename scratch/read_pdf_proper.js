// File: scratch/read_pdf_proper.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse;

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

console.log('Loading and parsing PDF...');
try {
  const parser = new PDFParse({ data: dataBuffer });
  console.log('Successfully instantiated PDFParse! Extracting text from first 20 pages...');
  
  // Let's get the text of pages 1 to 20
  parser.getText({ first: 1, last: 20 }).then(result => {
    console.log('Number of pages parsed:', result.pages ? result.pages.length : 0);
    console.log('Text length:', result.text ? result.text.length : 0);
    fs.writeFileSync('scratch/pdf_text_sample.txt', result.text || 'No text extracted');
    console.log('Wrote extracted text to scratch/pdf_text_sample.txt');
  }).catch(e => {
    console.error('Error in parser.getText():', e);
  });
} catch (e) {
  console.error('Error during parsing:', e);
}
