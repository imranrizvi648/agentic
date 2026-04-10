"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Next.js Link imported
import { motion, AnimatePresence } from "framer-motion";

// Update: Added 'href' to navItems for Next.js Links
const navItems = [
  { name: "Home", href: "/", dropdown: true, subItems: ["Home 1", "Home 2"] },
  { name: "Services", href: "/services", dropdown: true, subItems: ["Services", "Single Service"] },
  { name: "Solutions", href: "/solutions", dropdown: true, subItems: ["Solutions", "Single Solution"] },
  { name: "Company", href: "/company", dropdown: true, subItems: ["About Us", "Team"] },
  { name: "Pages", href: "/pages", dropdown: true, subItems: ["Pricing", "FAQ", "404 Error"] },
  { name: "Career", href: "/career", dropdown: true, subItems: ["Careers", "Single Career"] },
  { name: "Contact Us", href: "/contact", dropdown: false },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // States for CTA Button & Mobile Menu
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State

  // Optimized Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); // Passive true for better performance
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Outer Nav - Changed ease curve for buttery smooth, lag-free transition
    <nav
      className={`fixed left-0 right-0 z-50 flex justify-center transition-[padding,top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isScrolled ? "top-0 px-0" : "top-4 md:top-6 px-4 md:px-8"
      }`}
    >
      {/* MAIN NAVBAR CONTAINER - Fixed lag issue with optimized transitions */}
      <div 
        className={`w-full flex flex-col items-center justify-between transition-[max-width,background-color,border-radius,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] ${
          isScrolled
            ? "max-w-[100%] px-6 md:px-8 py-2.5 bg-[#1a1625]/95 backdrop-blur-2xl border-b border-white/10 rounded-none" 
            : "max-w-[1400px] px-5 md:px-8 py-2.5 bg-[#ffffff10] backdrop-blur-xl border border-white/10" 
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo & Brand Name Section */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group z-50">
            <div className="relative w-9 h-9 md:w-10 md:h-10 overflow-hidden">
              <img
                src="/iconeee.png"
                alt="Agenticsense Logo"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-white font-bold text-lg md:text-xl tracking-wide">
              Agenticsense
            </span>
          </Link>

          {/* DESKTOP NAV LINKS (Hidden on Mobile) */}
          <ul
            className="hidden lg:flex items-center gap-1.5"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => (
              <li
                key={item.name}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoveredTab(item.name)}
                onClick={() => setActiveTab(item.name)}
              >
                <Link href={item.href}>
                  {/* Dynamic Container for Active & Hover States */}
                  <div
                    className={`relative flex items-center gap-1.5 px-5 py-3 rounded transition-all duration-300 ${
                      activeTab === item.name || hoveredTab === item.name
                        ? "bg-[#ffffff15] text-white shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]" 
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {/* 1. ACTIVE STATE: Static Inset Corner Borders */}
                    {activeTab === item.name && (
                      <>
                        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-white rounded-tl-[2px]" />
                        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-white rounded-br-[2px]" />
                      </>
                    )}

                    {/* 2. HOVER STATE: Equal Size Exact 1px Borders */}
                    {hoveredTab === item.name && activeTab !== item.name && (
                      <div className="absolute inset-1 pointer-events-none">
                        <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute top-0 left-0 h-[1px] bg-white/80 rounded-tl-[2px] rounded-tr-[2px]" />
                        <motion.span initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute top-0 left-0 w-[1px] bg-white/80 rounded-tl-[2px] rounded-bl-[2px]" />
                        <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute bottom-0 right-0 h-[1px] bg-white/80 rounded-br-[2px] rounded-bl-[2px]" />
                        <motion.span initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute bottom-0 right-0 w-[1px] bg-white/80 rounded-br-[2px] rounded-tr-[2px]" />
                      </div>
                    )}

                    <span className="relative z-10 text-[14px] font-medium">{item.name}</span>
                    {item.dropdown && (
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`relative z-10 transition-transform duration-300 ${hoveredTab === item.name ? "rotate-180" : ""}`}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && hoveredTab === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[200px] bg-white rounded-md py-2 shadow-2xl overflow-hidden z-50"
                    >
                      {item.subItems?.map((sub) => (
                        <Link href={`${item.href}#${sub.toLowerCase().replace(" ", "-")}`} key={sub}>
                          <div className="px-5 py-2.5 text-[#1a1625] hover:bg-gray-50 hover:text-[#f82552] font-medium text-[14px] transition-colors">
                            {sub}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* DESKTOP CTA BUTTON */}
          <Link href="/contact" className="hidden lg:block">
            <button 
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className={`relative flex items-center gap-2 px-7 py-2.5 rounded-md font-semibold text-[14px] transition-all duration-300 ${
                isButtonHovered 
                  ? "bg-[#1e1b4b] text-white shadow-[0_4px_14px_0_rgba(248,37,82,0.39)]" 
                  : "bg-[#6366f1] text-white shadow-[0_4px_14px_0_rgba(248,37,82,0.39)]"
              }`}
            >
              {/* Static Inset Corner Borders */}
              {!isButtonHovered && (
                <>
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-white rounded-tl-[2px]" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-white rounded-br-[2px]" />
                </>
              )}

              {/* Hover State Animated Borders */}
              {isButtonHovered && (
                 <div className="absolute inset-1 pointer-events-none">
                  <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute top-0 left-0 h-[1px] bg-white/80 rounded-tl-[2px] rounded-tr-[2px]" />
                  <motion.span initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute top-0 left-0 w-[1px] bg-white/80 rounded-tl-[2px] rounded-bl-[2px]" />
                  <motion.span initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute bottom-0 right-0 h-[1px] bg-white/80 rounded-br-[2px] rounded-bl-[2px]" />
                  <motion.span initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute bottom-0 right-0 w-[1px] bg-white/80 rounded-br-[2px] rounded-tr-[2px]" />
                </div>
              )}

              <span className="relative z-10 flex items-center gap-2">
                Get In Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
          </Link>

          {/* MOBILE HAMBURGER MENU ICON */}
          <button 
            className="lg:hidden text-white p-2 z-50 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full lg:hidden overflow-hidden mt-4 border-t border-white/10"
            >
              <ul className="flex flex-col py-4 gap-2">
                {navItems.map((item) => (
                  <li key={item.name} className="flex flex-col">
                    <Link 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2 text-white/90 hover:bg-white/10 rounded-md font-medium text-[15px] transition-colors"
                    >
                      {item.name}
                    </Link>
                    {/* Mobile Sub-items */}
                    {item.dropdown && (
                      <div className="flex flex-col pl-8 pr-4">
                        {item.subItems?.map((sub) => (
                          <Link 
                            key={sub} 
                            href={`${item.href}#${sub.toLowerCase().replace(" ", "-")}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-1.5 text-white/60 hover:text-white text-[14px] transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                {/* Mobile CTA */}
                <li className="mt-4 px-4">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex justify-center items-center gap-2 bg-[#6366f1] text-white px-7 py-3 rounded-md font-semibold text-[15px]">
                      Get In Touch
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}