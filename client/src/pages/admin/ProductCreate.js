import React, { useState, useEffect } from 'react'
import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Image,
} from 'react-bootstrap'
import AdminNav from '../../components/AdminNav'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { createProduct } from '../../actions/productActions'
import { getCategories } from '../../actions/categoryActions'
import {
  CREATE_PRODUCT_ERROR_RESET,
  CREATE_PRODUCT_SUCCESS_RESET,
} from '../../types/productConstants'
import FileUpload from '../../components/FileUpload'
import axios from 'axios'

const ProductCreate = () => {
  const user = useSelector((state) => state.user)
  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  )

  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useSelector((state) => state.getCategories)

  const dispatch = useDispatch()

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    images: [],
  })
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { name, description, price, category, quantity, images } = values

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProduct(values, user.token))
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const handleImageRemove = (public_id) => {
    setImageLoading(true)
    axios
      .post(
        '/api/removeimage',
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setImageLoading(false)
        const { images } = values
        let filteredImages = images.filter(
          (item) => item.public_id !== public_id
        )
        setValues({ ...values, images: filteredImages })
      })
      .catch((err) => {
        setImageLoading(false)
        setImageError(err.message)
      })
  }

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
            Product Create Form
          </h3>
          <hr />
          <Container>
            {loading && <Loader />}
            {error && (
              <Alert
                variant='danger'
                onClose={() => dispatch({ type: CREATE_PRODUCT_ERROR_RESET })}
                dismissible
              >
                <p>{error.data}</p>
              </Alert>
            )}
            {success && (
              <Alert
                variant='success'
                onClose={() => dispatch({ type: CREATE_PRODUCT_SUCCESS_RESET })}
                dismissible
              >
                <p>Product created successfully!</p>
                <hr />
                <div className='d-flex justify-content-end'>
                  <Button
                    variant='outline-success'
                    onClick={() => window.location.reload()}
                  >
                    Reset Fields
                  </Button>
                </div>
              </Alert>
            )}

            <FileUpload
              values={values}
              setValues={setValues}
              setImageLoading={setImageLoading}
              setImageError={setImageError}
            />

            <Form onSubmit={handleSubmit}>
              <Container
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
                fluid
              >
                {values.images &&
                  values.images.map((img) => (
                    <div>
                      <Image
                        style={{
                          maxHeight: '130px',
                          maxWidth: '130px',
                          margin: '15px 10px',
                        }}
                        key={img.public_id}
                        src={img.url}
                        thumbnail
                      />
                      <Button
                        onClick={() => handleImageRemove(img.public_id)}
                        style={{
                          padding: '0 10px',
                        }}
                        className='btn'
                        variant='danger'
                      >
                        <i class='fas fa-trash'></i>
                      </Button>
                    </div>
                  ))}
              </Container>
              {imageLoading && <Loader />}
              {imageError && (
                <Alert
                  variant='danger'
                  onClose={() => setImageError('')}
                  dismissible
                >
                  {imageError}
                </Alert>
              )}
              <Form.Group controlId='product'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  name='name'
                  value={name}
                  onChange={handleChange}
                  autoComplete='off'
                  required='true'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='product'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  as='textarea'
                  rows={5}
                  placeholder='Enter description'
                  name='description'
                  value={description}
                  onChange={handleChange}
                  autoComplete='off'
                  required='true'
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='product'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  name='price'
                  value={price}
                  onChange={handleChange}
                  autoComplete='off'
                  required='true'
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Categories</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name='category'
                  as='select'
                >
                  <option value=''>Please select..</option>
                  {categories &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='product'>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter quantity'
                  name='quantity'
                  value={quantity}
                  onChange={handleChange}
                  autoComplete='off'
                  required='true'
                ></Form.Control>
              </Form.Group>

              <Button className='btn' type='submit' variant='primary'>
                Create Product
              </Button>
            </Form>
            <hr />
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductCreate
