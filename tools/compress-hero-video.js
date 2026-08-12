import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const inputFile = path.resolve('src/assets/HomeHeroBackground vedio.mp4');
const outputFile = path.resolve('src/assets/HomeHeroBackground_compressed.mp4');

console.log('Compressing Hero Background Video with ffmpeg...');
console.log('Input:', inputFile);

const ffmpegArgs = [
  '-i', inputFile,
  '-vf', "scale='min(1920,iw)':'-2'",
  '-vcodec', 'libx264',
  '-crf', '23',
  '-preset', 'slow',
  '-an',
  '-movflags', '+faststart',
  '-y',
  outputFile
];

const ffmpegProc = spawn(ffmpegPath, ffmpegArgs);

ffmpegProc.stderr.on('data', (data) => {
  const line = data.toString();
  if (line.includes('time=')) {
    process.stdout.write('\r' + line.trim());
  }
});

ffmpegProc.on('close', (code) => {
  if (code === 0) {
    const inSize = (fs.statSync(inputFile).size / 1024 / 1024).toFixed(2);
    const outSize = (fs.statSync(outputFile).size / 1024 / 1024).toFixed(2);
    console.log(`\nCompression completed successfully!`);
    console.log(`Original Size: ${inSize} MB`);
    console.log(`Compressed Size: ${outSize} MB`);
    
    fs.renameSync(outputFile, inputFile);
    console.log(`Replaced original video file with compressed version.`);
  } else {
    console.error(`\nffmpeg process exited with code ${code}`);
  }
});
