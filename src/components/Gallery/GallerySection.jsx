import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
import { FILTERS, useGalleryAssets, filterGalleryAssets } from "./GalleryData";

export default function GallerySection() {
  const navigate = useNavigate();
  const allItems = useGalleryAssets();

  const [active, setActive] = useState("MISCELLANEOUS");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Home Page Gallery Section: Use ONLY photos/images (no videos)
  // AND filter out photos already displayed above on Home page in AboutSection
  const imageOnlyItems = useMemo(() => {
    return allItems.filter((item) => {
      if (item.kind !== "image" || item.type !== "image") return false;

      const p = (item.path || "").toLowerCase();
      const f = (item.folder || "").toLowerCase();

      // Exclude top About section carousel images
      if (
        p.includes("000a2486 copy.jpg") ||
        p.includes("_dsc1577 copy 2.jpg") ||
        p.includes("cake-with-tea-table copy.jpg")
      ) {
        return false;
      }

      // Exclude Wedding&others images as they are already displayed in AboutSection
      if (f.includes("wedding") || item.sub === "WEDDING & OTHERS") {
        return false;
      }

      return true;
    });
  }, [allItems]);

  const filteredItems = useMemo(
    () => filterGalleryAssets(imageOnlyItems, active),
    [imageOnlyItems, active]
  );

  const openAt = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handlePrevModal = () =>
    setCurrentIndex((c) => (c - 1 + filteredItems.length) % filteredItems.length);

  const handleNextModal = () =>
    setCurrentIndex((c) => (c + 1) % filteredItems.length);

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
              {active === "MISCELLANEOUS"
                ? "Miscellaneous Portfolio Highlights"
                : "Our Portfolio Highlights"}
            </p>
          </div>

          {/* CONTROLS: FILTER DROPDOWN */}
          <div className="flex items-center gap-3">
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

        {/* PREVIEW GRID - SHOWING ALL UNIQUE PHOTOS TOGETHER */}
        <GalleryGrid items={filteredItems} onOpen={(idx) => openAt(idx)} />

        {/* BOTTOM ACTION BUTTON */}
        <div className="flex items-center justify-center mt-14">
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
        items={filteredItems}
        currentIndex={currentIndex}
        onClose={() => setModalOpen(false)}
        onPrev={handlePrevModal}
        onNext={handleNextModal}
      />
    </section>
  );
}
