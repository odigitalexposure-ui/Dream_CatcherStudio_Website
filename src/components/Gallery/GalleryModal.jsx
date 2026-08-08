import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryModal({
  open,
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCurrent = useCallback(() => {
    const item = items && items[currentIndex];
    if (!item) return;

    setLoading(true);
    setMediaUrl(null);

    if (item.loader) {
      Promise.resolve()
        .then(() => item.loader())
        .then((m) => {
          const u = m && (m.default || m);
          setMediaUrl(u);
        })
        .catch(() => setMediaUrl(null))
        .finally(() => setLoading(false));
    } else if (item.src) {
      setMediaUrl(item.src);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [items, currentIndex]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      loadCurrent();
    }, 0);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [open, currentIndex, loadCurrent]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const item = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[1200px] w-full h-[85vh] sm:h-[90vh] bg-transparent flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="close"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white z-30 transition-all"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={onPrev}
            aria-label="previous"
            className="absolute left-2 sm:left-4 md:left-8 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white z-30 transition-all"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={onNext}
            aria-label="next"
            className="absolute right-2 sm:right-4 md:right-8 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white z-30 transition-all"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className="w-full h-full flex items-center justify-center">
            {loading && (
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-12 h-12 border-4 border-white/40 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {!loading && mediaUrl && (item.kind === "video" || item.type === "video") && (
              <video
                src={mediaUrl}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
              />
            )}

            {!loading && mediaUrl && (item.kind === "image" || item.type === "image" || (!item.kind && !item.type)) && (
              <img
                src={mediaUrl}
                alt={item.name || "modal"}
                className="max-w-full max-h-full object-contain"
              />
            )}

            {!loading && !mediaUrl && (
              <div className="text-white/80">Unable to load media</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
