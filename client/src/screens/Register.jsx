import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { registerUser } from '../actions/userAction'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Success from '../components/Success'
import Error from '../components/Error'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const registerState = useSelector((state) => state.registerUserReducer)
  const { error, success, loading } = registerState

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confrimPassword, setConfirmPassword] = useState('')

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }

  const dispatch = useDispatch()

  const registerhandler = () => {
    if (password !== confrimPassword) {
      {
        toast.error('Password donot match', toastOptions)
      }
    } else {
      const user = { name, email, password, confrimPassword }
      dispatch(registerUser(user))

      success && toast.success('User Register Successfully', toastOptions)
    }
  }
  return (
    <>
      <Container className='d-flex align-items-center mt-5 flex-column'>
        {loading && <Loader />}
        {success && (
            <div className='col-12'>
              <Success success='User Register Successfully' />
            </div>
          ) && <Redirect to='/login' />}
        {error && (
          <div className='col-12'>
            <Error error='somthing went wrong' />
          </div>
        )}
        <Form className='col-lg-5 mt-2 border rounded-3 p-5 shadow'>
          <h1 className='text-center'>Registration </h1>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confrimPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' onClick={registerhandler}>
            Register
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </>
  )
}

export default Register
