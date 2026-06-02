// File: scratch/extract_all_pdf.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse;

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

try {
  const parser = new PDFParse({ data: dataBuffer });
  console.log('Successfully instantiated PDFParse! Parsing all pages...');
  
  parser.getText().then(result => {
    console.log('Total pages parsed:', result.pages.length);
    console.log('Total text length extracted:', result.text.length);
    
    // Check if we extracted actual text besides the page numbers
    const cleanedText = result.text.replace(/-- \d+ of \d+ --/g, '').trim();
    console.log('Cleaned text length:', cleanedText.length);
    
    fs.writeFileSync('src/temp_docx/pdf_text.txt', result.text);
    console.log('Successfully wrote extracted text to src/temp_docx/pdf_text.txt');
  }).catch(e => {
    console.error('Error parsing text:', e);
  });
} catch (e) {
  console.error('Error instantiating:', e);
}
