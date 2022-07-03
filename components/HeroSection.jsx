import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroSection = ({ heroBanner }) => {
  return (
    <section className="hero-section">
      <div className='top-block'>
        <h1>{heroBanner.saleType}</h1>
        <span>{heroBanner.discount}</span>
        <p>* {heroBanner.offerDuration}</p>   
      </div>

      <div className='desc'>
        <h4>{heroBanner.product}</h4>
        <p>{heroBanner.description}</p>
      </div>

      <img src={urlFor(heroBanner.image)} alt='Hero Section' className='hero-section-bg' />  

    </section>
  )
}

export default HeroSection