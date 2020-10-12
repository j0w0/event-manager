const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
// router.post('/', checkAuth, scoresCtrl.create);

/*--  Helper Functions --*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;