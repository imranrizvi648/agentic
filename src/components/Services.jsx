

"use client";

import React, { useRef, useEffect, useState } from "react";

const services = [
  {
    num: "01",
    title: "WEB DESIGN",
    desc: "Whether you need stunning visuals for your website, captivating graphics for your marketing materials, or innovative UI/UX designs for your app, our team of experts is here to turn your vision into reality.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=85",
  },
  {
    num: "02",
    title: "PRODUCT DESIGN",
    desc: "Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=900&q=85",
  },
  {
    num: "03",
    title: "WEB DEVELOPMENT",
    desc: "From website development and e-commerce platforms to custom software and mobile apps, our development team has the expertise to bring your ideas to life.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85",
  },
  {
    num: "04",
    title: "BRANDING",
    desc: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
];

export default function ServicesAccordion() {
  const [visibleSet, setVisibleSet] = useState(new Set([0]));
  const rowRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    rowRefs.current.forEach((el, i) => {
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          setVisibleSet((prev) => {
            const next = new Set(prev);
            if (entry.isIntersecting) {
              next.add(i);
            }
            return next;
          });
        },
        {
          rootMargin: "-15% 0px -15% 0px", // Scroll trigger area thori behtar ki hai
          threshold: 0,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      style={{
        background: "#fff",
        padding: "", 
      }}
    >
      {/* SERVICES label */}
      <div
        style={{
          maxWidth: "1400px", // Width barha di hai
          margin: "0 auto",
          padding: "0 4%", // Responsive padding taqay number na katay
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#f97316",
          }}
        />
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#111",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          SERVICES
        </span>
      </div>

      {/* Rows */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 4%", position: "relative" }}>
        {services.map((s, i) => (
          <ServiceRow
            key={i}
            index={i}
            ref={(el) => (rowRefs.current[i] = el)}
            service={s}
            expanded={visibleSet.has(i)}
            isLast={i === services.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
const ServiceRow = React.forwardRef(function ServiceRow(
  { service, expanded, isLast, index },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: `${100 + index * 90}px`, 
        backgroundColor: "#fff",
        zIndex: index + 1,
        borderTop: "1px solid rgba(0,0,0,0.1)",
        borderBottom: isLast ? "1px solid rgba(0,0,0,0.1)" : "none",
        paddingTop: "32px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "32px",
        boxShadow: "0 -12px 20px rgba(0,0,0,0.02)",
      }}
    >
      <div
        style={{
          display: "grid",
          // Grid layout change kiya: Number ko alag, Title+Desc ko middle me, Image ko right me.
          gridTemplateColumns: "minmax(40px, 60px) 1fr minmax(300px, 450px)",
          alignItems: "flex-start",
          gap: "24px",
        }}
      >
        {/* Number (Width issue fixed) */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontFamily: "'DM Sans', sans-serif",
            color: "#111",
            paddingTop: "6px",
          }}
        >
          {service.num}.
        </span>

        {/* Center Column: Title + Description (Gap issue fixed) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          
          {/* Title — Font Size & Weight Reduced */}
          <h3
            style={{
              fontSize: "clamp(22px, 3vw, 35px)", // Size thora kam kiya
              fontWeight: 700, // Weight 900 se 800 kar diya
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              fontFamily: "'DM Sans', sans-serif",
              color: "#111",
              margin: 0,
            }}
          >
            {service.title}
          </h3>

          {/* Expandable Text & Button */}
          <div
            style={{
              maxHeight: expanded ? "300px" : "0px",
              opacity: expanded ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease",
              marginTop: expanded ? "16px" : "0px", // Yehi margin ab gap control kar raha hai
            }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                color: "#555",
                fontFamily: "'DM Sans', sans-serif",
                margin: "0 0 24px 0", // Text ke neechay button ka gap
                maxWidth: "90%",
              }}
            >
              {service.desc}
            </p>

            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#1a194d",
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                padding: "13px 24px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "background 0.25s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#625eff";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1a194d";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              See Our Services
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                ↗
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            // borderRadius: "6px",
            maxHeight: expanded ? "300px" : "0px",
            opacity: expanded ? 1 : 0,
            transition: "max-height 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: "100%",
              height: "290px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
});