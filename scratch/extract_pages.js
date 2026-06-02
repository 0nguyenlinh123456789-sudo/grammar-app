// File: scratch/extract_pages.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';

if (!fs.existsSync('scratch')) {
  fs.mkdirSync('scratch');
}

console.log('Reading PDF file:', pdfPath);
const dataBuffer = fs.readFileSync(pdfPath);

console.log('Parsing PDF using PDFParse class...');
try {
  const parser = new pdf.PDFParse({ data: dataBuffer });
  console.log('Parsing text...');
  parser.getText().then(function(result) {
    console.log('Successfully parsed PDF text!');
    console.log('Concatenated text length:', result.text.length);
    fs.writeFileSync('scratch/full_pdf_text.txt', result.text);
    console.log('Successfully wrote full PDF text to scratch/full_pdf_text.txt');
    
    // Also save some pages info
    if (result.pages) {
      console.log('Total pages parsed:', result.pages.length);
    }
  }).catch(err => {
    console.error('Error during getText():', err);
  });
} catch (err) {
  console.error('Error instantiating PDFParse:', err);
}
