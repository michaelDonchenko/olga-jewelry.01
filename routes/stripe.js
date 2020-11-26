const express = require('express')
const router = express.Router()

const { createPaymentIntent } = require('../controllers/stripe')
const { route } = require('./userRoutes')
// middleware
const { authCheck } = require('../middleware/authMiddleware')

router.post('/create-payment-intent', authCheck, createPaymentIntent)

module.exports = router
