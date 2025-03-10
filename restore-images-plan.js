/**
 * This script analyzes missing images and creates a restoration plan
 * Run with: node restore-images-plan.js
 */
const fs = require('fs');
const path = require('path');

// Load the missing images report
const missingImages = JSON.parse(fs.readFileSync('missing-images-report.json', 'utf8'));

// Organize images by directory
const imagesByDirectory = {};
missingImages.forEach(img => {
  const dir = path.dirname(img.path);
  if (!imagesByDirectory[dir]) {
    imagesByDirectory[dir] = [];
  }
  imagesByDirectory[dir].push({
    filename: path.basename(img.path),
    referencedIn: img.referencedIn
  });
});

// Create a restoration plan
const restorationPlan = {
  directories: Object.keys(imagesByDirectory).length,
  totalImages: missingImages.length,
  directoryDetails: []
};

for (const [dir, images] of Object.entries(imagesByDirectory)) {
  restorationPlan.directoryDetails.push({
    directory: dir,
    imageCount: images.length,
    images: images,
    priority: images.length // More references = higher priority
  });
}

// Sort by priority
restorationPlan.directoryDetails.sort((a, b) => b.priority - a.priority);

// Write plan to file
fs.writeFileSync('image-restoration-plan.json', 
  JSON.stringify(restorationPlan, null, 2));

// Create a human-readable version
let report = `# Image Restoration Plan\n\n`;
report += `Total missing images: ${restorationPlan.totalImages}\n`;
report += `Directories to create: ${restorationPlan.directories}\n\n`;

report += `## Directories (in priority order)\n\n`;
restorationPlan.directoryDetails.forEach((dirInfo, i) => {
  report += `### ${i + 1}. ${dirInfo.directory}\n`;
  report += `Contains ${dirInfo.imageCount} images\n\n`;
  report += `Images to restore:\n`;
  dirInfo.images.forEach(img => {
    report += `- ${img.filename}\n`;
  });
  report += `\n`;
});

// Create a PowerShell script to help with directory creation
let psScript = `# PowerShell Script to Create Required Directories\n\n`;
psScript += `# Run this script to create all the necessary directories for image restoration\n\n`;

restorationPlan.directoryDetails.forEach(dirInfo => {
  psScript += `# Create directory: ${dirInfo.directory}\n`;
  psScript += `New-Item -ItemType Directory -Force -Path "${dirInfo.directory}"\n\n`;
});

fs.writeFileSync('create-image-directories.ps1', psScript);

// Write the report to file
fs.writeFileSync('image-restoration-plan.md', report);

console.log('Restoration plan created in image-restoration-plan.json and image-restoration-plan.md');
console.log('PowerShell script created: create-image-directories.ps1');
console.log('\nTo create all required directories, run:');
console.log('    PowerShell -ExecutionPolicy Bypass -File create-image-directories.ps1');
