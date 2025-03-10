/**
 * This script reconstructs the images folder from ImagesMin and MainPics
 * and updates HTML references to those images
 * Run with: node reorganize-images.js
 */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
  console.log(`Created directory: ${imagesDir}`);
}

// Function to find all image files recursively in a directory
async function findImagesInDir(dir, fileList = []) {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        // Recursively search subdirectories
        await findImagesInDir(filePath, fileList);
      } else if (stats.isFile() && 
                /\.(jpg|jpeg|png|gif|svg|ico|bmp|pdf)$/i.test(file)) {
        fileList.push(filePath);
      }
    }
    
    return fileList;
  } catch (err) {
    console.error(`Error scanning directory ${dir}: ${err.message}`);
    return fileList;
  }
}

// Function to scan HTML files and find image references
async function findImageReferencesInHtml() {
  const imgRefs = new Map(); // Map to store image references
  const htmlFiles = [];
  const imgRegex = /(?:src|href)=["']([^"']+\.(jpg|jpeg|png|gif|svg|ico|bmp))["']/gi;
  
  async function scanDir(dir) {
    try {
      const files = await readdir(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await stat(filePath);
        
        if (stats.isDirectory()) {
          // Skip certain directories
          if (!['node_modules', '.git', 'images', 'ImagesMin'].includes(file)) {
            await scanDir(filePath);
          }
        } else if (stats.isFile() && /\.(html?|htm)$/i.test(file)) {
          htmlFiles.push(filePath);
          
          // Extract image references
          const content = await readFile(filePath, 'utf8');
          let match;
          
          while ((match = imgRegex.exec(content)) !== null) {
            const imgPath = match[1];
            // Skip external URLs
            if (!imgPath.startsWith('http') && !imgPath.startsWith('//')) {
              if (!imgRefs.has(imgPath)) {
                imgRefs.set(imgPath, []);
              }
              imgRefs.get(imgPath).push(filePath);
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error scanning directory ${dir}: ${err.message}`);
    }
  }
  
  await scanDir(__dirname);
  return { imgRefs, htmlFiles };
}

// Main function to reorganize images
async function reorganizeImages() {
  console.log('Starting image reorganization...');
  
  // 1. Find all images in ImagesMin and MainPics
  const imagesMinDir = path.join(__dirname, 'ImagesMin');
  const mainPicsDir = path.join(__dirname, 'MainPics');
  
  // Check if the directories exist first
  if (!fs.existsSync(imagesMinDir)) {
    console.error(`❌ Error: ImagesMin directory doesn't exist at ${imagesMinDir}`);
    console.log('Please create the ImagesMin directory and add your images to it.');
    console.log('You can use: node setup-image-dirs.js');
    return;
  }
  
  if (!fs.existsSync(mainPicsDir)) {
    console.error(`❌ Error: MainPics directory doesn't exist at ${mainPicsDir}`);
    console.log('Please create the MainPics directory and add your images to it.');
    console.log('You can use: node setup-image-dirs.js');
    return;
  }
  
  console.log('Finding images in ImagesMin and MainPics...');
  const imagesMinFiles = fs.existsSync(imagesMinDir) ? await findImagesInDir(imagesMinDir) : [];
  const mainPicsFiles = fs.existsSync(mainPicsDir) ? await findImagesInDir(mainPicsDir) : [];
  
  console.log(`Found ${imagesMinFiles.length} images in ImagesMin`);
  console.log(`Found ${mainPicsFiles.length} images in MainPics`);
  
  // 2. Find image references in HTML files
  console.log('\nScanning HTML files for image references...');
  const { imgRefs, htmlFiles } = await findImageReferencesInHtml();
  console.log(`Found ${htmlFiles.length} HTML files with ${imgRefs.size} unique image references`);
  
  // 3. Create a map of all available image files
  const allImageFiles = [...imagesMinFiles, ...mainPicsFiles];
  const availableImagesMap = new Map();
  
  allImageFiles.forEach(imgPath => {
    const filename = path.basename(imgPath);
    // Store with lowercase key for case-insensitive matching
    availableImagesMap.set(filename.toLowerCase(), imgPath);
  });
  
  // 4. Analyze image references and available files
  console.log('\nAnalyzing image references...');
  
  const imagesToCopy = new Map();
  const missingImages = [];
  
  for (const [refPath, htmlFilesList] of imgRefs.entries()) {
    const refFilename = path.basename(refPath);
    const refLower = refFilename.toLowerCase();
    
    // Check if we have this image in our available images
    if (availableImagesMap.has(refLower)) {
      const sourcePath = availableImagesMap.get(refLower);
      const destPath = path.join(imagesDir, refFilename);
      
      imagesToCopy.set(sourcePath, {
        destPath,
        refPath,
        htmlFiles: htmlFilesList
      });
    } else {
      missingImages.push({
        refPath,
        htmlFiles: htmlFilesList
      });
    }
  }
  
  console.log(`Found ${imagesToCopy.size} images to copy to the images directory`);
  console.log(`Missing ${missingImages.length} referenced images`);
  
  // 5. Copy images to the images directory
  console.log('\nCopying images to the images directory...');
  
  const copiedImages = [];
  const failedCopies = [];
  
  for (const [sourcePath, { destPath }] of imagesToCopy.entries()) {
    try {
      await copyFile(sourcePath, destPath);
      copiedImages.push({ sourcePath, destPath });
    } catch (err) {
      console.error(`Error copying ${sourcePath} to ${destPath}: ${err.message}`);
      failedCopies.push({ sourcePath, destPath, error: err.message });
    }
  }
  
  console.log(`Successfully copied ${copiedImages.length} images`);
  console.log(`Failed to copy ${failedCopies.length} images`);
  
  // 6. Generate PowerShell script for any manual fixes needed
  let fixScript = `# PowerShell Script to Fix Images\n\n`;
  
  // Add commands to create missing image references
  if (missingImages.length > 0) {
    fixScript += `# Missing Images\n`;
    fixScript += `# These images are referenced in HTML files but not found in ImagesMin or MainPics\n\n`;
    
    missingImages.forEach(({ refPath, htmlFiles }) => {
      fixScript += `# Image: ${refPath}\n`;
      fixScript += `# Referenced in: ${htmlFiles.map(f => path.basename(f)).join(', ')}\n`;
      fixScript += `Write-Host "Missing image: ${refPath}" -ForegroundColor Red\n\n`;
    });
  }
  
  // Add commands to fix failed copies
  if (failedCopies.length > 0) {
    fixScript += `# Failed Copies\n`;
    failedCopies.forEach(({ sourcePath, destPath }) => {
      fixScript += `Copy-Item -Path "${sourcePath}" -Destination "${destPath}" -Force\n`;
    });
    fixScript += `\n`;
  }
  
  fs.writeFileSync('fix-missing-images.ps1', fixScript);
  
  // 7. Generate a report
  let report = `# Image Reorganization Report\n\n`;
  report += `## Summary\n\n`;
  report += `- Total images found: ${allImageFiles.length}\n`;
  report += `- Images in ImagesMin: ${imagesMinFiles.length}\n`;
  report += `- Images in MainPics: ${mainPicsFiles.length}\n`;
  report += `- Images referenced in HTML: ${imgRefs.size}\n`;
  report += `- Images successfully copied: ${copiedImages.length}\n`;
  report += `- Images failed to copy: ${failedCopies.length}\n`;
  report += `- Missing images: ${missingImages.length}\n\n`;
  
  report += `## Missing Images\n\n`;
  missingImages.forEach(({ refPath, htmlFiles }) => {
    report += `- **${refPath}**\n`;
    report += `  Referenced in: ${htmlFiles.map(f => path.relative(__dirname, f)).join(', ')}\n\n`;
  });
  
  report += `## Next Steps\n\n`;
  report += `1. Run the fix-missing-images.ps1 script to handle any special cases\n`;
  report += `2. Update your Git repository to include the images folder\n`;
  report += `3. Commit your changes\n`;
  
  fs.writeFileSync('image-reorganization-report.md', report);
  
  console.log('\nImage reorganization complete!');
  console.log('Check image-reorganization-report.md for details');
  console.log('Run fix-missing-images.ps1 for any manual fixes needed');
}

// Run the script
reorganizeImages().catch(console.error);
