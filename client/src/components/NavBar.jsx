import React from 'react'
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logoutUser } from '../actions/userAction'
import img from '../logo-2.png'
import { FaShoppingCart } from 'react-icons/fa'
const NavBar = () => {
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cartReducer)
  const userState = useSelector((state) => state.loginUserReducer)
  const { currentUser } = userState
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        style={{ position: 'sticky', top: '0px', zIndex: 99 }}
      >
        <Container>
          <Navbar.Brand>
            <img src={img} alt='PIzza 4 You' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {currentUser ? (
                <LinkContainer to='/'>
                  <NavDropdown title={currentUser.name} id='basic-nav-dropdown'>
                    <NavDropdown.Item
                      onClick={() => {
                        dispatch(logoutUser())
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </LinkContainer>
              ) : (
                <>
                  {' '}
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>{' '}
                </>
              )}
              {currentUser && !currentUser.isAdmin && (
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <div className='position-relative d-inline-flex mt-2 mt-lg-0'>
                      <span
                        className='bg-white text-dark rounded-pill px-1 fw-bold'
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          fontSize: '10px',
                        }}
                      >
                        {cartState.cartItems.length}
                      </span>
                      <FaShoppingCart className='fs-4' />
                    </div>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
