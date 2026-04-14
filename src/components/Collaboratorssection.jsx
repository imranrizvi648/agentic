"use client";

import React from "react";

const PRIMARY = "#1a194d";
const ACCENT = "#625eff";

const collaborators = [
  { id: 1, name: "Stoli" }, { id: 2, name: "Red Cross" },
  { id: 3, name: "B&O Play" }, { id: 4, name: "Panwag" },
  { id: 5, name: "Stripe" }, { id: 6, name: "Vercel" },
  { id: 7, name: "Figma" }, { id: 8, name: "Linear" },
  { id: 9, name: "Notion" }, { id: 10, name: "Loom" },
  { id: 11, name: "Framer" }, { id: 12, name: "Webflow" },
];

const ROW_1 = [...collaborators.slice(0, 6), ...collaborators.slice(0, 6)];
const ROW_2 = [...collaborators.slice(6, 12), ...collaborators.slice(6, 12)];

function LogoCard({ collab }) {
  return (
    <div className="logo-card-vip">
      <div className="card-content">
        <div className="icon-box"><span>{collab.name[0]}</span></div>
        <div className="text-box">
          <span className="brand-name">{collab.name}</span>
          <span className="sub-tag">Partner</span>
        </div>
      </div>
    </div>
  );
}

export default function CollaboratorsSection() {
  return (
    <section className="collabs-wrapper">
      {/* Background stays clean, no masks */}
      <div className="section-header">
        <span className="badge">Trusted By Global Brands</span>
        <h2 className="title">Our Elite <span>Collaborators</span></h2>
      </div>

      <div className="marquee-container">
        {/* Row 1 */}
        <div className="marquee-track left-track">
          {ROW_1.map((c, i) => <LogoCard key={`r1-${i}`} collab={c} />)}
          {ROW_1.map((c, i) => <LogoCard key={`r1-dup-${i}`} collab={c} />)}
        </div>

        {/* Row 2 */}
        <div className="marquee-track right-track">
          {ROW_2.map((c, i) => <LogoCard key={`r2-${i}`} collab={c} />)}
          {ROW_2.map((c, i) => <LogoCard key={`r2-dup-${i}`} collab={c} />)}
        </div>
      </div>

      <style jsx global>{`
        .collabs-wrapper {
          background: #fafafc; /* Minimal light background */
          padding: 100px 0;
          overflow: hidden;
          position: relative;
        }

        .section-header {
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 40px;
        }

        .badge {
          display: block;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          color: ${PRIMARY};
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 900;
          color: ${PRIMARY};
          margin: 0;
          letter-spacing: -1px;
        }
        .title span { color: #000; }

        /* THE WHEEL: Removed mask-image for sharp "Lighting" effect */
        .marquee-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          will-change: transform;
          transform: translateZ(0); /* Hardware boost */
        }

        .left-track { animation: scrollLeft 35s linear infinite; }
        .right-track { animation: scrollRight 35s linear infinite; }

        @keyframes scrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes scrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .marquee-track:hover { animation-play-state: paused; }

        /* VIP Card: Enhanced Lighting */
        .logo-card-vip {
          min-width: 270px;
          height: 150px;
          background: ${PRIMARY};
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.2, 1, 0.3, 1);
          cursor: pointer;
        }

        .logo-card-vip:hover {
          transform: translateY(-8px) scale(1.03);
          /* Glowing Lighting Effect */
          box-shadow: 0 15px 45px rgba(98, 94, 255, 0.4);
          border-color: ${ACCENT};
          background: #24236b;
        }

        .card-content { display: flex; align-items: center; gap: 16px; }

        .icon-box {
          width: 48px; height: 48px; 
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; color: white;
          transition: 0.3s;
        }
        .logo-card-vip:hover .icon-box {
          background: ${ACCENT};
          box-shadow: 0 0 15px ${ACCENT};
        }

        .brand-name { color: white; font-weight: 700; font-size: 19px; }
        .sub-tag { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; }
      `}</style>
    </section>
  );
}