"use client";

const swatches = [
  { color: "#A95C68", name: "Blush Pink" },
  { color: "#000000", name: "Black" },
  { color: "#046307", name: "Emerald Green" },
  { color: "#C9A84C", name: "Gold" },
];

export default function DressCode() {
  return (
    <section className="relative overflow-hidden py-20 px-5 bg-linear-to-b from-[#0b0804] to-[#040301]">

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">

        {/* Label */}
        <p className="uppercase tracking-[0.5em] text-[0.65rem] text-[#c9a84c]/80 mb-6">
          Dress Code
        </p>

        {/* Title */}
        <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6">
          Colours of the Day
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-px bg-linear-to-r from-transparent to-[#c9a84c]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/70" />
          <div className="w-10 h-px bg-linear-to-l from-transparent to-[#c9a84c]/60" />
        </div>

        {/* Swatches */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 justify-items-center mb-12">
          {swatches.map((s) => (
            <div
              key={s.name}
              className="flex flex-col items-center gap-3 group"
            >
              {/* Circle */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#c9a84c]/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:scale-105"
                style={{
                  background: s.color,
                }}
              />

              {/* Label */}
              <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-white/70">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="max-w-md mx-auto text-white/50 text-sm sm:text-base leading-relaxed mb-12">
          We invite our guests to dress in{" "}
          <span className="text-[#c9a84c]/80">
            blush pink, black, emerald green, or gold
          </span>
          , joining us in an evening of timeless elegance.
        </p>

        {/* Bottom flourish */}
        <div className="flex justify-center mb-10">
          <svg width="120" height="16" viewBox="0 0 120 16" fill="none">
            <line x1="0" y1="8" x2="44" y2="8" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
            <circle cx="52" cy="8" r="4" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
            <circle cx="60" cy="8" r="3" fill="#C9A84C" opacity="0.7" />
            <circle cx="68" cy="8" r="4" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
            <line x1="76" y1="8" x2="120" y2="8" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
          </svg>
        </div>

        {/* Footer */}
        <p className="font-['Cormorant_Garamond',Georgia,serif] text-lg sm:text-xl italic tracking-tight text-[rgba(248,236,212,0.35)]">
          Juliet &amp; Zimbocrix · 2026
        </p>
      </div>
    </section>
  );
}