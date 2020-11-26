import React, { useState, useEffect } from 'react'
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Table,
} from 'react-bootstrap'
import AdminNav from '../../components/AdminNav'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import {
  getCategories,
  removeCategory,
  createCategory,
} from '../../actions/categoryActions'
import {
  GET_CATEGORY_RESET,
  CREATE_CATEGORY_ERROR_RESET,
  DELETE_CATEGORY_SUCCESS_RESET,
  UPDATE_CATEGORY_RESET,
} from '../../types/categoryConstants'
import LocalSearch from '../../components/LocalSearch'

const CategoryCreate = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')

  const user = useSelector((state) => state.user)

  const { categories, loading, error } = useSelector(
    (state) => state.getCategories
  )

  const {
    createdCategory,
    loading: createLoading,
    error: createError,
  } = useSelector((state) => state.createCategory)

  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
    message: deleteMessage,
  } = useSelector((state) => state.removeCategory)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory({ name }, user.token))
    setName('')
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch({ type: GET_CATEGORY_RESET })
    dispatch({ type: UPDATE_CATEGORY_RESET })
  }, [deleteSuccess, dispatch, createdCategory])

  const deleteHandler = async (slug) => {
    if (window.confirm('Delete category?')) {
      dispatch(removeCategory(slug, user.token))
      if (deleteSuccess) {
        dispatch(getCategories())
      }
    }
  }

  return (
    <Container>
      <h2 style={{ textAlign: 'center' }} className="mb-4">
        <i class="fas fa-clipboard fx-2 mr-3"></i>admin dashboard
      </h2>
      <Row>
        <Col lg={3}>
          <h3 style={{ textAlign: 'center' }} className="mb-3">
            Admin links
          </h3>
          <AdminNav />
          <hr />
        </Col>

        <Col lg={9}>
          <h3 className="mb-4" style={{ textAlign: 'center' }}>
            Category Page
          </h3>
          <hr />
          <Container>
            {(loading || deleteLoading || createLoading) && <Loader />}
            {error && (
              <Alert variant="danger" onClose={''} dismissible>
                <p>{error.data}</p>
              </Alert>
            )}
            {createError && (
              <Alert
                variant="danger"
                onClose={() => dispatch({ type: CREATE_CATEGORY_ERROR_RESET })}
                dismissible
              >
                <p>{createError.data}</p>
              </Alert>
            )}

            {deleteMessage && (
              <Alert
                variant="success"
                onClose={() =>
                  dispatch({ type: DELETE_CATEGORY_SUCCESS_RESET })
                }
                dismissible
              >
                <p>{deleteMessage}</p>
              </Alert>
            )}

            <Form onSubmit={submitHandler}>
              <Form.Group controlId="category">
                <Form.Label>New Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                  required="true"
                ></Form.Control>
              </Form.Group>

              <Button className="btn" type="submit" variant="primary">
                Create Category
              </Button>
            </Form>
            <hr />

            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c._id}</td>
                      <td>{c.name}</td>
                      <td>
                        <LinkContainer to={`/admin/category/${c.slug}`}>
                          <Button variant="light" className="btn-sm mx-1 my-1">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm mx-1 my-1"
                          onClick={() => deleteHandler(c.slug)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoryCreate
