const express = require('express')
const productController = require('../controllers/products')
const multer = require('multer')
const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/product/thumbnail')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const upload = multer({storage: storage})

// get all products
router.get('/products', productController.products)

// get single product
router.get('/product/:id', productController.product)

// post add product
router.post('/product', upload.single('productImage'), productController.addProduct)

// update product
router.post('/updateProduct/:id', productController.updateProduct)

// delete product
router.delete('/product/:id', productController.deleteProduct)

module.exports = router