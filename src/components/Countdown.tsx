"use client";

import { useEffect, useState } from "react";
import styles from "./Style.module.css";

const WEDDING_DATE = new Date("2026-04-11T10:00:00");

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const d = WEDDING_DATE.getTime() - now.getTime();
      if (d <= 0) {
        setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setDiff({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((d % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { value: diff.days, label: "Days" },
    { value: diff.hours, label: "Hours" },
    { value: diff.minutes, label: "Minutes" },
    { value: diff.seconds, label: "Seconds" },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-linear-to-b from-[#0d0a08] to-[#0a1a12]">

      <div className="absolute top-1/2 left-1/2 w-125 h-125 rounded-full pointer-events-none translate-x-[-50%] translate-y-[-50%] bg-[radial-gradient(circle,rgba(240,160,176,0.06)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl text-center">

        <p className="font-[Georgia,serif] text-[0.7rem] tracking-[0.5em] text-[#C9A84C] uppercase mb-4">
          Time Remaining
        </p>

        <h2 className="font-['Cormorant_Garamond','Playfair_Display',Georgia,serif] text-[clamp(1.6rem,4vw,2.6rem)] font-lighttext-(--cream) mb-2">
          Counting Down to Forever
        </h2>

        <p className="font-[Georgia,serif] text-[0.85rem] text-[rgba(248,236,212,0.4)] tracking-widest mb-14">
          11 April 2026 · 10:00 AM
        </p>

        {mounted ? (
          <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
            {boxes.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex items-center"
              >
                {/* Box */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center
            w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
            rounded-xl
            border border-[rgba(201,168,76,0.25)]
            bg-[linear-gradient(145deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))]
            shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(201,168,76,0.15)]">

                    <span className="font-['Cormorant_Garamond',Georgia,serif] text-[1.6rem] sm:text-[2rem] md:text-[2.5rem] font-light text-(--cream) leading-none tracking-wide">
                      {pad(value)}
                    </span>
                  </div>

                  <p className="mt-2 sm:mt-3
            text-[0.55rem] sm:text-[0.65rem] md:text-[0.7rem]
            tracking-[0.3em] text-[#C9A84C] uppercase font-[Georgia,serif] text-center">
                    {label}
                  </p>
                </div>

                {/* Colon */}
                {i < boxes.length - 1 && (
                  <span className="mx-1 sm:mx-2 md:mx-3
            text-lg sm:text-xl md:text-2xl
            text-[rgba(201,168,76,0.4)] font-[Georgia,serif]">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
            {["Days", "Hours", "Minutes", "Seconds"].map((l) => (
              <div
                key={l}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
          rounded-xl
          border border-[rgba(201,168,76,0.15)]
          bg-[rgba(201,168,76,0.08)]"
              />
            ))}
          </div>
        )}

        <p className="font-['Cormorant_Garamond',Georgia,serif] text-[0.95rem] italic text-[rgba(240,160,176,0.6)] mt-12">
          We hope you'll be there to share in our joy
        </p>
      </div>
    </section>
  );
}