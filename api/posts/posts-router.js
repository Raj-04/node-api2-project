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

// [POST] /api/posts
router.post('/', (req, res) => {
    const { title, contents } = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Posts.insert({ title, contents })
            .then((id) => {
                res.status(201).json({
                    id: id,
                    title: title,
                    contents: contents
                })
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'There was an error while saving the post to the database'
                })
            })
    }
})

// [PUT] /api/posts/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const change = req.body
    if(!change.title || !change.contents) {
        return res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    }
    Posts.findById(id)
        .then((selectedPost) => {
            if(!selectedPost) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist' 
                })
            } else {
                return Posts.update(id, change)
            }
        })
        .then((canUpdate) => {
            if(canUpdate) {
                res.status(201).json({
                    ...change,
                    id: +id
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

// [DELETE] /api/posts/:id
router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then((post) => {
            if(!post) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                Posts.remove(req.params.id)
                .then((id) => {
                    res.status(200).json(post)
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'The post could not be removed'
                    })
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ 
                message: 'The post could not be removed'
            })
        })
})

// [GET] /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if(comments.length < 1) {
                res.status(404).json({
                    message: `The post with the specified ID does not exist`
                })
            } else {
                res.status(200).json(comments)
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'the comments information could not be retrieved'
            })
        })
})


module.exports = router
