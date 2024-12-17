const { readTime } = require('../utils/helpers')
const Post = require("../models/postModel")

const getAllPost = async ({ author_id, title, state, tags, sortBy, order, page, perPage}) => {
    const query = { }
    const sortOption = {};
    if(author_id){
        query.author = author_id
    };
    if(title){
        query.title = title
    };
    if(state){
        query.state = state
    };
    if(tags){
        query.tags = tags
    };
    sortOption[sortBy] = order === "desc" ? -1 : 1;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(perPage, 10),
        sort: sortOption,
      };
    const posts = await Post.paginate(query, options)
    if(!posts){
        throw new Error('No post found')
    };
    return posts
}

const getPost = async (id, author) => {
    const post = await Post.find({ _id: id}).populate("author", "firstname lastname email")
    if(!post){
        throw new Error('Post not found!')
    };
    //check if post is in draft state and authorize user 
    if(post[0].state == 'draft'){
        if(author){
            //authorize the user
        if(post[0].author._id.toString() !== author.id){
            throw new Error('Unauthorized')
        }
        else{
            return post
        }
        }
        else{
            throw new Error('Unauthorized')
        }
    }
    //update post read count if request is not from it's author
    try{
        if(!author || (post[0].author._id.toString() !== author.id)){
            //update the read count and return the post
            await Post.findOneAndUpdate({_id: id}, {$inc: {read_count: 1}}, {new: true})
            return post
        }
        //return post for author without updating the read count
        return post
    }
    catch(err){
        throw new Error(err.message)
    }
}

const createPost = async (title, description, tags, body, author) => {
    const newPost = await Post.create({
        title,
        description, 
        tags, 
        body, 
        author,
        reading_time: readTime(body)
    })
    if(!newPost){
        throw new Error('Unable to create post');

    };
    return newPost

}

const deletePost = async (id, author) => {
    try{
        const post = await Post.findById(id)
        if(!post){
            throw new Error("Post Not Found")
        }
        if(post.author !== author.id){
            throw new Error("Sorry, you are not allowed to delete this post")

        }
        await Post.findByIdAndDelete(id)
        return true
    }
    catch(err){
        throw new Error(err.message)
    }
}

module.exports = {
    getAllPost,
    getPost,
    createPost,
    deletePost
}