import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Alert,
  Table,
  Button,
  Card,
  ListGroup,
  Form,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getOrder, updateOrder } from '../../actions/adminActions'
import AdminNav from '../../components/AdminNav'
import Loader from '../../components/Loader'

const AdminOrder = ({ match, history }) => {
  const user = useSelector((state) => state.user)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [order, setOrder] = useState('')

  const orderId = match.params.id

  const [isPaid, setIsPaid] = useState('')
  const [orderStatus, setOrderStatus] = useState('')
  const [trackDetails, setTrackDetails] = useState({
    number: '',
    url: '',
  })

  useEffect(() => {
    setLoading(true)
    getOrder(user.token, orderId)
      .then((res) => {
        setOrder(res.data)
        setIsPaid(res.data.isPaid)
        setOrderStatus(res.data.orderStatus)
        setTrackDetails({
          number: res.data.trackNumber.number,
          url: res.data.trackNumber.url,
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleChange = (e) => {
    setTrackDetails({ ...trackDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setLoading(true)
    updateOrder(user.token, orderId, {
      isPaid: isPaid,
      orderStatus: orderStatus,
      trackNumber: trackDetails,
    })
      .then((res) => {
        history.push('/admin/dashboard')
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
  }

  return (
    <Container>
      <h2 style={{ textAlign: 'center' }} className="mb-4">
        <i class="fas fa-clipboard fx-2 mr-3"></i>admin dashboard
      </h2>
      <Row>
        <Col lg={3}>
          <h3 style={{ textAlign: 'center' }} className="my-5">
            Admin links
          </h3>
          <AdminNav />
        </Col>
        <Col lg={9}>
          {loading && <Loader />}
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(false)}>
              {error}
            </Alert>
          )}
          {order !== '' && (
            <Form>
              <Card className="text-center my-5">
                <Card.Header>
                  <h4>Order ID {order._id}</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <h5>User info</h5>
                      <p>Email of the ordering user: {order.orderdBy.email}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5>Details for user and delivey:</h5>
                      <p>Name: {order.personalInfo.fullName}</p>
                      <p>Phone: {order.personalInfo.phone}</p>
                      <p>Street: {order.personalInfo.street}</p>
                      <p>City: {order.personalInfo.city}</p>
                      <p>Postal code: {order.personalInfo.postalCode}</p>
                      <p>Country: {order.personalInfo.country}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5>Payment info</h5>
                      <Form.Group controlId="isPaid">
                        <Form.Label>
                          <h6> Is Paid: </h6>
                        </Form.Label>
                        <div>
                          <Form.Check
                            onChange={(e) => setIsPaid(e.target.value)}
                            type="radio"
                            value={false}
                            inline
                            checked={isPaid === 'false'}
                            label="No"
                          />
                          <Form.Check
                            onChange={(e) => setIsPaid(e.target.value)}
                            type="radio"
                            value={true}
                            checked={isPaid === 'true'}
                            inline
                            label="Yes"
                          />
                        </div>
                      </Form.Group>
                      <p>Total amount: ₪{order.paymentIntent.amount} </p>
                      <p>
                        Delivery price: ₪{order.paymentIntent.shippingPrice}{' '}
                      </p>
                      <p>Payment method: {order.paymentMethod}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5>Ordered products</h5>
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
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h5>Order Details</h5>
                      <Form.Group>
                        <h6>
                          <Form.Label>Order Status: {orderStatus}</Form.Label>
                        </h6>
                        <Form.Control
                          onChange={(e) => setOrderStatus(e.target.value)}
                          as="select"
                        >
                          <option value="Not Processed">Not Processed</option>
                          <option value="processing">processing</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Delivered">Delivered</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>
                          Tracking number: {order.trackNumber.number}
                        </Form.Label>
                        <Form.Control
                          onChange={handleChange}
                          type="text"
                          name="number"
                          value={trackDetails.number}
                          placeholder="Enter track number"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>URL: {order.trackNumber.url}</Form.Label>
                        <Form.Control
                          onChange={handleChange}
                          type="text"
                          name="url"
                          value={trackDetails.url}
                          placeholder="Enter url"
                        ></Form.Control>
                      </Form.Group>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => handleSubmit()} variant="primary">
                    Submit Changes
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AdminOrder
