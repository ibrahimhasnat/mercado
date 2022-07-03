import React from 'react'
import { urlFor } from '../lib/client'

const FooterBanner = ({ footerBanner: {saleType, image, offerDuration, discount, description} }) => {
  return (
    <section className="footer-banner">
      <img className='footer-banner-img' src={urlFor(image)} />

      <div className="footer-banner-content">
        <div>
          <h1>{discount} <span>{offerDuration}</span></h1>  
        </div>

        <div>
          <h2>{saleType}</h2>
          <p><strong>{description}</strong></p>
        </div>
      </div>

    </section>
  )
}

export default FooterBanner