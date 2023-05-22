import {Link} from 'react-router-dom'

import './index.css'

import Header from '../Header'

const OrderPlaced = () => (
  <>
    <Header />
    <div className="placedContainer">
      <img
        src="https://www.frontieredu.ae/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/a/eat-fe104.png"
        className="tickImage"
        alt="tick"
      />
      <h1 className="orderText">Order Placed</h1>
      <p className="orderPara">Thanks for shopping!</p>
      <Link to="/products">
        <button type="button" className="backToButton">
          Back to Shopping
        </button>
      </Link>
    </div>
  </>
)

export default OrderPlaced
