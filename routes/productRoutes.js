const express = require('express')
const router = express.Router()

// middlewares
const { authCheck, adminCheck } = require('../middleware/authMiddleware')

// controller
const {
  create,
  listAll,
  removeProduct,
  read,
  update,
  list,
} = require('../controllers/productControllers')

// routes

router.get('/products', listAll)
router.post('/products', list)

router.delete('/product/:slug', authCheck, adminCheck, removeProduct)
router.get('/product/:slug', read)
router.put('/product/:slug', authCheck, adminCheck, update)
router.post('/product', authCheck, adminCheck, create)

module.exports = router
