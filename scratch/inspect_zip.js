// File: scratch/inspect_zip.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const admZip = require('adm-zip');

try {
  const zip = new admZip('temp_docx.zip');
  const zipEntries = zip.getEntries();
  console.log('Total files in zip:', zipEntries.length);
  zipEntries.slice(0, 20).forEach(entry => {
    console.log('-', entry.entryName, entry.header.size, 'bytes');
  });
} catch (e) {
  console.log('Error reading zip:', e.message);
}
