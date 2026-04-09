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
  return (
    <section className="bg-black py-10 overflow-hidden relative min-h-[800px] flex flex-col justify-center">
      
      {/* ------------------- OPTIMIZED EARTH BACKGROUND ------------------- */}
      {/* ------------------- OPTIMIZED EARTH BACKGROUND ------------------- */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0">
  <div 
    className="w-[60vw] h-[60vw] max-w-[1200px] max-h-[1200px] opacity-20"
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
  <div className="absolute w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full"></div>

  {/* Injected Animation Keyframes - Isko component ke bahar ya fragment mein rakhna */}
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  ` }} />
</div>

      {/* ------------------- Top Header Section ------------------- */}
      <div className="flex flex-col items-center mb-20 px-6 relative z-10">
        <h2 className="text-6xl md:text-6xl font-[900] text-white uppercase tracking-tighter mb-8 text-center leading-none">
          Client Reviews
        </h2>

        <div className="flex items-center gap-4 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full py-3 px-8 shadow-2xl">
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

      {/* ------------------- Cards Section (Optimized Drag) ------------------- */}
      <motion.div 
        drag="x"
        dragConstraints={{ right: 0, left: -2000 }} // Tightened constraints
        dragElastic={0.1}
        className="flex items-center gap-0 px-20 cursor-grab active:cursor-grabbing relative z-10"
      >
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            initial={{ rotate: item.rotate, y: item.y }}
            whileHover={{ 
              rotate: 0, 
              y: 0, 
              scale: 1.05,
              zIndex: 100,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              relative min-w-[340px] h-[350px] p-10 flex flex-col justify-between 
              ${item.color} shadow-2xl rounded-sm
              -ml-20 first:ml-0 will-change-transform
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

      {/* Adding the spin animation in a style tag for maximum performance */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;