import { NavLink } from "react-router-dom";
import { Camera, Globe, Play, Phone, MapPin, Mail } from "lucide-react";
import logoLight from "../../assets/logo_light.jpg";

export default function Footer() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-neutral-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoLight} alt="logo" className="h-16 sm:h-20 md:h-24 w-auto max-h-[90px] object-contain rounded" />
            <div>
              <div className="font-semibold">DreamCatcher Studio</div>
              <div className="text-sm text-neutral-300">
                Photography • Wedding • Cinematography
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-400">
            Creative visual storytelling capturing moments that matter.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              aria-label="Portfolio"
              href="#"
              className="p-2 rounded hover:bg-white/10"
            >
              <Camera />
            </a>
            <a
              aria-label="Website"
              href="#"
              className="p-2 rounded hover:bg-white/10"
            >
              <Globe />
            </a>
            <a
              aria-label="Video"
              href="#"
              className="p-2 rounded hover:bg-white/10"
            >
              <Play />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-accent-start font-semibold"
                      : "text-neutral-300"
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="text-sm text-neutral-300 space-y-2">
            <li className="flex items-center gap-2">
              <MapPin /> Address: A3, 736, Paschim Nischintapur, Boral, Rajpur
              Sonarpur, Kolkata, 700154
            </li>
            <li className="flex items-center gap-2">
              <Phone /> +91 8240481762
            </li>
            <li className="flex items-center gap-2">
              <Mail /> hello@dreamcatcher.studio
            </li>
            <li className="text-xs text-neutral-500">Mon - Sat: 9:00 - 9:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between text-sm text-neutral-400">
          <div>
            © 2026 DreamCatcher Studio.
            Designed & Developed by
            <a
              href="https://www.teamdeoskolkata.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-red-700 transition-colors duration-300 ml-1"
            >
              Digital Exposure Online Service
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
