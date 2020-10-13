const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const checkAuth = require('../../utils/checkAuth');

/*---------- Public Routes ----------*/
router.get('/', postsCtrl.index);

/*---------- Protected Routes ----------*/
router.post('/', checkAuth, postsCtrl.create);

module.exports = router;