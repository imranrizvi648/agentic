"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  // This hook connects GSAP to Lenis
  useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // This tells ScrollTrigger to use Lenis's proxy scroll instead of the window
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,         // Increase to 0.1 for smoother tracking
        duration: 1.5,     // 1.5 is better for that 'video' glide feel
        smoothWheel: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothTouch: false, // Set to false to avoid mobile lag
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}