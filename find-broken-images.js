/**
 * This script finds all image references in HTML files
 * Run with: node find-broken-images.js
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

// Regular expression to find image references in HTML
const imgRegex = /(?:src|href)=["']([^"']+\.(jpg|jpeg|png|gif|svg|ico|bmp))["']/gi;

// Track all found image references
const imageRefs = new Map();

async function scanDirectory(dir) {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        // Skip node_modules and other unwanted directories
        if (!file.startsWith('.') && file !== 'node_modules') {
          await scanDirectory(filePath);
        }
      } else if (stats.isFile() && /\.(html?|htm)$/i.test(file)) {
        try {
          const content = await readFile(filePath, 'utf8');
          let match;
          
          while ((match = imgRegex.exec(content)) !== null) {
            const imgPath = match[1];
            // Skip external URLs
            if (!imgPath.startsWith('http') && !imgPath.startsWith('//')) {
              const absolutePath = path.resolve(dir, imgPath);
              const normalizedPath = absolutePath.replace(/\\/g, '/');
              
              if (!imageRefs.has(normalizedPath)) {
                imageRefs.set(normalizedPath, []);
              }
              imageRefs.get(normalizedPath).push(filePath);
            }
          }
        } catch (err) {
          console.error(`Error reading ${filePath}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning directory ${dir}: ${err.message}`);
  }
}

// Check if images exist and create report
async function generateReport() {
  const rootDir = path.resolve(__dirname);
  await scanDirectory(rootDir);
  
  console.log('=== Image Reference Report ===');
  console.log(`Found ${imageRefs.size} unique image references\n`);
  
  const missingImages = [];
  
  for (const [imgPath, referencingFiles] of imageRefs) {
    try {
      await stat(imgPath);
      // Image exists
    } catch (err) {
      missingImages.push({
        path: imgPath,
        referencedIn: referencingFiles
      });
    }
  }
  
  console.log(`\n=== Missing Images (${missingImages.length}) ===`);
  missingImages.forEach((img, i) => {
    console.log(`${i + 1}. ${img.path}`);
    console.log('   Referenced in:');
    img.referencedIn.forEach(file => console.log(`   - ${file}`));
    console.log('');
  });
  
  // Write report to file
  fs.writeFileSync('missing-images-report.json', 
    JSON.stringify(missingImages, null, 2));
  
  console.log('Report written to missing-images-report.json');
}

generateReport().catch(console.error);
