const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const checkAuth = require('../../utils/checkAuth');

/*---------- Public Routes ----------*/
router.get('/', postsCtrl.index); // all posts
router.get('/:id', postsCtrl.show); // single post

/*---------- Protected Routes ----------*/
router.post('/', checkAuth, postsCtrl.create); // create post
router.put('/:id', checkAuth, postsCtrl.update); // update post
router.delete('/:id', checkAuth, postsCtrl.delete); // delete post

module.exports = router;