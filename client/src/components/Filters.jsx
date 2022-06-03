import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { filterPizza } from '../actions/pizzaAction'
const Filters = () => {
  const [searchkey, setsearchkey] = useState('')
  const [category, setcategory] = useState('all')
  const dispatch = useDispatch()
  return (
    <div className='p-4 mt-4 mb-5 border rounded-pill shadow'>
      <Form>
        <div className='d-flex gap-4 justify-content-center'>
          <div className='col-4'>
            <Form.Control
              value={searchkey}
              onChange={(e) => setsearchkey(e.target.value)}
              placeholder='Search pizza...'
            />
          </div>
          <div className='col-2'>
            <select
              className='form-select'
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='veg'>Veg</option>
              <option value='nonveg'>Non Veg</option>
            </select>
          </div>
          <div>
            <Button
              className='px-4'
              onClick={() => {
                dispatch(filterPizza(searchkey, category))
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Filters
