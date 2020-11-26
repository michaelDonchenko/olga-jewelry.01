const Order = require('../models/orderModel')

exports.getOrders = async (req, res) => {
  const pageSize = req.query.pageSize || 10
  const page = Number(req.query.pageNumber) || 1

  const count = await Order.estimatedDocumentCount({})

  let adminOrders = await Order.find()
    .limit(parseInt(pageSize))
    .skip(pageSize * (page - 1))
    .populate('products.product')
    .populate('orderdBy')
    .sort([['createdAt', 'desc']])
    .exec()

  res.json({
    adminOrders,
    page,
    pages: Math.ceil(count / pageSize),
    pageSize: pageSize,
  })
}

exports.read = async (req, res) => {
  const orderId = req.params.id
  let order = await Order.findById(orderId)
    .populate('products.product')
    .populate('orderdBy')
    .exec()

  res.json(order)
}

exports.orderUpdate = async (req, res) => {
  const orderId = req.params.id

  const updated = await Order.findByIdAndUpdate(orderId, req.body, {
    new: true,
  })
    .populate('products.product')
    .populate('orderdBy')
    .exec()

  res.json(updated)
}
