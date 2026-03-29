"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Style.module.css";

const PHOTOS = [
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784227/the-jzlovestory/IMG_4184.JPG_vphn6t.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774789731/the-jzlovestory/IMG_4182.JPG_1_dvgoe7.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784310/the-jzlovestory/IMG_4189.JPG_fzefoh.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784286/the-jzlovestory/IMG_4179.JPG_rmiltd.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784279/the-jzlovestory/IMG_4188.JPG_qojhgv.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784270/the-jzlovestory/IMG_4186.JPG_yk93lx.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774789346/the-jzlovestory/IMG_4180.JPG_1_zlpuvt.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784314/the-jzlovestory/IMG_4187.JPG_ucseh9.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774789564/the-jzlovestory/IMG_4181.JPG_1_y0gglp.jpg",
];

const SLIDE_INTERVAL = 1800;
const GAP = 20; // px

// Responsive: 1 on mobile, 3 on desktop
function useVisible() {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 768 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

export default function CouplePhoto() {
  const visible = useVisible();
  const CLONES = visible;
  const extended = [
    ...PHOTOS.slice(-CLONES),
    ...PHOTOS,
    ...PHOTOS.slice(0, CLONES),
  ];

  const [index, setIndex] = useState(CLONES);
  const [animated, setAnimated] = useState(true);
  // Track which images have loaded
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const slideWidthPct = 100 / visible;
  const getTranslate = (i: number) =>
    `calc(-${i * slideWidthPct}% - ${(i * GAP) / visible}px)`;

  // Reset index when visible count changes (responsive)
  useEffect(() => {
    setAnimated(false);
    setIndex(CLONES);
  }, [CLONES]);

  const handleTransitionEnd = useCallback(() => {
    const total = PHOTOS.length;
    if (index >= CLONES + total) {
      setAnimated(false);
      setIndex(CLONES);
    } else if (index < CLONES) {
      setAnimated(false);
      setIndex(CLONES + total - 1);
    }
  }, [index, CLONES]);

  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const advance = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, SLIDE_INTERVAL);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const realIndex =
    ((index - CLONES) % PHOTOS.length + PHOTOS.length) % PHOTOS.length;

  const handleLoad = (i: number) =>
    setLoaded((prev) => ({ ...prev, [i]: true }));

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#0d0a08] flex flex-col items-center gap-6">

      {/* Frame wrapper */}
      <div className={styles.couplePhotoFrame}>
        {/* Gold corner TL */}
        <svg className={styles.couplePhotoCornerTL} width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M2 2 L2 18" stroke="#C9A84C" strokeWidth="1.5" />
          <path d="M2 2 L18 2" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx="2" cy="2" r="2" fill="#C9A84C" />
        </svg>
        {/* Gold corner BR */}
        <svg className={styles.couplePhotoCornerBR} width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M34 34 L34 18" stroke="#C9A84C" strokeWidth="1.5" />
          <path d="M34 34 L18 34" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx="34" cy="34" r="2" fill="#C9A84C" />
        </svg>

        {/* Slider */}
        <div
          className="relative overflow-hidden w-full"
          onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
          onMouseLeave={startTimer}
          onTouchStart={() => { if (timerRef.current) clearInterval(timerRef.current); }}
          onTouchEnd={startTimer}
        >
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer text-[#C9A84C] bg-[rgba(13,10,8,0.7)] border border-[rgba(201,168,76,0.3)] backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.6)]"
            onClick={() => { prev(); startTimer(); }}
            aria-label="Previous photo"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4 L6 9 L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer text-[#C9A84C] bg-[rgba(13,10,8,0.7)] border border-[rgba(201,168,76,0.3)] backdrop-blur-sm transition-all duration-200 hover:bg-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.6)]"
            onClick={() => { advance(); startTimer(); }}
            aria-label="Next photo"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4 L12 9 L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-5 px-6"
            style={{
              transform: `translateX(${getTranslate(index)})`,
              transition: animated ? "transform 0.35s cubic-bezier(0.4,0,0.2,1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((src, i) => {
              const isLoaded = loaded[i];
              return (
                <div
                  key={i}
                  style={{ flex: `0 0 calc(${slideWidthPct}% - ${GAP * (visible - 1) / visible}px)` }}
                >
                  <div className="relative overflow-hidden rounded-md border border-[rgba(201,168,76,0.15)] shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                    {/* Skeleton shimmer — shown until image loads */}
                    {!isLoaded && (
                      <div
                        className="absolute inset-0 z-10"
                        style={{ aspectRatio: "3/4" }}
                        aria-hidden="true"
                      >
                        <div className={styles.skeletonShimmer} />
                      </div>
                    )}

                    <img
                      src={src}
                      alt={`Wedding photo ${(i % PHOTOS.length) + 1}`}
                      className="w-full object-cover block transition-transform duration-500 ease-in-out hover:scale-[1.04]"
                      style={{ aspectRatio: "3/4", opacity: isLoaded ? 1 : 0, transition: "opacity 0.4s ease, transform 0.5s ease" }}
                      loading="lazy"
                      onLoad={() => handleLoad(i)}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[rgba(13,10,8,0.6)] to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom gradient + name overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none rounded-b-sm bg-linear-to-t from-[rgba(13,10,8,0.75)] to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
          <p className="font-['Cormorant_Garamond',Georgia,serif] text-[1.4rem] italic font-light text-[rgba(248,236,212,0.9)] tracking-[0.06em] m-0">
            Juliet &amp; Zimbocrix
          </p>
          <div className="w-10 h-px bg-[rgba(201,168,76,0.6)] mx-auto mt-2" />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`w-1.5 h-1.5 rounded-full border-0 p-0 cursor-pointer transition-all duration-300 ${
              i === realIndex
                ? "bg-[#C9A84C] scale-[1.4]"
                : "bg-[rgba(201,168,76,0.3)]"
            }`}
            onClick={() => { setIndex(CLONES + i); startTimer(); }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      <p className="font-['Cormorant_Garamond',Georgia,serif] text-base italic text-[rgba(248,236,212,0.5)] tracking-[0.08em] text-center">
        &#10022; Forever starts here &#10022;
      </p>
    </section>
  );
}