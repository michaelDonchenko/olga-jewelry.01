import React, { useEffect } from 'react'
import { getProduct } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import {
  Col,
  Container,
  Row,
  Carousel,
  ListGroup,
  Card,
  Button,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { ADD_TO_CART } from '../types/cartConstants'

const ProductPage = ({ match, history }) => {
  const dispatch = useDispatch()
  const { product, loading } = useSelector((state) => state.getProduct)

  const slug = match.params.slug

  useEffect(() => {
    dispatch(getProduct(slug))
  }, [])

  const goBackHandler = () => {
    history.goBack()
  }

  const handleAddToCart = () => {
    let cart = []
    if (typeof window !== undefined) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1,
      })

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual)
      //save to local storage
      localStorage.setItem('cart', JSON.stringify(unique))
      dispatch({
        type: ADD_TO_CART,
        payload: unique,
      })
    }
  }

  return (
    <Container>
      <Link onClick={goBackHandler} className='btn btn-light my-3'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className='mb-4'>
            <Col md={6}>
              <Carousel>
                {product.images &&
                  product.images.map((p) => (
                    <Carousel.Item interval={3000}>
                      <img
                        className='d-block w-100 mx-auto'
                        src={p.url}
                        alt='img'
                        style={{ maxHeight: '600px' }}
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Details:</p>
                  <p style={{ whiteSpace: 'pre-line', lineHeight: '1.5rem' }}>
                    {product.description}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₪{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.quantity > 0 ? (
                          <p>In Stock</p>
                        ) : (
                          <p style={{ color: 'red', fontWeight: '600' }}>
                            Out of Stock
                          </p>
                        )}{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Category:</Col>
                      <Col>
                        <Link
                          to={`/category/${
                            product.category && product.category.slug
                          }`}
                        >
                          {' '}
                          {product.category && product.category.name}
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={handleAddToCart}
                      type='button'
                      className='btn-block'
                      disabled={product.quantity === 0}
                    >
                      <i class='fas fa-shopping-cart fx-2 mr-2 ml-1'></i>
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default ProductPage
