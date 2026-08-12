import { useMemo, useState } from "react";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
import LazyImage from "../UI/LazyImage";
import { motion } from "framer-motion";
import GalleryHeader from "./GalleryHeader";
import { useGalleryAssets, filterGalleryAssets } from "./GalleryData";

export default function GallerySection() {
  const allItems = useGalleryAssets();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter items using unified helper
  const filteredItems = useMemo(
    () => filterGalleryAssets(allItems, selectedCategory),
    [allItems, selectedCategory]
  );

  // Featured item selection: first video, or preferred flagship wedding photo, or non-text photo
  const featured = useMemo(() => {
    const videoItem = filteredItems.find(
      (i) => i.kind === "video" || i.type === "video"
    );
    if (videoItem) return videoItem;

    // Preferred featured photo candidates (widescreen HD 16:9 wedding photos for optimal header framing)
    const preferredFeatured = filteredItems.find((i) => {
      const name = (i.name || "").toLowerCase();
      return (
        name.includes("52333417") ||
        name.includes("58571062") ||
        name.includes("58589432") ||
        name.includes("59203968") ||
        name.includes("bg1a7475a") ||
        name.includes("bg1a7341")
      );
    });

    if (preferredFeatured) return preferredFeatured;

    // Otherwise, pick the first image that is not the text/door image (29064137)
    const nonDoorItem = filteredItems.find(
      (i) => !(i.name || "").toLowerCase().includes("29064137")
    );

    return nonDoorItem || filteredItems[0] || null;
  }, [filteredItems]);

  const openAt = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handlePrev = () =>
    setCurrentIndex(
      (c) => (c - 1 + filteredItems.length) % filteredItems.length
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
            key={featured.id || featured.path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mb-12"
          >
            <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-xl">
              {(featured.kind === "video" || featured.type === "video") ? (
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
              {(featured.kind === "video" || featured.type === "video") && (
                <button
                  className="absolute inset-0 m-auto left-0 right-0 top-0 bottom-0 w-20 h-20 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 transition-all"
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
