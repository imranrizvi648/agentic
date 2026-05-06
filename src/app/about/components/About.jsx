
'use client';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['800', '900'] });

const AboutStudio = () => {
  return (
    // Added pt-32 to clear your fixed navbar
    <div className={`min-h-screen bg-white flex items-center justify-center p-4 pt-32 ${inter.className}`}>
      
      {/* Main Card - Increased min-height to prevent squashing */}
      <div className="bg-white p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-w-300 w-full border border-gray-100 flex flex-col md:flex-row gap-10 min-h-125 relative z-10">
        
        {/* Left Side (Image Block) */}
        <div className="flex-1 relative  overflow-hidden min-h-100">
          {/* Using a standard img tag first to verify visibility */}
          <img 
            src="/about-us-2-4.webp" 
            alt="Team"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load in img tag");
              e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Right Side */}
       <div className="flex-[1.2] flex flex-col pt-4">
  {/* Buttons Area */}
  <div className="flex justify-end gap-3 ">
    <button className="px-6 py-2 rounded-full border border-gray-200 text-gray-500 text-sm font-medium">
      Loading...
    </button>
    <button className="px-6 py-2 rounded-full border border-gray-200 text-gray-500 text-sm font-medium">
      Introduction
    </button>
  </div>

  {/* Typography Area */}
  <div className="grow flex items-start">
    <div className="pl-4">
      <span className="block text-[#1e1b4b] text-[1.2rem] font-black uppercase tracking-tighter mb-1">
        About AGENTICSENSE
      </span>
      
      <h1 className={`${montserrat.className}  text-[clamp(40px,5vw,90px)] font-extrabold text-[#1e1b4b] leading-[0.9] tracking-tighter uppercase`}>
        <span className="block text-[clamp(60px,10vw,130px)]">OUR</span>
        <span className="block text-[clamp(60px,10vw,130px)] -mt-2">STUDIO</span>
      </h1>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default AboutStudio;