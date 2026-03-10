"use client";

import { useState } from "react";

interface CurtainProps {
  onReveal: () => void;
}

export default function Curtain({ onReveal }: CurtainProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      onReveal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex cursor-pointer select-none"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      aria-label="Click to open the curtains"
    >
      {/* Left curtain */}
      <div
        className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-red-900 via-red-700 to-red-800 shadow-[inset_-20px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-in-out"
        style={{
          transform: open ? "translateX(-100%)" : "translateX(0)",
          boxShadow: "inset -30px 0 80px rgba(0,0,0,0.4)",
        }}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />
        <div className="absolute right-0 top-0 h-full w-4 bg-amber-900/80" />
      </div>

      {/* Right curtain */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-red-900 via-red-700 to-red-800 shadow-[inset_20px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-in-out"
        style={{
          transform: open ? "translateX(100%)" : "translateX(0)",
          boxShadow: "inset 30px 0 80px rgba(0,0,0,0.4)",
        }}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-90deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />
        <div className="absolute left-0 top-0 h-full w-4 bg-amber-900/80" />
      </div>

      {/* Center hint - only when closed */}
      {!open && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/90 px-6 py-3 font-serif text-lg font-medium text-amber-50 shadow-lg backdrop-blur-sm animate-pulse">
          Tap to open
        </div>
      )}
    </div>
  );
}
