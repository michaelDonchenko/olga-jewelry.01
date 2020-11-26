import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { auth, googleAuthProvider } from '../../firebase'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_USER } from '../../types/userConstants'
import { createOrUpdateUser } from '../../controllers/authControllers'

const Login = ({ history }) => {
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
  }

  if (user && user.role === 'admin') {
    history.push('/admin/dashboard')
  } else if (user && user.role !== 'admin') {
    // check if intended
    let intended = history.location.state
    if (intended) {
      history.push(intended.from)
    } else {
      history.push('/user/history')
    }
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await auth.signInWithEmailAndPassword(email, password)
      const { user } = res
      const idTokenResult = await user.getIdTokenResult()

      createOrUpdateUser(idTokenResult.token)
        .then((res) =>
          dispatch({
            type: LOGIN_USER,
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
    } catch (error) {
      setLoading(false)
      return setError(error.message)
    }
  }

  const googleLogin = async () => {
    try {
      const res = await auth.signInWithPopup(googleAuthProvider)
      const { user } = res
      const idTokenResult = await user.getIdTokenResult()

      createOrUpdateUser(idTokenResult.token)
        .then((res) =>
          dispatch({
            type: LOGIN_USER,
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
    } catch (error) {
      return setError(error.message)
    }
  }

  return (
    <FormContainer>
      <h3 className='mb-4'>Login</h3>
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
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            required='true'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            required='true'
            minLength={6}
          ></Form.Control>
        </Form.Group>

        <Button className='btn-block' type='submit' variant='primary'>
          <i className='fas fa-envelope mr-1'></i> Login with Email/Password
        </Button>
      </Form>

      <Button
        onClick={googleLogin}
        className='btn-block mt-3'
        type='submit'
        variant='warning'
      >
        <i className='fab fa-google mr-1'></i> Login with Google account
      </Button>
      <div className='mt-3'>
        <Link
          to='/forgot/password'
          style={{ color: 'grey', fontWeight: '600' }}
        >
          Forgot password?
        </Link>
        <div className='mt-3'>
          <p>
            Don't have an account?
            <Link
              className='ml-2'
              to='/register'
              style={{ color: 'grey', fontWeight: '600' }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  )
}

export default Login
