import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../types/userConstants'
import firebase from 'firebase'

const Header = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const cart = useSelector((state) => state.cart)

  const logoutHandler = () => {
    firebase.auth().signOut()
    dispatch({
      type: LOGOUT,
      payload: null,
    })
    localStorage.removeItem('userInfo')
  }

  return (
    <Navbar style={{ padding: '1rem' }} bg={'dark'} expand='xl' variant='dark'>
      <Container style={{ maxWidth: '100%' }}>
        <LinkContainer to='/'>
          <Navbar.Brand>Olga Jewelry</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Nav.Link>
                <i class='fas fa-home'></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/shop'>
              <Nav.Link>Shop Page</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i class='fas fa-shopping-cart fx-2 mr-1'></i>Cart
                {cart && cart.length > 0 && (
                  <span className='ml-2'>{cart.length}</span>
                )}
              </Nav.Link>
            </LinkContainer>

            {user && user.role !== 'admin' && (
              <>
                <NavDropdown
                  className='mr-auto'
                  variant='light'
                  title={user.email.split('@')[0]}
                >
                  <LinkContainer to='/user/history'>
                    <NavDropdown.Item>
                      <i class='fas fa-clipboard fx-2 mr-1'></i>Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <Nav.Link onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt fx-2 mr-1'></i>Logout
                </Nav.Link>
              </>
            )}
            {user && user.role === 'admin' && (
              <>
                <NavDropdown
                  className='mr-auto'
                  variant='light'
                  title={user.email.split('@')[0]}
                >
                  <LinkContainer to='/admin/dashboard'>
                    <NavDropdown.Item>
                      <i class='fas fa-clipboard fx-2 mr-1'></i>Admin Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <Nav.Link onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt fx-2 mr-1'></i>Logout
                </Nav.Link>
              </>
            )}
            {!user && (
              <NavDropdown className='mr-auto' variant='light' title='Sign In'>
                <LinkContainer to='/login'>
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <NavDropdown.Item>Register</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
          {/* <Search /> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
