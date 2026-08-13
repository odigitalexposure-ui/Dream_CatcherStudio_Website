import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "../../assets/logo_dark.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-3"
          : "bg-[#E9E6DD] border-b border-black/10 py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group py-0.5"
          aria-label="DreamCatcher Studio Home"
        >
          <img
            src={logoDark}
            alt="DreamCatcher Studio"
            className="h-16 xs:h-20 sm:h-20 md:h-22 lg:h-24 max-h-[88px] w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105 filter contrast-140 brightness-95 saturate-125"
          />
          <span className="hidden md:inline-block font-logo text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wider text-[#000] uppercase drop-shadow-sm">
            DREAMCATCHER
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-8 lg:gap-10 ml-auto">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative text-xs lg:text-sm uppercase tracking-[0.2em] transition-colors duration-200 py-1 ${
                    isActive
                      ? "text-black font-bold"
                      : "text-[#4A4A4A] hover:text-black font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="inline-block relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-black rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2.5 rounded-lg text-[#333] hover:bg-black/5 active:bg-black/10 transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-[9999] flex"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="ml-auto w-full sm:w-80 md:w-96 bg-[#F8F6F0] h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-[10000] border-l border-black/10 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-5 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoDark}
                      alt="logo"
                      className="h-16 xs:h-20 w-auto max-h-[72px] object-contain drop-shadow-sm"
                    />
                    <span className="font-serif text-xl font-bold text-black uppercase tracking-wider">
                      DreamCatcher
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-black hover:bg-black/10 rounded-full transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <ul className="flex flex-col gap-3 text-sm uppercase tracking-[0.2em]">
                  {navLinks.map((n) => (
                    <li key={n.to}>
                      <NavLink
                        to={n.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block py-3 px-4 rounded-xl transition-all ${
                            isActive
                              ? "bg-black text-white font-semibold shadow-md"
                              : "text-[#333] hover:text-black hover:bg-black/5 font-medium"
                          }`
                        }
                      >
                        {n.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-black/10">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/contact");
                  }}
                  className="w-full py-4 rounded-full bg-[#1E1E1E] hover:bg-[#B58A3C] text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-xl"
                >
                  Book a Shoot / Contact
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

