import React, { useEffect } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { productsWithPagination } from '../actions/productActions'
import ProductCard from '../components/ProductCard'
import Paginate from '../components/Paginate'
import CategoriesListShop from '../components/CategoriesListShop'

const ShopPage = ({ match }) => {
  const dispatch = useDispatch()
  const { products, loading, pages, page } = useSelector(
    (state) => state.productsWithPagination
  )

  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(productsWithPagination(pageNumber))
  }, [pageNumber])

  return (
    <Container className="py-4" fluid>
      <Row>
        <Col className="mb-4" md={3}>
          <h5 className="text-center">Filtering by Category</h5>
          <CategoriesListShop />
        </Col>
        <Col md={9}>
          <h3 className="text-center">Products</h3>
          {loading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
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
            </div>
          )}
          {pages && page && (
            <Paginate pages={pages} page={page} url={'/shop/page/'} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ShopPage
