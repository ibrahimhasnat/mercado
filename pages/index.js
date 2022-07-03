import React from 'react'

import { HeroSection, Product, FooterBanner } from '../components'
import { client } from '../lib/client'

const Home = ({ banners, products }) => {
  return (
    <>
      <HeroSection heroBanner={banners && banners[1]} />
      
      <section className='products-section'>
        <div className='section-heading'>
          <h2>Limited Products</h2>
          <p>Buy your favorite one before stock out.</p>
        </div>        

        <div className='product-list'>
          {products?.map(product => {
            return <Product key={product._id} product={product} />
          })}          
        </div>
      </section>

      <FooterBanner footerBanner={banners && banners[0]} />

    </>
  )
}

export const getServerSideProps = async () => {

  // Banner
  const bannerQuery = '*[_type == "banner"]'
  const banners = await client.fetch(bannerQuery)

  // Products
  const productQuery = '*[_type == "product"]'
  const products = await client.fetch(productQuery)

  return {
    props: {
      banners,
      products      
    }
  }

}

export default Home