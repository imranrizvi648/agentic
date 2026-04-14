"use client";
import { ReactLenis, useLenis } from "lenis/react"; // Updated import path
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
  // Register ScrollTrigger (good practice to do this once)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Connect GSAP ScrollTrigger to Lenis frame updates
  useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,         
        duration: 1.5,     
        smoothWheel: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        // In newer versions, 'smoothTouch' is often handled via 'syncTouch'
        syncTouch: false, 
      }}
    >
      {children}
    </ReactLenis>
  );
}