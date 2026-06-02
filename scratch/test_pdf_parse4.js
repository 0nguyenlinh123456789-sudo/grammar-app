// File: scratch/test_pdf_parse4.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  const nodePdf = require('pdf-parse/node');
  console.log('Keys of pdf-parse/node:', Object.keys(nodePdf));
} catch (e) {
  console.log('Error importing pdf-parse/node:', e.message);
}
