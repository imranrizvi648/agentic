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
];

// Instead of 30 copies, 3-4 is plenty for a 18000px constraints range
// Reducing DOM nodes is the #1 way to stop lag.
const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

const TestimonialSection = () => {
  return (
    <section className="bg-black py-20 overflow-hidden relative min-h-[700px] flex flex-col justify-center">
      
      {/* ------------------- GPU OPTIMIZED BACKGROUND ------------------- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0">
        <div className="earth-orbit">
          <svg viewBox="0 0 200 200" className="w-[70vw] h-[70vw] max-w-[900px] opacity-20">
            <g fill="none" stroke="white" strokeWidth="0.2" strokeOpacity="0.5">
              <circle cx="100" cy="100" r="90" />
              <ellipse cx="100" cy="100" rx="90" ry="30" />
              <ellipse cx="100" cy="100" rx="30" ry="90" />
              <ellipse cx="100" cy="100" rx="90" ry="60" />
              <ellipse cx="100" cy="100" rx="60" ry="90" />
            </g>
          </svg>
        </div>
      </div>

      {/* ------------------- Header Section ------------------- */}
      <div className="flex flex-col items-center mb-16 px-6 relative z-10 select-none">
        <h2 className="text-6xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-8 text-center leading-none">
          Client Reviews
        </h2>

        <div className="flex items-center gap-4 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-full py-3 mb-5 px-8 shadow-2xl">
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
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Based on 24 reviews on Clutch
            </p>
          </div>
        </div>
      </div>

      {/* ------------------- Optimized Drag Container ------------------- */}
      <div className="relative z-10 w-full overflow-visible">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 500, left: -5000 }} 
          dragElastic={0.05}
          dragTransition={{ 
            power: 0.1, 
            timeConstant: 200 
          }}
          className="flex items-center gap-0 px-[10vw] cursor-grab active:cursor-grabbing will-change-transform"
        >
          {infiniteTestimonials.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .earth-orbit {
          animation: spin 80s linear infinite;
          will-change: transform;
          transform: translateZ(0); /* Force GPU Layer */
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

const TestimonialCard = ({ item }) => {
  return (
    <motion.div
      initial={{ rotate: item.rotate, y: item.y }}
      whileHover={{ 
        rotate: 0, 
        y: 0, 
        scale: 1.05,
        zIndex: 50,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      className={`
        relative min-w-[340px] h-[360px] p-8 flex flex-col justify-between 
        ${item.color} shadow-2xl rounded-xl
        -ml-20 first:ml-0 border border-black/5
        will-change-transform select-none
      `}
    >
      <p className={`text-[18px] font-bold leading-tight ${item.text === 'white' ? 'text-white' : 'text-gray-900'}`}>
        "Agntix studio's ability to create a high quality UI stands out. It's something we placed a premium on."
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-neutral-500/10 shrink-0 border border-black/5" />
        <div className="overflow-hidden">
          <h4 className={`font-black text-sm truncate ${item.text === 'white' ? 'text-white' : 'text-black'}`}>
            {item.name}
          </h4>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${item.text === 'white' ? 'text-gray-400' : 'text-gray-500'}`}>
            CEO & Founder
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialSection;