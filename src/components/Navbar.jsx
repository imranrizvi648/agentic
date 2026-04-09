// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const navItems = [
//   { name: "Home", dropdown: true },
//   { name: "Services", dropdown: true },
//   { name: "Solutions", dropdown: true },
//   { name: "Company", dropdown: true },
//   { name: "Pages", dropdown: true },
//   { name: "Career", dropdown: true },
//   { name: "Contact Us", dropdown: false },
// ];

// export default function Navbar() {
//   const [activeTab, setActiveTab] = useState("Home");

//   return (
//     <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
//       <div className="flex items-center justify-between px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl">
        
//         {/* Logo Section */}
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <div className="w-8 h-8 bg-[#22d3ee] rounded-md flex items-center justify-center transform group-hover:rotate-12 transition-transform">
//             <span className="text-white font-bold text-xl">R</span>
//           </div>
//           <span className="text-white text-2xl font-bold tracking-tight">Ryno</span>
//         </div>

//         {/* Navigation Links */}
//         <ul className="hidden lg:flex items-center gap-4">
//           {navItems.map((item) => (
//             <li
//               key={item.name}
//               className="relative px-4 py-2 cursor-pointer"
//               onMouseEnter={() => setActiveTab(item.name)}
//             >
//               {/* Active / Hover Background Effect */}
//               {activeTab === item.name && (
//                 <motion.div
//                   layoutId="nav-bg"
//                   className="absolute inset-0 bg-white/10 border border-white/30 rounded-lg shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]"
//                   initial={false}
//                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                 >
//                   {/* Decorative Corners */}
//                   <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
//                   <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
//                 </motion.div>
//               )}

//               <div className="relative flex items-center gap-1">
//                 <span className={`text-sm font-medium transition-colors ${activeTab === item.name ? 'text-white' : 'text-gray-300'}`}>
//                   {item.name}
//                 </span>
//                 {item.dropdown && (
//                   <svg className={`w-3 h-3 transition-transform ${activeTab === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* CTA Button */}
//         <div className="relative group">
//           <button className="bg-[#dc1e25] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all hover:brightness-110 active:scale-95">
//             Get In Touch
//             <span className="group-hover:translate-x-1 transition-transform">→</span>
//           </button>
//           {/* Button Corners */}
//           <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/50" />
//           <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/50" />
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", dropdown: true },
  { name: "Services", dropdown: true },
  { name: "Solutions", dropdown: true },
  { name: "Company", dropdown: true, subItems: ["About Us", "Team"] },
  { name: "Pages", dropdown: true },
  { name: "Career", dropdown: true },
  { name: "Contact Us", dropdown: false },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="flex items-center justify-between px-6 py-2 bg-[#1a1625]/20 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
  {/* Image Logo Section */}
  <div className="relative w-12 h-12 overflow-hidden  shadow-cyan-500/20">
    <img 
      src="/iconeee.png"
      alt="Ryno Logo"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
  </div>

  
</div>

        {/* Nav Links */}
        <ul className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredTab(null)}>
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
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-white" />
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-white" />
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
                <span className={`text-[15px] font-semibold transition-colors ${activeTab === item.name || hoveredTab === item.name ? "text-white" : "text-gray-300"}`}>
                  {item.name}
                </span>
                {item.dropdown && (
                  <span className={`text-[10px] transition-transform ${hoveredTab === item.name ? "rotate-180" : ""}`}>▼</span>
                )}
              </div>

              {/* DROPDOWN MENU (Same as image) */}
              {item.subItems && hoveredTab === item.name && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-[120%] left-0 min-w-[180px] bg-white rounded-lg py-4 shadow-xl overflow-hidden"
                >
                  {item.subItems.map((sub) => (
                    <div key={sub} className="px-6 py-2 text-black hover:bg-gray-100 font-medium text-sm transition-colors">
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
  
  {/* Corner Accents - Logo ke bright color se match karte hue */}
  <div className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#6366f1]/60 group-hover:border-[#6366f1] transition-colors" />
  <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#6366f1]/60 group-hover:border-[#6366f1] transition-colors" />
</div>
      </div>
    </nav>
  );
}