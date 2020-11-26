import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ListGroup,
  Alert,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  emptyUserCart,
  getUserCart,
  saveUserInfo,
} from '../actions/userActions'
import Loader from '../components/Loader'
import { ADD_TO_CART } from '../types/cartConstants'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/userActions'

const CheckoutPage = ({ history }) => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [shipping, setShipping] = useState('')
  const [payment, setPayment] = useState('')

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const { street, city, postalCode, country, fullName, phone } = userInfo

  const [error, setError] = useState(false)
  const [message, setMessage] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const goBackHandler = () => {
    history.goBack()
  }

  if (!user) {
    history.push('/')
  }

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products)
        setTotal(res.data.cartTotal)
        setShipping(res.data.shippingPrice)
        setPayment(res.data.paymentMethod)
      })
      .catch((err) => {
        console.log(err)

        return setError(
          'Invalid or expired token, try re-log to get a new Token.'
        )
      })
  }, [])

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    // remove from redux
    dispatch({
      type: ADD_TO_CART,
      payload: [],
    })
    // remove from backend
    emptyUserCart(user.token)
      .then((res) => {
        setProducts([])
        setTotal(0)
        setShipping('')
        setPayment('')
        history.push('/cart')
      })
      .catch((err) => console.log(err))
  }

  const handleSaveUserInfo = (e) => {
    setLoading(true)
    e.preventDefault()
    saveUserInfo(user.token, userInfo)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        if (res.data.ok) {
          setMessage('User Info has been saved you can continue.')
        }
      })
      .catch((err) => {
        console.log(err)
        setError('Could not save the Info, try to re-log.')
      })
  }

  const handleOrderSubmit = () => {
    setLoading(true)
    createOrder(userInfo, user.token)
      .then((res) => {
        if (res.data.ok && payment === 'Pay By Phone') {
          // remove from local storage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('cart')
          }
          // remove from redux
          dispatch({
            type: ADD_TO_CART,
            payload: [],
          })
          // remove from backend
          emptyUserCart(user.token)
            .then((res) => {
              setProducts([])
              setTotal(0)
              setShipping('')
              setPayment('')
              history.push('/phonePayment')
            })
            .catch((err) => console.log(err))
        } else if (res.data.ok && payment === 'Direct Bank Transfer') {
          // remove from local storage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('cart')
          }
          // remove from redux
          dispatch({
            type: ADD_TO_CART,
            payload: [],
          })
          // remove from backend
          emptyUserCart(user.token)
            .then((res) => {
              setProducts([])
              setTotal(0)
              setShipping('')
              setPayment('')
              history.push('/bankTransfer')
            })
            .catch((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container>
      <Link onClick={goBackHandler} className='btn btn-light my-3 '>
        Go back
      </Link>
      <Row>
        <Col md='6'>
          <h3 className='my-3'>Personal Information</h3>
          <Form onSubmit={handleSaveUserInfo}>
            <Form.Group controlId='fullName'>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your full name'
                value={fullName}
                onChange={handleChange}
                autoComplete='off'
                required='true'
                name='fullName'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter your phone'
                value={phone}
                onChange={handleChange}
                autoComplete='off'
                required='true'
                name='phone'
              ></Form.Control>
            </Form.Group>

            <h5 className='my-3'>Delivery adress</h5>

            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                onChange={handleChange}
                autoComplete='off'
                required='true'
                name='city'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                onChange={handleChange}
                autoComplete='off'
                required='true'
                name='country'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
              <Form.Label>Postal/Zip Code</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter postal code'
                value={postalCode}
                onChange={handleChange}
                autoComplete='off'
                required='true'
                name='postalCode'
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Street and Home number'
                value={street}
                onChange={handleChange}
                autoComplete='off'
                required='true'
                name='street'
              ></Form.Control>
            </Form.Group>

            {message && (
              <Alert
                variant='success'
                dismissible
                onClose={() => setMessage(false)}
              >
                {message}
              </Alert>
            )}

            {error && (
              <Alert
                variant='danger'
                dismissible
                onClose={() => setError(false)}
              >
                {error}
              </Alert>
            )}

            {loading && <Loader />}

            <Button type='submit' variant='info'>
              save user info
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3 className='my-3'>Order Summary</h3>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <p style={{ fontSize: '18px' }}>Payment Method: {payment}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p style={{ fontSize: '18px' }}>
                Delivery Payment:{' '}
                <span style={{ fontWeight: '600' }}>₪{shipping}</span>{' '}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p style={{ fontSize: '20px' }}>
                Total Price: <span style={{ fontWeight: '600' }}>₪{total}</span>{' '}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p style={{ fontSize: '18px' }}>Products:</p>
              {products.map((p) => (
                <div>
                  <p>Product name: {p.product.name}</p>
                  <p>Product Quantity: {p.count}</p>
                  <p>Product Price: ₪{p.price}</p>
                  <hr></hr>
                </div>
              ))}
            </ListGroup.Item>
            <ListGroup.Item>
              {payment === 'Direct Bank Transfer' ? (
                <Button
                  disabled={products.length === 0 || !message}
                  onClick={handleOrderSubmit}
                  className='btn-block'
                  variant='success'
                >
                  <i class='fas fa-chevron-right fx-2 mr-1'></i> Place Order
                </Button>
              ) : (
                <Button
                  disabled={products.length === 0 || !message}
                  onClick={handleOrderSubmit}
                  className='btn-block'
                  variant='success'
                >
                  <i class='fas fa-chevron-right fx-2 mr-1'></i> Place Order
                </Button>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={emptyCart}
                className='btn-block'
                variant='danger'
              >
                <i class='fas fa-shopping-cart fx-2 mr-1'></i> Empty Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckoutPage
