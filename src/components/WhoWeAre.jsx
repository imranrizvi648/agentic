"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeAre() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Text Reveal
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
        },
      });

      // 2. THE MAGNETIC VERTICAL SLIDE
      // We use a large Y-offset (30%) to make the movement very noticeable
      gsap.fromTo(imageRef.current, 
        { y: "-25%" }, // Starts high
        {
          y: "25%",     // Ends low
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8, // This creates the "Magnetic" weight/lag
          },
        }
      );

      // 3. VELOCITY SKEW (The "Fluid" Secret)
      // This makes the image tilt slightly based on how fast you scroll
      let proxy = { skew: 0 },
          skewSetter = gsap.quickSetter(imageRef.current, "skewY", "deg"),
          clamp = gsap.utils.clamp(-8, 8); 

      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -400);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 1,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

      // 4. Counter Logic
      gsap.utils.toArray(".stat-number").forEach((stat) => {
        const targetValue = parseInt(stat.getAttribute("data-value"));
        gsap.to(stat, {
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white py-24 lg:py-40 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        <div className="lg:col-span-4 sticky top-32">
          <div className="flex items-center text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
            <span className="w-2 h-2 bg-[#dc1e25] rounded-full mr-3 animate-pulse"></span>
            Agency Profile
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 ref={textRef} className="text-[2.5rem] md:text-[4rem] lg:text-[52px] leading-[1.1] tracking-tighter font-bold text-[#111]">
            We build high-end digital experiences that care, connect, and win.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="hidden lg:block lg:col-span-4">
           {/* Decorative Star/Asterisk */}
           <div className="w-32 h-32 border-2 border-black rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
             <span className="text-4xl">★</span>
           </div>
        </div>

        {/* MAGNETIC IMAGE WRAPPER */}
        <div ref={imageWrapperRef} className="lg:col-span-4 overflow-hidden rounded-lg bg-neutral-200">
          <div 
            ref={imageRef}
            className="w-full aspect-[3/4] bg-cover bg-center scale-150 will-change-transform" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop')",
              // scale-150 is important so there is "extra" image to show during the slide
            }}
          ></div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8 lg:pl-10">
          <p className="text-lg text-neutral-600 leading-relaxed">
            Independent branding & web agency established in 2010. We don't just build websites; we build industry leaders.
          </p>
          
          <div className="flex gap-12 border-t border-neutral-100 pt-8">
            <div>
              <h3 className="text-6xl font-black text-[#111] tracking-tighter"><span className="stat-number" data-value="98">0</span>%</h3>
              <p className="text-xs uppercase tracking-widest text-neutral-400 mt-2">Success Rate</p>
            </div>
            <div>
              <h3 className="text-6xl font-black text-[#111] tracking-tighter"><span className="stat-number" data-value="125">0</span>+</h3>
              <p className="text-xs uppercase tracking-widest text-neutral-400 mt-2">Awards Won</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}