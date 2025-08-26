const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimized'),
  jpgQuality: 80,
  pngQuality: 80,
  webpQuality: 75,
  avifQuality: 65,
  maxWidth: 1920, // Maximum width for any image
  createWebp: true, // Also create WebP versions
  createAvif: true, // Also create AVIF versions (better compression but less support)
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Process all images in the input directory
async function processImages() {
  try {
    const files = fs.readdirSync(config.inputDir);
    
    console.log(`Found ${files.length} files in ${config.inputDir}`);
    
    for (const file of files) {
      // Skip directories and non-image files
      const inputPath = path.join(config.inputDir, file);
      if (fs.statSync(inputPath).isDirectory()) continue;
      
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }
      
      const filename = path.basename(file, ext);
      const outputPathOriginal = path.join(config.outputDir, file);
      
      console.log(`Processing: ${file}`);
      
      // Create a sharp instance for the image
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      // Resize if needed (preserving aspect ratio)
      if (metadata.width > config.maxWidth) {
        image.resize(config.maxWidth);
        console.log(`  Resizing from ${metadata.width}px to ${config.maxWidth}px width`);
      }
      
      // Process based on image type
      if (['.jpg', '.jpeg'].includes(ext)) {
        await image
          .jpeg({ quality: config.jpgQuality, mozjpeg: true })
          .toFile(outputPathOriginal);
      } else if (ext === '.png') {
        await image
          .png({ quality: config.pngQuality, compressionLevel: 9 })
          .toFile(outputPathOriginal);
      } else if (ext === '.webp') {
        await image
          .webp({ quality: config.webpQuality })
          .toFile(outputPathOriginal);
      }
      
      // Create WebP version if enabled
      if (config.createWebp && ext !== '.webp') {
        const outputPathWebp = path.join(config.outputDir, `${filename}.webp`);
        await image
          .webp({ quality: config.webpQuality })
          .toFile(outputPathWebp);
        console.log(`  Created WebP version: ${filename}.webp`);
      }
      
      // Create AVIF version if enabled
      if (config.createAvif) {
        const outputPathAvif = path.join(config.outputDir, `${filename}.avif`);
        await image
          .avif({ quality: config.avifQuality })
          .toFile(outputPathAvif);
        console.log(`  Created AVIF version: ${filename}.avif`);
      }
      
      // Compare file sizes
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPathOriginal).size;
      const savingsPercent = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
      
      console.log(`  Optimized: ${(originalSize / 1024).toFixed(2)}KB → ${(optimizedSize / 1024).toFixed(2)}KB (${savingsPercent}% saved)`);
    }
    
    console.log('\nImage optimization complete!');
    console.log(`Optimized images saved to: ${config.outputDir}`);
    
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();