import { access, mkdir, readdir } from 'fs/promises';
import { spawn } from 'child_process';
import path from 'path';

import ffmpegPath from 'ffmpeg-static';

const ASSETS_ROOT = path.resolve('src/assets');
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm', '.mkv'];
const POSTER_EXTENSIONS = ['.poster.webp', '.poster.jpg', '.webp', '.jpg'];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findFiles(directory) {
  const results = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findFiles(entryPath)));
    } else if (VIDEO_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(entryPath);
    }
  }
  return results;
}

function runCommand(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath, args, { stdio: 'inherit' });
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
  });
}

async function checkFfmpeg() {
  try {
    await runCommand(['-version']);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const hasFfmpeg = await checkFfmpeg();
  if (!hasFfmpeg) {
    console.warn('Warning: ffmpeg not found. Video posters will not be generated automatically until ffmpeg is installed.');
    return;
  }

  const videoFiles = await findFiles(ASSETS_ROOT);
  if (!videoFiles.length) {
    console.log('No video files found in src/assets. Nothing to generate.');
    return;
  }

  for (const videoPath of videoFiles) {
    const dir = path.dirname(videoPath);
    const baseName = path.basename(videoPath, path.extname(videoPath));
    const posterPaths = POSTER_EXTENSIONS.map((ext) => path.join(dir, `${baseName}${ext}`));
    const existingPoster = (await Promise.all(posterPaths.map((poster) => exists(poster)))).some(Boolean);

    if (existingPoster) {
      console.log(`Skipping poster generation for ${videoPath} because a poster already exists.`);
      continue;
    }

    const jpgOutput = path.join(dir, `${baseName}.poster.jpg`);
    const webpOutput = path.join(dir, `${baseName}.poster.webp`);

    try {
      await mkdir(dir, { recursive: true });
      console.log(`Generating posters for: ${videoPath}`);
      await runCommand([
        '-y',
        '-ss',
        '00:00:01',
        '-i',
        videoPath,
        '-frames:v',
        '1',
        '-q:v',
        '2',
        jpgOutput,
      ]);
      await runCommand([
        '-y',
        '-ss',
        '00:00:01',
        '-i',
        videoPath,
        '-frames:v',
        '1',
        '-compression_level',
        '6',
        webpOutput,
      ]);
      console.log(`Generated posters: ${path.relative(process.cwd(), jpgOutput)}, ${path.relative(process.cwd(), webpOutput)}`);
    } catch (error) {
      console.error(`Failed to generate posters for ${videoPath}:`, error.message || error);
    }
  }
}

main().catch((error) => {
  console.error('Video poster generation failed:', error);
  process.exit(1);
});