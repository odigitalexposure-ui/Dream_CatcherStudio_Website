import GalleryCard from './GalleryCard';

export default function GalleryGrid({ items, onOpen }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-6 px-2 sm:px-4 lg:px-0">
      {/* Editorial masonry using CSS columns */}
      <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 md:gap-6">
        {items.map((it, idx) => (
          <GalleryCard key={it.id || it.path || idx} item={it} onOpen={() => onOpen(idx)} />
        ))}
      </div>
    </div>
  );
}
