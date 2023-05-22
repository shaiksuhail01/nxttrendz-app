import {FiArrowRightCircle} from 'react-icons/fi'
import {withRouter} from 'react-router-dom'
import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const totalPrice = cartList.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0,
      )

      const onClickProceedButton = () => {
        const {history} = props
        removeAllCartItems()
        history.replace('/orderplaced')
      }

      return (
        <div className="cartSummaryContainer">
          <h1 className="summaryText">
            Order Total: <span className="priceText">Rs {totalPrice}/-</span>
            <p className="itemsText">{cartList.length} items in cart</p>
            <div className="proceedContainer">
              <button
                type="button"
                className="checkoutButton"
                onClick={onClickProceedButton}
              >
                Proceed to Buy
              </button>
              <FiArrowRightCircle size={18} className="rightIcon" />
            </div>
          </h1>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(CartSummary)
