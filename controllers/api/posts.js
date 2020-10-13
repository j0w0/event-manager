const Post = require('../../models/post');

module.exports = {
    index,
    create
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