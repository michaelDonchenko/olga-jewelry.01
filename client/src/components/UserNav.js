import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const UserNav = () => {
  return (
    <Nav className='flex-column'>
      <LinkContainer to='/user/history'>
        <Nav.Link className='dashboard_link'> Purchase History</Nav.Link>
      </LinkContainer>
      <LinkContainer variant='info' to='/user/whishlist'>
        <Nav.Link className='dashboard_link'>Whishlist</Nav.Link>
      </LinkContainer>
    </Nav>
  )
}

export default UserNav
