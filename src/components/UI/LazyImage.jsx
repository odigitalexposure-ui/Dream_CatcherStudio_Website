import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({ loader, src, alt = '', className = '', width, height }) {
  const imgRef = useRef();
  const [inView, setInView] = useState(false);
  const [url, setUrl] = useState(src || null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (url) return; // already have src
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
  }, [url]);

  useEffect(() => {
    let cancelled = false;
    if (inView && loader && !url) {
      // call loader which returns module or url
      Promise.resolve()
        .then(() => loader())
        .then((m) => {
          const u = m && (m.default || m);
          if (!cancelled) setUrl(u);
        })
        .catch(() => {});
    }
    return () => { cancelled = true; };
  }, [inView, loader, url]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200/60 animate-pulse" />
      )}

      {url ? (
        <motion.img
          src={url}
          alt={alt}
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full h-auto object-cover block"
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
        />
      ) : (
        // fallback empty element to keep layout
        <div style={{ paddingTop: height && width ? undefined : '70%' }} />
      )}
    </div>
  );
}
