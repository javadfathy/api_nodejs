const express = require('express')
const productController = require('../controllers/products')

const router = express.Router()

// get all products
router.get('/products', productController.products)

// get single product
router.get('/product/:id', productController.product)

// post add product
router.post('/product', productController.addProduct)

// delete product
router.delete('/product/:id', productController.deleteProduct)

module.exports = router