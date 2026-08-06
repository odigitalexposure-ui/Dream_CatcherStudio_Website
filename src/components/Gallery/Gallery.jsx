import { useMemo, useState } from "react";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
import LazyImage from "../UI/LazyImage";
import { motion } from "framer-motion";
import GalleryHeader from "./GalleryHeader";

const CATEGORY_MAP = {
  ALL: [],

  // Parent Categories
  PORTRAIT: ["Maternity", "Wedding&others", "Fashion", "Event"],

  COMMERCIAL: [
    "Before_After",
    "Food",
    "Graphic_Design_Manipulation",
    "Jewellery",
    "Videomaking",
    "Creative_product",
  ],

  // Portrait Sub-categories
  MATERNITY: ["Maternity"],
  "WEDDING & OTHERS": ["Wedding&others"],
  WEDDING: ["Wedding&others"],
  FASHION: ["Fashion"],
  EVENT: ["Event"],

  // Commercial Sub-categories
  JEWELLERY: ["Jewellery"],
  FOOD: ["Food"],
  VIDEOMAKING: ["Videomaking"],
  "GRAPHIC DESIGN": ["Graphic_Design_Manipulation"],
  "BEFORE & AFTER": ["Before_After"],
  "CREATIVE PRODUCT": ["Creative_product"],
};

// Collect assets with Vite's glob (images + videos) without eager loading
const importAssets = () => {
  const modules = import.meta.glob(
    "../../assets/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,mp4,MP4}",
  );
  const items = [];
  const keys = Object.keys(modules);

  const hasPosterFor = (key) => {
    const base = key.replace(/\.[^/.]+$/, "");
    const exts = [".webp", ".jpg", ".jpeg", ".png"];
    const posterVariants = exts.flatMap((ext) => [
      base + ext,
      `${base}.poster${ext}`,
    ]);
    for (const candidate of posterVariants) {
      if (keys.includes(candidate)) return candidate;
    }
    return null;
  };

  keys.forEach((key) => {
    const lower = key.toLowerCase();
    const name = key.split("/").pop();
    if (lower.endsWith(".mp4")) {
      const posterKey = hasPosterFor(key);
      items.push({
        loader: modules[key],
        type: "video",
        name,
        path: key,
        posterKey,
      });
    } else {
      items.push({ loader: modules[key], type: "image", name, path: key });
    }
  });

  // keep order: videos first for featured selection then images
  items.sort((a, b) => (a.type === "video" && b.type !== "video" ? -1 : 1));
  return { items, modules };
};

export default function GallerySection() {
  const { items: allItems, modules } = useMemo(() => importAssets(), []);

  // Map items to include posterLoader where available
  const enrichedItems = useMemo(() => {
    return allItems.map((it) => {
      if (it.type === "video" && it.posterKey) {
        return { ...it, posterLoader: modules[it.posterKey] };
      }
      return it;
    });
  }, [allItems, modules]);

  // Choose a featured video (first video if exists) else first item
  const featuredIndex = enrichedItems.findIndex((i) => i.type === "video");
  const featured =
    featuredIndex >= 0 ? enrichedItems[featuredIndex] : enrichedItems[0];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredItems = useMemo(() => {
    if (!selectedCategory || selectedCategory === "ALL") return enrichedItems;

    const targetFolders = CATEGORY_MAP[selectedCategory] || [];
    if (targetFolders.length === 0) return enrichedItems;

    return enrichedItems.filter((item) => {
      const itemPath = item.path.toLowerCase();
      return targetFolders.some((folder) =>
        itemPath.includes(folder.toLowerCase()),
      );
    });
  }, [selectedCategory, enrichedItems]);

  const openAt = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handlePrev = () =>
    setCurrentIndex(
      (c) => (c - 1 + filteredItems.length) % filteredItems.length,
    );

  const handleNext = () =>
    setCurrentIndex((c) => (c + 1) % filteredItems.length);

  return (
    <section className="w-full bg-[#E9E6DD] py-20 px-6 md:px-12 lg:px-20">
      <GalleryHeader
        selectedCategory={selectedCategory}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
          setCurrentIndex(0);
        }}
      />

      <div className="max-w-[1400px] mx-auto">
        {/* Active Filter Counter Banner */}
        <div className="w-full mb-8 flex items-center justify-between border-b border-[#D6D2C4] pb-4 px-2">
          <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#565656]">
            {selectedCategory && selectedCategory !== "ALL" ? (
              <span>
                Filter: <strong className="text-black font-semibold">{selectedCategory}</strong> •{" "}
                {filteredItems.length} items
              </span>
            ) : (
              <span>
                Portfolio: <strong className="text-black font-semibold">ALL WORK</strong> •{" "}
                {filteredItems.length} items
              </span>
            )}
          </div>
          {selectedCategory && selectedCategory !== "ALL" && (
            <button
              onClick={() => setSelectedCategory("ALL")}
              className="text-xs uppercase tracking-[0.18em] text-[#777] hover:text-black transition-colors underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Featured video top area */}
        {featured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full mb-12"
          >
            <div className="relative w-full rounded-xl overflow-hidden bg-black">
              {featured.type === "video" ? (
                // show poster only - do not load video until modal opens
                featured.posterLoader ? (
                  <div className="w-full h-[56vh] md:h-[60vh] lg:h-[66vh]">
                    <LazyImage
                      loader={featured.posterLoader}
                      alt={featured.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[56vh] md:h-[60vh] lg:h-[66vh] bg-black" />
                )
              ) : (
                <div className="w-full h-[56vh] md:h-[60vh] lg:h-[66vh]">
                  <LazyImage
                    loader={featured.loader}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Centered play button for UX */}
              {featured.type === "video" && (
                <button
                  className="absolute inset-0 m-auto left-0 right-0 top-0 bottom-0 w-20 h-20 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  onClick={() => {
                    const fi = filteredItems.indexOf(featured);
                    if (fi >= 0) openAt(fi);
                  }}
                  aria-label="open featured video"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7L8 5z" fill="#fff" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Masonry editorial grid */}
        {filteredItems.length > 0 ? (
          <GalleryGrid items={filteredItems} onOpen={(idx) => openAt(idx)} />
        ) : (
          <div className="w-full py-20 text-center text-[#565656] uppercase tracking-widest">
            No gallery items available
          </div>
        )}
      </div>

      <GalleryModal
        open={modalOpen}
        items={filteredItems}
        currentIndex={currentIndex}
        onClose={() => setModalOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
