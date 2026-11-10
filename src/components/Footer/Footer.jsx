import { NavLink } from "react-router-dom";
import { Camera, Globe, Play, Phone, MapPin, Mail, ExternalLink } from "lucide-react";
import logoLight from "../../assets/logo_light.jpg";

export default function Footer() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  const gmbUrl = "https://share.google/dgegV1871bsTtY3V9";

  return (
    <footer className="bg-neutral-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoLight} alt="logo" className="h-16 sm:h-20 md:h-24 w-auto max-h-[90px] object-contain rounded" />
            <div>
              <div className="font-semibold">DREAMCATCHER Studio</div>
              <div className="text-sm text-neutral-300">
                Photography • Wedding • Cinematography
              </div>
            </div>
          </div>
          <p className="text-sm text-neutral-400">
            Creative visual storytelling capturing moments that matter.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              aria-label="Google Business Profile (GMB)"
              href={gmbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Google Business Profile (GMB)"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </a>
            <a
              aria-label="Portfolio"
              href="/gallery"
              className="p-2 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Portfolio"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a
              aria-label="Website"
              href="/"
              className="p-2 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              aria-label="Video"
              href="/gallery"
              className="p-2 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Cinematography"
            >
              <Play className="w-5 h-5" />
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
          <ul className="text-sm text-neutral-300 space-y-2.5">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-neutral-400" />
              <a
                href={gmbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
                title="View on Google Maps / GMB"
              >
                Address: A3, 736, beside Saral Dighi, Paschim Nischintapur, Boral, Rajpur
                Sonarpur, Garia, Kolkata, 700154
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 flex-shrink-0 text-neutral-400" />
              <a href="tel:+918240481762" className="hover:text-white transition-colors">
                +91 8240481762
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 flex-shrink-0 text-neutral-400" />
              <a href="mailto:hello@dreamcatcher.studio" className="hover:text-white transition-colors">
                hello@dreamcatcher.studio
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-400">GMB Profile:</span>
              <a
                href={gmbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                title="Google Business Profile (GMB)"
              >
                Google Business Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </li>
            <li className="text-xs text-neutral-500 pt-1">Mon - Sat: 9:00 - 9:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between text-sm text-neutral-400">
          <div>
            © 2026 DREAMCATCHER Studio.
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
