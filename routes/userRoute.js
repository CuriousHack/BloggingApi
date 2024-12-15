const router = require('express').Router()
const { getUserPosts, getUserPost, createUserPost } = require('../controllers/userControllers')
const validateRequest = require('../middlewares/validateRequest')
const {postSchema} = require('../validations/postValidation')

router.get('/posts', getUserPosts)
router.get('/posts/:id', getUserPost)
router.post('/posts', validateRequest(postSchema), createUserPost)

module .exports = router