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

// [GET] /api/posts/:id
router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
        .then(post => {
            if(!post) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'The post information could not be retrieved'
            })
        })
})

module.exports = router
