"use client";

import { useEffect, useState } from "react";

const COLORS = ["#C9A84C", "#f0a0b0", "#166534", "#d4a843", "#f8ecd4", "#1a5c3a"];
const PIECE_COUNT = 60;

interface Piece {
  left: number;
  delay: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  duration: number;
  isCircle: boolean;
}

export default function Ribbons() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: PIECE_COUNT }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 3 + Math.random() * 6,  
        height: 8 + Math.random() * 16, 
        rotation: (Math.random() - 0.5) * 80,
        duration: 2.5 + Math.random() * 2,
        isCircle: Math.random() > 0.6,
      }))
    );
  }, []);

  if (!pieces.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-120px) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.isCircle ? p.width : p.width,
            height: p.isCircle ? p.width : p.height,
            borderRadius: p.isCircle ? "50%" : "2px",
            backgroundColor: p.color,
            opacity: 0,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}