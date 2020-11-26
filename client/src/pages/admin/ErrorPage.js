import React from 'react'
import { Container } from 'react-bootstrap'

const ErrorPage = () => {
  return (
    <Container className='mt-3'>
      <p>We're sorry, Only admin can access this page...</p>
    </Container>
  )
}

export default ErrorPage
