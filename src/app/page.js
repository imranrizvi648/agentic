'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Canvas loads separately — but hero TEXT renders immediately below
const LiquidSliderCanvas = dynamic(() => import('@/components/LiquidSlider'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

const WhoWeAre             = dynamic(() => import('@/components/WhoWeAre'),              { ssr: false })
const ServicesSection      = dynamic(() => import('@/components/ServicesSection'),        { ssr: false })
const CollaboratorsSection = dynamic(() => import('@/components/Collaboratorssection'),  { ssr: false })
const ServicesAccordion    = dynamic(() => import('@/components/Services'),              { ssr: false })
const ImageZoomSection     = dynamic(() => import('@/components/ImageZoomSection'),      { ssr: false })
const FeaturesNodeSection  = dynamic(() => import('@/components/FeaturesNodeSection'),   { ssr: false })
const TestimonialSection   = dynamic(() => import('@/components/TestimonialSection'),    { ssr: false })

function LazySection({ children, minHeight = '400px' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  )
}

export default function Page() {
  return (
    <main>
      {/* Hero section — text renders immediately via SSR, canvas loads after */}
      <div className="relative h-screen w-full overflow-hidden bg-black">

        {/* Canvas loads async — bg-black shows instantly while it loads */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <LiquidSliderCanvas />
          </Suspense>
        </div>

        {/* TEXT IS NOW PURE HTML — renders instantly, fixes LCP 22s → <1s */}
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-12 pointer-events-none">
          <h1 className="text-white text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none">
            Premium <br /> <span style={{ color: '#1e1b4b' }}>Experience</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-md font-medium">
            Creating high-end digital solutions with Agentic AI and pixel-perfect design.
          </p>
          <a href="/contact" className="pointer-events-auto mt-8 border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300">
            VIEW CASE STUDY
          </a>
        </div>
      </div>

      <LazySection minHeight="600px"><WhoWeAre /></LazySection>
      <LazySection minHeight="600px"><ServicesSection /></LazySection>
      <LazySection minHeight="500px"><CollaboratorsSection /></LazySection>
      <LazySection minHeight="600px"><ServicesAccordion /></LazySection>
      <LazySection minHeight="750px"><ImageZoomSection /></LazySection>
      <LazySection minHeight="600px"><FeaturesNodeSection /></LazySection>
      <LazySection minHeight="500px"><TestimonialSection /></LazySection>
    </main>
  )
}