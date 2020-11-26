import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Button, Alert, Table } from 'react-bootstrap'
import AdminNav from '../../components/AdminNav'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import Paginate from '../../components/Paginate'
import {
  getProducts,
  productsWithPagination,
  removeProduct,
} from '../../actions/productActions'
import {
  DELETE_PRODUCT_ERROR_RESET,
  DELETE_PRODUCT_SUCCESS_RESET,
} from '../../types/productConstants'
import {
  GET_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS_RESET,
} from '../../types/productConstants'

const ProductsPage = ({ match }) => {
  const dispatch = useDispatch()

  const { products, loading, pages, page } = useSelector(
    (state) => state.productsWithPagination
  )

  const pageNumber = match.params.pageNumber || 1

  const {
    loading: deleteLoading,
    error: deleteError,
    message: deleteMessage,
    success: deleteSuccess,
  } = useSelector((state) => state.removeProduct)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch({ type: GET_PRODUCT_RESET })
    dispatch({ type: UPDATE_PRODUCT_SUCCESS_RESET })
    dispatch(productsWithPagination(pageNumber))
  }, [dispatch, deleteSuccess, pageNumber])

  const deleteHandler = (slug) => {
    if (
      window.confirm(
        'Deleting products is not recomended. Are you sure you want to delete?'
      )
    ) {
      dispatch(removeProduct(slug, user.token))
      if (deleteSuccess) {
        dispatch(getProducts('createdAt', 'desc'))
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
            Products Page
          </h3>
          <hr />
          <Container>
            {(loading || deleteLoading) && <Loader />}
            {deleteSuccess && (
              <Alert
                variant="success"
                onClose={() => dispatch({ type: DELETE_PRODUCT_SUCCESS_RESET })}
                dismissible
              >
                <p>{deleteMessage}</p>
              </Alert>
            )}
            {deleteError && (
              <Alert
                variant="danger"
                onClose={() => dispatch({ type: DELETE_PRODUCT_ERROR_RESET })}
                dismissible
              >
                <p>{deleteError.data}</p>
              </Alert>
            )}

            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        {p.images.length > 0 ? (
                          <img
                            style={{
                              height: '50px',
                            }}
                            src={p.images[0].url}
                          />
                        ) : (
                          ''
                        )}
                      </td>
                      <td>{p.name}</td>
                      <td>{p.category.name}</td>
                      <td>
                        <LinkContainer to={`/admin/product/${p.slug}`}>
                          <Button variant="light" className="btn-sm mx-1 my-1">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm mx-1 my-1"
                          onClick={() => deleteHandler(p.slug)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {pages && page && (
              <Paginate pages={pages} page={page} url={'/admin/products/'} />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductsPage
