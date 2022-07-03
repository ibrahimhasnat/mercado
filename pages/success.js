import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdShoppingBag } from 'react-icons/md'

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

const Success = () => {
  
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()
  
  useEffect(() => {
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFireworks()
  }, [])

  return (
    <div className='success-wrapper'>
      <div className='success-content'>
        <p className='icon'><MdShoppingBag /></p>
        <h2>Thank You For Your Purchase!</h2>
        <p className='success-email'>Check your email inbox for the details.</p>

        <p className='email'>
          If you have any query, feel free to email at: <a href='mailto:help@example.com'>help@example.com</a>
        </p>
        <Link href='/'><button>Continue Shopping</button></Link>
      </div>
    </div>
  )
}

export default Success