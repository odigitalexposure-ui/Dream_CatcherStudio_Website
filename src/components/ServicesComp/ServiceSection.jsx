import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import services from "./ServiceData";

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F8F5F0] pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24"
    >
      {/* Decorative Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#EADFD3]/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F3ECE5]/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="tracking-[0.35em] uppercase text-[#A88A70] text-sm">
            Our Expertise
          </span>

          <h2 className="mt-5 font-serif text-5xl font-light leading-tight text-[#8A7665] md:text-6xl lg:text-7xl">
            Our Services
          </h2>

          <div className="mx-auto mt-8 h-[2px] w-24 bg-[#C8AF97]" />

          <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-[#746A61]">
            We create timeless photography and cinematic films that transform
            ordinary moments into extraordinary visual stories. From premium
            product photography and commercial campaigns to fashion, weddings,
            events, video production, and drone cinematography, every project is
            crafted with creativity, precision, and attention to detail.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Statement */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-24 max-w-4xl text-center"
        >
          <div className="mx-auto mb-8 h-[2px] w-24 bg-[#C8AF97]" />

          <h3 className="font-serif text-3xl font-light text-[#8A7665] md:text-4xl">
            Crafted With Passion. Delivered With Excellence.
          </h3>

          <p className="mt-6 text-lg leading-9 text-[#746A61]">
            Every project is more than just a photoshoot or a film—it's an
            opportunity to create something meaningful, memorable, and visually
            exceptional. Whether you're building a brand, launching a product,
            celebrating a wedding, or preserving life's most special moments,
            we're committed to delivering imagery that exceeds expectations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
