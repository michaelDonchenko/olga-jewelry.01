const express = require('express')
const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middleware/authMiddleware')
const {
  getOrders,
  orderUpdate,
  read,
} = require('../controllers/orderControllers')

router.get('/admin/orders', authCheck, adminCheck, getOrders)
router.get('/admin/order/:id', authCheck, adminCheck, read)
router.put('/admin/order-update/:id', authCheck, adminCheck, orderUpdate)

module.exports = router
