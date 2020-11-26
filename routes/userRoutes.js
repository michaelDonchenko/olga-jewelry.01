const express = require('express')
const router = express.Router()

// middlewares
const { authCheck } = require('../middleware/authMiddleware')
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  savePersonalInfo,
  createOrder,
  orders,
} = require('../controllers/userControllers')

router.post('/user/cart', authCheck, userCart)

router.get('/user/cart', authCheck, getUserCart)

router.delete('/user/cart', authCheck, emptyCart)

router.post('/user/personal-info', authCheck, savePersonalInfo)

router.post('/user/order', authCheck, createOrder)

router.get('/user/orders', authCheck, orders)

module.exports = router
