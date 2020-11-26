import axios from 'axios'

export const createPaymentIntent = (authtoken) =>
  axios.post(
    `/api/create-payment-intent`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  )
