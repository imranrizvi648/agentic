"use client";

import React, { useRef, useState, useEffect } from "react";
import { Bot, ClipboardCheck, Book, UserCheck, ShieldCheck, PlugZap } from "lucide-react";

const leftFeatures = [
  { title: "Agent-Powered Workflows", desc: "Turn repetitive tasks into autonomous flows—agents plan, execute, and report with guardrails, audit trails, and clear handoff to humans.", icon: Bot },
  { title: "Eval-First Quality", desc: "Measure accuracy, latency, safety, and cost from day one. Our evals and dashboards keep models reliable and budgets predictable.", icon: ClipboardCheck },
  { title: "Private Knowledge RAG", desc: "Make your docs, tickets, and wikis instantly useful with retrieval augmented generation—freshness, citations, and explainability built in.", icon: Book },
];

const rightFeatures = [
  { title: "Human-Centered AI UX", desc: "Interfaces, prompts, and error states designed for trust and adoption—so the smart thing is also the obvious thing to do.", icon: UserCheck },
  { title: "Secure by Design", desc: "PII handling, SSO/SAML, RBAC, secrets management, and compliance workflows—ship AI that's safe, auditable, and enterprise-ready.", icon: ShieldCheck },
  { title: "Seamless Integrations", desc: "Plug into your stack (CRM, helpdesk, ERP, data warehouse) with webhooks and APIs to turn insights into action—fast.", icon: PlugZap },
];

// Pure CSS animation — paused when section not visible
// animation-play-state: paused = zero GPU cost when off screen
function AnimatedLine({ d, delay = 0, paused }) {
  return (
    <>
      <path d={d} stroke="#e5e7eb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path
        d={d}
        stroke="#ef4444"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="30 400"
        style={{
          animationName: "dash-move",
          animationDuration: "3.5s",
          animationTimingFunction: "linear",
          animationDelay: `${delay}s`,
          animationIterationCount: "infinite",
          animationPlayState: paused ? "paused" : "running", // KEY: pauses when off screen
        }}
      />
    </>
  );
}

export default function FeaturesNodeSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only run animation when section is actually on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#fafafa] overflow-hidden font-sans">
      {/* Keyframe defined once — not inside a loop */}
      <style>{`
        @keyframes dash-move {
          from { stroke-dashoffset: 400; }
          to   { stroke-dashoffset: -100; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col items-center mb-20">
          <span className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-full mb-4 uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Tool We Use
          </h2>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center gap-2 relative max-w-275 mx-auto">

          {/* Left Cards */}
          <div className="flex flex-col gap-6 z-10 w-85">
            {leftFeatures.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>

          {/* Left Connectors */}
          <div className="w-30 h-132 relative z-0">
            <svg className="w-full h-full absolute inset-0">
              <AnimatedLine d="M 120 264 L 70 264 Q 60 264 60 254 L 60 90 Q 60 80 50 80 L 0 80" delay={0} paused={!isVisible} />
              <AnimatedLine d="M 120 264 L 0 264" delay={1.2} paused={!isVisible} />
              <AnimatedLine d="M 120 264 L 70 264 Q 60 264 60 274 L 60 438 Q 60 448 50 448 L 0 448" delay={2.4} paused={!isVisible} />
            </svg>
          </div>

          {/* Center Node */}
          <div className="relative z-20 shrink-0">
            <div className="absolute inset-0 bg-red-500 rounded-4xl opacity-20" />
            <div className="relative w-32 h-32 bg-[#1a194d] rounded-3xl shadow-xl border border-red-400/50 flex flex-col items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="flex -space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full border-[3px] border-white" />
                <div className="w-8 h-8 rounded-full border-[3px] border-white bg-[#0a0a0a]" />
              </div>
              <span className="font-bold text-lg tracking-wide">Aigocy</span>
            </div>
          </div>

          {/* Right Connectors */}
          <div className="w-30 h-132 relative z-0">
            <svg className="w-full h-full absolute inset-0">
              <AnimatedLine d="M 0 264 L 50 264 Q 60 264 60 254 L 60 90 Q 60 80 70 80 L 120 80" delay={0.6} paused={!isVisible} />
              <AnimatedLine d="M 0 264 L 120 264" delay={1.8} paused={!isVisible} />
              <AnimatedLine d="M 0 264 L 50 264 Q 60 264 60 274 L 60 438 Q 60 448 70 448 L 120 448" delay={3} paused={!isVisible} />
            </svg>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6 z-10 w-85">
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
    <div className="bg-white rounded-[20px] p-6 h-40 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex flex-col justify-center">
      <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center text-white mb-4">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">{title}</h3>
      <p className="text-[12px] leading-[1.6] text-gray-500 line-clamp-3">{desc}</p>
    </div>
  );
}