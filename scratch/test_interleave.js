import fs from 'fs';
import path from 'path';

// Let's test the gap pattern with sample photo and video arrays
const photos = Array.from({ length: 40 }, (_, i) => ({ id: `photo-${i+1}`, kind: 'image' }));
const videos = Array.from({ length: 15 }, (_, i) => ({ id: `video-${i+1}`, kind: 'video' }));

const gapPattern = [2, 1, 3, 2, 4, 1, 3, 2, 1, 3, 4, 2];

function interleaveVideosAndPhotos(photos, videos) {
  const result = [];
  let videoIdx = 0;
  let photoIdx = 0;
  let patternIdx = 0;

  while (photoIdx < photos.length || videoIdx < videos.length) {
    const gap = gapPattern[patternIdx % gapPattern.length];
    patternIdx++;

    for (let i = 0; i < gap && photoIdx < photos.length; i++) {
      result.push(photos[photoIdx++]);
    }

    if (videoIdx < videos.length) {
      result.push(videos[videoIdx++]);
    }
  }

  return result;
}

const interleaved = interleaveVideosAndPhotos(photos, videos);
console.log("Total items:", interleaved.length);
console.log("Item sequence:", interleaved.map(x => x.id).join(', '));
