import React from 'react';
import Image from 'next/image';

const AgntixStudioSection = () => {
  // Using a different temporary image to ensure it loads
  const studioImagePath = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'; 

  return (
    // 'mt-40' is the "Move out of the way of the Navbar" fix
    <section className="relative w-full bg-white mt-40 pb-24 px-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Navigation Buttons Row */}
        <div className="flex justify-end gap-4 mb-20">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EE3E41]"></span>
            </span>
            <span className="text-sm font-semibold text-gray-400">Loading...</span>
          </div>
          <button className="px-8 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
            Introduction
          </button>
        </div>

        {/* Content Split */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: The Image */}
          <div className="relative w-full lg:w-[55%] aspect-[1.5/1] overflow-hidden rounded-lg shadow-xl bg-gray-100">
            <Image 
              src={studioImagePath} 
              alt="Agntix Studio"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Right Side: The Big Red Text */}
          <div className="w-full lg:w-[45%] flex flex-col items-start">
            <h2 className="text-[#EE3E41] text-xl md:text-2xl font-black tracking-[0.15em] mb-2 uppercase">
              ABOUT AGNTIX
            </h2>
            <h1 className="text-[#EE3E41] text-[12vw] lg:text-[9rem] font-[1000] leading-[0.8] tracking-tighter uppercase">
              OUR<br />STUDIO
            </h1>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgntixStudioSection;