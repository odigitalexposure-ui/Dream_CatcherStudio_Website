import { useState, useEffect, useMemo, useCallback } from 'react';
import GalleryCard from './GalleryCard';

function useColumnCount() {
  const [cols, setCols] = useState(() => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 768) return 2;
    if (w < 1024) return 3;
    return 4;
  });

  useEffect(() => {
    function updateCols() {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 768) setCols(2);
      else if (w < 1024) setCols(3);
      else setCols(4);
    }
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  return cols;
}

export default function GalleryGrid({ items, onOpen }) {
  const numCols = useColumnCount();
  const [itemAspects, setItemAspects] = useState({});

  const handleMeasure = useCallback((id, aspect) => {
    if (!id || !aspect || isNaN(aspect)) return;
    setItemAspects((prev) => {
      if (prev[id] === aspect) return prev;
      return { ...prev, [id]: aspect };
    });
  }, []);

  // Shortest-Column Placement for perfectly balanced height with ZERO middle gaps:
  const columns = useMemo(() => {
    if (!items || items.length === 0) return [];
    const cols = Array.from({ length: numCols }, () => []);
    const heights = Array.from({ length: numCols }, () => 0);

    items.forEach((item, originalIndex) => {
      // Find column with minimum total height
      let minCol = 0;
      for (let c = 1; c < numCols; c++) {
        if (heights[c] < heights[minCol]) {
          minCol = c;
        }
      }

      cols[minCol].push({ item, originalIndex });

      // Relative height = 1 / aspect
      const aspect = itemAspects[item.id || item.path] || item.aspect || 1;
      const relHeight = aspect > 0 ? 1 / aspect : 1;
      heights[minCol] += relHeight;
    });

    return cols;
  }, [items, numCols, itemAspects]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-6 px-2 sm:px-4 lg:px-0">
      <div className="flex gap-3 sm:gap-4 md:gap-6 items-start">
        {columns.map((colItems, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6 min-w-0">
            {colItems.map(({ item, originalIndex }) => (
              <GalleryCard
                key={item.id || item.path || originalIndex}
                item={item}
                onOpen={() => onOpen(originalIndex)}
                onMeasure={handleMeasure}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
