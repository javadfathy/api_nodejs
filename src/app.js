const express = require('express')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/products')
const postRoutes    = require('./routes/posts')
const orderRoutes   = require('./routes/orders')
const userRoutes   = require('./routes/users')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/apiNode', {useNewUrlParser: true})

// for see images by browser
app.use('/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/api', productRoutes)
app.use('/api', postRoutes)
app.use('/api', orderRoutes)
app.use('/api', userRoutes)



app.use((req, res, next) => {
  res.status(404).json({
    msg: 'Page Not Found'
  })
})

app.listen(8000)
