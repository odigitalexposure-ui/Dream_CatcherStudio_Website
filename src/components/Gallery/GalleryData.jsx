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
    ],
  },
};

// Detect Main Category from Folder Name
function detectCategory(folder) {
  folder = folder.toLowerCase();

  if (
    folder.includes("maternity") ||
    folder.includes("wedding") ||
    folder.includes("fashion") ||
    folder.includes("event")
  ) {
    return "PORTRAIT";
  }

  return "COMMERCIAL";
}

// Detect Sub Category from Folder Name
function detectSubCategory(folder) {
  folder = folder.toLowerCase();

  if (folder.includes("maternity")) return "MATERNITY";
  if (folder.includes("wedding")) return "WEDDING & OTHERS";
  if (folder.includes("fashion")) return "FASHION";
  if (folder.includes("event")) return "EVENT";
  if (folder.includes("creative") || folder.includes("product")) {
    return "CREATIVE PRODUCT";
  }
  if (folder.includes("jewellery")) return "JEWELLERY";
  if (folder.includes("food")) return "FOOD";
  if (folder.includes("videomaking")) return "VIDEOMAKING";
  if (folder.includes("graphic")) return "GRAPHIC DESIGN";
  if (folder.includes("before")) return "BEFORE & AFTER";

  return "ALL";
}

export function getGalleryAssets() {
  // Import every image/video from assets and all subfolders
  const modules = import.meta.glob(
    "../../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,mp4,MP4}",
    {
      eager: false,
    },
  );

  return Object.keys(modules)
    .map((key, index) => {
      const parts = key.split("/");

      const folderName = parts[parts.length - 2];
      const fileName = parts[parts.length - 1].toLowerCase();

      // Ignore unwanted files
      const ignore = ["logo", "icon", "favicon", "facebook", "instagram"].some(
        (word) => fileName.includes(word),
      );

      if (ignore) return null;

      return {
        id: index,
        name: fileName,
        loader: modules[key],
        kind: fileName.endsWith(".mp4") ? "video" : "image",
        category: detectCategory(folderName),
        sub: detectSubCategory(folderName),
        folder: folderName,
        alt: fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      };
    })
    .filter(Boolean);
}

export function useGalleryAssets() {
  return useMemo(() => getGalleryAssets(), []);
}

