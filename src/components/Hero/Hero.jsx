import { motion } from "framer-motion";
import heroVideo from "../../assets/Jewellery/1.mp4";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden flex items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-12">
      <motion.video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ filter: "brightness(1.05) contrast(1.05) saturate(1.15)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-3xl text-center"
        >
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
              className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl xl:text-6xl font-bold leading-[1.15] tracking-tight text-white px-2"
            >
              Visual Luxury for Brands, Fashion & Celebrations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.75, ease: "easeOut" }}
              className="font-body mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-normal text-slate-100/90 leading-relaxed max-w-xl mx-auto px-4"
            >
              DREAMCATCHER Studio crafts premium product, fashion, wedding and
              event photography with cinematic video, aerial storytelling and
              commercial direction for luxury brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.75, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            >
              <a
                href="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-[#B58A3C] hover:text-white px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View Portfolio
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/40 bg-black/20 hover:bg-white/20 px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Book a Shoot
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

