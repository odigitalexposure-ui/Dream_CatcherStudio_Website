import { Phone } from "lucide-react";

export default function FloatingContactButtons() {
  const phone = "8240481762";
  const defaultMsg = encodeURIComponent("Hello DREAMCATCHER Studio, I would like to inquire about your services.");

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[9999] flex flex-col gap-3.5 items-end">
      {/* Direct Call Button */}
      <a
        href={`tel:${phone}`}
        aria-label="Call DreamCatcher Studio"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#1E1E1E] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#B58A3C]"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />

        <span className="pointer-events-none absolute right-16 sm:right-18 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-xs text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block shadow-lg">
          Call +91 8240481762
        </span>
      </a>

      {/* Authentic Official WhatsApp Floating Button */}
      <a
        href={`https://wa.me/91${phone}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgb(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:bg-[#20ba5a]"
      >
        {/* Animated Pulse Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />

        {/* Clean Official WhatsApp Vector SVG Logo */}
        <svg
          viewBox="0 0 32 32"
          className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2A13 13 0 0 0 4.7 20.8L3 27l6.4-1.7A13 13 0 1 0 16 2zm0 23.5a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-4 1.1 1.1-3.9-.3-.4A10.5 10.5 0 1 1 16 25.5zm5.8-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-.9 1.2s-.3.2-.6.1c-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6c.1-.1.3-.3.4-.5s.2-.3.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4.1 2.8 1.2 4.2c1.2 1.5 2.7 2.6 4.9 3.5 2.2.9 2.6.7 3.1.7.5 0 1.6-.7 1.8-1.3.3-.7.3-1.3.2-1.4 0-.1-.2-.2-.5-.3z"/>
        </svg>

        {/* Hover Tooltip */}
        <span className="pointer-events-none absolute right-18 sm:right-20 whitespace-nowrap rounded-md bg-black/90 px-3.5 py-2 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block shadow-xl border border-white/10">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
