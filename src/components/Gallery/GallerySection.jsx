import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
import { FILTERS, useGalleryAssets, filterGalleryAssets } from "./GalleryData";
import { RefreshCw } from "lucide-react";

export default function GallerySection() {
  const navigate = useNavigate();
  const allItems = useGalleryAssets();

  const [active, setActive] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);

  // Home Page Gallery Section: Use ONLY photos/images (no videos)
  const imageOnlyItems = useMemo(
    () => allItems.filter((item) => item.kind === "image" && item.type === "image"),
    [allItems]
  );

  // Interleave photos across folders so Home section displays diverse, beautiful photos across categories
  const interleavedImages = useMemo(() => {
    const byFolder = {};
    imageOnlyItems.forEach((item) => {
      const f = item.folder || "general";
      if (!byFolder[f]) byFolder[f] = [];
      byFolder[f].push(item);
    });

    const result = [];
    const folderKeys = Object.keys(byFolder);
    let maxLen = 0;
    folderKeys.forEach((k) => {
      if (byFolder[k].length > maxLen) maxLen = byFolder[k].length;
    });

    for (let i = 0; i < maxLen; i++) {
      folderKeys.forEach((k) => {
        if (byFolder[k][i]) {
          result.push(byFolder[k][i]);
        }
      });
    }
    return result;
  }, [imageOnlyItems]);

  const filteredItems = useMemo(
    () => filterGalleryAssets(interleavedImages, active),
    [interleavedImages, active]
  );

  // Paginate 8 photos per view based on pageOffset
  const previewItems = useMemo(() => {
    const count = 8;
    const start = (pageOffset * count) % Math.max(1, filteredItems.length);
    const sliced = filteredItems.slice(start, start + count);
    if (sliced.length < count && filteredItems.length > count) {
      return [...sliced, ...filteredItems.slice(0, count - sliced.length)];
    }
    return sliced;
  }, [filteredItems, pageOffset]);

  const handleNextBatch = () => {
    setPageOffset((prev) => prev + 1);
  };

  const openAt = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handlePrevModal = () =>
    setCurrentIndex((c) => (c - 1 + previewItems.length) % previewItems.length);

  const handleNextModal = () =>
    setCurrentIndex((c) => (c + 1) % previewItems.length);

  return (
    <section className="bg-[#F5F3EF] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl text-[#4D473F]">
              Gallery
            </h2>
            <p className="uppercase tracking-[0.3em] text-xs text-[#81786F] mt-3">
              Our Portfolio Highlights
            </p>
          </div>

          {/* CONTROLS: FILTER & SHUFFLE */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleNextBatch}
              className="flex items-center gap-2 border border-[#D8D0C7] px-4 py-3 text-xs tracking-[0.18em] uppercase hover:bg-black/5 transition-colors text-[#4D473F]"
              title="Load another set of photos"
            >
              <RefreshCw size={14} />
              <span>Shuffle Photos</span>
            </button>

            <div className="relative group">
              <button className="border border-[#D8D0C7] px-6 py-3 text-xs tracking-[0.25em] uppercase hover:bg-black/5 transition-colors text-[#4D473F]">
                {active}
              </button>

              <div className="absolute right-0 top-full hidden group-hover:flex flex-col bg-[#F5F3EF] border border-[#D8D0C7] p-5 w-52 z-50 shadow-lg">
                {Object.entries(FILTERS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActive(key);
                      setPageOffset(0);
                    }}
                    className={`text-left uppercase tracking-[0.2em] text-xs py-2 transition-colors ${
                      active === key
                        ? "text-black font-semibold"
                        : "text-[#81786F] hover:text-[#4D473F]"
                    }`}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW GRID - BEAUTIFUL DIVERSE PHOTOS */}
        <GalleryGrid items={previewItems} onOpen={(idx) => openAt(idx)} />

        {/* BOTTOM BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
          <button
            onClick={handleNextBatch}
            className="border border-[#4D473F] text-[#4D473F] px-8 py-4 uppercase tracking-[0.25em] text-xs hover:bg-[#4D473F] hover:text-white transition-colors"
          >
            LOAD DIFFERENT PHOTOS
          </button>
          <button
            onClick={() => {
              navigate("/gallery");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            className="bg-[#4D473F] text-white px-10 py-4 uppercase tracking-[0.3em] text-xs hover:bg-[#1E1E1E] transition-colors shadow-md"
          >
            EXPLORE FULL GALLERY
          </button>
        </div>
      </div>

      <GalleryModal
        open={modalOpen}
        items={previewItems}
        currentIndex={currentIndex}
        onClose={() => setModalOpen(false)}
        onPrev={handlePrevModal}
        onNext={handleNextModal}
      />
    </section>
  );
}
