'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import ServicesSection from '@/components/ServicesSection'
import CollaboratorsSection from '@/components/Collaboratorssection'

import ServicesAccordion from '@/components/Services'
import ImageZoomSection from '@/components/ImageZoomSection'
import FeaturesNodeSection from '@/components/FeaturesNodeSection'
import TestimonialSection from '@/components/TestimonialSection'


const LiquidSlider = dynamic(() => import('@/components/LiquidSlider'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full  flex items-center justify-center">
      <span className="text-white font-mono animate-pulse">LOADING EXPERIENCE...</span>
    </div>
  ),
})

export default function Page() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="h-screen w-full  flex items-center justify-center">
            <span className="text-white font-mono animate-pulse">LOADING EXPERIENCE...</span>
          </div>
        }
      >
        <LiquidSlider />
      </Suspense>

      <ServicesSection/>
      <CollaboratorsSection/>
    <ServicesAccordion/>
    <ImageZoomSection/>
    <FeaturesNodeSection/>
    <TestimonialSection/>
      
    </main>
  )
}