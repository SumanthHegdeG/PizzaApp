import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { addPizza } from '../../actions/pizzaAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../Loader'
import Error from './../Error'
import Success from './../Success'
import { toast } from 'react-toastify'
const AddNewPizza = () => {
  const [name, setname] = useState('')
  const [smallPrice, setsmallPrice] = useState()
  const [largePrice, setlargePrice] = useState()
  const [mediumPrice, setmediumPrice] = useState()
  const [image, setimage] = useState('')
  const [description, setdescription] = useState('')
  const [category, setcategory] = useState('')

  const addPizzaState = useSelector((state) => state.addPizzaReducer)
  const { loading, error, success } = addPizzaState

  const dispatch = useDispatch()

  const submitForm = (e) => {
    e.preventDefault()
    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    }
    dispatch(addPizza(pizza))
  }
  return (
    <div className='d-flex flex-column align-items-center'>
      {loading && (
        <div className='col-12'>
          <Loader />
        </div>
      )}
      {error && (
        <div className='col-12'>
          <Error error='add new pizza error' />
        </div>
      )}
      {success && (
        <div className='col-12'>
          <Success success='Pizza Added Successfully' />
        </div>
      )}
      <Form onSubmit={submitForm} className='bg-light p-4 col-lg-5 col-sm-11'>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder='Enter Name'
            />
          </Form.Group>
          <Row className='mb-3 mt-3'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>Small Price</Form.Label>
              <Form.Control
                type='text'
                value={smallPrice}
                onChange={(e) => setsmallPrice(e.target.value)}
                placeholder='Enter Small Price'
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>Medium Price</Form.Label>
              <Form.Control
                type='text'
                value={mediumPrice}
                onChange={(e) => setmediumPrice(e.target.value)}
                placeholder='Enter medium price'
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label>Large Price</Form.Label>
              <Form.Control
                type='text'
                value={largePrice}
                onChange={(e) => setlargePrice(e.target.value)}
                placeholder='Enter larg price'
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId='formGridPassword'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              ttype='text'
              value={image}
              onChange={(e) => setimage(e.target.value)}
              placeholder='Add Image URL'
            />
          </Form.Group>
        </Row>

        <Form.Group className='mb-3' controlId='formGridAddress1'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder='Enter Description'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formGridAddress2'>
          <Form.Label>Category</Form.Label>
          <select
            className='form-select'
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option>Select Category </option>
            <option value='veg'>Veg</option>
            <option value='nonveg'>Non Veg</option>
          </select>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Add New
        </Button>
      </Form>
    </div>
  )
}

export default AddNewPizza
