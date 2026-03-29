"use client";

export default function LoveWriteup() {
  return (
    <section
      // className="relative px-6 py-24 overflow-hidden bg-linear-to-b from-[#0d1f17] to-[#0a1a12]"
      className="relative px-6 py-24 overflow-hidden bg-linear-to-b from-[#0d0a08] to-[#0d0a08]"
   
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blush accent top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "60%",
          height: "1px",
          background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Section label */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "0.7rem",
            letterSpacing: "0.5em",
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
          }}
        >
          Our Story
        </p>

        {/* Ornament */}
        <div className="flex justify-center mb-6">
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
            <path d="M0 10 Q30 2 60 10 Q90 18 120 10" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.6" />
            <circle cx="60" cy="10" r="3" fill="#C9A84C" />
            <circle cx="20" cy="9" r="1.5" fill="#C9A84C" opacity="0.5" />
            <circle cx="100" cy="11" r="1.5" fill="#C9A84C" opacity="0.5" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 300,
            color: "#f8ecd4",
            lineHeight: 1.2,
            marginBottom: "2rem",
            letterSpacing: "0.02em",
          }}
        >
          Two Hearts,{" "}
          <span style={{ fontStyle: "italic", color: "#C9A84C" }}>One Journey</span>
        </h2>

        <div
          style={{
            width: 48,
            height: 1,
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
            margin: "0 auto 2rem",
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            lineHeight: 1.9,
            color: "rgba(248,236,212,0.75)",
            fontWeight: 300,
            marginBottom: "1.5rem",
          }}
        >
          From the very first moment our eyes met, we knew life would never quite
          be the same. Through laughter and quiet mornings, adventures and still
          evenings, our love has grown into something that words can only begin
          to describe.
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            lineHeight: 1.9,
            color: "rgba(248,236,212,0.75)",
            fontWeight: 300,
          }}
        >
          Today, we invite you — those who have walked alongside us, loved us,
          and shaped who we are — to witness as we say{" "}
          <em style={{ color: "#f0a0b0", fontStyle: "italic" }}>I do</em>{" "}
          and begin the most beautiful chapter yet.
        </p>

        {/* Blush quote */}
        <div
          className="mt-10 px-6 py-5 mx-auto max-w-md"
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            borderLeft: "3px solid #C9A84C",
            background: "rgba(201,168,76,0.04)",
            borderRadius: "2px",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.05rem",
              fontStyle: "italic",
              color: "#f8ecd4",
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            "I have found the one whom my soul loves."
          </p>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "#C9A84C",
              textTransform: "uppercase",
              marginTop: "0.75rem",
            }}
          >
            Song of Solomon 3:4
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "60%",
          height: "1px",
          background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
        }}
      />
    </section>
  );
}