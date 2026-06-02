const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

function processImage(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    return;
  }

  const fileData = fs.readFileSync(inputPath);
  let width, height, data;

  // Check if JPEG (starts with FF D8)
  if (fileData[0] === 0xff && fileData[1] === 0xd8) {
    console.log('Detected JPEG input image');
    try {
      const rawImageData = jpeg.decode(fileData, { useTna: true });
      width = rawImageData.width;
      height = rawImageData.height;
      data = rawImageData.data; // RGBA buffer
    } catch (e) {
      console.error('Failed to decode JPEG:', e);
      return;
    }
  } else {
    console.log('Detected PNG input image');
    try {
      const png = PNG.sync.read(fileData);
      width = png.width;
      height = png.height;
      data = png.data; // RGBA buffer
    } catch (e) {
      console.error('Failed to decode PNG:', e);
      return;
    }
  }

  let keyedCount = 0;
  // Apply green screen chroma keying:
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Green screen chroma keying logic:
      // Neon green is (0, 255, 0).
      // We look for high green relative to red and blue.
      if (g > 80 && g > r * 1.15 && g > b * 1.15) {
        const greenDiff = Math.sqrt(r * r + (255 - g) * (255 - g) + b * b);
        
        if (greenDiff < 200) {
          // Transparent
          data[idx + 3] = 0;
          keyedCount++;
        } else if (greenDiff < 260) {
          // Soft blending edge
          const alphaRatio = (greenDiff - 200) / 60;
          data[idx + 3] = Math.floor(alphaRatio * 255);
          
          // Spill suppression: make the edge pixels match surrounding colors by removing green cast
          data[idx + 1] = Math.floor((r + b) / 2);
          keyedCount++;
        }
      }
    }
  }

  console.log(`Successfully keyed out ${keyedCount} green pixels.`);

  // Write out as a clean, transparent PNG
  const outPng = new PNG({ width, height });
  outPng.data = data;

  const buffer = PNG.sync.write(outPng);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Saved clean, transparent PNG to: ${outputPath}`);
}

// Read arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node key_green.cjs <inputPath> <outputPath>');
  process.exit(1);
}

processImage(args[0], args[1]);
