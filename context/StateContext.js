import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  // Local Variables
  let findProduct
  let index

  // Adding A products to the cart
  const onAddToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQty) => prevTotalQty + quantity)

    if (checkProductInCart) {

      const updateCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) return {
          ...cartItem,
          quantity: cartItem.quantity + quantity
        }
      })

      setCartItems(updateCartItems)
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, {...product}])
    }

    toast.success(`${qty} ${product.name} added to the cart.`)
    setQty(1)

  }

  // Toggle Cart Item Quantity
  const toggleCartItemQuantitiy = (id, value) => {
    findProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)

    if (value === 'inc') {
      findProduct.quantity += 1
      cartItems[index] = findProduct

      setTotalPrice((prevTotal) => parseFloat(prevTotal) + parseFloat(findProduct.price))
      setTotalQuantities((prevTotalQty) => parseFloat(prevTotalQty) + 1)
    }

    if (value === 'dec') {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1
        cartItems[index] = findProduct
        setTotalPrice((prevTotal) => parseFloat(prevTotal) - parseFloat(findProduct.price))
        setTotalQuantities((prevTotalQty) => parseFloat(prevTotalQty) - 1)
      }
    }
  }

  // Number increment of qty
  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  // Number Decrement of qty
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1
      }
      return prevQty - 1
    })
  }

  // Remove Item from Cart
  const onRemove = (product) => {

    findProduct = cartItems.find((item) => item._id === product._id)
    const tempCart = cartItems.filter((item) => item._id !== product._id)
    
    setTotalPrice((prevTotal) => prevTotal - findProduct.price * findProduct.quantity)
    setTotalQuantities((prevTotalQty) => prevTotalQty - findProduct.quantity)
    setCartItems(tempCart)
  }


  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAddToCart,
        toggleCartItemQuantitiy,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )

}

export const useStateContext = () => useContext(Context)