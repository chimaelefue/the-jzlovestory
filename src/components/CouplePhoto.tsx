"use client";

import { useEffect, useState } from "react";
import styles from "./Style.module.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const PHOTOS = [
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784227/the-jzlovestory/IMG_4184.JPG_vphn6t.jpg",
  // "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774789731/the-jzlovestory/IMG_4182.JPG_1_dvgoe7.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784279/the-jzlovestory/IMG_4188.JPG_qojhgv.jpg",

  // "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784286/the-jzlovestory/IMG_4179.JPG_rmiltd.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784270/the-jzlovestory/IMG_4186.JPG_yk93lx.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784310/the-jzlovestory/IMG_4189.JPG_fzefoh.jpg",

  // "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774789346/the-jzlovestory/IMG_4180.JPG_1_zlpuvt.jpg",
  "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774784314/the-jzlovestory/IMG_4187.JPG_ucseh9.jpg",
  // "https://res.cloudinary.com/dyu76ha5j/image/upload/v1774789564/the-jzlovestory/IMG_4181.JPG_1_y0gglp.jpg",
];

export default function CouplePhoto() {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size (best practice)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleLoad = (i: number) =>
    setLoaded((prev) => ({ ...prev, [i]: true }));

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#0d0a08] flex flex-col items-center gap-6">

      {/* Frame wrapper */}
      <div className={styles.couplePhotoFrame}>
        {/* Corners */}
        <svg className={styles.couplePhotoCornerTL} width="36" height="36">
          <path d="M2 2 L2 18" stroke="#C9A84C" strokeWidth="1.5" />
          <path d="M2 2 L18 2" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx="2" cy="2" r="2" fill="#C9A84C" />
        </svg>

        <svg className={styles.couplePhotoCornerBR} width="36" height="36">
          <path d="M34 34 L34 18" stroke="#C9A84C" strokeWidth="1.5" />
          <path d="M34 34 L18 34" stroke="#C9A84C" strokeWidth="1.5" />
          <circle cx="34" cy="34" r="2" fill="#C9A84C" />
        </svg>

        {/* Swiper */}
        <div className="relative w-full">

          <Swiper
            key={isMobile ? "mobile" : "desktop"}

            modules={[EffectFade, Autoplay, Navigation]}
            loop={true}
            className="w-full"

            effect={isMobile ? "fade" : "slide"}
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={isMobile ? 0 : 20}

            speed={isMobile ? 1200 : 4000}

            autoplay={
              isMobile
                ? {
                  delay: 2500,
                  disableOnInteraction: false,
                }
                : {
                  delay: 0,
                  disableOnInteraction: false,
                }
            }

            fadeEffect={
              isMobile
                ? { crossFade: true }
                : undefined
            }

            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
          >
            {PHOTOS.map((src, i) => {
              const isLoaded = loaded[i];

              return (
                <SwiperSlide key={i}>
                  <div className="relative overflow-hidden rounded-md border border-[rgba(201,168,76,0.15)] shadow-[0_16px_48px_rgba(0,0,0,0.5)]">

                    {/* Skeleton */}
                    {!isLoaded && (
                      <div className="absolute inset-0 z-10">
                        <div className={styles.skeletonShimmer} />
                      </div>
                    )}

                    <img
                      src={src}
                      alt={`Wedding photo ${i + 1}`}
                      className={`w-full object-cover block transition-all duration-700 ease-in-out ${isMobile ? "scale-105" : "hover:scale-[1.04]"
                        }`}
                      style={{
                        aspectRatio: "3/4",
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 0.6s ease, transform 1.2s ease",
                      }}
                      loading="lazy"
                      onLoad={() => handleLoad(i)}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[rgba(13,10,8,0.75)] to-transparent" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation */}
          <button className="swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-[#C9A84C] bg-[rgba(13,10,8,0.7)] border border-[rgba(201,168,76,0.3)] backdrop-blur-sm hover:bg-[rgba(201,168,76,0.15)]">
            <svg width="18" height="18">
              <path d="M11 4 L6 9 L11 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <button className="swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center text-[#C9A84C] bg-[rgba(13,10,8,0.7)] border border-[rgba(201,168,76,0.3)] backdrop-blur-sm hover:bg-[rgba(201,168,76,0.15)]">
            <svg width="18" height="18">
              <path d="M7 4 L12 9 L7 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none rounded-b-sm bg-linear-to-t from-[rgba(13,10,8,0.75)] to-transparent" />

      </div>

      <p className="font-['Cormorant_Garamond',Georgia,serif] text-base italic text-[rgba(248,236,212,0.5)] tracking-[0.08em] text-center">
        &#10022; Forever starts here &#10022;
      </p>
    </section>
  );
}