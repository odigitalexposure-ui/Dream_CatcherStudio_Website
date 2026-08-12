import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Package,
  Utensils,
  Grid,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react";
import GalleryGrid from "../Gallery/GalleryGrid";
import GalleryModal from "../Gallery/GalleryModal";
import { useGalleryAssets, filterGalleryAssets } from "../Gallery/GalleryData";

const SERVICE_HIGHLIGHTS = [
  {
    id: "ALL",
    categoryKey: "ALL",
    title: "All Work",
    tag: "Miscellaneous",
    icon: Grid,
    desc: "Complete collection across all visual studio disciplines",
  },
  {
    id: "FASHION",
    categoryKey: "FASHION",
    title: "Fashion & Editorial",
    tag: "Fashion & Models",
    icon: Camera,
    desc: "High-fashion editorials, lookbooks, & studio lighting",
  },
  {
    id: "JEWELLERY",
    categoryKey: "JEWELLERY",
    title: "Jewellery & Luxury",
    tag: "Macro Detail",
    icon: Package,
    desc: "Precision macro photography for fine gems & luxury products",
  },
  {
    id: "FOOD",
    categoryKey: "FOOD",
    title: "Food & Culinary",
    tag: "Gourmet Styling",
    icon: Utensils,
    desc: "Commercial food styling & mouthwatering restaurant visuals",
  },
  {
    id: "WEDDING",
    categoryKey: "WEDDING & OTHERS",
    title: "Wedding & Celebrations",
    tag: "Wedding & Couples",
    icon: Heart,
    desc: "Timeless wedding, pre-wedding, & celebration photography",
  },
];

export default function Services() {
  const navigate = useNavigate();
  const allItems = useGalleryAssets();

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter to image assets only
  const imageOnlyItems = useMemo(
    () => allItems.filter((item) => item.kind === "image" && item.type === "image"),
    [allItems]
  );

  // Interleave photos across folders
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
    return [...result].reverse();
  }, [imageOnlyItems]);

  const filteredItems = useMemo(
    () => filterGalleryAssets(interleavedImages, activeCategory),
    [interleavedImages, activeCategory]
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
    <section
      id="services"
      className="relative overflow-hidden bg-[#F5F4EF] pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      {/* Decorative Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#B58A3C]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#B58A3C]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px]">
        {/* COMPACT HEADER & SERVICE HIGHLIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58A3C]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#B58A3C]">
              OUR SERVICES &amp; WORK
            </span>
            <span className="w-8 h-[1px] bg-[#B58A3C]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1E1E1E] tracking-tight leading-tight">
            Explore Studio Services &amp; Miscellaneous Portfolio
          </h2>

          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#B58A3C]/60 rounded-full" />
        </motion.div>

        {/* COMPACT SERVICE PILLS (Quick Category Filters) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {SERVICE_HIGHLIGHTS.map((service) => {
            const IconComponent = service.icon;
            const isActive = activeCategory === service.categoryKey;
            return (
              <button
                key={service.id}
                onClick={() => {
                  setActiveCategory(service.categoryKey);
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group ${
                  isActive
                    ? "bg-[#1E1E1E] border-[#B58A3C] text-white shadow-xl ring-2 ring-[#B58A3C]/30"
                    : "bg-white/80 border-black/10 text-[#1E1E1E] hover:border-[#B58A3C]/50 hover:bg-white shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#B58A3C] text-white"
                        : "bg-[#F5F4EF] text-[#B58A3C] group-hover:bg-[#B58A3C] group-hover:text-white"
                    }`}
                  >
                    <IconComponent size={20} />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/10 text-[#B58A3C]"
                        : "bg-black/5 text-[#81786F]"
                    }`}
                  >
                    {service.tag}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-bold text-sm sm:text-base ${
                      isActive ? "text-white" : "text-[#1E1E1E]"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isActive ? "text-gray-300" : "text-[#575757]"
                    }`}
                  >
                    {service.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* GALLERY HEADER BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#B58A3C]" />
            <h3 className="font-semibold text-sm sm:text-base uppercase tracking-wider text-[#1E1E1E]">
              {activeCategory === "ALL"
                ? "Miscellaneous Portfolio Highlights"
                : `${activeCategory} Photos Showcase`}
            </h3>
            <span className="text-xs text-[#81786F]">
              ({filteredItems.length} Photos)
            </span>
          </div>
        </div>

        {/* INSTANT MISCELLANEOUS GALLERY GRID - ALL PHOTOS TOGETHER */}
        <div className="min-h-[400px]">
          <GalleryGrid items={filteredItems} onOpen={(idx) => openAt(idx)} />
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div className="mt-12 pt-8 border-t border-black/10 flex items-center justify-center">
          <button
            onClick={() => {
              navigate("/gallery");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1E1E1E] hover:bg-[#B58A3C] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight size={14} className="ml-2" />
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
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


