"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";

// ── WebGL Liquid Shader ─────────────────────────────────────────────────────
const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float dist = distance(uv, uMouse);
    float ripple = uHover * 0.04 * sin(dist * 30.0 - uTime * 4.0) * smoothstep(0.5, 0.0, dist);

    uv.x += ripple;
    uv.y += ripple;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

// ── LiquidImage Component (Three.js per image) ──────────────────────────────
function LiquidImage({ src, className, style }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const uniformsRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const hoverRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let THREE;
    let destroyed = false;

    const init = async () => {
      THREE = await import("three");
      if (destroyed) return;

      const el = mountRef.current;
      if (!el) return;

      const W = el.offsetWidth || 300;
      const H = el.offsetHeight || 300;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.pointerEvents = "none";
      el.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Scene + Camera
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      sceneRef.current = scene;
      cameraRef.current = camera;

      // Texture
      const texture = new THREE.TextureLoader().load(src);
      texture.minFilter = THREE.LinearFilter;

      // Uniforms
      const uniforms = {
        uTexture: { value: texture },
        uTime:    { value: 0 },
        uMouse:   { value: new THREE.Vector2(0.5, 0.5) },
        uHover:   { value: 0 },
      };
      uniformsRef.current = uniforms;

      // Mesh
      const geo = new THREE.PlaneGeometry(2, 2);
      const mat = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
      });
      scene.add(new THREE.Mesh(geo, mat));

      // Animation loop
      const clock = new THREE.Clock();
      const animate = () => {
        animFrameRef.current = requestAnimationFrame(animate);
        uniforms.uTime.value = clock.getElapsedTime();
        uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        uniforms.uHover.value = hoverRef.current;
        renderer.render(scene, camera);
      };
      animate();

      // Resize
      const ro = new ResizeObserver(() => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        renderer.setSize(w, h);
      });
      ro.observe(el);
    };

    init();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animFrameRef.current);
      rendererRef.current?.dispose();
      if (rendererRef.current?.domElement?.parentNode === mountRef.current) {
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
    };
  }, [src]);

  // Mouse tracking
  const handleMouseMove = (e) => {
    const rect = mountRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height,
    };
  };

  const handleMouseEnter = () => {
    gsap.to(hoverRef, { current: 1, duration: 0.6, ease: "power2.out",
      onUpdate: () => {
        if (uniformsRef.current) uniformsRef.current.uHover.value = hoverRef.current;
      }
    });
  };

  const handleMouseLeave = () => {
    gsap.to(hoverRef, { current: 0, duration: 0.8, ease: "power2.inOut",
      onUpdate: () => {
        if (uniformsRef.current) uniformsRef.current.uHover.value = hoverRef.current;
      }
    });
  };

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", cursor: "pointer", ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
const images = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
  "",
  "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200",
  "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
];

const centerVideoSrc = "/liko.mp4";

// ── Main Component ──────────────────────────────────────────────────────────
export default function ImageZoomSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.05,
    restDelta: 0.0005,
  });

  const scale        = useTransform(smoothProgress, [0, 1], [1, 4.5]);
  const othersOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const othersScale  = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);
  const borderRadius = useTransform(smoothProgress, [0, 0.9, 1], ["16px", "4px", "0px"]);

  return (
    <section ref={containerRef} className="h-[250vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full px-4 relative">
          {images.map((src, index) => {
            const isCenterImage = index === 1;

            return (
              <motion.div
                key={index}
                style={{
                  scale:        isCenterImage ? scale : othersScale,
                  opacity:      isCenterImage ? 1 : othersOpacity,
                  zIndex:       isCenterImage ? 50 : 10,
                  borderRadius: isCenterImage ? borderRadius : "5px",
                  ...(isCenterImage && {
                    transform: "translateZ(0) perspective(1000px)",
                  }),
                  willChange: "transform, opacity",
                }}
                className="relative w-full aspect-video md:aspect-square overflow-hidden shadow-2xl origin-center will-change-transform"
              >
                {isCenterImage ? (
                  // Center — video, no liquid (it zooms to fullscreen)
                  <video
                    src={centerVideoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform-gpu"
                    style={{ transform: "translateZ(0)" }}
                  />
                ) : src ? (
                  // Side images — GSAP + Three.js liquid hover
                  <LiquidImage
                    src={src}
                    className="w-full h-full"
                    style={{ borderRadius: "5px" }}
                  />
                ) : null}
              </motion.div>
            );
          })}
        </div>

        {/* Text Overlay */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.8, 1], [0, 1]),
            transformZ: 0,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none px-4"
        >
          <h2 className="text-white text-5xl md:text-9xl font-black text-center drop-shadow-2xl uppercase tracking-tighter">
            AI-POWERED
          </h2>
          <p className="text-[#dc1e25] mt-4 text-lg md:text-3xl font-bold tracking-[0.4em] uppercase">
            Future Solutions
          </p>
        </motion.div>

      </div>
    </section>
  );
}