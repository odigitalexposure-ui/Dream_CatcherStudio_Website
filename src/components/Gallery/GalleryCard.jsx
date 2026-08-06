import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LazyImage from "../UI/LazyImage";

export default function GalleryCard({ item, onOpen }) {
  const isVideo = item ? (item.kind || item.type) === "video" : false;
  const ref = useRef(null);

  const [inView, setInView] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const [posterData, setPosterData] = useState(null);

  // Observe card before generating poster
  useEffect(() => {
    if (!item || !isVideo || item?.posterLoader) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVideo, item]);

  // Generate poster if one doesn't exist
  useEffect(() => {
    let cancelled = false;
    let videoEl = null;

    async function generatePoster() {
      if (!item || !inView || !isVideo || item?.posterLoader || !item?.loader) {
        return;
      }

      try {
        const module = await item.loader();
        const url = module.default || module;

        if (!url || cancelled) return;

        videoEl = document.createElement("video");
        videoEl.crossOrigin = "anonymous";
        videoEl.preload = "metadata";
        videoEl.muted = true;
        videoEl.src = url;

        await new Promise((resolve) => {
          videoEl.addEventListener("loadeddata", resolve, { once: true });
          videoEl.addEventListener("error", resolve, { once: true });
          setTimeout(resolve, 3000);
        });

        if (cancelled) return;

        try {
          videoEl.currentTime = Math.min(
            0.5,
            Math.max(0, (videoEl.duration || 0) * 0.01)
          );
        } catch {
          // ignore seek error
        }

        await new Promise((resolve) => {
          videoEl.addEventListener("seeked", resolve, { once: true });
          setTimeout(resolve, 500);
        });

        if (cancelled) return;

        const canvas = document.createElement("canvas");
        canvas.width = videoEl.videoWidth || 800;
        canvas.height = videoEl.videoHeight || 450;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/jpeg", 0.85);

        if (!cancelled) {
          setPosterData(data);
        }
      } catch (err) {
        console.error("Poster generation failed:", err);
      } finally {
        if (videoEl) {
          videoEl.pause();
          videoEl.removeAttribute("src");
          videoEl.load();
        }
      }
    }

    generatePoster();

    return () => {
      cancelled = true;
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      }
    };
  }, [inView, isVideo, item]);

  if (!item) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="mb-4 break-inside-avoid-column cursor-pointer overflow-hidden rounded-lg"
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.()}
      onKeyDown={handleKeyDown}
    >
      <div className="relative w-full overflow-hidden">
        {isVideo ? (
          item?.posterLoader ? (
            <LazyImage
              loader={item.posterLoader}
              alt={item.alt || item.name || "Gallery video"}
              className="block w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          ) : posterData ? (
            <img
              src={posterData}
              alt={item.alt || item.name || "Gallery video"}
              className="block w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-56 w-full items-center justify-center bg-neutral-200">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="white" />
                </svg>
              </div>
            </div>
          )
        ) : (
          <LazyImage
            loader={item?.loader}
            alt={item.alt || item.name || "Gallery image"}
            className="block w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        )}

        {isVideo && (
          <>
            <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-[10px] font-medium tracking-[0.25em] text-white uppercase">
              FILM
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="white" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
