import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/ProductCard'

import { getCategory } from '../actions/categoryActions'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CategoryPage = ({ match, history }) => {
  const dispatch = useDispatch()
  const { category, loading, products } = useSelector(
    (state) => state.getCategory
  )

  const slug = match.params.slug

  useEffect(() => {
    dispatch(getCategory(slug))
  }, [])

  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <Container fluid>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Link onClick={goBackHandler} className='btn btn-light my-3'>
            Go back
          </Link>
          <h3 className='text-center'>{category.name}</h3>
          {products && products.length === 0 ? (
            <h4 className='text-center'>
              We're sorry there are no products for this category
            </h4>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
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
        </>
      )}
    </Container>
  )
}

export default CategoryPage
