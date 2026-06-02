// File: scratch/test_node_parse.js
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  const pdfNode = require('pdf-parse/node');
  console.log('pdf-parse/node loaded! Keys:', Object.keys(pdfNode));
  if (typeof pdfNode === 'function') {
    console.log('pdfNode is a function itself!');
  } else if (typeof pdfNode.default === 'function') {
    console.log('pdfNode.default is a function!');
  }
} catch (e) {
  console.error('Error loading pdf-parse/node:', e);
}
