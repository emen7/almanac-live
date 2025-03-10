/**
 * This script cleans up temporary files generated during image restoration
 * Run with: node cleanup.js
 */
const fs = require('fs');
const path = require('path');

// List of temporary files to clean up
const temporaryFiles = [
  'missing-images-report.json',
  'image-restoration-plan.json',
  'image-restoration-plan.md',
  'create-image-directories.ps1',
  'restore-found-images.ps1',
  'fix-missing-images.ps1',
  'simple-image-report.md',
  'copy-found-images.ps1',
  'image-reorganization-report.md',
  'fix-problematic-filenames.ps1',
  'problematic-filenames-report.md'
];

// List of script files to keep
const scriptFilesToKeep = [
  'cleanup.js'
];

// Temporary directories that can be removed if desired
const optionalDirs = [
  'ImagesMin',
  'MainPics',
  'downloaded-images'
];

// Count successfully deleted files
let deletedCount = 0;

console.log('Cleaning up temporary files...');

// Delete temporary files
temporaryFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted: ${file}`);
      deletedCount++;
    } catch (err) {
      console.error(`❌ Error deleting ${file}: ${err.message}`);
    }
  } else {
    console.log(`ℹ️ Not found: ${file}`);
  }
});

// List optional directories that can be removed
console.log('\nOptional directories that can be removed:');
optionalDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`- ${dir}`);
  }
});

console.log(`\nDeleted ${deletedCount} temporary files`);
console.log('\nIf you want to remove the script files as well, run:');
console.log('git rm *.js');
console.log('git commit -m "Remove image restoration scripts"');
console.log('\nYour website should now be fully restored with all necessary images!');
