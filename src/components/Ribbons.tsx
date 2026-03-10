"use client";

import { useEffect, useState } from "react";

const COLORS = ["#e11d48", "#f59e0b", "#84cc16", "#06b6d4", "#8b5cf6", "#ec4899"];
const RIBBON_COUNT = 50;

function Ribbon({ delay, color, left }: { delay: number; color: string; left: number }) {
  const width = 8 + Math.random() * 12;
  const height = 40 + Math.random() * 80;
  const rotation = (Math.random() - 0.5) * 60;

  return (
    <div
      className="absolute animate-ribbon-fall"
      style={{
        left: `${left}%`,
        top: "-100px",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        animationDelay: `${delay}s`,
        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
      }}
    />
  );
}

export default function Ribbons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: RIBBON_COUNT }).map((_, i) => (
        <Ribbon
          key={i}
          delay={i * 0.05 + Math.random() * 0.3}
          color={COLORS[i % COLORS.length]}
          left={Math.random() * 100}
        />
      ))}
    </div>
  );
}
