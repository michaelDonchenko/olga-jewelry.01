import React, { useState, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { REGISTER_USER } from '../../types/userConstants'
import { createOrUpdateUser } from '../../controllers/authControllers'

const RegisterComplete = ({ history }) => {
  const user = useSelector((state) => state.user)
  if (user) {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        email: user.name,
        token: user.token,
        name: user.name,
        role: user.role,
        id: user.id,
      })
    )

    history.push('/')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (password !== passwordConfirm) {
        setLoading(false)
        return setError('The passwords do not match, confirmation failed')
      }
      const result = await auth.signInWithEmailLink(email, window.location.href)

      if (result.user.emailVerified) {
        //remove email from local storage
        window.localStorage.removeItem('emailForRegistration')
        //get user id token
        let user = auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = await user.getIdTokenResult()

        //redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: REGISTER_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                id: res.data._id,
              },
            })
          )
          .catch((err) => console.log(err))
      }
    } catch (error) {
      setLoading(false)
      return setError(error.message)
    }
  }

  return (
    <FormContainer>
      <h3 className='mb-4'>Registeration Complete</h3>
      {loading && <Loader />}
      {error && (
        <Alert
          variant='danger'
          dismissible
          onClose={() => {
            setError('')
          }}
        >
          {error}
        </Alert>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            autoComplete='off'
            required='true'
            disabled
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            required='true'
            minLength={6}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirm password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confrim your password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            autoComplete='off'
            required='true'
            minLength={6}
          ></Form.Control>
        </Form.Group>

        <Button className='btn-block' type='submit' variant='primary'>
          <i className='fas fa-sign-in-alt mr-1'></i> Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterComplete
