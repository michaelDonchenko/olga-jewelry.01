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
import { getCategories } from '../../actions/categoryActions'
import FileUpload from '../../components/FileUpload'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { getProduct, updateProduct } from '../../actions/productActions'
import { UPDATE_PRODUCT_ERROR_RESET } from '../../types/productConstants'

const ProductUpdate = ({ match, history }) => {
  const user = useSelector((state) => state.user)

  const { categories } = useSelector((state) => state.getCategories)
  const { product, loading, success } = useSelector((state) => state.getProduct)

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.updateProduct)

  const dispatch = useDispatch()
  const slug = match.params.slug

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

  if (updateSuccess) {
    history.push('/admin/products')
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.images
    ) {
      dispatch(getProduct(slug))
    } else {
      setValues({
        ...values,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        images: product.images,
      })
    }
  }, [success, dispatch])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProduct(slug, values, user.token))
  }

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

        {!product || loading || updateLoading ? (
          <Loader />
        ) : (
          <Col lg={9}>
            <h3 className='mb-4' style={{ textAlign: 'center' }}>
              Product Update Page
            </h3>
            <hr />
            {updateError && (
              <Alert
                variant='danger'
                onClose={() => dispatch({ type: UPDATE_PRODUCT_ERROR_RESET })}
                dismissible
              >
                <p>{updateError.data}</p>
              </Alert>
            )}
            <Container>
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
                  Update Product
                </Button>
              </Form>
              <hr />

              <LinkContainer to='/admin/products'>
                <Button className='btn' variant='secondary'>
                  Back to Products
                </Button>
              </LinkContainer>

              <hr />
            </Container>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default ProductUpdate
