"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// AI Themed Images
const images = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200", // 1. Top Left (AI Brain/Tech)
  "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 2. Top Center (THE ZOOMING IMAGE - Abstract Data)
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

  // --- THE MAGIC FIX: useSpring ---
  // Ye raw scroll values ko smooth kar dega taake animation milky smooth feel ho
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- Animations for the Center Image (Index 1) ---
  // Scale adjusted for full-width grid.
  const scale = useTransform(smoothProgress, [0, 1], [1, 3.5]);
  
  // Isko thoda aur center mein laane ke liye Y-axis movement
  const y = useTransform(smoothProgress, [0, 1], ["0%", "12%"]);
  
  // Jab full screen ho jaye to edges sharp ho jayein
  const borderRadius = useTransform(smoothProgress, [0, 0.8, 1], ["12px", "6px", "0px"]);

  // --- Animations for the Other 5 Images ---
  // Baki sab fade out aur thode chote ho jayenge depth create karne ke liye
  const othersOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const othersScale = useTransform(smoothProgress, [0, 0.4], [1, 0.85]);

  // --- Animations for Text Overlay ---
  const textOpacity = useTransform(smoothProgress, [0.75, 1], [0, 1]);
  const textY = useTransform(smoothProgress, [0.75, 1], [30, 0]);

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
                  // Performance Booster: Browser ko GPU rendering ke liye ready karta hai
                  willChange: "transform, opacity, border-radius" 
                }}
                // aspect-[16/10] diya hai taake images screenshot ki tarah wide feel hon
                className={`relative w-full aspect-[4/3] md:aspect-square overflow-hidden shadow-2xl ${
                  isCenterImage ? "origin-top" : "origin-center"
                }`}
              >
                <img
                  src={src}
                  alt={`AI Gallery Image ${index + 1}`}
                  loading="lazy"
                  // Transform gpu acceleration image tag pe bhi zaroori hai
                  className="w-full h-full object-cover transform-gpu"
                />
                
                {/* Dark overlay for non-active images taake center image pop kare */}
                {!isCenterImage && (
                  <div className="absolute inset-0 bg-black/20" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Text Overlay - Updated for AI Theme */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            y: textY,
            willChange: "transform, opacity"
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