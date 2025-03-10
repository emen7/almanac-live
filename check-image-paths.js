/**
 * This script checks if HTML files reference images correctly
 * Run with: node check-image-paths.js
 */
const fs = require('fs');
const path = require('path');

// Get list of HTML files
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.htm') || file.endsWith('.html'));

// Get list of images in images folder
const imagesFolder = path.join(__dirname, 'images');
const availableImages = fs.existsSync(imagesFolder) ? 
  fs.readdirSync(imagesFolder) : [];

console.log(`Found ${htmlFiles.length} HTML files`);
console.log(`Found ${availableImages.length} images in the images folder`);

// Check each HTML file
const problematicReferences = [];

htmlFiles.forEach(htmlFile => {
  const filePath = path.join(__dirname, htmlFile);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find image references
  const imgRegex = /(?:src|href)=["']([^"':]+\.(jpg|jpeg|png|gif|svg|ico|bmp))["']/gi;
  let match;
  
  while ((match = imgRegex.exec(content)) !== null) {
    const imgPath = match[1];
    const imgFilename = path.basename(imgPath);
    
    // Skip external URLs and paths that already reference the images folder
    if (imgPath.startsWith('http') || imgPath.startsWith('//') || imgPath.startsWith('images/')) {
      continue;
    }
    
    // Check if this image exists in the images folder
    const imageInFolder = availableImages.find(img => 
      img.toLowerCase() === imgFilename.toLowerCase()
    );
    
    if (imageInFolder) {
      problematicReferences.push({
        htmlFile,
        originalPath: imgPath,
        suggestedPath: `images/${imageInFolder}`,
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
});

// Generate a report
if (problematicReferences.length > 0) {
  console.log(`\nFound ${problematicReferences.length} image references that need updating`);
  
  // Group by HTML file
  const fileGroups = {};
  problematicReferences.forEach(ref => {
    if (!fileGroups[ref.htmlFile]) {
      fileGroups[ref.htmlFile] = [];
    }
    fileGroups[ref.htmlFile].push(ref);
  });
  
  // Show report by file
  for (const [file, refs] of Object.entries(fileGroups)) {
    console.log(`\n${file} (${refs.length} references):`);
    refs.forEach(ref => {
      console.log(`  Line ${ref.line}: "${ref.originalPath}" -> "images/${path.basename(ref.suggestedPath)}"`);
    });
  }
  
  // Create a fix script
  console.log('\nTo fix these references automatically, you can create a script that updates the HTML files.');
} else {
  console.log('\nNo problematic image references found. Your HTML files appear to correctly reference the images folder.');
}
