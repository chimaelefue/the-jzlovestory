"use client";

import { useEffect, useState } from "react";
import styles from "./Style.module.css";

export default function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      {/* h-[100dvh] keeps everything inside one screen; grain pseudo via CSS module */}
      <section className={`${styles.grain} relative w-full h-dvh min-h-150 overflow-hidden flex items-center justify-center bg-[#040301]`}>

        {/* ── Photo ── */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784231/the-jzlovestory/IMG_4185.JPG_dv9zib.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_15%]"
            style={{ filter: "brightness(0.48) contrast(1.1) saturate(0.85)" }}
          />
        </div>

        {/* ── Overlay stack ── */}
        {/* 1. Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 80% at 50% 40%, transparent 25%, rgba(2,1,0,0.55) 70%, rgba(2,1,0,0.85) 100%)",
          }}
        />
        {/* 2. Top/bottom gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,3,1,0.7) 0%, rgba(4,3,1,0.05) 30%, rgba(4,3,1,0.08) 65%, rgba(4,3,1,0.82) 100%)",
          }}
        />
        {/* 3. Warm golden breath at base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 35% at 50% 100%, rgba(180,130,20,0.1) 0%, transparent 70%)",
          }}
        />

        {/* ── Corner brackets — FIX 2: use absolute inset classes so they stay within 100dvh ── */}
        {[
          { classes: "top-6 left-6", flipX: false, flipY: false, delays: [0.20, 0.28, 0.50, 0.55] },
          { classes: "top-6 right-6", flipX: true, flipY: false, delays: [0.28, 0.36, 0.56, 0.61] },
          { classes: "bottom-6 left-6", flipX: false, flipY: true, delays: [0.36, 0.44, 0.62, 0.67] },
          { classes: "bottom-6 right-6", flipX: true, flipY: true, delays: [0.44, 0.52, 0.68, 0.73] },
        ].map((c, i) => (
          <svg
            key={i}
            className={`absolute ${c.classes}`}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{
              transform: `scale(${c.flipX ? -1 : 1}, ${c.flipY ? -1 : 1})`,
            }}
          >
            <path d="M3 3 L3 32" stroke="#C9A84C" strokeWidth="0.8" className={styles.cornerPath} style={{ animationDelay: `${c.delays[0]}s` }} />
            <path d="M3 3 L32 3" stroke="#C9A84C" strokeWidth="0.8" className={styles.cornerPath} style={{ animationDelay: `${c.delays[1]}s` }} />
            <circle cx="3" cy="3" r="2" fill="#C9A84C" opacity="0.7" />
            <path d="M10 3 L14 3" stroke="#C9A84C" strokeWidth="0.4" opacity="0.4" className={styles.cornerPath} style={{ animationDelay: `${c.delays[2]}s` }} />
            <path d="M3 10 L3 14" stroke="#C9A84C" strokeWidth="0.4" opacity="0.4" className={styles.cornerPath} style={{ animationDelay: `${c.delays[3]}s` }} />
          </svg>
        ))}

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 w-full max-w-3xl">

          {/* Eyebrow */}
          <p
            className={`${styles.reveal1} mb-7 text-[#c9a84c] uppercase tracking-[0.55em] font-normal`}
            style={{ fontSize: "0.58rem", opacity: 0, fontFamily: "'Cinzel', serif" }}
          >
            Together with their families
          </p>

          {/* Divider top */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-[#ebbf3b]" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1 L10.5 6.5 L16 7 L11.5 11 L13 17 L9 14 L5 17 L6.5 11 L2 7 L7.5 6.5 Z" fill="#C9A84C" />
            </svg>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-[#ebbf3b]" />
          </div>

          {/* Name 1 */}
          <h1
            className={`${styles.reveal3} text-white font-light leading-none tracking-[0.06em]`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(4rem, 13vw, 8rem)",
              textShadow: "0 4px 60px rgba(0,0,0,0.6)",
              marginBottom: 0,
              opacity: 0,
            }}
          >
            Juliet
          </h1>

          {/* Ampersand */}
          <div
            className={`${styles.reveal3} italic font-light text-[#c9a84c] leading-none my-0.5`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.4rem, 8vw, 5rem)",
              textShadow: "0 0 60px rgba(201,168,76,0.25)",
              opacity: 0,
            }}
          >
            &amp;
          </div>

          {/* Name 2 */}
          <h1
            className={`${styles.reveal3} text-white font-light leading-none tracking-[0.06em]`}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(4rem, 13vw, 8rem)",
              textShadow: "0 4px 60px rgba(0,0,0,0.6)",
              marginBottom: 0,
              opacity: 0,
            }}
          >
            Zimbocrix
          </h1>

          {/* Divider bottom */}
          <div className="flex items-center gap-3 mt-5 mb-5">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-[#ebbf3b]" />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="3" fill="#C9A84C" />
              <circle cx="7" cy="7" r="6" stroke="#C9A84C" strokeWidth="0.8" />
            </svg>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-[#ebbf3b]" />
          </div>

          {/* Tagline */}
          <p
            className={`${styles.reveal4} text-white/55 uppercase tracking-[0.42em] font-normal mb-8`}
            style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)", opacity: 0 }}
          >
            Request the pleasure of your company
          </p>

          {/* Date pill */}
          <div
            className={`${styles.reveal5} inline-flex items-center gap-3.5 border border-[rgba(201,168,76,0.4)] hover:border-[rgba(201,168,76,0.7)] rounded-full px-9 py-2.5 bg-[rgba(8,6,2,0.5)] hover:bg-[rgba(20,15,5,0.6)] backdrop-blur-md cursor-default transition-all duration-400`}
            style={{ opacity: 0 }}
          >
            {["11", "April", "2026"].map((part, i) => (
              <span key={part} className="contents">
                <span
                  className="text-[#d4a93c] font-normal tracking-[0.32em]"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(0.62rem, 1.6vw, 0.75rem)" }}
                >
                  {part}
                </span>

                {i < 2 && (
                  <span
                    key={`dot-${i}`}
                    className="w-0.75 h-0.75 rounded-full bg-[rgba(201,168,76,0.5)] inline-block shrink-0"
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll cue — absolutely positioned so it stays within the viewport ── */}
        <div
          className="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          style={{
            opacity: phase >= 3 ? 0.6 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <p
            className="text-white/50 uppercase tracking-[0.44em] m-0"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "0.48rem" }}
          >
            Scroll
          </p>
          <div
            className={styles.scrollDrop}
            style={{
              width: "0.5px",
              height: 40,
              background: "linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)",
            }}
          />
        </div>
      </section>
    </>
  );
}