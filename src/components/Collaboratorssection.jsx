"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PRIMARY = "#1a194d";
const ACCENT  = "#625eff";

const collaborators = [
  { id: 1,  name: "Stoli",      src: null },
  { id: 2,  name: "Red Cross",  src: null },
  { id: 3,  name: "B&O Play",   src: null },
  { id: 4,  name: "Panwag",     src: null },
  { id: 5,  name: "Stripe",     src: null },
  { id: 6,  name: "Vercel",     src: null },
  { id: 7,  name: "Figma",       src: null },
  { id: 8,  name: "Linear",      src: null },
  { id: 9,  name: "Notion",      src: null },
  { id: 10, name: "Loom",        src: null },
  { id: 11, name: "Framer",      src: null },
  { id: 12, name: "Webflow",     src: null },
];

// Array ko double kar diya taqay scroll karne par khali jagah nazar na aaye
const ROW_1 = [...collaborators.slice(0, 6), ...collaborators.slice(0, 6), ...collaborators.slice(0, 6)];
const ROW_2 = [...collaborators.slice(6, 12), ...collaborators.slice(6, 12), ...collaborators.slice(6, 12)];

// ─── VIP Glass Door Logo Card ────────────────────────────────────────────────
function LogoCard({ collab }) {
  return (
    <div
      className="group"
      style={{
        minWidth: "270px",
        height: "160px",
        flexShrink: 0,
        borderRadius: "8px", 
        position: "relative",
        
        // VIP GLASS DOOR EFFECT
        background: "linear-gradient(135deg, rgba(26, 25, 77, 0.85) 0%, rgba(26, 25, 77, 0.6) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)", 
        boxShadow: "0 8px 32px rgba(26, 25, 77, 0.15)",
        overflow: "hidden"
      }}
      // Smooth Hover Logic
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(98,94,255,0.25)`;
        e.currentTarget.style.borderColor = `rgba(98,94,255,0.5)`; 
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(26, 25, 77, 0.95) 0%, rgba(26, 25, 77, 0.75) 100%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(26, 25, 77, 0.15)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(26, 25, 77, 0.85) 0%, rgba(26, 25, 77, 0.6) 100%)";
      }}
    >
      {/* Top Accent Line on Hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
        className="group-hover:opacity-100"
      />

      {collab.src ? (
        <img
          src={collab.src}
          alt={collab.name}
          style={{
            maxWidth: "60%",
            maxHeight: "50%",
            objectFit: "contain",
            filter: "brightness(0) invert(1) opacity(0.6)",
            transition: "all 0.3s ease",
          }}
          className="group-hover:opacity-100 group-hover:scale-105"
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Glassy Minimal Icon */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.08)", 
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s ease",
            }}
            className="group-hover:bg-[#625eff] group-hover:border-[#625eff]"
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#ffffff",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.3s ease",
              }}
            >
              {collab.name[0]}
            </span>
          </div>

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "17px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#ffffff", 
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {collab.name}
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.6)", 
                fontFamily: "'DM Sans', sans-serif",
                marginTop: "2px",
              }}
            >
              Partner
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function CollaboratorsSection() {
  const sectionRef = useRef(null);

  // Framer Motion: Scroll hook
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax mapping
  const xRow1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const xRow2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#fafafc", 
        padding: "120px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle Grid Pattern for premium feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#1a194d 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 56px 64px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "8px", height: "8px", background: ACCENT }} />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: PRIMARY,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Trusted By Global Brands
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: PRIMARY,
              lineHeight: 1.1,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            Our Elite{" "}
            <span style={{ color: "black" }}>
              Collaborators
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ─── Moving Rows Container ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
        
        {/* Left and Right Fade Overlays removed from here as requested */}

        {/* Row 1 (Moves Left as you scroll down) */}
        <motion.div style={{ x: xRow1, display: "flex", gap: "24px", paddingLeft: "24px", width: "max-content" }}>
          {ROW_1.map((c, i) => (
            <LogoCard key={`r1-${i}`} collab={c} />
          ))}
        </motion.div>

        {/* Row 2 (Moves Right as you scroll down) */}
        <motion.div style={{ x: xRow2, display: "flex", gap: "24px", paddingLeft: "24px", width: "max-content" }}>
          {ROW_2.map((c, i) => (
            <LogoCard key={`r2-${i}`} collab={c} />
          ))}
        </motion.div>
      </div>

    </section>
  );
}