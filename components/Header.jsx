import React from 'react'
import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'

import Cart from './Cart'
import { useStateContext } from '../context/StateContext'

const Header = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <header className='header-section'>
      <div className="container">

        <div className='header-right'>
          <div className='brand-name'>
            <Link href='/'><a>Mercado</a></Link>        
          </div>
          <nav>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
          </nav>            
        </div>

        <button className='cart-icon' onClick={() => setShowCart(true)}>
          <FiShoppingBag />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
       
      </div>
      {showCart && <Cart />}       
    </header>
  )
}

export default Header