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

export function getGalleryAssets() {
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

  // Sort videos first for featured selection, then photos
  items.sort((a, b) => (a.kind === "video" && b.kind !== "video" ? -1 : 1));

  return items;
}

export function filterGalleryAssets(items, category) {
  if (!category || category === "ALL") {
    // Exclude CREATIVE PRODUCT images from ALL section as requested
    return items.filter((item) => {
      const folderLower = (item.folder || "").toLowerCase();
      return (
        folderLower !== "creative product" &&
        folderLower !== "creative_product" &&
        item.sub !== "CREATIVE PRODUCT"
      );
    });
  }

  const targetFolders = CATEGORY_MAP[category] || [];
  if (targetFolders.length === 0) {
    return items.filter(
      (item) => item.category === category || item.sub === category
    );
  }

  return items.filter((item) => {
    const itemPath = item.path.toLowerCase();
    const itemFolder = item.folder.toLowerCase();
    return targetFolders.some((folder) => {
      const f = folder.toLowerCase();
      return itemPath.includes(f) || itemFolder === f;
    });
  });
}

export function useGalleryAssets() {
  return useMemo(() => getGalleryAssets(), []);
}
