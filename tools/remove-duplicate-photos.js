import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function getHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex');
}

// 1. Hashes of images used in About section
const aboutTopImages = [
  'src/assets/Fashion/000A2486 copy.jpg',
  'src/assets/Jewellery/_DSC1577 copy 2.jpg',
  'src/assets/Food/cake-with-tea-table copy.jpg'
].map(p => path.resolve(p));

const weddingDir = path.resolve('src/assets/Wedding&others');
const weddingFiles = fs.readdirSync(weddingDir).map(f => path.join(weddingDir, f));

const aboutHashes = new Set();
aboutTopImages.concat(weddingFiles).forEach(f => {
  const h = getHash(f);
  if (h) aboutHashes.add(h);
});

// 2. Check Miscellaneous Photos
const miscDir = path.resolve('src/assets/Miscellaneous Photos');
const miscFiles = fs.readdirSync(miscDir).map(f => path.join(miscDir, f));

let deletedCount = 0;

miscFiles.forEach(f => {
  const h = getHash(f);
  if (h && aboutHashes.has(h)) {
    console.log(`Removing duplicate file from Miscellaneous Photos: ${path.basename(f)}`);
    fs.unlinkSync(f);
    deletedCount++;
  }
});

console.log(`\nSuccessfully removed ${deletedCount} duplicate image files from Miscellaneous Photos.`);
