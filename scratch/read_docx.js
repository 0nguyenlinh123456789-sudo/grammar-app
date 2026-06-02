// File: scratch/read_docx.js
import fs from 'fs';

const docXmlPath = 'src/temp_docx/word/document.xml';
if (fs.existsSync(docXmlPath)) {
  const xml = fs.readFileSync(docXmlPath, 'utf8');
  // Strip XML tags to get plain text
  const plainText = xml.replace(/<[^>]+>/g, ' ');
  fs.writeFileSync('scratch/docx_plain.txt', plainText);
  console.log('Successfully wrote docx plain text to scratch/docx_plain.txt');
  console.log('Total characters:', plainText.length);
} else {
  console.log('document.xml not found at:', docXmlPath);
}
