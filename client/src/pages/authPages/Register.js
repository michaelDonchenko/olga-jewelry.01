import React, { useState } from 'react'
import { Form, Button, Toast } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import { auth } from '../../firebase'

const Register = ({ history }) => {
  const user = useSelector((state) => state.user)
  if (user) {
    history.push('/')
  }

  const [email, setEmail] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const registretionEmail = localStorage.getItem('emailForRegistration')

  const toast = () => (
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Email confirmation</strong>
      </Toast.Header>
      <Toast.Body>{`Email was sent to ${registretionEmail}, click the link to complete your registretion.`}</Toast.Body>
    </Toast>
  )

  const toggleShow = () => setShow(!show)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const config = {
      url: 'https://olga-jewelry.herokuapp.com/register/complete',
      handleCodeInApp: true,
    }

    await auth.sendSignInLinkToEmail(email, config)
    setShow(true)

    //save user email in local storage
    window.localStorage.setItem('emailForRegistration', email)
    setEmail('')
    setLoading(false)
  }

  return (
    <FormContainer>
      <h3 className="mb-4">Register</h3>
      <p style={{ color: 'gray' }} className="mb-4">
        Please enter a valid email, confirmation link will be sent to your
        mailbox in order to complete your registration.
      </p>
      {toast()}
      {loading && <Loader />}

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
        <p>
          Already have an account?
          <Link
            className="ml-2"
            to="/login"
            style={{ color: 'grey', fontWeight: '600' }}
          >
            Login
          </Link>
        </p>
      </div>
    </FormContainer>
  )
}

export default Register
