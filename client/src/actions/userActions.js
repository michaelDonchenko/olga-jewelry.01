import axios from 'axios'
import {} from '../types/userConstants'

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `/api/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  )

export const getUserCart = async (authtoken) =>
  await axios.get('/api/user/cart', {
    headers: {
      authtoken,
    },
  })

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`/api/user/cart`, {
    headers: {
      authtoken,
    },
  })

export const saveUserInfo = async (authtoken, personalInfo) =>
  await axios.post(`/api/user/personal-info`, personalInfo, {
    headers: {
      authtoken,
    },
  })

export const createOrder = async (personalInfo, authtoken) =>
  await axios.post(
    `/api/user/order`,
    { personalInfo },
    {
      headers: {
        authtoken,
      },
    }
  )

export const getUserOrders = async (authtoken) =>
  await axios.get(`/api/user/orders`, {
    headers: {
      authtoken,
    },
  })
