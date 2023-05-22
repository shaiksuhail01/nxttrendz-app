import React from 'react'

let finalCartList

const cartItemsListLocalStorage = localStorage.getItem('cartItems')
const parseCartItems = JSON.stringify(cartItemsListLocalStorage)

if (parseCartItems === null) {
  finalCartList = []
} else {
  finalCartList = parseCartItems
}

const CartContext = React.createContext({
  cartList: finalCartList,
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
