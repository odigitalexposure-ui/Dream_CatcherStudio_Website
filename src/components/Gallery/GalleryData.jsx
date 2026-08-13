import { useMemo } from "react";

export const FILTERS = {
  ALL: {
    label: "ALL",
  },
  PORTRAIT: {
    label: "PORTRAIT",
    children: ["MATERNITY", "WEDDING & OTHERS", "FASHION", "EVENT"],
  },
  COMMERCIAL: {
    label: "COMMERCIAL",
    children: [
      "JEWELLERY",
      "FOOD",
      "VIDEOMAKING",
      "GRAPHIC DESIGN",
      "BEFORE & AFTER",
      "CREATIVE PRODUCT",
      "MISCELLANEOUS",
    ],
  },
  MISCELLANEOUS: {
    label: "MISCELLANEOUS",
  },
};

const CATEGORY_MAP = {
  ALL: [],
  PORTRAIT: ["Maternity", "Wedding&others", "Fashion", "Event"],
  COMMERCIAL: [
    "Before_After",
    "Food",
    "Graphic_Design_Manipulation",
    "Jewellery",
    "Videomaking",
    "CREATIVE PRODUCT",
    "Creative_product",
    "Miscellaneous Photos",
    "Miscellaneous",
  ],
  MATERNITY: ["Maternity"],
  "WEDDING & OTHERS": ["Wedding&others"],
  WEDDING: ["Wedding&others"],
  FASHION: ["Fashion"],
  EVENT: ["Event"],
  JEWELLERY: ["Jewellery"],
  FOOD: ["Food"],
  VIDEOMAKING: ["Videomaking"],
  "GRAPHIC DESIGN": ["Graphic_Design_Manipulation"],
  "BEFORE & AFTER": ["Before_After"],
  "CREATIVE PRODUCT": ["CREATIVE PRODUCT", "Creative_product"],
  MISCELLANEOUS: ["Miscellaneous Photos", "Miscellaneous"],
};

function detectCategory(folder) {
  const lower = folder.toLowerCase();
  if (
    lower.includes("maternity") ||
    lower.includes("wedding") ||
    lower.includes("fashion") ||
    lower.includes("event")
  ) {
    return "PORTRAIT";
  }
  return "COMMERCIAL";
}

function detectSubCategory(folder) {
  const lower = folder.toLowerCase();
  if (lower.includes("maternity")) return "MATERNITY";
  if (lower.includes("wedding")) return "WEDDING & OTHERS";
  if (lower.includes("fashion")) return "FASHION";
  if (lower.includes("event")) return "EVENT";
  if (lower.includes("creative") || lower.includes("product")) return "CREATIVE PRODUCT";
  if (lower.includes("jewellery")) return "JEWELLERY";
  if (lower.includes("food")) return "FOOD";
  if (lower.includes("videomaking")) return "VIDEOMAKING";
  if (lower.includes("graphic")) return "GRAPHIC DESIGN";
  if (lower.includes("before")) return "BEFORE & AFTER";
  if (lower.includes("miscellaneous")) return "MISCELLANEOUS";
  return "ALL";
}

let cachedGalleryAssets = null;

export function getGalleryAssets() {
  if (cachedGalleryAssets) return cachedGalleryAssets;

  const modules = import.meta.glob(
    "../../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,mp4,MP4}",
    { eager: false }
  );

  const keys = Object.keys(modules);

  const hasPosterFor = (key) => {
    const base = key.replace(/\.[^/.]+$/, "");
    const exts = [".webp", ".jpg", ".jpeg", ".png"];
    const posterVariants = exts.flatMap((ext) => [
      `${base}.poster${ext}`,
      `${base}${ext}`,
    ]);
    for (const candidate of posterVariants) {
      if (keys.includes(candidate)) return candidate;
    }
    return null;
  };

  const items = [];

  keys.forEach((key, index) => {
    const parts = key.split("/");
    const fileName = parts[parts.length - 1].toLowerCase();
    const folderName = parts.length >= 2 ? parts[parts.length - 2] : "";

    // Ignore non-portfolio assets, logo files, and posters as standalone cards
    const ignore = [
      "logo",
      "icon",
      "favicon",
      "facebook",
      "instagram",
      "about_feature",
      ".poster.",
    ].some((word) => fileName.includes(word));

    if (ignore) return;

    const isVideo = fileName.endsWith(".mp4");
    const posterKey = isVideo ? hasPosterFor(key) : null;

    items.push({
      id: `${folderName}-${fileName}-${index}`,
      name: fileName,
      path: key,
      loader: modules[key],
      posterLoader: posterKey ? modules[posterKey] : null,
      kind: isVideo ? "video" : "image",
      type: isVideo ? "video" : "image",
      category: detectCategory(folderName),
      sub: detectSubCategory(folderName),
      folder: folderName,
      alt: fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    });
  });

  // Sort items by natural alphanumeric name order
  items.sort((a, b) => {
    return (a.name || "").localeCompare(b.name || "", undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  cachedGalleryAssets = items;
  return items;
}

/**
 * Interleave videos organically among photos (e.g. 2 photos, 1 video, 1 photo, 1 video, 3 photos...)
 * so videos are placed randomly/dynamically throughout the grid instead of all stacked at the top.
 */
export function interleaveVideosAndPhotos(items) {
  const videos = items.filter((i) => i.kind === "video" || i.type === "video");
  const photos = items.filter((i) => i.kind !== "video" && i.type !== "video");

  if (videos.length === 0) return photos;
  if (photos.length === 0) return videos;

  // Natural varying gap pattern (2 photos, 1 photo, 3 photos, 2 photos, 4 photos, 1 photo...)
  const gapPattern = [2, 1, 3, 2, 4, 1, 3, 2, 1, 3, 4, 2];

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

export function filterGalleryAssets(items, category) {
  let filtered = [];
  if (!category || category === "ALL") {
    // Exclude CREATIVE PRODUCT images from ALL section as requested
    filtered = items.filter((item) => {
      const folderLower = (item.folder || "").toLowerCase();
      return (
        folderLower !== "creative product" &&
        folderLower !== "creative_product" &&
        item.sub !== "CREATIVE PRODUCT"
      );
    });
  } else {
    const targetFolders = CATEGORY_MAP[category] || [];
    if (targetFolders.length === 0) {
      filtered = items.filter(
        (item) => item.category === category || item.sub === category
      );
    } else {
      filtered = items.filter((item) => {
        const itemPath = item.path.toLowerCase();
        const itemFolder = item.folder.toLowerCase();
        return targetFolders.some((folder) => {
          const f = folder.toLowerCase();
          return itemPath.includes(f) || itemFolder === f;
        });
      });
    }
  }

  // Sort photos and videos by natural alphanumeric order within their respective groups
  const sorted = [...filtered].sort((a, b) => {
    return (a.name || "").localeCompare(b.name || "", undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  // Interleave videos and photos for dynamic, organic structural placement
  return interleaveVideosAndPhotos(sorted);
}

export function useGalleryAssets() {
  return useMemo(() => getGalleryAssets(), []);
}
