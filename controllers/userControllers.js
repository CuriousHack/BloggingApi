const { getAllPost, getPost, createPost, deletePost } = require('../services/postServices')
const getUserPosts = async (req, res) => {
    try{
        const { state } = req.query
        const posts = await getAllPost( { author: req.user.id, state })
        res.status(200).json({success: true, posts})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message })
    }
}

const getUserPost = async (req, res) => {
    try{
        const id = req.params.id
        // console.log(req.user)
        const post = await getPost(id, req.user)
        res.status(200).json({ success: true, post})
    }
    catch(err){
        res.status(404).json({ success: false, message: err.message})
    }
}

const createUserPost = async (req, res) => {
    const {title, description, tags, body } = req.body
    const author = req.user.id
    try{
        const post = await createPost(title, description, tags, body, author)
        res.status(201).json({ success: true, post})
    }
    catch(err){
        res.status(400).json({success: false, message: err.message})
    }
}

const updatePostById = async (req, res) => {

}

const deletePostById = async (req, res) => {
    const author = req.user
    const id = req.params.id
    try{
        

        const deleted = await deletePost(id, author)
        res.status(200).json({success: true, deleted})
    }
    catch(err){
        res.status(404).json({ success:false, message: err.message })
    }
}

module.exports = {
    getUserPosts,
    getUserPost,
    createUserPost,
    updatePostById,
    deletePostById
}