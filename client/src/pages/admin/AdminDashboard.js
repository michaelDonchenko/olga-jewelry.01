import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getOrders } from '../../actions/adminActions'
import AdminNav from '../../components/AdminNav'
import Loader from '../../components/Loader'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import Paginate from '../../components/Paginate'

const AdminDashboard = ({ match }) => {
  const user = useSelector((state) => state.user)

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useState([])
  const [page, setPage] = useState('')
  const [pages, setPages] = useState('')

  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    setLoading(true)
    getOrders(user.token, pageNumber)
      .then((res) => {
        setOrders(res.data.adminOrders)
        setPage(res.data.page)
        setPages(res.data.pages)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
        setLoading(false)
      })
  }, [pageNumber])

  return (
    <Container fluid>
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
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(false)}>
              {error}
            </Alert>
          )}
          <h3 style={{ textAlign: 'center' }} className="my-5">
            Orders
          </h3>
          {loading && <Loader />}

          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>isPaid</th>
                <th>created by</th>
                <th>payment method</th>
                <th>created at</th>
                <th>order status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.isPaid === false ? (
                      <span style={{ color: 'red' }}>
                        <i class="fas fa-times"></i>
                      </span>
                    ) : (
                      <span style={{ color: 'green' }}>
                        <i class="fas fa-check"></i>
                      </span>
                    )}
                  </td>
                  <td>{order.orderdBy.email}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <LinkContainer to={`/admin/order/${order._id}`}>
                      <Button size="sm" variant="info">
                        Order details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {pages && page && (
            <Paginate pages={pages} page={page} url={'/admin/dashboard/'} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
