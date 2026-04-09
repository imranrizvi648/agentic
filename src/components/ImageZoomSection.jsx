"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// AI Themed Images
const images = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200", // 1. Top Left (AI Brain/Tech)
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000", // 2. Top Center (THE ZOOMING IMAGE - Abstract Data)
  "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200", // 3. Top Right (Robotic Arm/Automation)
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200", // 4. Bottom Left (Code/Matrix)
  "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200", // 5. Bottom Center (Robot)
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200", // 6. Bottom Right (Servers/Cyber)
];

export default function ImageZoomSection() {
  const containerRef = useRef(null);

  // Scroll progress track karega is pure 300vh section ki
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Animations for the Center Image (Index 1) ---
  // Scale adjusted for full-width grid. 3.5x is usually enough to cover the screen from a 3-column layout.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
  
  // Isko thoda aur center mein laane ke liye Y-axis movement
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  
  // Jab full screen ho jaye to edges sharp ho jayein
  const borderRadius = useTransform(scrollYProgress, [0, 0.8, 1], ["12px", "6px", "0px"]);

  // --- Animations for the Other 5 Images ---
  // Baki sab fade out aur thode chote ho jayenge depth create karne ke liye
  const othersOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const othersScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    // Height 300vh taake scroll lamba ho aur animation smooth feel ho
    <section ref={containerRef} className="h-[300vh] bg-black/90 relative ">
      
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Full width grid: removed max-w and adjusted padding for edge-to-edge feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full px-2 relative">
          
          {images.map((src, index) => {
            const isCenterImage = index === 1;

            return (
              <motion.div
                key={index}
                style={{
                  scale: isCenterImage ? scale : othersScale,
                  y: isCenterImage ? y : "0%",
                  opacity: isCenterImage ? 1 : othersOpacity,
                  borderRadius: isCenterImage ? borderRadius : "2px",
                  zIndex: isCenterImage ? 50 : 10,
                }}
                // aspect-[16/10] diya hai taake images screenshot ki tarah wide feel hon
                className={`relative w-full aspect-[4/3] md:aspect-square overflow-hidden shadow-2xl ${
                  isCenterImage ? "origin-top" : "origin-center"
                }`}
              >
                <img
                  src={src}
                  alt={`AI Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Dark overlay for non-active images taake center image pop kare */}
                {!isCenterImage && (
                  <div className="absolute inset-0" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Text Overlay - Updated for AI Theme */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0.75, 1], [0, 1]),
            y: useTransform(scrollYProgress, [0.75, 1], [30, 0])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
        >
          <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase drop-shadow-xl text-center">
            AI-POWERED
          </h2>
          <p className="text-[#dc1e25] mt-4 text-lg md:text-2xl font-bold tracking-[0.3em] uppercase drop-shadow-md">
            Future Solutions
          </p>
        </motion.div>

      </div>
    </section>
  );
}