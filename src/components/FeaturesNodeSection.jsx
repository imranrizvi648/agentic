"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bot, ClipboardCheck, Book, UserCheck, ShieldCheck, PlugZap } from "lucide-react";

const PRIMARY = "#1a194d";

const leftFeatures = [
  { title: "Agent-Powered Workflows", desc: "Turn repetitive tasks into autonomous flows—agents plan, execute, and report.", icon: Bot },
  { title: "Eval-First Quality", desc: "Measure accuracy, latency, safety, and cost from day one.", icon: ClipboardCheck },
  { title: "Private Knowledge RAG", desc: "Make your docs, tickets, and wikis instantly useful with retrieval augmented generation.", icon: Book },
];

const rightFeatures = [
  { title: "Human-Centered AI UX", desc: "Interfaces, prompts, and error states designed for trust and adoption.", icon: UserCheck },
  { title: "Secure by Design", desc: "PII handling, SSO/SAML, and compliance workflows—enterprise-ready AI.", icon: ShieldCheck },
  { title: "Seamless Integrations", desc: "Plug into your stack with webhooks and APIs to turn insights into action.", icon: PlugZap },
];

// GPU Optimized Line: Animates a gradient mask instead of a stroke-dash
function AnimatedLine({ d, delay = 0 }) {
  return (
    <g className="line-group">
      <path d={d} stroke="#e5e7eb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path
        d={d}
        stroke="#ef4444"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        className="animating-path"
        style={{ animationDelay: `${delay}s` }}
      />
      <style jsx>{`
        .animating-path {
          stroke-dasharray: 40, 150;
          animation: flow 3s linear infinite;
          will-change: stroke-dashoffset;
        }
        @keyframes flow {
          from { stroke-dashoffset: 190; }
          to { stroke-dashoffset: -190; }
        }
      `}</style>
    </g>
  );
}

export default function FeaturesNodeSection() {
  const sectionRef = useRef(null);
  const [render, setRender] = useState(false);

  // Performance: Only render the complex SVGs once the section is near the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRender(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#fafafa] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="px-3 py-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-full mb-4 uppercase tracking-[0.2em]">
            System Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a194d] tracking-tight">
            Tools We <span className="text-black">Use</span>
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center gap-0 relative">
          
          {/* Left Cards */}
          <div className="flex flex-col gap-6 z-10 w-80">
            {leftFeatures.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>

          {/* Left Connectors */}
          <div className="w-32 h-[480px] relative z-0">
            {render && (
              <svg viewBox="0 0 120 480" className="w-full h-full absolute inset-0 overflow-visible">
                <AnimatedLine d="M 120 240 L 70 240 Q 60 240 60 230 L 60 70 Q 60 60 50 60 L 0 60" delay={0} />
                <AnimatedLine d="M 120 240 L 0 240" delay={1} />
                <AnimatedLine d="M 120 240 L 70 240 Q 60 240 60 250 L 60 410 Q 60 420 50 420 L 0 420" delay={2} />
              </svg>
            )}
          </div>

          {/* Center Node */}
          <div className="relative z-20 shrink-0 mx-[-15px]">
            <div className="relative w-32 h-32 bg-[#1a194d] rounded-[32px] shadow-2xl border border-white/10 flex flex-col items-center justify-center text-white ring-8 ring-white/50">
              <div className="flex -space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full border-[3px] border-red-500 bg-white" />
                <div className="w-8 h-8 rounded-full border-[3px] border-white bg-red-500 animate-pulse" />
              </div>
              <span className="font-black text-lg tracking-widest uppercase">Aigocy</span>
            </div>
          </div>

          {/* Right Connectors */}
          <div className="w-32 h-[480px] relative z-0">
            {render && (
              <svg viewBox="0 0 120 480" className="w-full h-full absolute inset-0 overflow-visible">
                <AnimatedLine d="M 0 240 L 50 240 Q 60 240 60 230 L 60 70 Q 60 60 70 60 L 120 60" delay={0.5} />
                <AnimatedLine d="M 0 240 L 120 240" delay={1.5} />
                <AnimatedLine d="M 0 240 L 50 240 Q 60 240 60 250 L 60 410 Q 60 420 70 420 L 120 420" delay={2.5} />
              </svg>
            )}
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6 z-10 w-80">
            {rightFeatures.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>

        </div>

        {/* Mobile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden max-w-3xl mx-auto">
          {[...leftFeatures, ...rightFeatures].map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>

      </div>
    </section>
  );
}

function FeatureCard({ title, desc, icon: Icon }) {
  return (
    <div className="bg-white rounded-[20px] p-6 min-h-[140px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-center group">
      <div className="w-10 h-10 rounded-xl bg-[#1a194d] group-hover:bg-red-500 flex items-center justify-center text-white mb-4 transition-colors duration-300">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">{title}</h3>
      <p className="text-[12px] leading-[1.6] text-gray-500 line-clamp-2">{desc}</p>
    </div>
  );
}