import React, { useState } from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Product } from '../../components'

import { client, urlFor } from '../../lib/client'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ products, product }) => {

  const [index, setIndex] = useState(0)
  const { image, name, details, price } = product
  const { onAddToCart, qty, incQty, decQty, setShowCart } = useStateContext()

  const handleBuyNow = () => {
    onAddToCart(product, qty)
    setShowCart(true)
  }

  return (
    <section className='single-product-page'>


      <div className='product-details'>

        <div className='product-images'>
          <img className='product-img' src={urlFor(image && image[index])} />
          <div className='small-images'>
            {image?.map((item, i) => (
              <img key={i} src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} />
            ))}
          </div>
        </div>

        <div className='product-desc'>
          <h2>{name}</h2>
          <p><strong>Product Details:</strong> {details}</p>

          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>

          <p className='price'>${price}</p>
          <div className='quantity'>
            <h5>Quantity: </h5>
            <p className='qty-desc'>
              <span className='minus' onClick={decQty}><FiMinus /></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><FiPlus /></span>
            </p>
          </div>

          <div className='buttons'>
            <button className='add-to-cart' onClick={() => onAddToCart(product, qty)}>Add to Cart</button>
            <button className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>

      </div>
      {/* End Product Details */}

      <div className='product-suggestion-wrapper'>
        <h2>You May Also Like</h2>

        <div className='marquee'>
          <div className='maylike-products track'>
            {products?.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query)
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({ params: {slug} }) => {

  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
  const product = await client.fetch(productQuery)

  const productsQuery = '*[_type == "product"]'
  const products = await client.fetch(productsQuery)


  return {
    props: {
      product,
      products
    }
  }

}

export default ProductDetails