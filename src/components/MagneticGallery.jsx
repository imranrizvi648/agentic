"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const MagneticGallery = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Horizontal scroll animation
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: "-200vw", // Moves the container 2 screens to the left
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000", // Controls how long the user has to scroll
          scrub: 1,      // The "magnetic" delay (higher number = smoother/heavier)
          pin: true,     // Pins the section in the viewport
          anticipatePin: 1,
        },
      }
    );

    // Cleanup on unmount
    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="bg-black overflow-hidden">
      {/* Wrapper that triggers the scroll logic */}
      <div ref={triggerRef} className="overflow-hidden">
        {/* The moving track */}
        <div 
          ref={sectionRef} 
          className="flex h-screen w-[300vw] flex-row items-center"
        >
          {/* Slide 1: Main Video */}
          <div className="flex h-screen w-screen items-center justify-center p-12">
            <div className="relative h-[85%] w-full overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="h-full w-full object-cover opacity-80"
              >
                <source src="/your-video-1.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-4xl font-bold uppercase tracking-tighter">Creative Direction</h2>
              </div>
            </div>
          </div>

          {/* Slide 2: Grid Layout (Like the video) */}
          <div className="flex h-screen w-screen items-center justify-center p-12">
            <div className="grid h-[85%] w-full grid-cols-2 gap-8">
              <div className="rounded-3xl bg-zinc-800 overflow-hidden">
                <img src="/work1.jpg" alt="Work" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="grid grid-rows-2 gap-8">
                <div className="rounded-3xl bg-zinc-800 overflow-hidden">
                   <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                      <source src="/your-video-2.mp4" type="video/mp4" />
                   </video>
                </div>
                <div className="rounded-3xl bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  <span className="text-zinc-500 uppercase tracking-widest text-sm italic">Digital Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: Large Branding Section */}
          <div className="flex h-screen w-screen items-center justify-center p-12">
            <div className="h-[85%] w-full rounded-3xl bg-white flex items-center justify-center">
               <h1 className="text-[15vw] font-black text-black leading-none">AGNTIX</h1>
            </div>
          </div>

        </div>
      </div>
      
      {/* Spacer to allow scrolling past the pinned section */}
      <div className="h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-600">Next Section Content...</p>
      </div>
    </section>
  );
};

export default MagneticGallery;