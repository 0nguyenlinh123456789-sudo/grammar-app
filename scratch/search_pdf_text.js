// File: scratch/search_pdf_text.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse;

const pdfPath = 'src/temp_docx/English Vocabulary In Use Pre-Intermediate And Intermediate.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

console.log('Scanning all pages of the PDF...');
try {
  const parser = new PDFParse({ data: dataBuffer });
  
  parser.getText().then(result => {
    console.log('Total pages parsed:', result.pages ? result.pages.length : 0);
    console.log('Total text length:', result.text ? result.text.length : 0);
    
    // Scan page by page
    let totalTextPages = 0;
    const matches = [];
    
    result.pages.forEach((page, index) => {
      const pageText = page.text || '';
      const pageNum = index + 1;
      const cleaned = pageText.replace(/-- \d+ of \d+ --/g, '').trim();
      
      if (cleaned.length > 5) {
        totalTextPages++;
        if (totalTextPages < 10) {
          console.log(`Page ${pageNum} has text (${cleaned.length} chars): "${cleaned.slice(0, 100).replace(/\s+/g, ' ')}..."`);
        }
      }
      
      const lower = pageText.toLowerCase();
      if (lower.includes('give') || lower.includes('keep') || lower.includes('get') || lower.includes('unit 20') || lower.includes('unit 21')) {
        matches.push({ pageNum, text: cleaned.slice(0, 200) });
      }
    });
    
    console.log(`Summary: Found ${totalTextPages} pages with actual text content.`);
    console.log(`Found ${matches.length} pages matching keywords.`);
    if (matches.length > 0) {
      console.log('First 5 matches:');
      matches.slice(0, 5).forEach(m => {
        console.log(`Page ${m.pageNum}: "${m.text.replace(/\s+/g, ' ')}..."`);
      });
    }
  }).catch(e => {
    console.error('Error during getText:', e);
  });
} catch (e) {
  console.error('Error during parsing:', e);
}
