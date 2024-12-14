const router = require('express').Router()
const { getUserPosts, getUserPost } = require('../controllers/userControllers')


router.get('/posts', getUserPosts)
router.get('/posts/:id', getUserPost)

module .exports = router