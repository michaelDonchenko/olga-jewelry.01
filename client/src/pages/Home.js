import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getProducts } from '../actions/productActions'
import CategoriesList from '../components/CategoriesList'
import ContactUs from '../components/ContactUs'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const user = useSelector((state) => state.user)
  const { products, loading, bestSellers } = useSelector(
    (state) => state.getProducts
  )

  const dispatch = useDispatch()

  useEffect(() => {
    //sort order limit
    dispatch(getProducts('createdAt', 'desc', 3))
  }, [])

  useEffect(() => {
    //sort order limit

    dispatch(getProducts('sold', 'desc', 3))
  }, [])

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          margin: '0',
          padding: '10px, 0',
        }}
      >
        Home Page
      </h1>
      <h5
        style={{
          backgroundColor: '#f5f5f5 ',
          textAlign: 'center',
          margin: '20px 0',
          padding: '5px',
        }}
      >
        Hello {user ? user.email.split('@')[0] : 'User'}, Welcome back{' '}
        {!user && (
          <LinkContainer className="ml-3 my-2" to="/login">
            <Button size="sm" variant="outline-primary">
              Click here to login{' '}
            </Button>
          </LinkContainer>
        )}
        <LinkContainer className="ml-3 my-2" to="/shop">
          <Button size="sm" variant="outline-primary">
            Go to shop{' '}
          </Button>
        </LinkContainer>
      </h5>

      <h3
        style={{
          backgroundColor: '#f5f5f5 ',
          textAlign: 'center',
          margin: '20px 0',
          padding: '5px',
        }}
      >
        New Arrivals
      </h3>
      <Container className="mt-2 homeContainer">
        {loading && <Loader />}

        {products &&
          products.map((p) => (
            <ProductCard
              product={p}
              images={p.images}
              name={p.name}
              price={p.price}
              category={p.category}
              slug={p.slug}
              quantity={p.quantity}
            />
          ))}
      </Container>

      <h3
        style={{
          backgroundColor: '#f5f5f5 ',
          textAlign: 'center',
          margin: '20px 0',
          padding: '5px',
        }}
      >
        Best sellers
      </h3>
      <Container className="mt-2 homeContainer">
        {loading && <Loader />}

        {bestSellers &&
          bestSellers.map((p) => (
            <ProductCard
              product={p}
              images={p.images}
              name={p.name}
              price={p.price}
              category={p.category}
              slug={p.slug}
              quantity={p.quantity}
            />
          ))}
      </Container>

      <h3
        style={{
          backgroundColor: '#f5f5f5 ',
          textAlign: 'center',
          margin: '20px 0',
          padding: '5px',
        }}
      >
        Categories List
      </h3>
      <CategoriesList />

      <h3
        style={{
          backgroundColor: '#f5f5f5 ',
          textAlign: 'center',
          margin: '20px 0',
          padding: '5px',
        }}
      >
        Contact Us
      </h3>
      <Container>
        <ContactUs />
        <Card className="my-5">
          <h5 className="my-2 text-center">
            Contanct us on whatsup for any questions/customer support, <br></br>
            <i className="fab fa-whatsapp fa-2x mt-2 mx-1"></i>
            <span>054-665-9069</span>
          </h5>
          <Card.Body className="text-center py-4">
            <h6>Payment rules</h6>
            <p>
              Any goods purchased on the site are subject to return at the
              request of the buyer.{' '}
            </p>
            <p>Contact me within 3 days after the product is delivered. </p>
            <p>
              Sending the goods back within 7 days, provided it is intact and
              intact. 
            </p>
            <p>
              The cost of returning the goods is at the expense of the buyer.
            </p>
            <p> Goods made to order cannot be returned or exchanged. </p>

            <p>
              Cancellation of the order can be made before the goods are
              shipped.
            </p>
            <p>
              After sending the goods, a refund will be made only after the
              buyer has returned the goods and the integrity of the goods.
            </p>
            <p>
              {' '}
              Goods purchased under special promotions and discounts cannot be
              returned. 
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Home
