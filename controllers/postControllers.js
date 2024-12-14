const { getAllPost, getPost } = require('../services/postServices')
const getPosts = async (req, res) => {
    try{
        const posts = await getAllPost()
        res.status(200).json({success: true, posts})
    }
    catch(err){
        res.status(400).json({ success: false, message: err.message })
    }
}

const getSinglePost = async (req, res) => {
    try{
        const id = req.params.id
        const post = await getPost(id)
        res.status(200).json({ success: true, post})
    }
    catch(err){
        res.status(404).json({ success: false, message: err.message})
    }

}

module.exports = {
    getPosts, getSinglePost
}