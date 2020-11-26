import React, { useState, useEffect } from 'react'
import {
  Col,
  Row,
  Container,
  Card,
  Table,
  ListGroup,
  Alert,
} from 'react-bootstrap'
import UserNav from '../../components/UserNav'
import { getUserOrders } from '../../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'

const UserDashboard = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    setLoading(true)
    getUserOrders(user.token)
      .then((res) => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setError(
          'Could not load purchase history, Try to re-log/refresh the page in order to get fresh auth token.'
        )
      })
  }, [])

  return (
    <>
      <Container>
        <h2 className="mb-5" style={{ textAlign: 'center' }}>
          User Dashboard
        </h2>
        <Row>
          <Col lg={3}>
            <h4 style={{ textAlign: 'center' }} className="my-3">
              User links
            </h4>
            <UserNav />
          </Col>
          <Col lg={9}>
            <h4 className="my-3" style={{ textAlign: 'center' }}>
              your orders history
            </h4>
            {loading && <Loader />}
            {error && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setError(false)}
              >
                {error}
              </Alert>
            )}
            <div>
              {orders.map((order) => (
                <Card
                  className="my-5"
                  style={{ textAlign: 'center' }}
                  key={order._id}
                >
                  <h5 className="pt-2">Order ID: {order._id}</h5>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        Delivery price: ₪{order.paymentIntent.shippingPrice}{' '}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Ordered on:{' '}
                        {new Date(order.paymentIntent.created).toLocaleString()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Order Status: {order.orderStatus}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <p style={{ color: 'grey' }}>
                          *once the order will be sent you will recive your
                          tracking number.
                        </p>
                        <p>Tracking number: </p>
                        <p>{order.trackNumber.number}</p>
                        <p>URL link:</p>
                        <p>{order.trackNumber.url}</p>
                      </ListGroup.Item>
                      <ListGroup.Item>Ordered Products:</ListGroup.Item>
                    </ListGroup>
                    <Table
                      className="mt-2"
                      striped
                      bordered
                      hover
                      responsive
                      className="table-sm"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((p, i) => (
                          <tr key={i}>
                            <td>{p.product.name}</td>
                            <td>₪{p.product.price}</td>
                            <td>{p.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                  <Card.Footer>
                    <h5>Total amount: ₪{order.paymentIntent.amount}</h5>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserDashboard
