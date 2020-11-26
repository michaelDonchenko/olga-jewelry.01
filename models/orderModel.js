const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,
      },
    ],
    paymentIntent: {},
    personalInfo: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: ['Not Processed', 'processing', 'Cancelled', 'Delivered'],
    },
    orderdBy: { type: ObjectId, ref: 'User' },
    paymentMethod: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
    trackNumber: {
      type: Object,
      default: {
        number: '',
        url: '',
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
