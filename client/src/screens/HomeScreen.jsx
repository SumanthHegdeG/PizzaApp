import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import { getAllPizzas } from '../actions/pizzaAction'
import Pizza from '../components/Pizza'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Filters from '../components/Filters'
import { toast, ToastContainer } from 'react-toastify'
import { falseSuccess } from '../actions/orderAction'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const pizzastate = useSelector((state) => state.getAllPizzaReducer)
  const { loading, pizzas, error } = pizzastate
  // console.log(pizzas);
  const orderState = useSelector((state) => state.placeOrderReducer)
  const { success } = orderState
  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }
  useEffect(() => {
    if (success) {
      toast.success('Order Placed', toastOptions)
      dispatch(falseSuccess())
    }
    dispatch(getAllPizzas())
  }, [dispatch])

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error>Error while fetching pizzas {error}</Error>
        ) : (
          <Row className='justify-content-center'>
            <Filters />

            {pizzas.map((pizza) => (
              <div className='col-lg-4 col-md-6 col-sm-12 ' key={pizza.id}>
                <Pizza pizza={pizza} />
              </div>
            ))}
          </Row>
        )}
      </Container>
      <ToastContainer />
    </>
  )
}

export default HomeScreen
