import { motion } from 'framer-motion';
import { Camera, FileVideoCamera, Package, MapPin, CheckCircle2 } from 'lucide-react';
import aboutImg from '../../assets/about_feature.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function AboutSection() {
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
          {/* Left Column: Image Showcase + Quality Checklist Under Image */}
          <motion.div
            className="w-full lg:w-5/12 flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            custom={0}
            variants={fadeUp}
          >
            {/* Image Showcase Card */}
            <div className="relative group overflow-hidden rounded-2xl border border-black/10 shadow-xl bg-white p-3 transition-transform duration-500 hover:scale-[1.01]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={aboutImg}
                  alt="About DreamCatcher Studio"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 right-6 bg-[#1E1E1E]/90 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#B58A3C] text-white">
                  <Camera size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-200">Commercial Grade</div>
                  <div className="text-[11px] text-gray-300">Photography &amp; Films</div>
                </div>
              </div>
            </div>

            {/* Quality Checklist under image - flex-1 to stretch & cover left side space */}
            <div className="flex-1 flex flex-col justify-between p-6 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-md">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-[0.25em] text-[#B58A3C] mb-4">
                  Why Choose DreamCatcher
                </h5>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-[#575757]">
                  {[
                    'Professional Team',
                    'Creative Direction',
                    'Cinematic Storytelling',
                    'High-End Equipment',
                    'Drone Coverage',
                    'Fast Project Delivery',
                    'Premium Editing',
                    'Customer Satisfaction',
                    '4K Cinema Production',
                    'Lighting & Color Mastery',
                    'Studio & Outdoor Shoots',
                    'Tailored Brand Styling',
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

          {/* Right Column: Text & 4 Specialization Cards */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              <motion.div variants={fadeUp} custom={1} className="text-[#4F4F4F] space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed">
                <p>
                  DreamCatcher Studio transforms concepts into refined visual stories. Specializing in product and commercial photography, fashion editorials, and cinematic wedding films, our work blends creativity with meticulous lighting and premium production techniques.
                </p>
                <p>
                  Using modern equipment — including professional cinema cameras, aerial drone systems and studio lighting — we deliver commercial-grade imagery and films that elevate brands and preserve moments with emotional clarity and technical excellence.
                </p>
              </motion.div>

              {/* 4 Specialization Cards (Enlarged Text & Height for Perfect Border Alignment) */}
              <motion.div variants={fadeUp} custom={2} className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                <div className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#B58A3C]/50 hover:shadow-xl">
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <Camera size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Photography</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      Professional photography for products, fashion, weddings, events, branding, and commercial campaigns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#B58A3C]/50 hover:shadow-xl">
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <FileVideoCamera size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Video Production</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      High-quality cinematic films, promotional videos, advertisements, documentaries, and corporate videos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#B58A3C]/50 hover:shadow-xl">
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Drone Cinematography</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      Breathtaking aerial visuals for weddings, events, tourism, real estate, and commercial productions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 md:p-6 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-[#B58A3C]/50 hover:shadow-xl">
                  <div className="p-3 rounded-xl bg-[#F5F4EF] text-[#B58A3C] flex-shrink-0">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">Commercial Specialist</h4>
                    <p className="text-sm text-[#575757] mt-1.5 leading-relaxed">
                      Premium product photography and advertising visuals that showcase products beautifully and drive engagement.
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
