import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FILTERS } from "./GalleryData";

const menuItems = [
  {
    title: "ALL",
    children: [],
  },
  {
    title: FILTERS.PORTRAIT.label,
    children: FILTERS.PORTRAIT.children,
  },
  {
    title: FILTERS.COMMERCIAL.label,
    children: FILTERS.COMMERCIAL.children,
  },
];

export default function GalleryHeader({
  onCategorySelect = () => {},
  selectedCategory = null,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isParentActive = (menu) => {
    if (menu.title === "ALL") {
      return !selectedCategory || selectedCategory === "ALL";
    }
    return (
      selectedCategory === menu.title ||
      menu.children.includes(selectedCategory)
    );
  };

  return (
    <header className="w-full bg-[#E9E6DD]">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 lg:pb-10">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
            className="
              text-[#565656]
              uppercase
              font-light
              tracking-[0.18em]
              sm:tracking-[0.22em]
              md:tracking-[0.28em]
              lg:tracking-[0.35em]
              leading-none
              text-lg
              xs:text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-[38px]
              xl:text-[46px]
              2xl:text-[52px]
              max-w-[65%]
              lg:max-w-none
              break-words
            "
          >
            Dream Catcher Studio
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 xl:gap-12 2xl:gap-16">
            {menuItems.map((menu) => {
              const active = isParentActive(menu);

              if (menu.children.length === 0) {
                return (
                  <button
                    key={menu.title}
                    onClick={() => onCategorySelect("ALL")}
                    className={`
                      uppercase
                      duration-300
                      tracking-[0.18em]
                      lg:tracking-[0.25em]
                      text-[11px]
                      lg:text-[13px]
                      xl:text-[14px]
                      transition-colors
                      ${
                        active
                          ? "text-black font-medium border-b-2 border-black pb-1"
                          : "text-[#565656] hover:text-black"
                      }
                    `}
                  >
                    {menu.title}
                  </button>
                );
              }

              return (
                <div key={menu.title} className="relative group">
                  <button
                    onClick={() => onCategorySelect(menu.title)}
                    className={`
                      flex items-center gap-1
                      uppercase
                      duration-300
                      tracking-[0.18em]
                      lg:tracking-[0.25em]
                      text-[11px]
                      lg:text-[13px]
                      xl:text-[14px]
                      transition-colors
                      ${
                        active
                          ? "text-black font-medium border-b-2 border-black pb-1"
                          : "text-[#565656] hover:text-black"
                      }
                    `}
                  >
                    {menu.title}
                    <ChevronDown
                      size={15}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className="
                      absolute
                      left-0
                      top-full
                      mt-3
                      min-w-[220px]
                      bg-white
                      rounded-md
                      shadow-xl
                      py-2
                      opacity-0
                      invisible
                      translate-y-3
                      group-hover:opacity-100
                      group-hover:visible
                      group-hover:translate-y-0
                      transition-all
                      duration-300
                      z-50
                    "
                  >
                    {menu.children.map((item) => {
                      const isChildActive = selectedCategory === item;
                      return (
                        <button
                          key={item}
                          onClick={() => onCategorySelect(item)}
                          className={`
                            block
                            w-full
                            text-left
                            px-5
                            py-3
                            uppercase
                            text-[12px]
                            tracking-[0.18em]
                            duration-200
                            ${
                              isChildActive
                                ? "bg-[#F7F5F0] text-black font-semibold"
                                : "text-[#5c5c5c] hover:bg-[#F7F5F0] hover:text-black"
                            }
                          `}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              md:hidden
              text-[#565656]
              p-2
            "
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{ duration: 0.3 }}
              className="
                md:hidden
                overflow-hidden
                mt-6
                bg-white
                rounded-xl
                shadow-lg
              "
            >
              <button
                onClick={() => {
                  onCategorySelect("ALL");
                  setMobileOpen(false);
                }}
                className={`
                  block
                  w-full
                  text-left
                  px-5
                  py-4
                  uppercase
                  tracking-[0.18em]
                  text-sm
                  border-b border-gray-200
                  ${
                    !selectedCategory || selectedCategory === "ALL"
                      ? "text-black font-semibold bg-[#F7F5F0]"
                      : "text-[#565656]"
                  }
                `}
              >
                ALL
              </button>
              {menuItems
                .filter((menu) => menu.children.length > 0)
                .map((menu) => (
                  <details
                    key={menu.title}
                    className="border-b border-gray-200 last:border-none"
                  >
                    <summary
                      className="
                        cursor-pointer
                        list-none
                        flex
                        items-center
                        justify-between
                        px-5
                        py-4
                        uppercase
                        tracking-[0.18em]
                        text-[#565656]
                        text-sm
                      "
                    >
                      {menu.title}
                    </summary>

                    <div className="pb-3">
                      <button
                        onClick={() => {
                          onCategorySelect(menu.title);
                          setMobileOpen(false);
                        }}
                        className="
                          block
                          w-full
                          text-left
                          px-8
                          py-3
                          text-[#333]
                          font-medium
                          uppercase
                          tracking-[0.12em]
                          text-xs
                          hover:bg-[#F7F5F0]
                        "
                      >
                        All {menu.title}
                      </button>
                      {menu.children.map((child) => (
                        <button
                          key={child}
                          onClick={() => {
                            onCategorySelect(child);
                            setMobileOpen(false);
                          }}
                          className={`
                            block
                            w-full
                            text-left
                            px-8
                            py-3
                            uppercase
                            tracking-[0.12em]
                            text-xs
                            hover:bg-[#F7F5F0]
                            ${
                              selectedCategory === child
                                ? "text-black font-semibold bg-[#F7F5F0]"
                                : "text-[#666]"
                            }
                          `}
                        >
                          {child}
                        </button>
                      ))}
                    </div>
                  </details>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

