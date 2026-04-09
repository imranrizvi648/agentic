"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, ClipboardCheck, Book, UserCheck, ShieldCheck, PlugZap } from "lucide-react";

// --- Data ---
const leftFeatures = [
  {
    title: "Agent-Powered Workflows",
    desc: "Turn repetitive tasks into autonomous flows—agents plan, execute, and report with guardrails, audit trails, and clear handoff to humans.",
    icon: Bot,
  },
  {
    title: "Eval-First Quality",
    desc: "Measure accuracy, latency, safety, and cost from day one. Our evals and dashboards keep models reliable and budgets predictable.",
    icon: ClipboardCheck,
  },
  {
    title: "Private Knowledge RAG",
    desc: "Make your docs, tickets, and wikis instantly useful with retrieval augmented generation—freshness, citations, and explainability built in.",
    icon: Book,
  },
];

const rightFeatures = [
  {
    title: "Human-Centered AI UX",
    desc: "Interfaces, prompts, and error states designed for trust and adoption—so the smart thing is also the obvious thing to do.",
    icon: UserCheck,
  },
  {
    title: "Secure by Design",
    desc: "PII handling, SSO/SAML, RBAC, secrets management, and compliance workflows—ship AI that's safe, auditable, and enterprise-ready.",
    icon: ShieldCheck,
  },
  {
    title: "Seamless Integrations",
    desc: "Plug into your stack (CRM, helpdesk, ERP, data warehouse) with webhooks and APIs to turn insights into action—fast.",
    icon: PlugZap,
  },
];

// --- Reusable Animated Line Component ---
const AnimatedLine = ({ d, delay = 0 }) => (
  <>
    {/* Base subtle gray line */}
    <path d={d} stroke="#e5e7eb" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    
    {/* Moving Red Light */}
    <motion.path
      d={d}
      stroke="#ef4444" // Bright Red/Orange light
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="30 400" // 30px ki light, 400px ka gap
      initial={{ strokeDashoffset: 400 }}
      animate={{ strokeDashoffset: -100 }}
      transition={{
        duration: 3.5, // Speed of the light
        repeat: Infinity,
        ease: "linear",
        delay: delay, // Alag alag lines par light agay peechay chalane ke liye
      }}
    />
  </>
);

// --- Main Component ---
export default function FeaturesNodeSection() {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20">
          <span className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-full mb-4 uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
           Tool We Use
          </h2>
        </div>

        {/* Node Layout - Desktop Only (Hidden on small screens) */}
        <div className="hidden lg:flex items-center justify-center gap-2 relative max-w-[1100px] mx-auto">
          
          {/* Left Cards */}
          <div className="flex flex-col gap-6 z-10 w-[340px]">
            {leftFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>

          {/* Left SVG Connectors */}
          <div className="w-[120px] h-[528px] relative z-0">
            <svg className="w-full h-full absolute inset-0">
              {/* Coordinates are calculated perfectly based on 160px card height + 24px gap */}
              {/* Top Line */}
              <AnimatedLine d="M 120 264 L 70 264 Q 60 264 60 254 L 60 90 Q 60 80 50 80 L 0 80" delay={0} />
              {/* Middle Line */}
              <AnimatedLine d="M 120 264 L 0 264" delay={1.2} />
              {/* Bottom Line */}
              <AnimatedLine d="M 120 264 L 70 264 Q 60 264 60 274 L 60 438 Q 60 448 50 448 L 0 448" delay={2.4} />
            </svg>
          </div>

          {/* Center Logo Node */}
          <div className="relative z-20 flex-shrink-0">
            {/* Soft background glowing shadow */}
            <div className="absolute inset-0 bg-red-500 rounded-[32px] blur-2xl opacity-60"></div>
            {/* Center Box */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#1a194d] to-[#1a194d] rounded-[24px] shadow-xl border border-red-400/50 flex flex-col items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform duration-300">
              {/* Custom Aigocy Icon (Interlocking circles) */}
              <div className="flex -space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full border-[3px] border-white"></div>
                <div className="w-8 h-8 rounded-full border-[3px] border-white bg-[#0a0a0a]"></div>
              </div>
              <span className="font-bold text-lg tracking-wide">Aigocy</span>
            </div>
          </div>

          {/* Right SVG Connectors */}
          <div className="w-[120px] h-[528px] relative z-0">
            <svg className="w-full h-full absolute inset-0">
              {/* Top Line */}
              <AnimatedLine d="M 0 264 L 50 264 Q 60 264 60 254 L 60 90 Q 60 80 70 80 L 120 80" delay={0.6} />
              {/* Middle Line */}
              <AnimatedLine d="M 0 264 L 120 264" delay={1.8} />
              {/* Bottom Line */}
              <AnimatedLine d="M 0 264 L 50 264 Q 60 264 60 274 L 60 438 Q 60 448 70 448 L 120 448" delay={3} />
            </svg>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6 z-10 w-[340px]">
            {rightFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>

        </div>

        {/* Mobile View (Grid layout without lines for small screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden max-w-3xl mx-auto">
          {[...leftFeatures, ...rightFeatures].map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Card Component ---
function FeatureCard({ title, desc, icon: Icon }) {
  return (
    <div className="bg-white rounded-[20px] p-6 h-[160px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex flex-col justify-center">
      <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center text-white mb-4">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">{title}</h3>
      <p className="text-[12px] leading-[1.6] text-gray-500 line-clamp-3">
        {desc}
      </p>
    </div>
  );
}