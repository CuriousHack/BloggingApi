const Post = require("../models/postModel")

const getAllPost = async () => {
    const posts = await Post.find({}).populate("author", "firstname lastname email")
    if(!posts){
        throw new Error('No post found')
    };
    return posts
}

const getPost = async (id) => {
    const post = await Post.find({ _id: id}).populate("author", "firstname lastname email")
    if(!post){
        throw new Error('Post not found!')
    };
    return post
}

module.exports = {
    getAllPost,
    getPost
}