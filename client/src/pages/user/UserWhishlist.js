import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import UserNav from '../../components/UserNav'

const UserWhishlist = () => {
  return (
    <Container>
      <h2 className='mb-4' style={{ textAlign: 'center' }}>
        User Dashboard
      </h2>
      <Row>
        <Col lg={4}>
          <h4 className='mb-3'>User links</h4>
          <UserNav />
        </Col>
        <Col lg={8}>
          <h5> we're sorry, User wishlish is not yet working</h5>
        </Col>
      </Row>
    </Container>
  )
}

export default UserWhishlist
