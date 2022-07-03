import React, { useRef } from 'react'
import Link from 'next/link'

import { FiDelete, FiMinus, FiPlus, FiArrowLeftCircle, FiShoppingCart } from 'react-icons/fi'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'
import toast from 'react-hot-toast'

const Cart = () => {

  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantitiy, onRemove } = useStateContext()

  const handleCheckout = async () => {

    const stripe = await getStripe()

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if(response.statusCode === 500) {
      return
    }
    
    const data = await response.json()

    toast.loading('Redirecting...')

    stripe.redirectToCheckout({ sessionId: data.id })

  }

  return (
    <div ref={cartRef} className='cart-wrapper'>

      <div className="cart-container">
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}>
            <FiArrowLeftCircle />
            <span>Your Cart</span>
            <span className='cart-items-number'>{totalQuantities} Items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <FiShoppingCart size={100} />
            <h3>Your Shopping Cart Is Empty</h3>
            <Link href='/'>
              <button onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* Cart Items */}
        <div className='cart-products'>
          {cartItems.length >= 1 && (
            cartItems.map((item) => (
              <div key={item._id} className='cart-product'>

                <img src={urlFor(item?.image[0])} className='cart-product-img' />
                <div className='cart-product-desc'>

                  <div className='cart-desc-top'>

                    <h4>{item.name}</h4>                    
                    <button onClick={() => onRemove(item)} className='remove-cart-item'>
                      <FiDelete />
                    </button>

                  </div>
                
                  <div className='cart-desc-bottom'>
                    <p className='qty-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantitiy(item._id, 'dec')}><FiMinus /></span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantitiy(item._id, 'inc')}><FiPlus /></span>                       
                    </p> 
                    <h4>${item.price}</h4>                                      
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className='total-price'>
              <h4>Subtotal:</h4>
              <h4>${totalPrice}</h4>              
            </div>
            <div className='payment-button'>
              <button onClick={handleCheckout}>Pay with Stripe</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart