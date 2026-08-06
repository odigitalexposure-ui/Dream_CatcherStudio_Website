import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GalleryGrid from "./GalleryGrid";

import { FILTERS, useGalleryAssets } from "./GalleryData";

export default function GallerySection() {
  const navigate = useNavigate();

  const items = useGalleryAssets();

  const [active, setActive] = useState("ALL");

  const filteredItems =
    active === "ALL" ? items : items.filter((item) => item.category === active);

  const previewItems = filteredItems.slice(0, 6);

  return (
    <section
      className="
bg-[#F5F3EF]
py-20
px-6
md:px-12
lg:px-20
"
    >
      <div
        className="
max-w-[1400px]
mx-auto
"
      >
        {/* HEADER */}

        <div
          className="
flex
justify-between
items-center
mb-12
"
        >
          <div>
            <h2
              className="
font-serif
text-4xl
md:text-6xl
text-[#4D473F]
"
            >
              Gallery
            </h2>

            <p
              className="
uppercase
tracking-[0.3em]
text-xs
text-[#81786F]
mt-3
"
            >
              Our Recent Work
            </p>
          </div>

          {/* RIGHT FILTER */}

          <div
            className="
relative
group
"
          >
            <button
              className="
border
border-[#D8D0C7]
px-6
py-3
text-xs
tracking-[0.25em]
uppercase
"
            >
              {active}
            </button>

            <div
              className="
absolute
right-0
top-full
hidden
group-hover:flex
flex-col
bg-[#F5F3EF]
border
border-[#D8D0C7]
p-5
w-52
z-50
"
            >
              {Object.entries(FILTERS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className="
text-left
uppercase
tracking-[0.2em]
text-xs
py-2
text-[#81786F]
hover:text-[#4D473F]
"
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW GRID */}

        <GalleryGrid items={previewItems} onOpen={() => {}} />

        {/* BUTTON */}

        <div
          className="
text-center
mt-14
"
        >
          <button
            onClick={() => {
              navigate("/gallery");

              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }, 100);
            }}
            className="
bg-[#4D473F]
text-white
px-10
py-4
uppercase
tracking-[0.3em]
text-xs
"
          >
            SHOW MORE
          </button>
        </div>
      </div>
    </section>
  );
}
