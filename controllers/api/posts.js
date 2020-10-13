const Post = require('../../models/post');

module.exports = {
    index,
    create,
    show,
    update,
    delete: deletePost
};

async function index(req, res) {
    try {
        const posts = await Post.find({});
        if (!posts) return res.status(401).json({err: 'No posts'});
        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function create(req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function show(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function update(req, res) {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch(err) {
        res.status(400).json(err);
    }
}

async function deletePost(req, res) {
    try {
        const deletedPost = await Post.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPost);
    } catch(err) {
        res.status(400).json(err);
    }
}