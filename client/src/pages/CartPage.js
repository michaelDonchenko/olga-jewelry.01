import React, { useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
  Form,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_TO_CART } from '../types/cartConstants'
import { userCart } from '../actions/userActions'
import Loader from '../components/Loader'

const CartPage = ({ history }) => {
  const goBackHandler = () => {
    history.goBack()
  }

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const user = useSelector((state) => state.user)

  const [shipping, setShipping] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const saveOrderToDb = () => {
    setLoading(true)
    userCart({ cart, shipping, paymentMethod }, user.token)
      .then((res) => {
        console.log('CART POST RES', res)
        setLoading(false)
        if (res.data.ok) history.push('/checkout')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        return setError(
          'Invalid or expired token, try re-log to get a new Token.'
        )
      })
  }

  const getTotal = () => {
    return (
      cart &&
      cart.reduce((currentValue, nextValue) => {
        return Number(currentValue + nextValue.price * nextValue.count)
      }, 0)
    )
  }

  const handleRemove = (id) => {
    let cart = []

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, i) => {
        if (product._id === id) {
          cart.splice(i, 1)
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: ADD_TO_CART,
        payload: cart,
      })
    }
  }

  return (
    <Container fluid style={{ maxWidth: '95%' }}>
      <h2 className='text-center my-4'>
        Your Cart <i class='fas fa-shopping-cart fx-2 mr-1'></i>
      </h2>
      <Link onClick={goBackHandler} className='btn btn-light my-3 '>
        Go back
      </Link>

      <Row>
        <Col lg='8'>
          <h5 className='my-4'>
            Your cart has {cart && cart.length} products.
          </h5>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Image</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>price</th>
                <th>count</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart &&
                // filter step 3
                cart.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {p.images.length > 0 ? (
                        <Link to={`/product/${p.slug}`}>
                          <img
                            style={{
                              height: '70px',
                            }}
                            src={p.images[0].url}
                          />
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>

                    <td>
                      <Link to={`/product/${p.slug}`}>{p.name}</Link>
                    </td>

                    <td>
                      <Link to={`/category/${p.category.slug}`}>
                        {p.category.name}
                      </Link>
                    </td>

                    <td>₪{p.price}</td>
                    <td>
                      <input
                        type='number'
                        value={p.count}
                        onChange={(e) => {
                          let cart = []

                          if (typeof window !== 'undefined') {
                            let count = e.target.value < 1 ? 1 : e.target.value

                            if (count > p.quantity) {
                              return
                            }

                            if (localStorage.getItem('cart')) {
                              cart = JSON.parse(localStorage.getItem('cart'))
                            }

                            cart.map((product, i) => {
                              if (product._id === p._id) cart[i].count = count
                            })

                            localStorage.setItem('cart', JSON.stringify(cart))
                            dispatch({
                              type: ADD_TO_CART,
                              payload: cart,
                            })
                          }
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => handleRemove(p._id)}
                        variant='danger'
                        className='btn-sm mx-1 my-1'
                      >
                        <i className='fas fa-trash '></i>{' '}
                        <span className='ml-1'>Remove</span>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Form.Group className='my-4' controlId='exampleForm.ControlSelect1'>
            <Form.Label>
              <h5>Select delivery method</h5>
            </Form.Label>
            <Form.Control
              onChange={(e) => setShipping(e.target.value)}
              as='select'
            >
              <option value={''}>Plaese select</option>
              <option value={16}>
                REGULAR REGISTERED WITH TRACKING NUMBERS: ₪ 16
              </option>
              <option value={49}>EXPRESS DELIVERY: ₪ 49</option>
              <option value={0}>LOCAL PICKUP (TEL AVIV ISRAEL)</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col lg='4'>
          <h4 className='my-4'>Order Summary</h4>
          {error && (
            <Alert variant='danger' dismissible onClose={() => setError(false)}>
              {error}
            </Alert>
          )}
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5 className='my-4'>Products</h5>
            </ListGroup.Item>

            <ListGroup.Item>
              {cart &&
                cart.map((p, i) => (
                  <div key={i}>
                    <p>
                      {p.name} x {p.count} = ₪{p.price * p.count}
                    </p>
                  </div>
                ))}
            </ListGroup.Item>

            <ListGroup.Item>
              <p style={{ fontSize: '18px' }}>
                Delivery price:{' '}
                <span style={{ fontWeight: '600' }}>₪{shipping}</span>{' '}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p style={{ fontSize: '18px' }}>
                Total:{' '}
                <span style={{ fontWeight: '600' }}>
                  ₪{getTotal() + Number(shipping)}
                </span>{' '}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <Form>
                <h5 className='my-4'>Choose payment method</h5>
                <Form.Check
                  type='radio'
                  id='option1'
                  label='Direct Bank Transfer'
                  value={1}
                  checked={paymentMethod === 'Direct Bank Transfer'}
                  onClick={() => setPaymentMethod('Direct Bank Transfer')}
                />

                <Form.Check
                  value={2}
                  type='radio'
                  label='Pay By Phone (Credit Card Or Bit)'
                  id='option2'
                  checked={paymentMethod === 'Pay By Phone'}
                  onClick={() => setPaymentMethod('Pay By Phone')}
                />
              </Form>
            </ListGroup.Item>

            <ListGroup.Item>
              {user ? (
                <Button
                  onClick={saveOrderToDb}
                  className='btn-block'
                  variant='success'
                  disabled={
                    (cart && cart.length === 0) ||
                    shipping === '' ||
                    paymentMethod === ''
                  }
                >
                  <i className='far fa-credit-card fa-lg mr-2'></i> Proccess to
                  Checkout
                </Button>
              ) : (
                <p>
                  Please{' '}
                  <Link
                    style={{ fontWeight: '700' }}
                    to={{
                      pathname: '/login',
                      state: { from: 'cart' },
                    }}
                  >
                    Login
                  </Link>{' '}
                  to continue to checkout
                </p>
              )}
            </ListGroup.Item>
          </ListGroup>
          {loading && <Loader />}
        </Col>
      </Row>
    </Container>
  )
}

export default CartPage
