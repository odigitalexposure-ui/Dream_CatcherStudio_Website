import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ServiceCard({ service, index }) {
  if (!service) {
    return (
      <div style={{ color: "red", padding: 20 }}>Service prop is undefined</div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
      }}
      whileHover={{ y: -8 }}
      className="group rounded-[28px] border border-[#E8DDD2] bg-white/70 backdrop-blur-sm p-7 md:p-10 shadow-sm transition-all duration-500 hover:border-[#C8AF97] hover:shadow-2xl"
    >
      {/* Heading */}

      <h3 className="font-serif text-4xl md:text-5xl font-light text-[#8A7665]">
        {service.title}
      </h3>

      <div className="mt-5 h-[2px] w-20 bg-[#C8AF97] transition-all duration-500 group-hover:w-28" />

      {/* Small Description */}

      <p className="mt-6 text-lg italic leading-8 text-[#8A7665]">
        {service.shortDescription}
      </p>

      {/* Main Description */}

      <p className="mt-6 text-[17px] leading-8 text-[#746A61]">
        {service.description}
      </p>

      {/* Services */}

      <div className="mt-10">
        <h4 className="font-serif text-2xl text-[#8A7665]">
          {service.servicesTitle}
        </h4>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.services.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="text-[#A88A70] flex-shrink-0"
              />

              <span className="text-[#746A61]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect For */}

      <div className="mt-10 rounded-2xl border border-[#EEE4DA] bg-[#FBF8F4] p-6">
        <h4 className="font-serif text-2xl text-[#8A7665]">
          {service.perfectForTitle}
        </h4>

        <div className="mt-4 flex flex-wrap gap-3">
          {service.perfectFor.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[#DCCDBE] px-4 py-2 text-sm text-[#746A61] transition-all duration-300 hover:bg-[#8A7665] hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}

      <div className="mt-10">
        <h4 className="font-serif text-2xl text-[#8A7665]">
          {service.whyChooseTitle}
        </h4>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {service.whyChoose.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="mt-[7px] h-2 w-2 rounded-full bg-[#C8AF97]" />

              <span className="leading-7 text-[#746A61]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
