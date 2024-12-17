const router = require('express').Router()
const { getUserPosts, getUserPost, createUserPost, deletePostById } = require('../controllers/userControllers')
const validateRequest = require('../middlewares/validateRequest')
const {postSchema} = require('../validations/postValidation')

router.get('/posts', getUserPosts)
router.get('/posts/:id', getUserPost)
router.post('/posts', validateRequest(postSchema), createUserPost)
router.delete('/posts/:id', deletePostById)

module .exports = router