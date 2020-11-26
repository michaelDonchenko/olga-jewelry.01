import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { ADD_TO_CART } from '../types/cartConstants'

const ProductCard = ({
  images,
  name,
  price,
  category,
  slug,
  quantity,
  product,
}) => {
  const dispatch = useDispatch()

  let history = useHistory()

  const cart = useSelector((state) => state.cart)

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
    <Card style={{ width: '17rem', margin: '15px' }} className='myCard'>
      <Link to={`/product/${slug}`}>
        <Card.Img variant='top' src={images.length > 0 && images[0].url} />
      </Link>

      <Card.Body>
        <Link to={`/product/${slug}`}>
          <Card.Title>
            <h5>{name}</h5>
          </Card.Title>
        </Link>

        <Card.Text>
          <p style={{ fontSize: '16px' }}>price: ₪{price}</p>
          <p style={{ fontSize: '14px' }}>
            Category:
            <Link to={`/category/${category.slug}`}> {category.name}</Link>
          </p>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={handleAddToCart}
          size='sm'
          variant='primary'
          disabled={quantity === 0}
        >
          <i class='fas fa-shopping-cart fx-2 mr-1 ml-1'></i> Add to Cart
        </Button>
        {quantity === 0 && (
          <Badge className='ml-3 my-1' variant='danger'>
            Out Of Stock
          </Badge>
        )}
      </Card.Footer>
    </Card>
  )
}

export default ProductCard
