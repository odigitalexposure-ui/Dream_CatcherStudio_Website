import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({ loader, src, alt = '', className = '', width, height }) {
  const imgRef = useRef();
  const [inView, setInView] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const activeUrl = src || loadedUrl;

  useEffect(() => {
    if (inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '300px' }
    );
    if (imgRef.current) obs.observe(imgRef.current);
    return () => obs.disconnect();
  }, [inView]);

  useEffect(() => {
    let cancelled = false;

    if (!src && loader && inView) {
      Promise.resolve()
        .then(() => loader())
        .then((m) => {
          const u = m && (m.default || m);
          if (!cancelled) {
            setLoadedUrl(u);
          }
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [inView, loader, src]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200/60 animate-pulse" />
      )}

      {activeUrl ? (
        <motion.img
          key={activeUrl}
          src={activeUrl}
          alt={alt}
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-auto object-cover block"
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
        />
      ) : (
        <div style={{ paddingTop: height && width ? undefined : '70%' }} />
      )}
    </div>
  );
}
