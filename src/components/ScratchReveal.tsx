"use client";

import { useCallback, useEffect, useRef, useState } from "react";


const SCRATCH_THRESHOLD = 0.50;
const DISPLAY_SIZE = 140;

interface ScratchCircleProps {
  datePart: string;
  label: string;
  onScratchComplete: () => void;
  isRevealed: boolean;
}

function ScratchCircle({ datePart, label, onScratchComplete, isRevealed }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDown = useRef(false);
  const isDone = useRef(false);
  const dprRef = useRef(1);
  const readyRef = useRef(false);
  const isRevealedRef = useRef(isRevealed);

  useEffect(() => { isRevealedRef.current = isRevealed; }, [isRevealed]);

  const drawOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = dprRef.current;
    const S = DISPLAY_SIZE * dpr;

    ctx.clearRect(0, 0, S, S);
    ctx.save();

    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2 - dpr, 0, Math.PI * 2);
    ctx.clip();

    const grad = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    grad.addColorStop(0, "#eecb6a");
    grad.addColorStop(0.5, "#c9a020");
    grad.addColorStop(1, "#8b6000");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, S, S);

    ctx.globalAlpha = 0.12;
    for (let i = 0; i < S; i += 7 * dpr) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, S);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = dpr;
      ctx.stroke();
    }

    ctx.restore();

    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2 - dpr, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(232,192,96,0.9)";
    ctx.lineWidth = 2.5 * dpr;
    ctx.stroke();
  }, []);

  const eraseAt = useCallback((cssX: number, cssY: number) => {
    const ctx = ctxRef.current;
    if (!ctx || !readyRef.current || isDone.current) return;

    const dpr = dprRef.current;
    const S = DISPLAY_SIZE * dpr;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cssX * dpr, cssY * dpr, 26 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    const { data } = ctx.getImageData(0, 0, S, S);
    let transparent = 0;
    const cr = S / 2 - dpr;

    for (let y = 0; y < S; y += 2) {
      for (let x = 0; x < S; x += 2) {
        if ((x - S / 2) ** 2 + (y - S / 2) ** 2 <= cr * cr) {
          if (data[((y * S + x) * 4) + 3] < 128) transparent++;
        }
      }
    }

    if (transparent / ((Math.PI * cr * cr) / 4) >= SCRATCH_THRESHOLD) {
      isDone.current = true;
      onScratchComplete();
    }
  }, [onScratchComplete]);

  const toLocal = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const r = canvas.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * DISPLAY_SIZE,
      y: ((clientY - r.top) / r.height) * DISPLAY_SIZE,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(window.devicePixelRatio ?? 1, 1);
    dprRef.current = dpr;

    canvas.width = DISPLAY_SIZE * dpr;
    canvas.height = DISPLAY_SIZE * dpr;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctxRef.current = ctx;
    drawOverlay();
    readyRef.current = true;

    const move = (e: PointerEvent) => {
      if (!isDown.current) return;
      const c = toLocal(e.clientX, e.clientY);
      if (c) eraseAt(c.x, c.y);
    };

    canvas.onpointerdown = (e) => {
      isDown.current = true;
      move(e);
    };

    canvas.onpointermove = move;
    canvas.onpointerup = () => (isDown.current = false);

  }, [drawOverlay, eraseAt, toLocal]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
        
        {isRevealed ? (
          <div className="w-full h-full rounded-full border border-[rgba(201,168,76,0.5)]
            bg-linear-to-br from-[rgba(240,160,176,0.18)] to-[rgba(201,168,76,0.12)]
            flex items-center justify-center animate-[scratchRevealPop_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">

            <span className="font-serif text-[1.4rem] sm:text-[1.8rem] md:text-[2rem] text-[#f8ecd4]">
              {datePart}
            </span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-serif text-[1.4rem] sm:text-[1.8rem] md:text-[2rem] text-[#f8ecd4]">
                {datePart}
              </span>
            </div>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-full cursor-crosshair touch-none"
            />
          </>
        )}
      </div>

      <p className="text-[0.6rem] tracking-[0.35em] text-[#C9A84C] uppercase opacity-70 font-serif">
        {label}
      </p>
    </div>
  );
}

export default function ScratchReveal({ onAllScratched }: { onAllScratched?: () => void }) {
  const [completed, setCompleted] = useState([false, false, false]);
  const [showCelebration, setShowCelebration] = useState(false);

  const allDone = completed.every(Boolean);

 const handleComplete = (index: number) => {
  setCompleted((prev) => {
    const next = [...prev];
    next[index] = true;

    // Check AFTER updating
    const isAllDone = next.every(Boolean);

    if (isAllDone) {
      setTimeout(() => {
        setShowCelebration(true);
        onAllScratched?.();
      }, 300);
    }

    return next;
  });
};

  const dateParts = [
    { value: "11", label: "Day" },
    { value: "April", label: "Month" },
    { value: "2026", label: "Year" },
  ];

  return (
    <section className="relative py-20 px-4 bg-linear-to-b from-[#0d0a08] to-[#0d0a08]">

      {/* Background dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none
        bg-[radial-gradient(circle,#f0a0b0_1px,transparent_1px)] bg-size-[32px_32px]" />

      <div className="relative max-w-2xl mx-auto text-center">

        <p className="font-[Georgia,serif] text-[0.7rem] tracking-[0.5em] text-[#C9A84C] uppercase mb-4">
          Save the Date
        </p>

        <h2 className="font-['Cormorant_Garamond','Playfair_Display',Georgia,serif] text-[clamp(1.6rem,4vw,2.6rem)] font-lighttext-(--cream) mb-2">
          Reveal the Date
        </h2>

         <p className="font-[Georgia,serif] text-[0.85rem] text-[rgba(248,236,212,0.4)] tracking-widest mb-14">
          Scratch each circle to uncover our special day
        </p>

        <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-8 font-['Cormorant_Garamond',Georgia,serif]">
          {dateParts.map((part, i) => (
            <ScratchCircle
              key={i}
              datePart={part.value}
              label={part.label}
              onScratchComplete={() => handleComplete(i)}
              isRevealed={completed[i]}
            />
          ))}
        </div>

        <div className={`mt-10 h-10 flex items-center justify-center transition-opacity duration-700 ${allDone ? "opacity-100" : "opacity-0"}`}>
          {showCelebration && (
            <p className="text-xs italic text-[#C9A84C] tracking-wider font-serif">
              &#10022; Save the Date — 11 April 2026 &#10022;
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scratchRevealPop {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}