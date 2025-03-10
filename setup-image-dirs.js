/**
 * This script creates necessary directories for image reorganization
 * Run with: node setup-image-dirs.js
 */
const fs = require('fs');
const path = require('path');

// Create the necessary directories
const directories = [
  'images',
  'ImagesMin',
  'MainPics',
  'downloaded-images'
];

console.log('Creating necessary directories...');

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`✅ Created: ${dirPath}`);
  } else {
    console.log(`⏭️ Already exists: ${dirPath}`);
  }
});

console.log('\nDirectories are ready!');
console.log('\nNext steps:');
console.log('1. Move or copy your images into ImagesMin and MainPics folders');
console.log('2. Run: node reorganize-images.js');
