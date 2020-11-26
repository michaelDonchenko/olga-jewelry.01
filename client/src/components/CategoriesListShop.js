import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { getCategories } from '../actions/categoryActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const CategoriesListShop = () => {
  const { categories, loading, error } = useSelector(
    (state) => state.getCategories
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <Container style={{ minHeight: '80px' }}>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories &&
            categories.map((c) => (
              <LinkContainer to={`/category/${c.slug}`}>
                <Button className="my-1" variant="outline-primary">
                  {c.name}
                </Button>
              </LinkContainer>
            ))}
        </div>
      )}
    </Container>
  )
}

export default CategoriesListShop
