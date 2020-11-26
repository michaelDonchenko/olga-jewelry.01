import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container fluid className='pb-4' style={{ backgroundColor: '#f5f5f5' }}>
      <Row>
        <Col className='text-center'>Copyright &copy; by Michael.Donchenko</Col>
      </Row>
    </Container>
  )
}

export default Footer
