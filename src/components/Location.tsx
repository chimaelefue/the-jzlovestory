"use client";

import { BsChevronRight } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { MdOutlineCall } from "react-icons/md";

export default function Location() {
  return (
    <section className="relative px-6 pt-24 pb-18 overflow-hidden bg-[#0d0a08]">
      <style>{`
        @keyframes pulse-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }

        /* RSVP Card */
        .rsvp-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          text-decoration: none;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .rsvp-card:active {
          transform: scale(0.97);
        }

        .rsvp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
        }

        /* Divider */
        .rsvp-divider {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: rgba(201,168,76,0.3);
          font-family: Georgia, serif;
          font-size: 0.55rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
        }

        .rsvp-divider::before,
        .rsvp-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent);
        }
      `}</style>

      {/* Top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

      <div className="relative mx-auto max-w-2xl">
        {/* Section label */}
        <p className="text-center font-serif text-[0.7rem] tracking-[0.5em] text-[#C9A84C] uppercase mb-4">
          Venue Details
        </p>

        <h2 className="text-center font-['Cormorant_Garamond','Playfair_Display',Georgia,serif] text-[clamp(1.6rem,4vw,2.6rem)] font-light text-[#f8ecd4] mb-4">
          Join Us to Celebrate
        </h2>

        {/* Ornament */}
        <div className="flex justify-center mb-12">
          <svg width="140" height="16" viewBox="0 0 140 16" fill="none">
            <line x1="0" y1="8" x2="55" y2="8" stroke="rgba(201,168,76,0.3)" />
            <path d="M60 8 L65 3 L70 8 L65 13 Z" fill="#C9A84C" />
            <circle cx="70" cy="8" r="3" fill="#C9A84C" />
            <path d="M70 8 L75 3 L80 8 L75 13 Z" fill="#C9A84C" />
            <line x1="85" y1="8" x2="140" y2="8" stroke="rgba(201,168,76,0.3)" />
          </svg>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Ceremony */}
          <div className="bg-[linear-gradient(145deg,rgba(201,168,76,0.08),rgba(201,168,76,0.03))] border border-[#C9A84C]/20 rounded-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1 L8 7 M5 4 L11 4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="3" y="6" width="10" height="9" rx="1" stroke="#C9A84C" strokeWidth="1.2" />
                </svg>
              </div>
              <p className="font-serif text-[0.65rem] tracking-[0.4em] text-[#C9A84C] uppercase">
                Ceremony
              </p>
            </div>

            <p className="font-['Cormorant_Garamond',Georgia,serif] text-[1.3rem] font-medium text-[#f8ecd4] mb-2">
              Saint Anthony Mary Claret Catholic Church
            </p>

            <p className="font-serif text-[0.85rem] text-[#f8ecd4]/55 leading-relaxed">
              Area A, Owerri,<br />Imo State
            </p>

            <a
              href="https://maps.app.goo.gl/8Ze5JTNMfdfmWC8j9"
              target="_blank"
              className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-[0.7rem] tracking-[0.3em] uppercase font-serif text-[#C9A84C] border border-[#C9A84C]/45 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20"
            >
              <LuMapPin size={13} />
              Get Directions
            </a>

            <div className="mt-4 pt-4 border-t border-[#C9A84C]/10">
              <p className="text-[0.82rem] text-[#f0a0b0]/80 font-serif">Saturday, 11 April 2026</p>
              <p className="text-[0.82rem] text-[#f0a0b0]/80 font-serif">10:00 AM</p>
            </div>
          </div>

          {/* Reception */}
          <div className="bg-[linear-gradient(145deg,rgba(240,160,176,0.06),rgba(201,168,76,0.03))] border border-[#f0a0b0]/20 rounded-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#f0a0b0]/10 border border-[#f0a0b0]/25 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M2 12 Q8 4 14 12" stroke="#f0a0b0" strokeWidth="1.3" />
                  <circle cx="8" cy="5" r="2" stroke="#f0a0b0" strokeWidth="1.2" />
                </svg>
              </div>
              <p className="font-serif text-[0.65rem] tracking-[0.4em] text-[#f0a0b0] uppercase">
                Reception
              </p>
            </div>

            <p className="font-['Cormorant_Garamond',Georgia,serif] text-[1.3rem] font-medium text-[#f8ecd4] mb-2">
              The Place Event Center
            </p>

            <p className="font-serif text-[0.85rem] text-[#f8ecd4]/55 leading-relaxed">
              Plot C1/C2 Area TA, New Owerri off Port Harcourt Road,<br />
              Behind Great Wood Hotel
            </p>

            <a
              href="https://maps.app.goo.gl/t7sZ6W1tSg6wbwHm7"
              target="_blank"
              className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-[0.7rem] tracking-[0.3em] uppercase font-serif text-[#f0a0b0] border border-[#f0a0b0]/40 bg-[#f0a0b0]/10 hover:bg-[#f0a0b0]/20"
            >
              <LuMapPin size={13} />
              Get Directions
            </a>

            <div className="mt-4 pt-4 border-t border-[#f0a0b0]/10">
              <p className="text-[0.82rem] text-[#f0a0b0]/80 font-serif">Saturday, 11 April 2026</p>
              <p className="text-[0.82rem] text-[#f0a0b0]/80 font-serif">2:00 PM</p>
            </div>
          </div>
        </div>

        {/* RSVP */}
        <div className="mt-14 flex flex-col justify-center px-4">

          {/* Desktop */}
          <div className="hidden sm:flex w-full max-w-2xl rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-6 py-4 items-center justify-center gap-4">
            <span className="text-xs tracking-[0.35em] text-[#C9A84C] uppercase font-serif">
              RSVP:
            </span>

            <a href="tel:09067231585" className="flex items-center gap-2">
              <span>
                <MdOutlineCall size={13} className="text-[#C9A84C] animate-pulse" />
              </span>
              <span className="text-xs text-[#C9A84C] uppercase tracking-widest">
                Chukwuemeka · 09067231585
              </span>
            </a>

            <span className="text-[#C9A84C]/40">|</span>

            <a href="tel:09057900620" className="flex items-center gap-2">
              <span>
                <MdOutlineCall size={13} className="text-[#C9A84C] animate-pulse" />
              </span>
              <span className="text-xs text-[#C9A84C] uppercase tracking-widest">
                Obinna · 09057900620
              </span>
            </a>
          </div>

          {/* Mobile */}
          <div className="flex sm:hidden flex-col w-full max-w-xs">
            <p className="text-xs uppercase text-center mb-4 tracking-[0.55em] text-[#C9A84C] font-['Cormorant_Garamond',Georgia,serif]">
              RSVP
            </p>

            <a href="tel:09067231585" className="rsvp-card border border-[#C9A84C]/40 bg-[#C9A84C]/10">
              <div className=" animate-pulse w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                <MdOutlineCall size={16} color="#C9A84C" />
              </div>
              <div className="flex-1 ">
                <p className="text-xs text-[#f8ecd4] font-['Cormorant_Garamond',Georgia,serif] uppercase tracking-wide">Chukwuemeka Anyanwu</p>
                <p className="text-xs text-[#C9A84C] tracking-widest font-[Georgia,serif]">0906 723 1585</p>
              </div>
              <BsChevronRight className="text-[#C9A84C]/40" />
            </a>

            <div className="rsvp-divider my-3">or</div>

            <a href="tel:09057900620" className="rsvp-card bg-[#C9A84C]/10 border border-[#C9A84C]/30">
              <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center animate-pulse">
                <MdOutlineCall size={16} className="text-[#C9A84C]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#f8ecd4] font-['Cormorant_Garamond',Georgia,serif] uppercase tracking-wide">Obinna Dike</p>
                <p className="text-xs text-[#C9A84C] tracking-widest font-[Georgia,serif]">0905 790 0620</p>
              </div>
              <BsChevronRight className="text-[#C9A84C]/40" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}