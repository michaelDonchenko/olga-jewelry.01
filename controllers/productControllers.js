const Product = require('../models/productModel')
const slugify = require('slugify')

exports.create = async (req, res) => {
  try {
    const { name, description, price, category, quantity, images } = req.body
    const newProduct = await new Product({
      name,
      description,
      price,
      category,
      quantity,
      images,
      slug: slugify(name),
    }).save()
    res.json(newProduct)
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message)
  }
}

//products with pagination
exports.listAll = async (req, res) => {
  const pageSize = req.query.pageSize || 12
  const page = Number(req.query.pageNumber) || 1

  const count = await Product.estimatedDocumentCount({})
  const products = await Product.find({})
    .limit(parseInt(pageSize))
    .skip(pageSize * (page - 1))
    .populate('category')
    .sort([['createdAt', 'desc']])
    .exec()
  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    pageSize: pageSize,
  })
}

exports.removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .exec()
    res.json(product)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name)
    }
    const updated = Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
      }
    ).exec()
    res.json(updated)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

//without pagination
exports.list = async (req, res) => {
  try {
    //createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body
    const products = await Product.find()
      .populate('category')
      .sort([[sort, order]])
      .limit(limit)
      .exec()

    res.json(products)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

// SERACH / FILTER

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category')
    .exec()

  res.json(products)
}

exports.searchFilters = async (req, res) => {
  const { query } = req.body

  if (query) {
    console.log('query', query)
    await handleQuery(req, res, query)
  }
}
