import React, { useState } from 'react'
import { Card, Button, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'
import { addToCart } from '../actions/cartAction'

const Pizza = ({ pizza }) => {
  const [varient, setVarient] = useState('small')
  const [quantity, setQuantity] = useState(1)
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }

  const addToCartHandler = () => {
    dispatch(addToCart(pizza, quantity, varient))
    toast.success(`Pizza '${pizza.name}' added to cart`, toastOptions)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Card style={{ width: '18rem', marginTop: '30px' }}>
        <Card.Img
          variant='top'
          src={pizza.image}
          style={{ height: '250px', cursor: 'pointer' }}
          onClick={handleShow}
        />

        <Card.Body>
          <Card.Title>{pizza.name}</Card.Title>
          <hr />
          <Card.Text>
            <Row>
              <Col md={6}>
                <h6>Varients</h6>
                <select
                  className='form-select'
                  value={varient}
                  onChange={(e) => setVarient(e.target.value)}
                >
                  {pizza.varients.map((varient) => (
                    <option key={varient}>{varient}</option>
                  ))}
                </select>
              </Col>
              <Col md={6}>
                <h6>Quantity</h6>
                <select
                  className='form-select'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[...Array(10).keys()].map((v, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </Card.Text>
          <Row className='align-items-center'>
            <Col md={6}>
              Price : Rs {pizza.prices[0][varient] * quantity} /-
            </Col>
            <Col md={6}>
              <Button onClick={addToCartHandler} className='w-100'>
                Add to cart
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Card.Img
              variant='top'
              src={pizza.image}
              style={{ height: '250px' }}
            />
          </div>
          <div>
            <h5>Description :</h5>
            <h6>{pizza.description}</h6>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Pizza
