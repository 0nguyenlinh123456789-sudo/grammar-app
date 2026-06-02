// File: scratch/test_parse.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse;

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

try {
  const parser = new PDFParse({ data: dataBuffer });
  console.log('Successfully instantiated PDFParse!');
  parser.getText({ first: 6, last: 15 }).then(result => {
    console.log('Total pages parsed:', result.pages.length);
    console.log('Concatenated text length:', result.text.length);
    console.log('Concatenated text:', result.text.trim());
  }).catch(e => {
    console.error('Error parsing text:', e);
  });
} catch (e) {
  console.error('Error instantiating:', e);
}
