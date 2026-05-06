'use client';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '900'] });

const AgencyStory = () => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-350uto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Vertical Label & Big Heading */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="flex gap-6">
               {/* Vertical text label like in the template */}
              <span className="[writing-mode:vertical-lr] rotate-180 text-sm font-bold uppercase tracking-[0.3em] text-gray-300">
                About our Studio
              </span>
              <h2 className={`${montserrat.className} text-[clamp(40px,5vw,90px)] font-black text-[#1e1b4b] leading-[0.9] tracking-tighter uppercase`}>
                We're a<br />creative<br />digital<br />studio.
              </h2>
            </div>
          </div>

          {/* Right Column: Images & Narrative */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Top Left Image */}
              <div className="relative aspect-4/5 rounded-4xl overflow-hidden bg-gray-100">
                <Image 
                  src="/about-us-2-2.webp" // Add your image here
                  alt="Creative process"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Top Right Image (slightly offset like the template) */}
              <div className="relative aspect-4/5 rounded-4xl overflow-hidden bg-gray-100 md:mt-12">
                <Image 
                  src="/about-us-2-1.webp" // Add your image here
                  alt="Studio vibe"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Paragraph Content */}
            <div className="max-w-xl space-y-8">
              <p className="text-2xl md:text-3xl font-medium text-[#1e1b4b] leading-tight">
                We have been creating digital products & providing design support to ambitious startups & corporations since 2016.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                As an award-winning agency within the digital jungle, AGENTICSENSE transcending aesthetics, 
                crafting your vision into a legacy that endures. We believe in the power of simple, 
                functional, and beautiful design.
              </p>
              
              <button className="group flex items-center gap-4 text-[#1e1b4b] font-bold uppercase tracking-widest text-sm border-b-2 border-[#1e1b4b] pb-2 hover:text-[#FF424A] hover:border-[#FF424A] transition-all">
                Get in Touch
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Stats / Experience Badge */}
            <div className="mt-20 flex items-center gap-6">
               <div className="text-7xl font-black text-[#1e1b4b] leading-none">17</div>
               <div className="text-sm font-bold uppercase tracking-widest text-gray-400">
                 Years of<br />Experience
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AgencyStory;