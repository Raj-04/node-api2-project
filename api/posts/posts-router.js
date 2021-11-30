// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

// [GET] /api/posts
router.get('/', (req, res) => {
    Posts.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json({
                message: 'The posts information could not be retrieved',
                error: error.message,
            })
        })
})

module.exports = router
