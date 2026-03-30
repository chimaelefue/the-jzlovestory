"use client";

import { LuMapPin } from "react-icons/lu";
import { MdOutlineCall } from "react-icons/md";

export default function Location() {
  return (
    <section className="relative px-6 py-24 overflow-hidden bg-[#0d0a08]">
      <style>{`
        @keyframes pulse-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
        .phone-icon {
          animation: pulse-zoom 1.6s ease-in-out infinite;
          display: inline-flex;
        }
        .map-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 1rem;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          font-family: Georgia, serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        .map-btn-gold {
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.45);
          background: rgba(201,168,76,0.08);
        }
        .map-btn-gold:hover {
          background: rgba(201,168,76,0.18);
          border-color: rgba(201,168,76,0.7);
        }
        .map-btn-rose {
          color: #f0a0b0;
          border: 1px solid rgba(240,160,176,0.35);
          background: rgba(240,160,176,0.06);
        }
        .map-btn-rose:hover {
          background: rgba(240,160,176,0.14);
          border-color: rgba(240,160,176,0.6);
        }
      `}</style>

      {/* Top accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "50%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Section label */}
        <p
          className="text-center"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.7rem",
            letterSpacing: "0.5em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Venue Details
        </p>

        <h2
          className="text-center"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
            fontWeight: 300,
            color: "#f8ecd4",
            marginBottom: "1rem",
          }}
        >
          Join Us to Celebrate
        </h2>

        {/* Ornament */}
        <div className="flex justify-center mb-12">
          <svg width="140" height="16" viewBox="0 0 140 16" fill="none">
            <line x1="0" y1="8" x2="55" y2="8" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
            <path d="M60 8 L65 3 L70 8 L65 13 Z" fill="#C9A84C" />
            <circle cx="70" cy="8" r="3" fill="#C9A84C" />
            <path d="M70 8 L75 3 L80 8 L75 13 Z" fill="#C9A84C" />
            <line x1="85" y1="8" x2="140" y2="8" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
          </svg>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Ceremony */}
          <div
            style={{
              background: "linear-gradient(145deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1 L8 7 M5 4 L11 4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="3" y="6" width="10" height="9" rx="1" stroke="#C9A84C" strokeWidth="1.2" />
                </svg>
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#C9A84C", textTransform: "uppercase" }}>
                Ceremony
              </p>
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 500, color: "#f8ecd4", marginBottom: "0.5rem" }}>
              Saint Anthony Mary Claret Catholic Church
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "rgba(248,236,212,0.55)", lineHeight: 1.7 }}>
              Area A, Owerri,<br />Imo State
            </p>

            {/* Map Button */}
            <a
              href="https://maps.app.goo.gl/8Ze5JTNMfdfmWC8j9"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn map-btn-gold"
            >
              <LuMapPin size={13} />
              Get Directions
            </a>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(240,160,176,0.8)" }}>Saturday, 11 April 2026</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(240,160,176,0.8)" }}>10:00 AM</p>
            </div>
          </div>

          {/* Reception */}
          <div
            style={{
              background: "linear-gradient(145deg, rgba(240,160,176,0.06), rgba(201,168,76,0.03))",
              border: "1px solid rgba(240,160,176,0.18)",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(240,160,176,0.1)",
                  border: "1px solid rgba(240,160,176,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 12 Q8 4 14 12" stroke="#f0a0b0" strokeWidth="1.3" fill="none" />
                  <circle cx="8" cy="5" r="2" stroke="#f0a0b0" strokeWidth="1.2" />
                </svg>
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#f0a0b0", textTransform: "uppercase" }}>
                Reception
              </p>
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 500, color: "#f8ecd4", marginBottom: "0.5rem" }}>
              The Place Event Center
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "rgba(248,236,212,0.55)", lineHeight: 1.7 }}>
              Plot C1/C2 Area TA, New Owerri off Port Harcourt Road,<br />Behind Great Wood Hotel
            </p>

            {/* Map Button */}
            <a
              href="https://maps.app.goo.gl/t7sZ6W1tSg6wbwHm7"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn map-btn-rose"
            >
              <LuMapPin size={13} />
              Get Directions
            </a>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(240,160,176,0.12)" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(240,160,176,0.8)" }}>Saturday, 11 April 2026</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(240,160,176,0.8)" }}>2:00PM</p>
            </div>
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-14 text-center">
          <div className="flex justify-center mb-5">
            <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
              <path d="M10 12 Q20 4 40 12 Q60 20 70 12" stroke="rgba(201,168,76,0.4)" strokeWidth="1" fill="none" />
              <circle cx="40" cy="12" r="2.5" fill="#C9A84C" opacity="0.5" />
            </svg>
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              fontStyle: "italic",
              color: "rgba(248,236,212,0.65)",
              lineHeight: 1.8,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Your presence is the greatest gift. We cannot wait to celebrate with
            everyone who has made our love story possible.
          </p>

          {/* RSVP cue */}
          <div className="mt-10 flex justify-center px-4">

            {/* Desktop: single pill */}
            <div className="hidden sm:flex w-full max-w-2xl rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-6 py-4 items-center justify-center gap-4">
              <span className="text-xs tracking-[0.35em] text-[#C9A84C] uppercase font-serif whitespace-nowrap">RSVP:</span>

              <a href="tel:09067231585" className="flex items-center gap-2 group" style={{ textDecoration: "none" }}>
                <span className="phone-icon">   
                 <MdOutlineCall size={13} className="text-[#C9A84C]" />
                </span>
                <span className="text-xs text-[#C9A84C] whitespace-nowrap uppercase font-serif tracking-widest">Chukwuemeka · 09067231585</span>
              </a>

              <span className="text-[#C9A84C]/40">|</span>

              <a href="tel:09057900620" className="flex items-center gap-2 group" style={{ textDecoration: "none" }}>
                <span className="phone-icon" style={{ animationDelay: "0.8s" }}>
                 <MdOutlineCall size={13} className="text-[#C9A84C]" />
                </span>
                <span className="text-xs text-[#C9A84C] whitespace-nowrap uppercase font-serif tracking-widest">Obinna · 09057900620
                  
                </span>
              </a>
            </div>

            {/* Mobile: stacked cards */}
            <div className="flex sm:hidden flex-col w-full max-w-xs gap-3">
              <p className="text-xs tracking-[0.35em] text-[#C9A84C] uppercase font-serif whitespace-nowrap mb-1">RSVP</p>

              <a
                href="tel:09067231585"
                className="flex items-center justify-center gap-3 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-5 py-4 active:bg-[#C9A84C]/20 transition-colors"
                style={{ textDecoration: "none" }}
              >
                <span className="phone-icon">
                    <MdOutlineCall size={13} className="text-[#C9A84C]" />
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-[#C9A84C] uppercase font-serif tracking-widest">Chukwuemeka Anyanwu</span>
                  <span className="text-xs text-[#C9A84C] uppercase font-serif tracking-widest">0906 723 1585</span>
                </div>
              </a>

              <a
                href="tel:09057900620"
                className="flex items-center justify-center gap-3 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-5 py-4 active:bg-[#C9A84C]/20 transition-colors"
                style={{ textDecoration: "none" }}
              >
                <span className="phone-icon" style={{ animationDelay: "0.8s" }}>
                  <MdOutlineCall size={13} className="text-[#C9A84C]" />
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-[#C9A84C] uppercase font-serif tracking-widest">Obinna Dike</span>
                  <span className="text-xs text-[#C9A84C] uppercase font-serif tracking-widest">0905 790 0620</span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}