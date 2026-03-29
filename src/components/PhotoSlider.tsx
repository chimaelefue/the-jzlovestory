"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Style.module.css";

// Replace these URLs with your actual photos later
const PHOTOS = [
  "https://i.pinimg.com/1200x/e4/ca/00/e4ca001bfc364633c4e65f384080e0fe.jpg",
  "https://i.pinimg.com/1200x/e4/ca/00/e4ca001bfc364633c4e65f384080e0fe.jpg",
  "https://i.pinimg.com/1200x/e4/ca/00/e4ca001bfc364633c4e65f384080e0fe.jpg",
  "https://i.pinimg.com/1200x/e4/ca/00/e4ca001bfc364633c4e65f384080e0fe.jpg",
  "https://i.pinimg.com/1200x/e4/ca/00/e4ca001bfc364633c4e65f384080e0fe.jpg",
];

const SLIDE_INTERVAL = 4000;

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = PHOTOS.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
  }, []);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  // Pause on hover
  const pause = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const resume = () => {
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
  };

  // How many slides visible at once (3 on desktop, 1 on mobile)
  // We render all and use CSS transform to slide
  const visibleCount = 3;
  const slideWidthPct = 100 / visibleCount;

  return (
    <section className="relative py-20 overflow-hidden bg-[#0d0a08]">
      {/* Heading */}
      <p className="text-xs tracking-widest text-[#C9A84C] uppercase mb-4 text-center">A glimpse of us</p>
      
      {/* Slider */}
      <div
        className={styles.sliderTrack}
        style={{ position: "relative" }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {/* Prev arrow */}
        <button
          className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
          onClick={prev}
          aria-label="Previous photo"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4 L6 9 L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
          onClick={next}
          aria-label="Next photo"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4 L12 9 L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Track */}
        <div
          className={styles.sliderInner}
          style={{
            transform: `translateX(calc(-${current * slideWidthPct}% - ${current * 20 / visibleCount}px))`,
          }}
        >
          {PHOTOS.map((src, i) => (
            <div key={i} className={styles.sliderSlide}>
              <div className={styles.sliderImgWrap}>
                <img
                  src={src}
                  alt={`Wedding photo ${i + 1}`}
                  className={styles.sliderImg}
                  loading="lazy"
                />
                <div className={styles.sliderOverlay} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className={styles.sliderDots}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`${styles.sliderDot} ${i === current ? styles.sliderDotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}