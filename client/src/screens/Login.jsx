import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { loginUser } from '../actions/userAction'
import { useSelector } from 'react-redux'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const registerState = useSelector((state) => state.registerUserReducer)
  const { success } = registerState

  const toastOptions = {
    position: 'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  }
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/'
    }
    if (success) {
      toast.success('user registered successfully', toastOptions)
    }
  }, [])
  const loginHandler = () => {
    const user = { email, password }
    dispatch(loginUser(user))
  }

  return (
    <>
      <Container className='d-flex justify-content-center mt-5'>
        <Form className='col-lg-5 mt-2 border rounded-3 p-5 shadow'>
          <h1 className='text-center'>Login</h1>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' onClick={loginHandler}>
            Login
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </>
  )
}

export default Login
