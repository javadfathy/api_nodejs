const express = require('express')
const router = express.Router()
const postController = require('../controllers/posts')
const checkAuth = require('../middleware/check-auth')

// get all posts
router.get('/posts', postController.posts)

// get single post
router.get('/post/:id', postController.post)

// post add post
router.post('/post', checkAuth, postController.addPost)

// update post
router.post('/updatePost/:id', checkAuth, postController.updatePost)

// delete post
router.delete('/post/:id', checkAuth, postController.deletePost)

module.exports = router