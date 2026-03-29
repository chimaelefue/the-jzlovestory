"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./Style.module.css";

interface CurtainProps {
  onReveal: () => void;
}

const SPRING = {
  stiffness: 20,
  damping: 25,
  mass: 2.5,
};
const GOLD_POS = [0.1, 0.25, 0.42, 0.58, 0.75, 0.9];
const FOLDS = 10;

function drawCurtain(canvas: HTMLCanvasElement, side: "left" | "right") {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  const gx = ctx.createLinearGradient(0, 0, W, 0);
  if (side === "left") {
    gx.addColorStop(0,    "#4e0c0c");
    gx.addColorStop(0.15, "#8a1818");
    gx.addColorStop(0.3,  "#6e1414");
    gx.addColorStop(0.48, "#a01e1e");
    gx.addColorStop(0.65, "#7c1616");
    gx.addColorStop(0.82, "#b02222");
    gx.addColorStop(1,    "#601010");
  } else {
    gx.addColorStop(0,    "#601010");
    gx.addColorStop(0.18, "#b02222");
    gx.addColorStop(0.35, "#7c1616");
    gx.addColorStop(0.52, "#a01e1e");
    gx.addColorStop(0.7,  "#6e1414");
    gx.addColorStop(0.85, "#8a1818");
    gx.addColorStop(1,    "#4e0c0c");
  }
  ctx.fillStyle = gx;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i <= FOLDS; i++) {
    const x = (i / FOLDS) * W;
    const isCrest = i % 2 === 0;
    if (isCrest) {
      const g2 = ctx.createLinearGradient(x - 6, 0, x + 6, 0);
      g2.addColorStop(0,    "rgba(0,0,0,0)");
      g2.addColorStop(0.35, "rgba(255,140,100,0.12)");
      g2.addColorStop(0.5,  "rgba(255,150,110,0.2)");
      g2.addColorStop(0.65, "rgba(255,140,100,0.1)");
      g2.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(x - 8, 0, 16, H);
    } else {
      const g3 = ctx.createLinearGradient(x - 10, 0, x + 10, 0);
      g3.addColorStop(0,   "rgba(0,0,0,0)");
      g3.addColorStop(0.3, "rgba(0,0,0,0.3)");
      g3.addColorStop(0.5, "rgba(0,0,0,0.42)");
      g3.addColorStop(0.7, "rgba(0,0,0,0.28)");
      g3.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(x - 12, 0, 24, H);
    }
  }

  GOLD_POS.forEach((p) => {
    const x = p * W;
    const gg = ctx.createLinearGradient(0, 0, 0, H);
    gg.addColorStop(0,    "rgba(220,180,80,0)");
    gg.addColorStop(0.05, "rgba(220,185,90,0.7)");
    gg.addColorStop(0.5,  "rgba(230,195,100,0.85)");
    gg.addColorStop(0.95, "rgba(220,180,80,0.65)");
    gg.addColorStop(1,    "rgba(220,180,80,0)");
    ctx.fillStyle = gg;
    ctx.fillRect(x - 0.8, 0, 1.6, H);
  });

  const gs = ctx.createLinearGradient(0, 0, W * 0.7, H);
  gs.addColorStop(0,    "rgba(255,200,150,0)");
  gs.addColorStop(0.28, "rgba(255,200,150,0.06)");
  gs.addColorStop(0.5,  "rgba(255,210,160,0.11)");
  gs.addColorStop(0.72, "rgba(255,200,150,0.05)");
  gs.addColorStop(1,    "rgba(255,200,150,0)");
  ctx.fillStyle = gs;
  ctx.fillRect(0, 0, W, H);

  const edgeStart = side === "left" ? W * 0.78 : 0;
  const edgeEnd   = side === "left" ? W        : W * 0.22;
  const es = ctx.createLinearGradient(edgeStart, 0, edgeEnd, 0);
  es.addColorStop(0, "rgba(0,0,0,0)");
  es.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = es;
  ctx.fillRect(0, 0, W, H);

  const botY = H * 0.88;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-10, botY + 30);
  ctx.quadraticCurveTo(W * 0.25, botY - 60, W * 0.5,  botY + 10);
  ctx.quadraticCurveTo(W * 0.75, botY + 80, W + 10,   botY - 20);
  ctx.lineTo(W + 10, H + 10);
  ctx.lineTo(-10,    H + 10);
  ctx.closePath();
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-5, botY + 30);
  ctx.quadraticCurveTo(W * 0.25, botY - 60, W * 0.5, botY + 10);
  ctx.quadraticCurveTo(W * 0.75, botY + 80, W + 5,   botY - 20);
  const ghem = ctx.createLinearGradient(0, botY - 60, 0, botY + 80);
  ghem.addColorStop(0,   "rgba(0,0,0,0)");
  ghem.addColorStop(0.5, "rgba(180,120,60,0.18)");
  ghem.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.strokeStyle = ghem;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}

export default function Curtain({ onReveal }: CurtainProps) {
  const [open,    setOpen]    = useState(false);
  const [gone,    setGone]    = useState(false);
  const [exiting, setExiting] = useState(false);
  const [size,    setSize]    = useState({ w: 0, h: 0 });
  const [p,       setP]       = useState(0);

  const leftCanvas  = useRef<HTMLCanvasElement>(null);
  const rightCanvas = useRef<HTMLCanvasElement>(null);
  const leftDiv     = useRef<HTMLDivElement>(null);
  const rightDiv    = useRef<HTMLDivElement>(null);

  // Refs to track open/exiting inside the single useEffect without stale closure
  const openRef    = useRef(false);
  const exitingRef = useRef(false);

  const progress = useMotionValue(0);
  const spring   = useSpring(progress, SPRING);
  const animProg = useTransform(spring, (v) => {
    const clamped = Math.min(Math.max(v, 0), 1);
    return clamped * clamped;
  });

  // Single consolidated useEffect for animProg — no duplicate, no hooks violation
  useEffect(() => {
    const unsub = animProg.on("change", (v) => {
      setP(v);
      const tx = v * 100;
      if (leftDiv.current)  leftDiv.current.style.transform  = `translateX(${-tx}%)`;
      if (rightDiv.current) rightDiv.current.style.transform = `translateX(${tx}%)`;

      // Trigger exit once curtain is fully open
      if (v > 0.99 && openRef.current && !exitingRef.current) {
        exitingRef.current = true;
        setExiting(true);
        setTimeout(() => setGone(true), 1000);
      }
    });
    return unsub;
  }, [animProg]);

  useEffect(() => {
    const measure = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!size.w) return;
    const pw = Math.ceil(size.w / 2) + 60;
    const ph = size.h || 800;
    [leftCanvas, rightCanvas].forEach((ref, i) => {
      const c = ref.current;
      if (!c) return;
      c.width  = pw;
      c.height = ph;
      drawCurtain(c, i === 0 ? "left" : "right");
    });
  }, [size]);

  const handleOpen = () => {
    if (open) return;
    openRef.current = true;
    setOpen(true);
    onReveal();
    progress.set(1);
  };

  if (gone) return null;

  const hooks         = Array.from({ length: 8 });
  const fringeStrands = Array.from({ length: 13 });

  return (
    <div
      onClick={handleOpen}
      className={`${styles.curtainRoot} ${open ? styles.open : ""} ${exiting ? styles.exit : ""}`}
    >
      <div className={styles.vignette} />

      {/* Left panel */}
      <div ref={leftDiv} className={`${styles.panel} ${styles.panelLeft}`}>
        <canvas ref={leftCanvas} className={styles.panelCanvas} />
        {hooks.map((_, i) => (
          <div key={i} className={styles.hook} style={{ left: `${6 + i * 12.5}%` }}>
            <div className={styles.hookRing} />
            <div className={styles.hookShank} />
          </div>
        ))}
        <div
          className={`${styles.tassel} ${styles.tasselLeft}`}
          style={{ opacity: p > 0.6 ? (p - 0.6) / 0.4 : 0 }}
        >
          <div className={styles.tasselCord} />
          <div className={styles.tasselKnob}>
            <div className={styles.tasselKnobInner} />
          </div>
          <div className={styles.tasselFringe}>
            {fringeStrands.map((_, i) => (
              <div key={i} className={styles.fringeStrand} style={{ animationDelay: `${i * 0.09}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div ref={rightDiv} className={`${styles.panel} ${styles.panelRight}`}>
        <canvas ref={rightCanvas} className={styles.panelCanvas} />
        {hooks.map((_, i) => (
          <div key={i} className={styles.hook} style={{ left: `${6 + i * 12.5}%` }}>
            <div className={styles.hookRing} />
            <div className={styles.hookShank} />
          </div>
        ))}
        <div
          className={`${styles.tassel} ${styles.tasselRight}`}
          style={{ opacity: p > 0.6 ? (p - 0.6) / 0.4 : 0 }}
        >
          <div className={styles.tasselCord} />
          <div className={styles.tasselKnob}>
            <div className={styles.tasselKnobInner} />
          </div>
          <div className={styles.tasselFringe}>
            {fringeStrands.map((_, i) => (
              <div key={i} className={styles.fringeStrand} style={{ animationDelay: `${i * 0.09}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Tap to reveal */}
      {!open && (
        <div className={styles.revealBtn}>
          <div className={styles.revealBtnInner}>Tap to reveal</div>
        </div>
      )}
    </div>
  );
}