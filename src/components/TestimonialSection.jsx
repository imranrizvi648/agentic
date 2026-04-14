"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  { id: 1, name: "Warren Daniel", color: "bg-[#1a1a1a]", text: "white", y: -40, rotate: -6 },
  { id: 2, name: "Koen Chegg", color: "bg-[#ff4d00]", text: "white", y: 20, rotate: 4 },
  { id: 3, name: "Elvin Bond", color: "bg-white", text: "black", y: -60, rotate: -3 },
  { id: 4, name: "Abbas", color: "bg-[#e2e2e2]", text: "black", y: 30, rotate: 5 },
  { id: 5, name: "Jessamine", color: "bg-[#1a1a1a]", text: "white", y: -20, rotate: -8 },
  { id: 6, name: "Albert Juan", color: "bg-white", text: "black", y: 50, rotate: 2 },
  { id: 7, name: "Sarah", color: "bg-[#ff4d00]", text: "white", y: -50, rotate: -4 },
  { id: 8, name: "Mike", color: "bg-white", text: "black", y: 10, rotate: 6 },
  { id: 9, name: "Zain", color: "bg-[#1a1a1a]", text: "white", y: -30, rotate: -2 },
  { id: 10, name: "Emma", color: "bg-[#e2e2e2]", text: "black", y: 40, rotate: 3 },
];

const TestimonialSection = () => {
  // PRO HACK: Array ko 30 dafa copy kar diya hai! (10 reviews * 30 = 300 reviews)
  // Ab user jitna marzi drag kare, list rukegi nahi aur circle ki tarah feel hogi.
  const infiniteTestimonials = Array(6).fill(testimonials).flat(); // 60 cards = enough for drag

  return (
    <section className="bg-black py-10 overflow-hidden relative min-h-200 flex flex-col justify-center">
      
      {/* ------------------- OPTIMIZED EARTH BACKGROUND ------------------- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <div 
          className="w-[60vw] h-[60vw] max-w-300 max-h-300 opacity-20"
          style={{ 
            animation: 'spin 100s linear infinite',
            willChange: 'transform' // GPU acceleration fix
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g fill="none" stroke="white" strokeWidth="0.3" strokeOpacity="0.4">
              <circle cx="100" cy="100" r="90" />
              <ellipse cx="100" cy="100" rx="90" ry="30" />
              <ellipse cx="100" cy="100" rx="30" ry="90" />
              <ellipse cx="100" cy="100" rx="90" ry="60" />
              <ellipse cx="100" cy="100" rx="60" ry="90" />
            </g>
          </svg>
        </div>
        
        {/* Glow fix */}
        <div className="absolute w-[50%] h-[50%] bg-white/5 opacity-0 rounded-full"></div>

        {/* Injected Animation Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        ` }} />
      </div>

      {/* ------------------- Top Header Section ------------------- */}
      <div className="flex flex-col items-center mb-20 px-6 relative z-10">
        <h2 className="text-6xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 text-center leading-none">
          Client Reviews
        </h2>

        <div className="flex items-center gap-4 bg-[#111] border border-white/10 rounded-full py-3 px-8 shadow-2xl">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-black text-xl italic">C</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">4.9/5</span>
              <div className="flex text-yellow-500 text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
            <p className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">
              Based on 24 reviews on Clutch
            </p>
          </div>
        </div>
      </div>

      {/* ------------------- Cards Section (Infinite Drag) ------------------- */}
      <motion.div 
        drag="x"
        dragConstraints={{ right: 0, left: -18000 }} 
        dragElastic={0.1}
        // YAHAN CHANGES KI HAIN: Drag momentum aur speed control karne ke liye
        dragTransition={{ 
          power: 0.1,         // Ye momentum ki taqat ko kam karta hai (pehle zyada tha)
          timeConstant: 250,  // Ye drag chhodne ke baad jaldi rokne mein madad karta hai
        }}
        className="flex items-center gap-0 px-20 cursor-grab active:cursor-grabbing relative z-10"
      >
        {infiniteTestimonials.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            initial={{ rotate: item.rotate, y: item.y }}
            whileHover={{ 
              rotate: 0, 
              y: 0, 
              scale: 1.05,
              zIndex: 100,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 50 }}
            className={`
              relative min-w-85 h-87.5 p-10 flex flex-col justify-between 
              ${item.color} shadow-2xl rounded-sm
              -ml-20 first:ml-0
            `}
          >
            <p className={`text-[17px] font-medium leading-[1.6] ${item.text === 'white' ? 'text-white' : 'text-gray-800'}`}>
              "Agntix studio ability to create a high quality UI stands out. It's something we placed a premium on."
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-800 shrink-0 border border-white/10" />
              <div className="overflow-hidden">
                <h4 className={`font-bold text-sm truncate ${item.text === 'white' ? 'text-white' : 'text-black'}`}>
                  {item.name}
                </h4>
                <p className={`text-[10px] uppercase tracking-widest ${item.text === 'white' ? 'text-gray-400' : 'text-gray-500'}`}>
                  CEO & Founder
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default TestimonialSection;