import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const UserNav = () => {
  return (
    <Nav className='flex-column'>
      <LinkContainer to='/admin/dashboard'>
        <Nav.Link className='dashboard_link'>Dashboard</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/product'>
        <Nav.Link className='dashboard_link'>Product</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/products'>
        <Nav.Link className='dashboard_link'>Products</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/admin/category'>
        <Nav.Link className='dashboard_link'>Category</Nav.Link>
      </LinkContainer>
    </Nav>
  )
}

export default UserNav
