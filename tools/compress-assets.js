import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import ffmpegPath from "ffmpeg-static";

const execFileAsync = promisify(execFile);
const assetsDir = path.resolve("./src/assets");

async function getAllFiles(dir, fileList = []) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const res = path.join(dir, file.name);
    if (file.isDirectory()) {
      await getAllFiles(res, fileList);
    } else {
      fileList.push(res);
    }
  }
  return fileList;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  if (filePath.includes(".poster.")) return;

  const tempPath = filePath + ".tmp" + ext;
  try {
    const args = [
      "-y",
      "-i",
      filePath,
      "-vf",
      "scale='min(1600,iw)':-2",
      "-frames:v",
      "1",
      "-update",
      "1",
      "-q:v",
      "4",
      tempPath,
    ];
    await execFileAsync(ffmpegPath, args);

    const origStat = await fs.promises.stat(filePath);
    const tempStat = await fs.promises.stat(tempPath);

    if (tempStat.size < origStat.size) {
      await fs.promises.rename(tempPath, filePath);
      console.log(
        `[IMAGE] ${path.relative(assetsDir, filePath)}: ${(origStat.size / 1024).toFixed(0)}KB -> ${(tempStat.size / 1024).toFixed(0)}KB`
      );
    } else {
      await fs.promises.unlink(tempPath);
      console.log(`[IMAGE] ${path.relative(assetsDir, filePath)}: skipped (original smaller)`);
    }
  } catch (err) {
    console.error(`[IMAGE ERROR] ${filePath}:`, err.message);
    if (fs.existsSync(tempPath)) {
      await fs.promises.unlink(tempPath).catch(() => {});
    }
  }
}

async function compressVideo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== ".mp4") return;

  const tempPath = filePath + ".tmp.mp4";
  try {
    const args = [
      "-y",
      "-i",
      filePath,
      "-vf",
      "scale='min(1280,iw)':-2",
      "-c:v",
      "libx264",
      "-crf",
      "27",
      "-preset",
      "fast",
      "-movflags",
      "+faststart",
      "-an",
      tempPath,
    ];
    await execFileAsync(ffmpegPath, args);

    const origStat = await fs.promises.stat(filePath);
    const tempStat = await fs.promises.stat(tempPath);

    if (tempStat.size < origStat.size) {
      await fs.promises.rename(tempPath, filePath);
      console.log(
        `[VIDEO] ${path.relative(assetsDir, filePath)}: ${(origStat.size / (1024 * 1024)).toFixed(1)}MB -> ${(tempStat.size / (1024 * 1024)).toFixed(1)}MB`
      );
    } else {
      await fs.promises.unlink(tempPath);
      console.log(`[VIDEO] ${path.relative(assetsDir, filePath)}: skipped (original smaller)`);
    }
  } catch (err) {
    console.error(`[VIDEO ERROR] ${filePath}:`, err.message);
    if (fs.existsSync(tempPath)) {
      await fs.promises.unlink(tempPath).catch(() => {});
    }
  }
}

async function main() {
  console.log("Starting media asset compression in src/assets/...");
  const allFiles = await getAllFiles(assetsDir);

  const images = allFiles.filter((f) =>
    [".jpg", ".jpeg", ".png"].includes(path.extname(f).toLowerCase()) && !f.includes(".poster.")
  );
  const videos = allFiles.filter((f) => path.extname(f).toLowerCase() === ".mp4");

  console.log(`Found ${images.length} images and ${videos.length} videos.`);

  console.log("Compressing images...");
  for (const img of images) {
    await compressImage(img);
  }

  console.log("Compressing videos...");
  for (const vid of videos) {
    await compressVideo(vid);
  }

  console.log("Asset compression complete!");
}

main().catch((err) => {
  console.error("Compression failed:", err);
  process.exit(1);
});
