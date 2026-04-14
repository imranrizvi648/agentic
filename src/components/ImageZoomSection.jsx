"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Data ────────────────────────────────────────────────────────────────────
const images = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
  "",
  "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200",
  "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
];

const centerVideoSrc = "/liko.mp4";

// ── Main Component ──────────────────────────────────────────────────────────
export default function ImageZoomSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ✅ FIX: Removed useSpring — Lenis already handles smoothing.
  // Adding useSpring on top of Lenis creates double-smoothing = lag/stuck.
  // Use scrollYProgress directly for instant, clean transforms.
  const scale         = useTransform(scrollYProgress, [0, 1], [1, 4.5]);
  const othersOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const othersScale   = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const borderRadius  = useTransform(scrollYProgress, [0, 0.9, 1], ["16px", "4px", "0px"]);
  const textOpacity   = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section ref={containerRef} className="h-[250vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-4 relative">
          {images.map((src, index) => {
            const isCenterImage = index === 1;

            return (
              <motion.div
                key={index}
                style={{
                  scale:        isCenterImage ? scale : othersScale,
                  opacity:      isCenterImage ? 1 : othersOpacity,
                  zIndex:       isCenterImage ? 50 : 10,
                  borderRadius: isCenterImage ? borderRadius : "5px",
                  willChange:   "transform, opacity",
                }}
                className="relative w-full aspect-video md:aspect-square overflow-hidden shadow-2xl origin-center"
              >
                {isCenterImage ? (
                  <video
                    src={centerVideoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: "translateZ(0)" }}
                  />
                ) : src ? (
                  // ✅ FIX: Replaced Three.js LiquidImage (separate RAF loop) with
                  // a simple CSS hover effect. Three.js per-image renderers each
                  // run their own requestAnimationFrame, competing with Lenis.
                  <div
                    className="w-full h-full group overflow-hidden"
                    style={{ borderRadius: "5px" }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ transform: "translateZ(0)" }}
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        {/* Text Overlay */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none px-4"
        >
          <h2 className="text-white text-5xl md:text-9xl font-black text-center drop-shadow-2xl uppercase tracking-tighter">
            AI-POWERED
          </h2>
          <p className="text-[#dc1e25] mt-4 text-lg md:text-3xl font-bold tracking-[0.4em] uppercase">
            Future Solutions
          </p>
        </motion.div>

      </div>
    </section>
  );
}