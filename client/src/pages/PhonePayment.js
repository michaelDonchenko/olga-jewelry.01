import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PhonePayment = ({ history }) => {
  const user = useSelector((state) => state.user)

  if (!user) {
    history.push('/')
  }

  return (
    <Container>
      <h3 className="text-center my-5">
        Your order has been placed{' '}
        <span style={{ color: 'green' }}>
          <i class="fas fa-check"></i>
        </span>
      </h3>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="text-center my-3">
            <Card.Header>
              <h5>Payment details for phone payment</h5>
            </Card.Header>
            <Card.Body>
              <p>ההזמנה התקבלה בהצלחה.</p>
              <p>
                <span>BIT\PAYBOX</span> את התשלום ניתן לבצע דרך{' '}
              </p>
              <p>או דרך כרטיס אשראי בשיחה טלפונית</p>
              <p>מספר לתשלום 054-665-9069</p>
            </Card.Body>
            <Card.Footer>
              <h6>
                Order that is not paid will be cancelled/deleted by the admin!
              </h6>
              <p>
                You can always see your order history at your personal
                Dashboard,
              </p>

              <p>
                by clicking{' '}
                <Link style={{ fontWeight: '600' }} to="/user/history">
                  here
                </Link>{' '}
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Card className="my-5">
        <h5 className="my-2 text-center">
          Contanct us on whatsup for any questions/customer support, <br></br>
          <i className="fab fa-whatsapp fa-2x mt-2 mx-1"></i>
          <span>054-665-9069</span>
        </h5>
        <Card.Body className="text-center py-4">
          <h6>Payment rules</h6>
          <p>
            Any goods purchased on the site are subject to return at the request
            of the buyer.{' '}
          </p>
          <p>Contact me within 3 days after the product is delivered. </p>
          <p>
            Sending the goods back within 7 days, provided it is intact and
            intact. 
          </p>
          <p>The cost of returning the goods is at the expense of the buyer.</p>
          <p> Goods made to order cannot be returned or exchanged. </p>

          <p>
            Cancellation of the order can be made before the goods are shipped.
          </p>
          <p>
            After sending the goods, a refund will be made only after the buyer
            has returned the goods and the integrity of the goods.
          </p>
          <p>
            {' '}
            Goods purchased under special promotions and discounts cannot be
            returned. 
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PhonePayment
