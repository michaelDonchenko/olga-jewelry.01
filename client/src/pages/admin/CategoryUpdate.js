import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Form, Button, Alert } from 'react-bootstrap'
import AdminNav from '../../components/AdminNav'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { getCategory, updateCategory } from '../../actions/categoryActions'
import { UPDATE_CATEGORY_ERROR_RESET } from '../../types/categoryConstants'

const CategoryUpdate = ({ history, match }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { category, loading, success } = useSelector(
    (state) => state.getCategory
  )

  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = useSelector((state) => state.updateCategory)

  if (updateSuccess) {
    history.push('/admin/category')
  }

  const [name, setName] = useState('')
  const slug = match.params.slug

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateCategory(slug, { name }, user.token))
  }

  useEffect(() => {
    if (!category.name) {
      dispatch(getCategory(slug))
    } else {
      setName(category.name)
    }
  }, [dispatch, success])

  return (
    <Container>
      <h2 style={{ textAlign: 'center' }} className='mb-4'>
        <i class='fas fa-clipboard fx-2 mr-3'></i>admin dashboard
      </h2>
      <Row>
        <Col lg={3}>
          <h3 style={{ textAlign: 'center' }} className='mb-3'>
            Admin links
          </h3>
          <AdminNav />
          <hr />
        </Col>

        <Col lg={9}>
          <h3 className='mb-4' style={{ textAlign: 'center' }}>
            Category Update Page
          </h3>
          <hr />
          <Container>
            {(loading || updateLoading) && <Loader />}
            {updateError && (
              <Alert
                variant='danger'
                onClose={() => dispatch({ type: UPDATE_CATEGORY_ERROR_RESET })}
                dismissible
              >
                <p>{updateError.data}</p>
              </Alert>
            )}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId='category'>
                <Form.Label>Update Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='off'
                  required='true'
                ></Form.Control>
              </Form.Group>

              <Button className='btn' type='submit' variant='primary'>
                Update
              </Button>
            </Form>
            <hr />
            <LinkContainer to='/admin/category'>
              <Button className='btn' type='submit' variant='secondary'>
                Back to Categories page
              </Button>
            </LinkContainer>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoryUpdate
