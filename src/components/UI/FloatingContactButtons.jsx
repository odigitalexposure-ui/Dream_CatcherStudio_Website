import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContactButtons() {
  const phone = "8240481762";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-3 sm:gap-4">
      {/* Call Button */}
      <a
        href={`tel:${phone}`}
        aria-label="Call"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-700"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />

        <span className="pointer-events-none absolute right-14 sm:right-16 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-xs sm:text-sm text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block">
          Call Now
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/91${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d]"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />

        <span className="pointer-events-none absolute right-14 sm:right-16 whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-xs sm:text-sm text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hidden sm:block">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
