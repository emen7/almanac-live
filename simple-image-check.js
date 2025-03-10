/**
 * A simplified script to check for missing images
 * Run with: node simple-image-check.js
 */
const fs = require('fs');
const path = require('path');

// Check if directories exist
const directories = ['images', 'ImagesMin', 'MainPics', 'downloaded-images'];
const existingDirs = [];

console.log('Checking directories:');
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    existingDirs.push(dir);
    console.log(`✅ ${dir}: exists`);
  } else {
    console.log(`❌ ${dir}: missing`);
  }
});

// Read missing images from the markdown file directly
// This avoids JSON parsing issues
let missingImagesData = null;
try {
  const mdContent = fs.readFileSync('image-restoration-plan.md', 'utf8');
  
  // Extract file names using regex
  const fileRegex = /^- ([^(\n]+?)$/gm;
  const matches = [...mdContent.matchAll(fileRegex)];
  const filenames = matches.map(match => match[1].trim());
  
  missingImagesData = {
    count: filenames.length,
    filenames: filenames
  };
  
  console.log(`\nFound ${missingImagesData.count} missing image references`);
} catch (err) {
  console.error(`\nError reading image-restoration-plan.md: ${err.message}`);
  console.log('Make sure you have run find-broken-images.js and restore-images-plan.js');
  process.exit(1);
}

// Function to find image files in a directory (non-recursive)
function findImagesInDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    
    return fs.readdirSync(dirPath)
      .filter(file => {
        const filePath = path.join(dirPath, file);
        return fs.statSync(filePath).isFile() && 
               /\.(jpg|jpeg|png|gif|svg|ico|bmp)$/i.test(file);
      });
  } catch (err) {
    console.error(`Error reading directory ${dirPath}: ${err.message}`);
    return [];
  }
}

// Check if missing images exist in any of our directories
console.log('\nChecking for missing images in existing directories...');

const foundImages = [];
const stillMissingImages = [];

missingImagesData.filenames.forEach(filename => {
  let found = false;
  
  for (const dir of existingDirs) {
    const dirPath = path.join(__dirname, dir);
    const files = findImagesInDir(dirPath);
    
    // Case-insensitive search
    const matchingFile = files.find(file => file.toLowerCase() === filename.toLowerCase());
    
    if (matchingFile) {
      foundImages.push({
        filename: filename,
        location: path.join(dir, matchingFile)
      });
      found = true;
      break;
    }
  }
  
  if (!found) {
    stillMissingImages.push(filename);
  }
});

// Generate report
console.log(`\nFound ${foundImages.length} of ${missingImagesData.count} missing images locally`);
console.log(`${stillMissingImages.length} images are still missing`);

// Create a simple report
let report = '# Image Search Results\n\n';
report += `Total missing images: ${missingImagesData.count}\n`;
report += `Images found locally: ${foundImages.length}\n`;
report += `Images still missing: ${stillMissingImages.length}\n\n`;

if (foundImages.length > 0) {
  report += '## Found Images\n\n';
  foundImages.forEach(img => {
    report += `- ${img.filename} (Found in: ${img.location})\n`;
  });
  report += '\n';
}

if (stillMissingImages.length > 0) {
  report += '## Still Missing Images\n\n';
  stillMissingImages.forEach(filename => {
    report += `- ${filename}\n`;
  });
}

fs.writeFileSync('simple-image-report.md', report);
console.log('\nReport written to simple-image-report.md');

// Create a copy script
if (foundImages.length > 0) {
  let copyScript = '# PowerShell Script to Copy Found Images\n\n';
  copyScript += '# Create the images directory if it doesn\'t exist\n';
  copyScript += 'New-Item -ItemType Directory -Force -Path "images"\n\n';
  
  foundImages.forEach(img => {
    copyScript += `# Copy ${img.filename}\n`;
    copyScript += `Copy-Item -Path "${img.location}" -Destination "images/${img.filename}"\n`;
  });
  
  fs.writeFileSync('copy-found-images.ps1', copyScript);
  console.log('Copy script written to copy-found-images.ps1');
}
