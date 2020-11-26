const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,

        price: Number,
      },
    ],
    cartTotal: Number,
    shippingPrice: Number,
    paymentMethod: String,
    totalAfterDiscount: Number,
    orderdBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
