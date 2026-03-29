"use client";

import { useState } from "react";
import Curtain from "@/components/Curtain";
import Hero from "@/components/Hero";
import LoveWriteup from "@/components/LoveWriteup";
import ScratchReveal from "@/components/ScratchReveal";
import Countdown from "@/components/Countdown";
import CouplePhoto from "@/components/CouplePhoto";
import PhotoSlider from "@/components/PhotoSlider";
import Location from "@/components/Location";
import DressCode from "@/components/Dresscode";
import Ribbons from "@/components/Ribbons";

export default function InvitationPage() {
   const [revealed, setRevealed] = useState(false);
  const [scratchDone, setScratchDone] = useState(false);

  const handleReveal = () => setRevealed(true);

  const handleScratchComplete = () => {
    setScratchDone(true);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap"
        rel="stylesheet"
      />

      {scratchDone && <Ribbons />}

      <div className="min-h-screen" style={{ background: "#0d0a08" }}>
        <Curtain onReveal={handleReveal} />

        <main
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(1.05)",
            filter: revealed ? "blur(0px)" : "blur(6px)",
            transition: "opacity 1.4s ease, transform 1.4s ease, filter 1.4s ease",
          }}
        >
          <Hero />
          <LoveWriteup />

          {/* Scratch reveal — always visible, gates what comes after */}
          <ScratchReveal onAllScratched={handleScratchComplete} />

          {/* Everything below is gated behind the scratch */}
          <div
            style={{
              maxHeight: scratchDone ? "99999px" : "0px",
              overflow: "hidden",
              transition: scratchDone
                ? "max-height 1.2s cubic-bezier(0.4,0,0.2,1)"
                : "none",
            }}
          >
            {/* Reveal fade-in wrapper */}
            <div
              style={{
                opacity: scratchDone ? 1 : 0,
                transform: scratchDone ? "translateY(0)" : "translateY(32px)",
                transition: scratchDone
                  ? "opacity 1s ease 0.5s, transform 1s ease 0.5s"
                  : "none",
              }}
            >
              <Countdown />

              {/* Couple photo after countdown */}
              <CouplePhoto />

              {/* Photo slider before RSVP / Location
              <PhotoSlider /> */}

              <Location />

              {/* Bonus: dress code section */}
              <DressCode />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}