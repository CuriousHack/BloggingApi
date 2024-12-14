const { getAllPost, getPost } = require('../services/postServices')
const getUserPosts = async (req, res) => {
    try{
        const posts = await getAllPost( { author: req.user.id })
        res.status(200).json({success: true, posts})
    }
    catch(err){
        res.status(500).json({ success: false, message: err.message })
    }
}

const getUserPost = async (req, res) => {
    try{
        const id = req.params.id
        const post = await getPost({_id: id, author: req.user.id })
        res.status(200).json({ success: true, post})
    }
    catch(err){
        res.status(404).json({ success: false, message: err.message})
    }
}

module.exports = {
    getUserPosts,
    getUserPost
}