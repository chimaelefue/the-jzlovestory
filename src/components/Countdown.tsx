"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-06-15T14:00:00");

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

  if (!mounted) {
    return (
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-medium text-amber-900">Countdown</h2>
          <div className="mt-8 flex justify-center gap-4">—</div>
        </div>
      </section>
    );
  }

  const boxes = [
    { value: diff.days, label: "Days" },
    { value: diff.hours, label: "Hours" },
    { value: diff.minutes, label: "Minutes" },
    { value: diff.seconds, label: "Seconds" },
  ];

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-2xl font-medium text-amber-900 sm:text-3xl">
          Counting down to the big day
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {boxes.map(({ value, label }) => (
            <div
              key={label}
              className="flex min-w-[70px] flex-col rounded-xl border-2 border-amber-200 bg-amber-50/80 px-4 py-5 shadow-sm"
            >
              <span className="font-mono text-2xl font-bold text-amber-900 sm:text-3xl">
                {pad(value)}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-amber-700">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
