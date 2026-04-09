"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Code2, Globe, Activity, ArrowRight } from "lucide-react";

const PRIMARY = "#0a0a0a"; // Pure dark for professional text
const ACCENT  = "#625eff"; // Indigo accent
const BORDER  = "#e5e5e5"; // Clean gray border
const MUTED   = "#737373"; // Professional gray for descriptions

const services = [
  {
    icon: Code2,
    title: "Customer-Centric Approach",
    desc: "Tailoring services to unique customer needs for deeply personalized, high-impact solutions.",
    geometry: "icosahedron",
    index: 0,
  },
  {
    icon: Globe,
    title: "Quality and Reliability",
    desc: "Ensuring consistent high-quality, reliable service delivery that exceeds customer expectations.",
    geometry: "torus",
    index: 1,
  },
  {
    icon: Activity,
    title: "Innovation and Adaptability",
    desc: "Embracing cutting-edge innovation to evolve and offer future-ready enterprise solutions.",
    geometry: "octahedron",
    index: 2,
  },
];

// ─── Clean 3D Floating Shape ──────────────────────────────────────────────────
function FloatingShape({ type, hovered }) {
  const meshRef = useRef();
  const wireRef = useRef();
  const groupRef = useRef();

  const geo = useMemo(() => {
    switch (type) {
      case "icosahedron": return new THREE.IcosahedronGeometry(1.2, 0);
      case "torus":       return new THREE.TorusGeometry(0.8, 0.3, 16, 40);
      case "octahedron":  return new THREE.OctahedronGeometry(1.2, 0);
      default:            return new THREE.IcosahedronGeometry(1.2, 0);
    }
  }, [type]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Smooth, slow, professional rotation
      groupRef.current.rotation.x = t * 0.15;
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.05; // Very subtle float
    }
    
    // Slight scale up on hover
    const targetScale = hovered ? 1.05 : 1.0;
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      wireRef.current.scale.copy(meshRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Matte Solid Inner Shape */}
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#f5f5f5"}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Crisp Outer Wireframe */}
      <mesh ref={wireRef} geometry={geo}>
        <meshBasicMaterial
          color={hovered ? ACCENT : "#d4d4d8"}
          wireframe
          transparent
          opacity={hovered ? 0.8 : 0.4}
        />
      </mesh>
    </group>
  );
}

// ─── Minimalist 3D Scene ──────────────────────────────────────────────────────
function CardScene({ type, hovered }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      {/* Clean white lighting instead of colored disco lights */}
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
      <FloatingShape type={type} hovered={hovered} />
    </>
  );
}

// ─── VIP Service Card ─────────────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: "12px", // Smaller radius for premium look
        border: `1px solid ${hovered ? 'rgba(98,94,255,0.3)' : BORDER}`,
        boxShadow: hovered 
          ? "0 20px 40px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)" 
          : "0 2px 8px rgba(0,0,0,0.02)", // Very soft, realistic shadows
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        overflow: "hidden",
      }}
    >
      {/* Top Accent Bar (Shows on Hover) */}
      <div style={{
        height: "2px",
        width: "100%",
        background: ACCENT,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.4s ease",
      }} />

      {/* 3D Canvas Area */}
      <div style={{ 
        position: "relative", 
        width: "100%", 
        height: "180px", 
        background: hovered ? "#f8f9fa" : "#fafafa", // Subtle background change
        borderBottom: `1px solid ${BORDER}`,
        transition: "background 0.3s ease",
      }}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <CardScene type={service.geometry} hovered={hovered} />
        </Canvas>
      </div>

      {/* Content Area */}
      <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          {/* Minimalist Icon Box */}
          <div style={{
            width: "40px", height: "40px",
            borderRadius: "8px",
            background: hovered ? `${ACCENT}10` : "#f5f5f5",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.3s ease",
          }}>
            <Icon size={18} color={hovered ? ACCENT : PRIMARY} style={{ transition: "color 0.3s ease" }} />
          </div>

          <h3 style={{
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: PRIMARY,
            fontFamily: "'DM Sans', sans-serif",
            margin: 0,
          }}>
            {service.title}
          </h3>
        </div>

        <p style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: MUTED,
          fontFamily: "'DM Sans', sans-serif",
          margin: "0 0 24px 0",
          flexGrow: 1,
        }}>
          {service.desc}
        </p>

        {/* Clean Call to Action */}
        <div style={{ 
          display: "flex", alignItems: "center", gap: "6px",
          color: hovered ? ACCENT : PRIMARY,
          transition: "color 0.3s ease",
        }}>
          <span style={{
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Learn more
          </span>
          <ArrowRight 
            size={14} 
            style={{ 
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease" 
            }} 
          />
        </div>

      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section style={{
      background: "#fafafc", // Solid, clean off-white background
      padding: "120px 0",
      position: "relative",
    }}>

      {/* Very Subtle Grid Pattern */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.3,
        pointerEvents: "none",
      }} />

      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "0 24px", 
        position: "relative", 
        zIndex: 1 
      }}>

        {/* Clean Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: "8px", height: "8px", background: ACCENT }} />
            <span style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: PRIMARY,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              What We Offer
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
            <h2 style={{
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: PRIMARY,
              lineHeight: 1.1,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
              maxWidth: "600px",
            }}>
              Enterprise Solutions Powered by AI
            </h2>
            
            <p style={{
              fontSize: "15px",
              color: MUTED,
              maxWidth: "400px",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
              margin: 0,
            }}>
              We deliver pixel-perfect engineering and deeply personalized strategies to help your business scale globally.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
        }}>
          {services.map((s) => (
            <ServiceCard key={s.index} service={s} index={s.index} />
          ))}
        </div>

      </div>
    </section>
  );
}