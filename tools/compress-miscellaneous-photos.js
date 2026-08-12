import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const DIR = path.resolve('src/assets/Miscellaneous Photos');
const TEMP_DIR = path.resolve('scratch/compressed_temp');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function compressImage(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, [
      '-y',
      '-i', inputFile,
      '-vf', "scale='min(1920,iw)':'-2'",
      '-q:v', '4',
      '-update', '1',
      '-frames:v', '1',
      outputFile
    ]);

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code} for file ${inputFile}`));
      }
    });
    proc.on('error', reject);
  });
}

async function run() {
  const files = fs.readdirSync(DIR);
  let totalOriginal = 0;
  let totalCompressed = 0;
  let processedCount = 0;

  console.log(`Starting compression for ${files.length} images in "${DIR}"...`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

    const inPath = path.join(DIR, file);
    const tempPath = path.join(TEMP_DIR, file);
    const origSize = fs.statSync(inPath).size;
    totalOriginal += origSize;

    try {
      await compressImage(inPath, tempPath);
      const newSize = fs.statSync(tempPath).size;

      // Only replace if compressed version is actually smaller or if original is > 500KB
      if (newSize < origSize || origSize > 500 * 1024) {
        fs.copyFileSync(tempPath, inPath);
        totalCompressed += newSize;
        console.log(`✓ ${file}: ${(origSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024 / 1024).toFixed(2)} MB`);
      } else {
        totalCompressed += origSize;
        console.log(`- ${file}: Kept original (${(origSize / 1024 / 1024).toFixed(2)} MB)`);
      }
      processedCount++;
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err.message);
      totalCompressed += origSize;
    }
  }

  // Cleanup temp dir
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log('\n==========================================');
  console.log(`Compression Complete!`);
  console.log(`Processed: ${processedCount} files`);
  console.log(`Original Total Size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Compressed Total Size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Reduction: ${(((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)}% saved!`);
  console.log('==========================================\n');
}

run().catch(console.error);
