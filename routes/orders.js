const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orders')

// get all order
router.get('/orders', orderController.orders)

// get single order
router.get('/order/:id', orderController.order)

// post add to order
router.post('/addToOrder', orderController.addToOrder)

// update qty
router.post('/addQty/:id', orderController.addQty)

// delete order
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router