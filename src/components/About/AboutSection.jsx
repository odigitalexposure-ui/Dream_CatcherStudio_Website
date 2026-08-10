import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Package, CheckCircle2, ChevronLeft, ChevronRight, Utensils, Award } from 'lucide-react';

import fashionImg from '../../assets/Fashion/000A2486 copy.jpg';
import jewelleryImg from '../../assets/Jewellery/_DSC1577 copy 2.jpg';
import foodImg from '../../assets/Food/cake-with-tea-table copy.jpg';

const showcaseSlides = [
  {
    id: 'fashion',
    title: 'Fashion & High Editorial',
    subtitle: 'Fashion Editorial | High-End Lighting',
    tag: 'Fashion Shoot',
    icon: Camera,
    image: fashionImg,
    alt: 'DREAMCATCHER Studio Fashion Editorial Photography',
  },
  {
    id: 'jewellery',
    title: 'Jewellery & Luxury Commercial',
    subtitle: 'Luxury Commercial | Macro & Sparkle Detail',
    tag: 'Jewellery & Lux',
    icon: Package,
    image: jewelleryImg,
    alt: 'DREAMCATCHER Studio Luxury Jewellery Photography',
  },
  {
    id: 'food',
    title: 'Food & Culinary Styling',
    subtitle: 'Commercial Food | Styling & Creative Lighting',
    tag: 'Food & Culinary',
    icon: Utensils,
    image: foodImg,
    alt: 'DREAMCATCHER Studio Food & Culinary Photography',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeSlide = showcaseSlides[currentIndex];
  const ActiveIcon = activeSlide.icon;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
  };

  return (
    <section className="relative w-full bg-[#F5F4EF] pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Decorative Background Blur Circles */}
      <div className="hidden lg:block absolute -left-16 top-12 w-64 h-64 rounded-full bg-[#B58A3C]/10 blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute right-8 top-32 w-56 h-56 rounded-full bg-[#B58A3C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* TOP CENTERED HEADER SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Subtitle Badge */}
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#B58A3C]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#B58A3C]">
              ABOUT DREAMCATCHER STUDIO
            </span>
            <span className="w-8 h-[1px] bg-[#B58A3C]" />
          </motion.div>

          {/* Single Line Centered Heading */}
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-bold text-[#1E1E1E] tracking-tight leading-tight whitespace-normal sm:whitespace-nowrap max-w-full overflow-hidden text-ellipsis px-2"
          >
            Crafting Luxurious Visual Stories for Brands &amp; Celebrations
          </motion.h2>

          {/* Decorative Center Accent Divider */}
          <motion.div variants={fadeUp} custom={2} className="mx-auto mt-4 h-[2px] w-24 bg-[#B58A3C]/60 rounded-full" />
        </motion.div>

        {/* MAIN CONTENT GRID (Equal Height Stretch) */}
        <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-14">
          {/* Left Column: Interactive Multi-Image Showcase + Quality Checklist */}
          <motion.div
            className="w-full lg:w-5/12 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            custom={0}
            variants={fadeUp}
          >
            {/* Category Filter Pills Above Image Card */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
              {showcaseSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                    currentIndex === idx
                      ? 'bg-[#1E1E1E] text-[#B58A3C] shadow-md border border-[#B58A3C]/40'
                      : 'bg-white/70 text-[#575757] hover:bg-white hover:text-[#1E1E1E] border border-black/5'
                  }`}
                >
                  <slide.icon size={13} className={currentIndex === idx ? 'text-[#B58A3C]' : 'text-[#81786F]'} />
                  <span>{slide.tag}</span>
                </button>
              ))}
            </div>

            {/* Image Showcase Card with Carousel & Floating Badges */}
            <div
              className="relative group overflow-hidden rounded-2xl border border-black/10 shadow-xl bg-white p-3 transition-transform duration-500 hover:scale-[1.01]"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-black/90">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide.id}
                    src={activeSlide.image}
                    alt={activeSlide.alt}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="w-full h-full object-cover block"
                  />
                </AnimatePresence>

                {/* Subtle Gradient Overlays for Readability & Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                {/* Left & Right Arrow Controls (Visible on Hover) */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-[#B58A3C] text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
                  aria-label="Previous showcase image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-[#B58A3C] text-white backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                  aria-label="Next showcase image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Top Badge: Slide Counter & Tag */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1.5">
                  <span className="text-[#B58A3C]">0{currentIndex + 1}</span> / 0{showcaseSlides.length}
                </div>

                {/* Floating Quality Badge - Bottom Right */}
                <div className="absolute bottom-4 right-4 max-w-[85%] bg-[#1E1E1E]/95 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#B58A3C] text-white flex-shrink-0">
                    <ActiveIcon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-200 truncate">
                      {activeSlide.title}
                    </div>
                    <div className="text-[11px] text-gray-300 truncate">{activeSlide.subtitle}</div>
                  </div>
                </div>

                {/* Bottom Slide Indicators (Dots) */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 pointer-events-auto">
                  {showcaseSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setIsAutoPlaying(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === i ? 'w-6 bg-[#B58A3C]' : 'w-1.5 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Checklist under image - flex-1 to stretch & cover left side space */}
            <div className="flex-1 flex flex-col justify-between p-6 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-md">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A3C] mb-4">
                  Why Choose DREAMCATCHER
                </h5>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-[#575757]">
                  {[
                    'Professional Team',
                    'Creative Direction',
                    'High-End Equipment',
                    'Fast Project Delivery',
                    'Premium Editing',
                    'Customer Satisfaction',
                    'Studio & Outdoor Shoots',
                    'Lighting & Color Mastery',
                    'Tailored Brand Styling',
                    'Commercial Excellence',
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 size={16} className="text-[#B58A3C] flex-shrink-0" />
                      <span className="truncate font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tagline Banner inside left card to fill layout elegantly */}
              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs text-[#81786F]">
                <span className="font-semibold uppercase tracking-wider text-[#B58A3C]">Excellence Assured</span>
                <span className="font-medium text-[#575757]">Kolkata &amp; Worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text & 3 Specialization Cards */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              <motion.div variants={fadeUp} custom={1} className="text-[#4F4F4F] space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed">
                <p>
                  DREAMCATCHER Studio transforms concepts into refined visual stories. Specializing in high-fashion editorials, luxury product &amp; jewellery photography, and creative culinary styling, our work blends artistic vision with meticulous studio lighting.
                </p>
                <p>
                  Using state-of-the-art camera systems, precision lenses, and professional studio lighting setups, we deliver commercial-grade imagery that elevates brand aesthetics and conveys timeless sophistication.
                </p>
              </motion.div>

              {/* 3 Specialization Cards */}
              <motion.div variants={fadeUp} custom={2} className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-5">
                <div
                  onClick={() => {
                    setCurrentIndex(0);
                    setIsAutoPlaying(false);
                  }}
                  className={`cursor-pointer flex flex-col items-start gap-3 p-5 md:p-6 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl ${
                    currentIndex === 0 ? 'border-[#B58A3C] ring-2 ring-[#B58A3C]/20' : 'border-black/10 hover:border-[#B58A3C]/50'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <Camera size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Fashion &amp; Editorial</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      High-fashion editorial shoots, model lookbooks, portraiture, and studio lighting concepts.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setCurrentIndex(1);
                    setIsAutoPlaying(false);
                  }}
                  className={`cursor-pointer flex flex-col items-start gap-3 p-5 md:p-6 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl ${
                    currentIndex === 1 ? 'border-[#B58A3C] ring-2 ring-[#B58A3C]/20' : 'border-black/10 hover:border-[#B58A3C]/50'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <Package size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Jewellery &amp; Luxury</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      Macro detail photography, luxury jewellery campaigns, and premium product presentation.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setCurrentIndex(2);
                    setIsAutoPlaying(false);
                  }}
                  className={`cursor-pointer flex flex-col items-start gap-3 p-5 md:p-6 rounded-2xl border bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl ${
                    currentIndex === 2 ? 'border-[#B58A3C] ring-2 ring-[#B58A3C]/20' : 'border-black/10 hover:border-[#B58A3C]/50'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <Utensils size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Food &amp; Culinary</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      Artistic food styling, restaurant menu visuals, and commercial culinary presentation.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM CENTER-ALIGNED BUTTONS SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 pt-8 border-t border-black/10"
        >
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/gallery"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1E1E1E] hover:bg-[#B58A3C] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
            >
              Explore Portfolio
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-black/20 text-[#1E1E1E] hover:border-[#B58A3C] hover:text-[#B58A3C] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


