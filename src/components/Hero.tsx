"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image - use placeholder; replace with couple photo */}
      <div className="absolute inset-0">
        <Image
          src="/couple-bg.jpg"
          alt="Juliet and John"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement("div");
              fallback.className = "absolute inset-0 bg-gradient-to-b from-rose-200/90 to-amber-100/90";
              parent.appendChild(fallback);
            }
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <p className="font-serif text-lg tracking-[0.4em] text-white/95 uppercase sm:text-xl">
          We are getting married
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light tracking-wide text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Juliet <span className="font-medium italic text-amber-200">&</span> John
        </h1>
        <p className="mt-2 font-serif text-2xl text-amber-100/90 sm:text-3xl">
          Juliet weds John
        </p>
      </div>
    </section>
  );
}
