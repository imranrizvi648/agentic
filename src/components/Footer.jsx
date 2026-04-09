import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

const Footer = () => {
  const quickLinks = [
    { name: "ABOUT", href: "#" },
    { name: "WHO WE ARE", href: "#" },
    { name: "SERVICES", href: "#" },
    { name: "PROJECTS", href: "#" },
    { name: "BLOG", href: "#" },
    { name: "PRICING", href: "#" },
  ];

  const socialLinks = [
    { name: "Twitter / X", icon: <FaXTwitter size={12} />, href: "#", hoverClass: "group-hover:bg-[#000000]" },
    { name: "Facebook", icon: <FaFacebookF size={12} />, href: "#", hoverClass: "group-hover:bg-[#1877F2]" },
    { name: "Instagram", icon: <FaInstagram size={12} />, href: "#", hoverClass: "group-hover:bg-[#E4405F]" },
    { name: "Linkedin", icon: <FaLinkedinIn size={12} />, href: "#", hoverClass: "group-hover:bg-[#0A66C2]" },
    { name: "YouTube", icon: <FaYoutube size={12} />, href: "#", hoverClass: "group-hover:bg-[#FF0000]" },
  ];

  return (
    <footer className="bg-[#f3f3f3] pt-20 pb-4 px-10 font-sans border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ff4d00] rounded-full"></span>
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Quick Links</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, i) => (
                <a key={i} href={link.href} className="flex items-center justify-between bg-white px-4 py-2.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-all group">
                  <span className="text-[10px] font-black text-gray-700 tracking-wider">{link.name}</span>
                  <div className="bg-[#1e1b4b] p-1.5 rounded-full text-white group-hover:bg-[#1e1b4b] transition-colors">
                    <HiOutlineArrowUpRight size={12} strokeWidth={2} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tighter text-black uppercase">QUINN LINK</h1>
            <p className="text-[15px] text-gray-600 leading-relaxed max-w-[280px]">
              Crafting digital experiences with clarity and purpose. Designing visuals that reflect identity and innovation.
            </p>
          </div>

          <div className="space-y-7 md:pl-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#1e1b4b] rounded-full"></span>
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Contact</h3>
            </div>
            <div className="space-y-2 text-gray-700 text-sm font-semibold">
              <p className="hover:text-[#1e1b4b] cursor-pointer">Email:agntics@studio.com</p>
              <p>Phone: +(92) 555-0107</p>
              <p className="text-gray-500 font-medium text-[13px]">4517 Washington Ave. Kentucky 39495</p>
            </div>
            <button className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-all group">
              <span className="text-xs font-black text-gray-800 uppercase tracking-widest">Contact Us</span>
              <div className="bg-[#1e1b4b] p-2 rounded-full text-white group-hover:bg-[#1e1b4b] transition-colors"><FaPhoneAlt size={10} /></div>
            </button>
          </div>
        </div>

        {/* Social Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {socialLinks.map((social, i) => (
            <a key={i} href={social.href} className="flex items-center gap-4 bg-white px-6 py-2.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-md transition-all group min-w-[150px] justify-between">
              <span className="text-[11px] font-bold text-gray-700">{social.name}</span>
              <div className={`bg-[#1e1b4b] p-2 rounded-full text-white transition-colors flex items-center justify-center ${social.hoverClass}`}>{social.icon}</div>
            </a>
          ))}
        </div>

        {/*---------------------- Agntix.studio Branding ----------------------*/}
    

        <div className="flex flex-col items-center mt-5 mb-6 w-full overflow-visible ">
          <div className="relative select-none text-center">
            <h2 className="text-[13vw] font-black tracking-[-0.06em] text-gray-950 leading-none inline-block relative">
              
              {/* Part 1: "Ag" - Copyright sits under 'g' */}
              <span className="relative tracking-wide">
                Ag
                {/* translate-y ko kam kar ke [10%] kar diya hai gap khatam karne ke liye */}
                <span className="absolute bottom-0 left-[100%] -translate-y-4 text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-tighter whitespace-nowrap">
                  ©2025 AgenticSense Design Studio.
                </span>
              </span>

              {/* Part 2: "ntix.studi" - Terms sits under 'st' area */}
              <span className="relative tracking-wide">
                enticSen
                <span className="absolute bottom-0 left-[50%] -translate-x-1/2 -translate-y-4 text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-tighter whitespace-nowrap">
                  <a href="#" className="hover:text-[#1e1b4b] transition-colors">Terms and Conditions</a>
                </span>
              </span>

              {/* Part 3: "o" - Privacy sits under 'o' */}
              <span className="relative tracking-wide">
                se
                {/* Asterisk */}
                <span className="absolute -top-[15%] -right-[35%] text-[5vw] font-light leading-none">*</span>
                
                <span className="absolute bottom-0 right-20  -translate-y-4 text-[10px] md:text-[11px] font-bold text-gray-900 uppercase tracking-tighter whitespace-nowrap">
                  <a href="#" className="hover:text-[#1e1b4b] transition-colors">Privacy Policy</a>
                </span>
              </span>

            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;