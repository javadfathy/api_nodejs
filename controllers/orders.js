const Order = require('../models/order')
const mongoose = require('mongoose')

// all order
module.exports.orders = (req, res, next) => {
    Order.find()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal server Error',
                err: err
            })
        })
}

// order
module.exports.order = (req, res, next) => {
    const id = req.params.id
    Order.findById(id)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({
                msg: "Internal Server Error",
                err: err
            })
        })
}

// add product to order
module.exports.addToOrder = (req, res , next) => {
    const order = new Order({
        product: req.body.productId,
        qty: req.body.qty
    })
    order.save()
        .then(result => {
            res.status(200).json({
                msg: 'product add the order'
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: MediaError
            })
        })
}

// add qty order
module.exports.addQty = (req, res, next) => {
    const id = req.params.id
    let qty = 0
    Order.findById(id)
        .then(result => {
            qty = result.qty
            Order.findOneAndUpdate({ _id: id }, { qty: qty+1 })
            .then(result => {
                res.status(200).json({
                    msg: 'order deleted'
                })
            }).catch(err => {
                res.status(200).json({
                    msg: 'Internal Server Error',
                    err: err
                })
            })
        }).catch(err => {
            res.status(500).json({
                msg: "Internal Server Error",
                err: err
            })
        })
}

// delete order
module.exports.deleteOrder = (req, res, next) => {
    const id = req.params.id
    Order.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({
                msg: 'order deleted'
            })
        }).catch(err => {
            res.status(200).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}