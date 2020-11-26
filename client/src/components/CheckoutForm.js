import React, { useState, useEffect } from 'react'
import { createPaymentIntent } from '../actions/stripe'
import { useSelector, useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import '../stripe.css'
import { createOrder, emptyUserCart } from '../actions/userActions'
import Loader from './Loader'
import { Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { ADD_TO_CART } from '../types/cartConstants'

const CheckoutForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const history = useHistory()

  if (!user) {
    history.push('/')
  }

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [authError, setAuthError] = useState(false)
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    setLoading(true)
    createPaymentIntent(user.token)
      .then((res) => {
        console.log('create payment intent', res.data)
        setClientSecret(res.data.clientSecret)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setAuthError('Error try to re-log.')
        setLoading(false)
      })
  }, [])

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty) // disable pay button if errors
    setError(e.error ? e.error.message : '') // show error message
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      // here you get result after successful payment
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart')
          // empty cart from redux
          dispatch({
            type: ADD_TO_CART,
            payload: [],
          })

          // empty cart from database
          emptyUserCart(user.token)
        }
      })
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4))
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  return (
    <>
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment Successful.{' '}
        <Link to='/user/history'>See it in your purchase history.</Link>
      </p>
      <h5 className='mb-2'>Card payment</h5>
      {error && (
        <Alert variant='danger' dismissible onClose={() => setError(false)}>
          {error}
        </Alert>
      )}

      {loading && <Loader />}
      {authError && (
        <Alert variant='danger' dismissible onClose={() => setAuthError(false)}>
          {authError}
        </Alert>
      )}
      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
      </form>
    </>
  )
}

export default CheckoutForm
