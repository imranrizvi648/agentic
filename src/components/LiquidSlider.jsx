'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float dispFactor;
  uniform float effectFactor;

  void main() {
    vec2 uv = vUv;
    vec4 dispSample = texture2D(disp, uv);
    vec2 distortedPosition1 = vec2(uv.x + dispFactor * (dispSample.r * effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (dispSample.r * effectFactor), uv.y);
    vec4 _texture1 = texture2D(texture1, distortedPosition1);
    vec4 _texture2 = texture2D(texture2, distortedPosition2);
    gl_FragColor = mix(_texture1, _texture2, dispFactor);
  }
`

function createProceduralDispTexture() {
  const size = 256
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    const x = (i % size) / size
    const y = Math.floor(i / size) / size
    const val = Math.floor(128 + 127 * Math.sin(x * Math.PI * 6) * Math.cos(y * Math.PI * 6))
    data[i * 4] = val
    data[i * 4 + 1] = val
    data[i * 4 + 2] = val
    data[i * 4 + 3] = 255
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
  tex.needsUpdate = true
  return tex
}

function useDispTexture() {
  const [dispTex, setDispTex] = useState(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const urls = [
      '/disp.jpg',
      'https://raw.githubusercontent.com/robin-dela/hover-effect/master/images/fluid.jpg',
    ]
    let loaded = false

    const tryLoad = (index) => {
      if (index >= urls.length) {
        setDispTex(createProceduralDispTexture())
        return
      }
      loader.load(
        urls[index],
        (tex) => {
          if (loaded) return
          loaded = true
          console.log(`[DEBUG] ✓ Disp texture loaded: ${urls[index]}`)
          setDispTex(tex)
        },
        undefined,
        () => tryLoad(index + 1)
      )
    }
    tryLoad(0)
  }, [])

  return dispTex
}

function FullScreenPlane({ images, current, setCurrent }) {
  const { viewport } = useThree()
  const mesh = useRef()
  const matRef = useRef()
  const isAnimating = useRef(false)

  const textures = useTexture(images)
  const dispTexture = useDispTexture()
  const uniforms = useRef(null)

  useEffect(() => {
    textures.forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.needsUpdate = true
    })
  }, [textures])

  if (!uniforms.current && textures.length > 0) {
    uniforms.current = {
      texture1: { value: textures[0] },
      texture2: { value: textures[1] || textures[0] },
      disp: { value: dispTexture || createProceduralDispTexture() },
      dispFactor: { value: 0.0 },
      effectFactor: { value: 0.6 },
    }
  }

  useEffect(() => {
    if (uniforms.current && dispTexture) {
      uniforms.current.disp.value = dispTexture
      if (matRef.current) matRef.current.needsUpdate = true
    }
  }, [dispTexture])

  useEffect(() => {
    if (uniforms.current && textures[current]) {
      uniforms.current.texture1.value = textures[current]
    }
  }, [current, textures])

  const goTo = useCallback((nextIndex) => {
    if (isAnimating.current || !uniforms.current) return
    isAnimating.current = true

    console.log('[DEBUG] → Transitioning to:', nextIndex)

    uniforms.current.texture2.value = textures[nextIndex]
    uniforms.current.dispFactor.value = 0.0

    gsap.to(uniforms.current.dispFactor, {
      value: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (matRef.current) matRef.current.uniformsNeedUpdate = true
      },
      onComplete: () => {
        uniforms.current.texture1.value = textures[nextIndex]
        uniforms.current.dispFactor.value = 0.0
        setCurrent(nextIndex)
        isAnimating.current = false
      },
    })
  }, [textures, setCurrent])

  useEffect(() => {
    if (mesh.current) {
      mesh.current.userData.goTo = goTo
    }
  }, [goTo])

  if (!uniforms.current) return null

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
      />
    </mesh>
  )
}

function DebugInfo({ images }) {
  const { gl } = useThree()
  useEffect(() => {
    console.log('[DEBUG] WebGL:', gl.capabilities.isWebGL2 ? 'WebGL2' : 'WebGL1')
    console.log('[DEBUG] Images:', images)
  }, [])
  return null
}

export default function LiquidSlider() {
  const [current, setCurrent] = useState(0)
  const sceneRef = useRef(null)

  const images = [
    '/webgl-1.webp',
    '/webgl-2.webp',
    '/webgl-3.webp',
    '/webgl-4.webp',
    '/webgl-6.webp',
  ]

  // ✅ ONLY ADDITION: Auto-slide every 3 seconds
  // Resets timer when user manually changes slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [current, images.length])
  // ✅ END OF ADDITION

  const goNext = useCallback(() => {
    const nextIndex = (current + 1) % images.length
    setCurrent(nextIndex)
  }, [current, images.length])

  const goPrev = useCallback(() => {
    const prevIndex = (current - 1 + images.length) % images.length
    setCurrent(prevIndex)
  }, [current, images.length])

  useEffect(() => {
    images.forEach((src) => {
      fetch(src, { method: 'HEAD' })
        .then((res) =>
          res.ok
            ? console.log(`[DEBUG] ✓ ${src}`)
            : console.error(`[DEBUG] ✗ MISSING: ${src} → ${res.status}`)
        )
        .catch((err) => console.error(`[DEBUG] ✗ Error: ${src}`, err))
    })
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(window.devicePixelRatio)
            console.log('[DEBUG] ✓ Canvas created')
          }}
        >
          <DebugInfo images={images} />
          <SceneProxy images={images} current={current} setCurrent={setCurrent} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-12 pointer-events-none">
        <h1 className="text-white text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
          Premium <br /> <span style={{ color: '#1e1b4b' }}>Experience</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-md font-medium">
          Creating high-end digital solutions with Agentic AI and pixel-perfect design.
        </p>
        <button className="pointer-events-auto mt-8 border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
          VIEW CASE STUDY
        </button>
      </div>

      <div className="absolute bottom-10 left-12 z-10 text-white font-mono text-xl">
        0{current + 1} <span className="text-gray-500">/</span> 0{images.length}
      </div>

      <div className="absolute bottom-8 right-12 z-10 flex gap-4">
        <button
          onClick={() => {
            const prevIndex = (current - 1 + images.length) % images.length
            setCurrent(prevIndex)
          }}
          className="group w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => {
            const nextIndex = (current + 1) % images.length
            setCurrent(nextIndex)
          }}
          className="group w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-[#1e1b4b]' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function SceneProxy({ images, current, setCurrent }) {
  const prevCurrentRef = useRef(current)
  const meshRef = useRef(null)
  const isAnimating = useRef(false)
  const { viewport } = useThree()

  const textures = useTexture(images)
  const dispTexture = useDispTexture()
  const matRef = useRef()
  const uniforms = useRef(null)

  useEffect(() => {
    textures.forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter

      const imageAspect = tex.image ? tex.image.width / tex.image.height : 1
      const screenAspect = viewport.width / viewport.height
      if (screenAspect > imageAspect) {
        tex.repeat.set(1, imageAspect / screenAspect)
        tex.offset.set(0, (1 - imageAspect / screenAspect) / 2)
      } else {
        tex.repeat.set(screenAspect / imageAspect, 1)
        tex.offset.set((1 - screenAspect / imageAspect) / 2, 0)
      }
      tex.needsUpdate = true
    })
  }, [textures, viewport])

  if (!uniforms.current && textures.length > 0) {
    uniforms.current = {
      texture1: { value: textures[0] },
      texture2: { value: textures[1] || textures[0] },
      disp: { value: dispTexture || createProceduralDispTexture() },
      dispFactor: { value: 0.0 },
      effectFactor: { value: 0.6 },
    }
  }

  useEffect(() => {
    if (uniforms.current && dispTexture) {
      uniforms.current.disp.value = dispTexture
      if (matRef.current) matRef.current.needsUpdate = true
    }
  }, [dispTexture])

  useEffect(() => {
    if (prevCurrentRef.current === current) return
    if (!uniforms.current || isAnimating.current) {
      prevCurrentRef.current = current
      return
    }

    const nextIndex = current
    isAnimating.current = true

    uniforms.current.texture2.value = textures[nextIndex]
    uniforms.current.dispFactor.value = 0.0

    console.log('[DEBUG] → Animating to slide:', nextIndex)

    gsap.to(uniforms.current.dispFactor, {
      value: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (matRef.current) matRef.current.uniformsNeedUpdate = true
      },
      onComplete: () => {
        uniforms.current.texture1.value = textures[nextIndex]
        uniforms.current.dispFactor.value = 0.0
        isAnimating.current = false
        prevCurrentRef.current = nextIndex
        console.log('[DEBUG] ✓ Done at slide:', nextIndex)
      },
    })
  }, [current, textures])

  if (!uniforms.current) return null

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
      />
    </mesh>
  )
}