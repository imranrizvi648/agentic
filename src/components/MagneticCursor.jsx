"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AgenticCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseEnter = (e) => {
      const isButton = e.target.closest("button, a, .magnetic");
      if (isButton) {
        gsap.to(ringRef.current, {
          scale: 1.5,
          backgroundColor: "rgba(220, 30, 37, 0.15)",
          borderColor: "rgba(220, 30, 37, 1)",
          duration: 0.3
        });
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      }
    };

    const onMouseLeave = () => {
      gsap.to(ringRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(220, 30, 37, 0.5)",
        duration: 0.3
      });
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .magnetic").forEach(el => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {/* Outer Tech Ring */}
      <div
        ref={ringRef}
        className="w-12 h-12 border border-[#dc1e25]/50 rounded-full flex items-center justify-center transition-transform duration-500"
      >
        {/* Inner Glowing Core (Agentic Pulse) */}
        <div 
          ref={dotRef}
          className="w-2 h-2 bg-[#dc1e25] rounded-full shadow-[0_0_15px_#dc1e25]" 
        />
      </div>

      {/* Optional: Static Crosshair lines for "Targeting" feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-[#dc1e25]/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-[1px] bg-[#dc1e25]/20" />
    </div>
  );
}