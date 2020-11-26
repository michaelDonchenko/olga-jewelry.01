import axios from 'axios'

export const getOrders = async (authtoken, pageNumber = '') =>
  await axios.get(`/api/admin/orders?pageNumber=${pageNumber}`, {
    headers: {
      authtoken,
    },
  })

export const getOrder = async (authtoken, orderId) =>
  await axios.get(`/api/admin/order/${orderId}`, {
    headers: {
      authtoken,
    },
  })

export const updateOrder = async (authtoken, orderId, updates) =>
  await axios.put(`/api/admin/order-update/${orderId}`, updates, {
    headers: {
      authtoken,
    },
  })
