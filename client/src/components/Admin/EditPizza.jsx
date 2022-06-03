import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPizzaById, updatePizza } from '../../actions/pizzaAction'
import Loader from './../Loader'
import Error from './../Error'
import { toast } from 'react-toastify'

const EditPizza = ({ match }) => {
  const [name, setname] = useState('')
  const [smallPrice, setsmallPrice] = useState()
  const [largePrice, setlargePrice] = useState()
  const [mediumPrice, setmediumPrice] = useState()
  const [image, setimage] = useState('')
  const [description, setdescription] = useState('')
  const [category, setcategory] = useState('')
  const dispatch = useDispatch()
  const getPizzaByState = useSelector((state) => state.getPizzaByIdReducer)
  const { error, pizza } = getPizzaByState
  const updatePizzaState = useSelector((state) => state.updatePizzaByIdReducer)
  const { updateloading } = updatePizzaState
  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaId) {
        setname(pizza.name)
        setdescription(pizza.description)
        setcategory(pizza.category)
        setimage(pizza.image)
        setsmallPrice(pizza.prices[0]['small'])
        setmediumPrice(pizza.prices[0]['medium'])
        setlargePrice(pizza.prices[0]['large'])
      } else {
        dispatch(getPizzaById(match.params.pizzaId))
      }
    } else {
      dispatch(getPizzaById(match.params.pizzaId))
    }
  }, [pizza, dispatch, match.params.pizzaId])

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }

  const submitForm = (e) => {
    e.preventDefault()
    const updatedPizza = {
      _id: match.params.pizzaId,
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
    dispatch(updatePizza(updatedPizza))

    toast.success('Pizza Edited Successfully', toastOptions)
  }
  return (
    <div className='d-flex flex-column align-items-center'>
      {error && (
        <div className='col-12'>
          <Error error='add new pizza error' />
        </div>
      )}

      <Form
        onSubmit={submitForm}
        className='bg-light p-4 col-lg-5 col-md-8 col-sm-11'
      >
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridEmail'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder='Enter email'
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
            <option>{category} </option>
            <option value='veg'>Veg</option>
            <option value='nonveg'>Non Veg</option>
          </select>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Update Pizza
        </Button>
      </Form>
    </div>
  )
}

export default EditPizza
