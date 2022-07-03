import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Product = ({ product: {name, image, slug, price} }) => {
  return (
    <div className='product-card'>
      
      <Link href={`/product/${slug.current}`}>
        <a>
          <img className='product-img' src={urlFor(image[0])} />
          <h5 className='product-name'>{name}</h5>
          <p className='product-price'>${price}</p>          
        </a>    
      </Link>

    </div>
  )
}

export default Product