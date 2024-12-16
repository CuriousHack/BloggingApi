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
    // const author = author ?? null
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
    return post
}

const createPost = async (title, description, tags, body, author) => {
    const newPost = await Post.create({
        title,
        description, 
        tags, 
        body, 
        author,
        reading_time: "1 minute"
    })
    if(!newPost){
        throw new Error('Unable to create post');

    };
    return newPost

}

module.exports = {
    getAllPost,
    getPost,
    createPost
}