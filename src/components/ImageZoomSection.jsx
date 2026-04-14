"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Staggered layout data to mimic the Agntix look
const portfolioItems = [
  { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200", size: "aspect-[4/5]", speed: 0.1, label: "Branding" },
  { src: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200", size: "aspect-square", speed: -0.2, label: "Digital Art" },
  { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200", size: "aspect-video", speed: 0.3, label: "AI Tech" },
  { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200", size: "aspect-[3/4]", speed: -0.1, label: "UI Design" },
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", size: "aspect-square", speed: 0.2, label: "Creative" },
  { src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200", size: "aspect-video", speed: -0.3, label: "Motion" },
];

export default function AgntixPortfolio() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth Spring for the overall scale (creates that "elastic" zoom feel)
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Center Video Scaling
  const scale = useTransform(smoothProgress, [0, 0.8], [1, 5]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.1], [1, 1]);
  const borderRadius = useTransform(smoothProgress, [0, 0.8], ["20px", "0px"]);

  // Side items parallax and fade
  const sideOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const sideScale = useTransform(smoothProgress, [0, 0.4], [1, 0.5]);

  return (
    <section ref={containerRef} className="h-[400vh] bg-[#0a0a0a] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The "Agntix" Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl px-6 relative items-center">
          
          {portfolioItems.map((item, i) => {
            // We use different Y offsets for each item to create a staggered "floating" look
            const yMove = useTransform(smoothProgress, [0, 1], [0, i % 2 === 0 ? -200 : 200]);

            return (
              <motion.div
                key={i}
                style={{ 
                    y: yMove, 
                    opacity: sideOpacity, 
                    scale: sideScale 
                }}
                className={`relative group overflow-hidden rounded-xl bg-neutral-900 ${item.size}`}
              >
                <img
                  src={item.src}
                  alt=""
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">{item.label}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Central Sticky Video - THE FOCUS POINT */}
          <motion.div
            style={{
              scale,
              borderRadius,
              opacity: videoOpacity,
              zIndex: 100,
            }}
            className="fixed inset-0 m-auto w-[300px] h-[300px] md:w-[450px] md:h-[450px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <video
              src="/liko.mp4"
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Text Reveal that appears when zoom is complete */}
        <motion.div
          style={{ 
            opacity: useTransform(smoothProgress, [0.7, 0.9], [0, 1]),
            y: useTransform(smoothProgress, [0.7, 0.9], [50, 0])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-[110] pointer-events-none"
        >
          <h2 className="text-white text-7xl md:text-[12rem] font-black uppercase leading-none tracking-tighter">
            EXPLORE
          </h2>
          <div className="flex items-center gap-4">
             <div className="h-[2px] w-12 bg-red-600" />
             <p className="text-red-600 text-xl font-bold uppercase tracking-[0.5em]">Creative Agency</p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}