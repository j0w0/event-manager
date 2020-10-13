const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// const checkAuth = require('../../utils/checkAuth');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

/*---------- Protected Routes ----------*/

module.exports = router;