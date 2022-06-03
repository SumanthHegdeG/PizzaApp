import React from 'react'
import { Button } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../actions/orderAction'
import Loader from './Loader'
import Error from './Error'
import Success from './Success'

import { emptyCart } from '../actions/cartAction'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'

const Checkout = ({ subTotal }) => {
  const orderState = useSelector((state) => state.placeOrderReducer)
  const { loading, error, success } = orderState
  const dispatch = useDispatch()

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal))
    dispatch(emptyCart())
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Error error='something went wrong' />}
      {success && <Redirect to='/' />}
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51HT3awLRpPHpN9zVZksDRZ16m6HANATIi914WwDG7xbmNKQGsMyXEBTuUxlNZlkZ3EYFsfu5t0NQDeNQYbukyICZ000lVzvD9Y'
        currency='INR'
      >
        <Button>Pay Now</Button>
      </StripeCheckout>
    </>
  )
}

export default Checkout
