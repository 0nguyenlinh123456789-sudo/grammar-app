import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('d:/HocCode/grammar-app/public/mascot_sheet.png');

// Find IDAT chunks
let pos = 8;
const idatChunks = [];
let width = 0;
let height = 0;

while (pos < buf.length) {
  const length = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(pos + 8, pos + 8 + length));
  } else if (type === 'IEND') {
    break;
  }
  pos += 12 + length;
}

console.log('Image Size:', width, 'x', height);

const compressed = Buffer.concat(idatChunks);
const decompressed = zlib.inflateSync(compressed);

console.log('Decompressed bytes:', decompressed.length);

// PNG format: each row starts with a 1-byte filter type, followed by width * 4 bytes (RGBA)
const rowBytes = 1 + width * 4;
console.log('Expected decompressed size:', rowBytes * height);

const lightRowCount = [];
for (let y = 0; y < height; y++) {
  let lightPixels = 0;
  const rowStart = y * rowBytes + 1; // skip filter byte
  for (let x = 0; x < width; x++) {
    const idx = rowStart + x * 4;
    const r = decompressed[idx];
    const g = decompressed[idx + 1];
    const b = decompressed[idx + 2];
    
    // Check if pixel is cream background (light color)
    if (r > 200 && g > 200 && b > 180) {
      lightPixels++;
    }
  }
  
  const pct = lightPixels / width;
  lightRowCount.push({ y, pct });
}

// Find horizontal lines that are almost entirely cream color (> 98%)
const clearRows = lightRowCount.filter(r => r.pct > 0.98).map(r => r.y);
console.log('Almost entirely cream rows count:', clearRows.length);

// Print out samples to see the profile
console.log('Visual profile (every 10 rows):');
for (let y = 0; y < height; y += 15) {
  const bar = '#'.repeat(Math.round(lightRowCount[y].pct * 20)) + '-'.repeat(20 - Math.round(lightRowCount[y].pct * 20));
  console.log(`Row ${String(y).padStart(3)}: [${bar}] ${(lightRowCount[y].pct * 100).toFixed(1)}% light`);
}
