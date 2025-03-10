/**
 * This script helps identify and fix problematic image filenames with spaces and special characters
 * Run with: node fix-image-filenames.js
 */
const fs = require('fs');
const path = require('path');

// Read the missing images list from markdown file
let missingImages = [];
try {
  const mdContent = fs.readFileSync('image-restoration-plan.md', 'utf8');
  
  // Extract filenames using regex
  const fileRegex = /^- ([^(\n]+?)$/gm;
  const matches = [...mdContent.matchAll(fileRegex)];
  missingImages = matches.map(match => match[1].trim()).filter(name => 
    name.includes(' ') || name.includes('%') || name.includes('(') || name.includes(')')
  );
  
  console.log(`Found ${missingImages.length} problematic filenames with spaces or special characters`);
} catch (err) {
  console.error(`Error reading image-restoration-plan.md: ${err.message}`);
  process.exit(1);
}

// Check ImagesMin directory for files that might match after encoding/decoding
const imagesMinDir = path.join(__dirname, 'ImagesMin');
let availableImages = [];

try {
  if (fs.existsSync(imagesMinDir)) {
    availableImages = fs.readdirSync(imagesMinDir).filter(file => 
      /\.(jpg|jpeg|png|gif|svg|ico|bmp)$/i.test(file)
    );
  }
} catch (err) {
  console.error(`Error reading ImagesMin directory: ${err.message}`);
}

// Create mapping suggestions between problematic filenames and potential matches
const suggestions = [];
const matchedImages = [];

missingImages.forEach(problematicName => {
  // Decode URL-encoded characters
  const decodedName = decodeURIComponent(problematicName);
  
  // Create variations of the name for matching
  const variations = [
    problematicName,
    decodedName,
    problematicName.replace(/%20/g, ' '),
    problematicName.replace(/\s/g, '-'),
    problematicName.replace(/\s/g, '_')
  ];
  
  // Look for potential matches
  for (const image of availableImages) {
    if (variations.some(v => v.toLowerCase() === image.toLowerCase())) {
      suggestions.push({
        problematic: problematicName,
        match: image,
        action: 'rename',
        destination: problematicName
      });
      matchedImages.push(problematicName);
      break;
    }
  }
});

// List problematic filenames that had no match
const unmatchedImages = missingImages.filter(name => !matchedImages.includes(name));

// Generate report
console.log(`\nFound ${suggestions.length} potential matches for problematic filenames`);
console.log(`${unmatchedImages.length} problematic filenames still have no match`);

// Create PowerShell script to fix the filenames
let psScript = `# PowerShell Script to Fix Image Filenames\n\n`;
psScript += `# Create the images directory if it doesn't exist\n`;
psScript += `New-Item -ItemType Directory -Force -Path "images"\n\n`;

suggestions.forEach(({ problematic, match, destination }) => {
  // Determine if we need to URL-decode the destination
  const finalDestination = decodeURIComponent(destination);
  
  psScript += `# Copy ${match} as ${finalDestination}\n`;
  psScript += `Copy-Item -Path "ImagesMin\\${match}" -Destination "images\\${finalDestination}"\n\n`;
});

fs.writeFileSync('fix-problematic-filenames.ps1', psScript);

// Create a report of changes
let report = `# Problematic Filename Analysis\n\n`;
report += `Total problematic filenames: ${missingImages.length}\n`;
report += `Potential matches found: ${suggestions.length}\n`;
report += `Remaining unmatched: ${unmatchedImages.length}\n\n`;

if (suggestions.length > 0) {
  report += `## Matched Filenames\n\n`;
  suggestions.forEach(({ problematic, match }) => {
    report += `- "${problematic}" → "${match}"\n`;
  });
  report += `\n`;
}

if (unmatchedImages.length > 0) {
  report += `## Still Unmatched Filenames\n\n`;
  unmatchedImages.forEach(filename => {
    report += `- ${filename}\n`;
  });
  report += `\n`;
  
  report += `## Unmatched Filenames HTML References\n\n`;
  report += `To find where these images are referenced in your HTML files, search for these strings in your code:\n\n`;
  unmatchedImages.forEach(filename => {
    report += `- \`${filename}\`\n`;
  });
}

fs.writeFileSync('problematic-filenames-report.md', report);

console.log('\nReport written to problematic-filenames-report.md');
console.log('PowerShell script created: fix-problematic-filenames.ps1');
console.log('\nNext steps:');
console.log('1. Review the report to understand the filename issues');
console.log('2. Run the PowerShell script to fix matched filenames:');
console.log('   PowerShell -ExecutionPolicy Bypass -File fix-problematic-filenames.ps1');
console.log('3. For unmatched files, locate them in your HTML and manually fix the references or provide the files');
