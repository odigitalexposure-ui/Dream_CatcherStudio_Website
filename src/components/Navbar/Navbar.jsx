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
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur-md py-3"
          : "bg-[#E9E6DD]/95 backdrop-blur-md border-b border-black/5 py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group"
          aria-label="Dream Catcher Studio Home"
        >
          <img
            src={logoDark}
            alt="Dream Catcher Studio"
            className="w-10 h-10 md:w-12 md:h-12 object-contain rounded transition-transform group-hover:scale-105"
          />
          <span className="font-serif text-lg md:text-xl font-medium tracking-wider text-[#333] uppercase">
            Dream Catcher
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
          className="md:hidden p-2 rounded-lg text-[#333] hover:bg-black/5 transition-colors"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="ml-auto w-4/5 max-w-sm bg-white h-full p-8 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoDark}
                      alt="logo"
                      className="w-10 h-10 object-contain"
                    />
                    <span className="font-serif text-lg font-medium text-black uppercase tracking-wider">
                      Dream Catcher
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <ul className="flex flex-col gap-6 text-sm uppercase tracking-[0.2em]">
                  {navLinks.map((n) => (
                    <li key={n.to}>
                      <NavLink
                        to={n.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block py-2 transition-colors ${
                            isActive
                              ? "text-black font-bold border-l-4 border-black pl-3"
                              : "text-gray-600 hover:text-black pl-3"
                          }`
                        }
                      >
                        {n.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/contact");
                  }}
                  className="w-full py-4 rounded-lg bg-[#333] hover:bg-black text-white text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

