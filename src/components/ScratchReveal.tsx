"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Ribbons from "./Ribbons";

const SCRATCH_THRESHOLD = 0.65; // % of circle scratched to consider "done"
const CIRCLE_SIZE = 120;

interface ScratchCircleProps {
  datePart: string;
  onScratchComplete: () => void;
  isRevealed: boolean;
}

function ScratchCircle({ datePart, onScratchComplete, isRevealed }: ScratchCircleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(0);
  const isCompleteRef = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawOverlay = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "rgba(180, 120, 80, 0.95)";
    ctx.beginPath();
    ctx.arc(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, CIRCLE_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(139, 90, 43, 0.8)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, []);

  const getScratchedRatio = useCallback((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, CIRCLE_SIZE, CIRCLE_SIZE);
    const data = imageData.data;
    let transparent = 0;
    const centerX = CIRCLE_SIZE / 2;
    const centerY = CIRCLE_SIZE / 2;
    const radius = CIRCLE_SIZE / 2 - 2;
    for (let y = 0; y < CIRCLE_SIZE; y++) {
      for (let x = 0; x < CIRCLE_SIZE; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        if (dx * dx + dy * dy <= radius * radius) {
          const i = (y * CIRCLE_SIZE + x) * 4;
          if (data[i + 3] < 128) transparent++;
        }
      }
    }
    const total = Math.PI * radius * radius;
    return transparent / total;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctxRef.current = ctx;
    drawOverlay(ctx);
    return () => { ctxRef.current = null; };
  }, [drawOverlay, isRevealed]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
      const ratio = getScratchedRatio(ctx);
      setScratched(ratio);
      if (ratio >= SCRATCH_THRESHOLD && !isCompleteRef.current) {
        isCompleteRef.current = true;
        onScratchComplete();
      }
    },
    [getScratchedRatio, onScratchComplete, isRevealed]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons !== 1 && e.pointerType !== "touch") return;
      if (isRevealed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      const ratio = getScratchedRatio(ctx);
      setScratched(ratio);
      if (ratio >= SCRATCH_THRESHOLD && !isCompleteRef.current) {
        isCompleteRef.current = true;
        onScratchComplete();
      }
    },
    [getScratchedRatio, onScratchComplete, isRevealed]
  );

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative h-[120px] w-[120px]">
        {!isRevealed ? (
          <canvas
            ref={canvasRef}
            width={CIRCLE_SIZE}
            height={CIRCLE_SIZE}
            className="touch-none cursor-grab rounded-full border-2 border-amber-800/60 active:cursor-grabbing"
            style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {}}
          />
        ) : (
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-amber-800/40 bg-amber-50/95 font-serif text-sm font-semibold text-amber-900">
            {datePart}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ScratchReveal() {
  const [completed, setCompleted] = useState([false, false, false]);
  const [showRibbons, setShowRibbons] = useState(false);
  const allDone = completed.every(Boolean);

  const handleComplete = useCallback((index: number) => {
    setCompleted((prev) => {
      const next = [...prev];
      next[index] = true;
      if (next.every(Boolean)) {
        setTimeout(() => setShowRibbons(true), 300);
      }
      return next;
    });
  }, []);

  const dateParts = ["15", "June", "2026"];

  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-rose-50 px-6 py-20">
      <h2 className="mb-4 text-center font-serif text-2xl font-medium text-amber-900 sm:text-3xl">
        Scratch to reveal the date
      </h2>
      <p className="mb-12 text-center text-stone-600">Scratch each circle with your finger or mouse</p>
      <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-8">
        {dateParts.map((part, i) => (
          <ScratchCircle
            key={i}
            datePart={part}
            onScratchComplete={() => handleComplete(i)}
            isRevealed={completed[i]}
          />
        ))}
      </div>
      <p className="mt-8 text-center font-serif text-xl text-amber-900">
        {allDone ? "Save the date — 15 June 2026" : " "}
      </p>
      {showRibbons && <Ribbons />}
    </section>
  );
}
