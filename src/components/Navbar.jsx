"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", dropdown: false },
  { name: "Services", dropdown: true },
  { name: "Solutions", dropdown: false },
  { name: "Company", dropdown: true, subItems: ["About Us", "Team"] },
  { name: "Pages", dropdown: false },
  { name: "Career", dropdown: false },
  { name: "Contact Us", dropdown: false },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Yahan Parent nav mein transition lagaya hai px (padding) ke zarriye
    <nav
      className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${
        isScrolled ? "top-0 px-0" : "top-6 px-4 md:px-8"
      }`}
    >
      <div
        // Width calculation se bachne ke liye hamesha w-full rakha hai, sirf max-width animate hogi
        className={`w-full flex items-center justify-between shadow-2xl transition-all duration-500 ease-in-out ${
          isScrolled
            ? "max-w-full px-8 py-3 bg-[#1a1625] border-b border-white/10 rounded-none" // Scrolled State
            : "max-w-7xl px-6 py-2 bg-[#1a1625]/20 backdrop-blur-xl border border-white/10 rounded-2xl" // Top State
        }`}
      >
        {/* Logo & Brand Name Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-12 h-12 overflow-hidden shadow-cyan-500/20">
            <img
              src="/iconeee.png"
              alt="Ryno Logo"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          {/* Agenticsense Text Added Here */}
          <span className="text-white font-bold text-xl tracking-wide">
            Agenticsense
          </span>
        </div>

        {/* Nav Links */}
        <ul
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative px-4 py-2 cursor-pointer group"
              onMouseEnter={() => setHoveredTab(item.name)}
              onClick={() => setActiveTab(item.name)}
            >
              {/* HOVER BORDER (White thin line + thick corners) */}
              <AnimatePresence>
                {hoveredTab === item.name && (
                  <motion.div
                    layoutId="hoverFrame"
                    className="absolute inset-0 z-0 border border-white/80 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-white" />
                    <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTIVE STATE (Glassy background - static on Home) */}
              {activeTab === item.name && (
                <div className="absolute inset-0 bg-white/15 rounded-md border border-white/20 shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60" />
                </div>
              )}

              {/* Link Content */}
              <div className="relative z-10 flex items-center gap-1.5">
                <span
                  className={`text-[15px] font-semibold transition-colors ${
                    activeTab === item.name || hoveredTab === item.name
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                >
                  {item.name}
                </span>
                {item.dropdown && (
                  <span
                    className={`text-[10px] text-white transition-transform ${
                      hoveredTab === item.name ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                )}
              </div>

              {/* DROPDOWN MENU */}
              {item.subItems && hoveredTab === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-[120%] left-0 min-w-45 bg-white rounded-lg py-4 shadow-xl overflow-hidden"
                >
                  {item.subItems.map((sub) => (
                    <div
                      key={sub}
                      className="px-6 py-2 text-black hover:bg-gray-100 font-medium text-sm transition-colors"
                    >
                      {sub}
                    </div>
                  ))}
                </motion.div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="relative group overflow-visible">
          <button className="bg-[#1e1b4b] hover:bg-[#6366f1] text-white px-7 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg shadow-[#6366f1]/20 border border-white/5">
            Get In Touch →
          </button>

          {/* Corner Accents */}
          <div className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#6366f1]/60 group-hover:border-[#6366f1] transition-colors" />
          <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#6366f1]/60 group-hover:border-[#6366f1] transition-colors" />
        </div>
      </div>
    </nav>
  );
}