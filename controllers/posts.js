const Post = require('../models/post')

module.exports.posts = (req, res, next) => {
    Post.find()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(200).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}

module.exports.post = (req, res, next) => {
    const id = req.params.id
    Post.findById({ _id: id })
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}

module.exports.addPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save()
        .then(result => {
            res.status(200).json({
                msg: 'post created'
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}


// update post
module.exports.updatePost = (req, res, next) => {
    const condition = { _id: req.params.id }
    const post = { title: req.body.title, content: req.body.content }

    Post.findOneAndUpdate(condition, post)
        .then(result => {
            res.status(200).json({
                msg: 'post updated'
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}

module.exports.deletePost = (req, res, next) => {
    const id = req.params.id

    Post.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({
                msg: 'post deleted'
            })
        }).catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err: err
            })
        })
}