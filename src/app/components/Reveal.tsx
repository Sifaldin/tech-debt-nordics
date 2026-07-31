'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms */
  delay?: number;
}

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    // threshold must stay 0. A ratio threshold is a proportion of the ELEMENT,
    // so once an element grows taller than ~6x the viewport it can never show
    // that fraction at once and the callback never fires, leaving the content
    // stuck at opacity 0. That is exactly what happened to the services strip
    // on phones: as a single column it is ~5700px tall, and the old 0.15 needed
    // 860px visible at once. rootMargin does the same job in viewport units, so
    // it behaves identically for a short heading and a very tall section.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'in-view' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
