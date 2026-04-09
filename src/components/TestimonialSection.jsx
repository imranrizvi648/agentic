"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa"; // Rating stars ke liye

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
    <section className="bg-black py-24 overflow-hidden">
      {/* ------------------- Top Header Section ------------------- */}
      <div className="flex flex-col items-center mb-20 px-6">
        <h2 className="text-6xl md:text-7xl font-[900] text-white uppercase tracking-tighter mb-6">
          Client Reviews
        </h2>

        {/* Clutch Rating Pill */}
        <div className="flex items-center gap-4 bg-[#111] border border-gray-800 rounded-full py-3 px-6 shadow-xl">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-black text-xl italic">C</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">4.9/5</span>
              <div className="flex text-[#ff4d00] text-sm">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
            <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider">
              Based on 24 reviews on Clutch
            </p>
          </div>
        </div>
      </div>

      {/* ------------------- Cards Section ------------------- */}
      <motion.div 
        drag="x"
        dragConstraints={{ right: 500, left: -2500 }}
        dragElastic={0.1}
        className="flex items-center gap-0 px-20 cursor-grab active:cursor-grabbing"
      >
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ 
              rotate: item.rotate, 
              y: item.y 
            }}
            whileHover={{ 
              rotate: 0, 
              y: 0, 
              scale: 1.05,
              zIndex: 100,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 50,
              layout: { duration: 0.2 } 
            }}
            className={`
              relative min-w-[340px] h-[350px] p-10 flex flex-col justify-between 
              ${item.color} shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm
              -ml-20 first:ml-0
            `}
          >
            {/* Quote */}
            <p className={`text-[17px] font-medium leading-[1.6] ${item.text === 'white' ? 'text-white' : 'text-gray-800'}`}>
              "Agntix studio ability to create a high quality UI is stands out. It's something we placed a premium on. A studio with passionate, professional, fun and full creativity."
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden shrink-0 border-2 border-white/20">
                <div className="w-full h-full bg-slate-500" />
              </div>
              <div className="overflow-hidden">
                <h4 className={`font-bold text-sm truncate ${item.text === 'white' ? 'text-white' : 'text-black'}`}>
                  {item.name}
                </h4>
                <p className={`text-[10px] uppercase tracking-widest ${item.text === 'white' ? 'text-gray-400' : 'text-gray-500'}`}>
                  CEO & Founder, Archin Studio
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