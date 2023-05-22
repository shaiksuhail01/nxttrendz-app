import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import OrderPlaced from './components/OrderPlaced'

import './App.css'

const cartItemsList = localStorage.getItem('cartItems')
const parseCartList = JSON.parse(cartItemsList)
let finalCartList

if (parseCartList === null) {
  finalCartList = []
} else {
  finalCartList = parseCartList
}

class App extends Component {
  state = {
    cartList: finalCartList,
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = productId => {
    const {cartList} = this.state

    const updateIncrementCartList = cartList.map(eachItem => {
      if (eachItem.id === productId) {
        return {
          ...eachItem,
          quantity: eachItem.quantity + 1,
        }
      }
      return eachItem
    })
    this.setState({cartList: updateIncrementCartList})
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const checkProductExist = cartList.find(
      eachItem => eachItem.id === productId,
    )

    if (checkProductExist.quantity === 1) {
      const filterDecrementCartItems = cartList.filter(
        eachItem => eachItem.id !== productId,
      )
      this.setState({cartList: filterDecrementCartItems})
    } else {
      const updatedecrementCartList = cartList.map(eachItem => {
        if (eachItem.id === productId) {
          return {
            ...eachItem,
            quantity: eachItem.quantity - 1,
          }
        }
        return eachItem
      })
      this.setState({cartList: updatedecrementCartList})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const checkProductExist = cartList.find(
      eachItem => eachItem.id === product.id,
    )

    if (checkProductExist === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updateCartList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + product.quantity,
          }
        }
        return eachItem
      })

      this.setState({cartList: updateCartList})
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const filterCartItems = cartList.filter(
      eachItem => eachItem.id !== productId,
    )
    this.setState({cartList: filterCartItems})
  }

  render() {
    const {cartList} = this.state
    const stringifyCartList = JSON.stringify(cartList)
    localStorage.setItem('cartItems', stringifyCartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/orderplaced" component={OrderPlaced} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
