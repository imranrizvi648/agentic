"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WhoWeAre() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Reveal Heading
      gsap.from(textRef.current, {
        y: 60, // Reduced from 100 to make it feel "lighter"
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse", // Better performance
        },
      });

      // 2. Parallax Image
      gsap.to(imageRef.current, {
        y: "-15%", // Use percentage for smoother calculation
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true, // Crucial for responsive lag
        },
      });

      // 3. Stats Counting
      gsap.utils.toArray(".stat-number").forEach((stat) => {
        const targetValue = parseInt(stat.getAttribute("data-value"));
        gsap.fromTo(stat, 
          { innerText: 0 }, 
          { 
            innerText: targetValue, 
            duration: 1.5,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
            } 
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-20 lg:py-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16 items-start">
        <div className="lg:col-span-4 flex items-start pt-4 sticky top-24 z-10">
          <div className="flex items-center text-[11px] font-semibold tracking-[0.15em] text-neutral-600 uppercase">
            <span className="w-1.5 h-1.5 bg-[#dc1e25] rounded-full mr-3"></span>
            Who We Are
          </div>
        </div>
        <div className="lg:col-span-8">
          {/* Added overflow-hidden to the wrapper to prevent jitter */}
          <div className="overflow-hidden">
             <h2 ref={textRef} className="text-[2.25rem] md:text-[3.25rem] lg:text-[40px] leading-[1.05] tracking-tight font-bold text-[#111111]">
               An independent web design and branding agency in Manchester set up in 2010 who care, build relationships, have industry experience, and win awards.
             </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        <div className="hidden lg:flex lg:col-span-4 items-end pb-8">
          <svg width="140" height="140" viewBox="0 0 100 100" fill="none" className="text-black ml-4 animate-[spin_20s_linear_infinite]">
            <path d="M50 5V95M5 50H95M18 18L82 82M18 82L82 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* FIX 2: Optimized Parallax Container */}
        <div className="lg:col-span-4 self-start overflow-hidden rounded-sm">
          <div 
            ref={imageRef}
            className="w-full aspect-[3/4] bg-neutral-100 bg-cover bg-center scale-125 will-change-transform" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop')" }}
          ></div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-center lg:pl-6 xl:pl-8 pb-20">
          <div className="flex -space-x-3 mb-5 mt-8 lg:mt-0">
            {[11, 12, 33].map((img) => (
               <img key={img} src={`https://i.pravatar.cc/150?img=${img}`} alt="Avatar" className="w-11 h-11 rounded-full border-[2px] border-white object-cover" />
            ))}
            <div className="w-11 h-11 rounded-full border-[2px] border-white bg-[#111111] text-white flex items-center justify-center text-lg z-10 relative cursor-pointer hover:scale-110 transition-all">
              +
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-neutral-600 max-w-xs mb-8">
            Driven by a passion for innovation, we specialize in delivering top-quality design solutions.
          </p>
          <hr className="border-neutral-200 mb-8" />
          <div className="flex gap-10 xl:gap-14">
            <div>
              <h3 className="text-6xl text-[#111111] tracking-tighter mb-3">
                <span className="stat-number" data-value="98">0</span>%
              </h3>
              <p className="text-[13px] text-neutral-500 leading-snug">Satisfied Clients</p>
            </div>
            <div>
              <h3 className="text-6xl text-[#111111] tracking-tighter mb-3">
                <span className="stat-number" data-value="125">0</span>+
              </h3>
              <p className="text-[13px] text-neutral-500 leading-snug">Projects Done</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}