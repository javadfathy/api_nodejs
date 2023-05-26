const Product = require('../models/product')

// All products
module.exports.products = (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({
                msg: "Internal Server Error",
                err: err
            })
        })
}

// Single product  
module.exports.product = (req, res, next) => {
    const id = req.params.id

    Product.findById(id)
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({
                msg: "Internal Server Error",
                err: err
            })
        })
}

// Post Product
module.exports.addProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price
    })
    product.save()
        .then(result => {
            res.status(200).json({
                msg: "Product Created"
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}

// update product 
module.exports.updateProduct = (req, res, next) => {
    const productId = req.params.id
    const productUpdated = { title: req.body.title, price: req.body.price }

    Product.findOneAndUpdate({ _id: productId }, productUpdated)
        .then(result => {
            res.status(200).json({
                msg: 'product updated'
            })
        }).catch(err => {
            res.status(200).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}

// delete product
module.exports.deleteProduct = (req, res, next) => {
    const id = req.params.id
    Product.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({
                msg: 'Product Deleted'
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}