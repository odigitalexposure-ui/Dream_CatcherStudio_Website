import { motion } from 'framer-motion';
import { Camera, FileVideoCamera, Package, MapPin } from 'lucide-react';
import aboutImg from '../../assets/about_feature.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } }),
};

export default function AboutSection() {
  return (
    <section className="relative w-full bg-[#F5F4EF] pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="hidden lg:block absolute -left-12 top-8 w-44 h-44 rounded-full bg-[#B58A3C] opacity-6 blur-3xl pointer-events-none"></div>
      <div className="hidden lg:block absolute right-8 top-24 w-28 h-28 rounded-full bg-[#B58A3C] opacity-6 blur-2xl pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Image */}
          <motion.div
            className="w-full lg:w-5/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            custom={0}
            variants={fadeUp}
          >
            <div className="overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.08)] lg:shadow-2xl shadow-lg transform transition-all duration-600 lg:hover:scale-105">
              <img src={aboutImg} alt="About DreamCatcher Studio" className="w-full h-auto object-cover block" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="w-full lg:w-7/12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="hidden lg:flex items-center">
                  <span className="inline-block w-0.5 h-10 bg-[#B58A3C] mr-4 rounded"></span>
                </div>
                <motion.p variants={fadeUp} custom={1} className="text-xs tracking-widest uppercase text-[#B58A3C]">
                  ABOUT DREAMCATCHER STUDIO
                </motion.p>
              </div>

              <motion.h2 variants={fadeUp} custom={2} className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#1E1E1E] leading-tight mb-8 lg:mb-10">
                Crafting Luxurious Visual Stories for Brands & Celebrations
              </motion.h2>

              <motion.div variants={fadeUp} custom={3} className="text-[#575757] space-y-5 max-w-[700px] lg:max-w-[720px]">
                <p>
                  DreamCatcher Studio transforms concepts into refined visual stories. Specializing in product and commercial photography, fashion editorials, and cinematic wedding films, our work blends creativity with meticulous lighting and premium production techniques.
                </p>
                <p>
                  Using modern equipment — including professional cinema cameras, aerial drone systems and studio lighting — we deliver commercial-grade imagery and films that elevate brands and preserve moments with emotional clarity and technical excellence.
                </p>
              </motion.div>

              {/* Specialization Cards */}
              <motion.div variants={fadeUp} custom={4} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(0,0,0,0.04)] bg-white/60">
                  <div className="p-3 rounded-lg bg-[#f7f5f2] text-[#B58A3C]">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E1E1E]">Photography</h4>
                    <p className="text-sm text-[#575757]">Professional photography for products, fashion, weddings, events, branding, and commercial campaigns with exceptional attention to detail.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(0,0,0,0.04)] bg-white/60">
                  <div className="p-3 rounded-lg bg-[#f7f5f2] text-[#B58A3C]">
                    <FileVideoCamera size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E1E1E]">Video Production</h4>
                    <p className="text-sm text-[#575757]">High-quality cinematic films, promotional videos, advertisements, documentaries, corporate videos, and creative storytelling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(0,0,0,0.04)] bg-white/60">
                  <div className="p-3 rounded-lg bg-[#f7f5f2] text-[#B58A3C]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E1E1E]">Drone Photography & Cinematography</h4>
                    <p className="text-sm text-[#575757]">Capture breathtaking aerial visuals for weddings, events, tourism, real estate, and commercial productions using professional drone technology.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[rgba(0,0,0,0.04)] bg-white/60">
                  <div className="p-3 rounded-lg bg-[#f7f5f2] text-[#B58A3C]">
                    <Package size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E1E1E]">Product & Commercial Specialist</h4>
                    <p className="text-sm text-[#575757]">We specialize in premium product photography and commercial advertising that helps brands showcase their products beautifully and connect with customers through high-quality visuals.</p>
                  </div>
                </div>
              </motion.div>

              {/* Why choose us checklist + buttons */}
              <motion.div variants={fadeUp} custom={5} className="mt-8">
                <div className="w-full lg:flex lg:items-center lg:justify-between lg:gap-8">
                  {/* Left: Feature grid */}
                  <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
                      {[
                        'Professional Team',
                        'Creative Direction',
                        'Cinematic Storytelling',
                        'High-End Equipment',
                        'Drone Coverage',
                        'Fast Project Delivery',
                        'Premium Editing',
                        'Customer Satisfaction',
                      ].map((t) => (
                        <div key={t} className="flex items-center gap-2 text-sm text-[#575757] min-w-0">
                          <span className="text-[#B58A3C] flex-shrink-0">✔</span>
                          <span className="truncate">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA area */}
                  <div className="w-full lg:w-1/3 mt-4 lg:mt-0 flex items-start lg:items-center lg:justify-end">
                    <div className="flex flex-col lg:items-end gap-4">
                      <a href="/gallery" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1E1E1E] text-white font-semibold transition-transform duration-200 transform hover:-translate-y-0.5 hover:bg-[#B58A3C]">Explore Portfolio</a>
                      <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[rgba(0,0,0,0.08)] text-[#1E1E1E] font-semibold transition-transform duration-200 transform hover:-translate-y-0.5 hover:bg-[#B58A3C] hover:text-white">Contact Us</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
