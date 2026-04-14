"use client";

// Lenis removed — site has 4x Three.js canvases + Framer Motion + GSAP ScrollTrigger.
// Running Lenis on top of all that exceeds the frame budget and causes lag on every section.
// CSS scroll-behavior handles the smoothness with zero JS overhead.
export default function SmoothScroll({ children }) {
  return <>{children}</>;
}