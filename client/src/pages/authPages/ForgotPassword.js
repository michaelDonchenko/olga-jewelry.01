import React, { useState } from 'react'
import { Form, Button, Toast, Alert } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { auth } from '../../firebase'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ForgotPassword = ({ history }) => {
  const user = useSelector((state) => state.user)

  if (user) {
    history.push('/')
  }

  const [email, setEmail] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [emailForReset, setEmailForReset] = useState('')

  const toggleShow = () => setShow(!show)

  const toast = () => (
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Password Reset</strong>
      </Toast.Header>
      <Toast.Body>{`Email was sent to ${emailForReset}, click the link to reset your password.`}</Toast.Body>
    </Toast>
  )

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const config = {
        url: 'https://olga-jewelry.herokuapp.com/login',
        handleCodeInApp: true,
      }

      await auth.sendPasswordResetEmail(email, config)
      setEmailForReset(email)
      setShow(true)
      setLoading(false)

      setEmail('')
    } catch (error) {
      setLoading(false)
      return setError(error.message)
    }
  }

  return (
    <FormContainer>
      <h3 className="mb-4">Forgot Password</h3>
      <p style={{ color: 'gray' }} className="mb-4">
        Password reset link will be sent to your mail.
      </p>
      {toast()}
      {loading && <Loader />}
      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => {
            setError('')
          }}
        >
          {error}
        </Alert>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required="true"
            autoFocus
          ></Form.Control>
        </Form.Group>

        <Button className="btn-block" type="submit" variant="primary">
          <i className="fas fa-sign-in-alt mr-1"></i> Submit
        </Button>
      </Form>
      <div className="mt-3">
        <Link to="/login" style={{ color: 'grey', fontWeight: '600' }}>
          Back to Login
        </Link>
      </div>
    </FormContainer>
  )
}

export default ForgotPassword
