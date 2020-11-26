const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')

const stripe = require('stripe')(process.env.SECRET_KEY)

exports.createPaymentIntent = async (req, res) => {
  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec()
  // 2 get user cart total
  const { cartTotal } = await Cart.findOne({ orderdBy: user._id }).exec()

  console.log('CART TOTAL CHARGED', cartTotal)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: 'ils',
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}
