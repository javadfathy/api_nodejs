const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')

// get all posts
router.get('/posts', postController.posts)

// get single post
router.get('/post/:id', postController.post)

// post add post
router.post('/post', postController.addPost)

// update post
router.post('/updatePost/:id', postController.updatePost)

// delete post
router.delete('/post/:id', postController.deletePost)

module.exports = router