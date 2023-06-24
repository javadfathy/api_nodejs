const mongoose = require('mongoose')

const Schema = mongoose.Schema


const productSchema = new Schema({
    title: String,
    price: String,
    productImage: String,
})


module.exports = mongoose.model('Product', productSchema)