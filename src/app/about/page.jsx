import React from 'react'
import HeroSection from './components/About'

import ScrollingBelt from './components/ScrollingBelt'
import AgencyStory from './components/AgencyStory'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <ScrollingBelt/>
  
      <AgencyStory/>
    </div>
  )
}

export default page
