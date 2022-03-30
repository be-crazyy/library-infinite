const express = require('express')
var router = express.Router();
const auth_middleware = require('../../commons/toolbox/middlewares/auth_middleware');
const is_admin = require('../../commons/toolbox/middlewares/is_admin');
const users = require('../controllers/users.js')
const user = new users();

// for signup
router.post('/users/signup', user.signup_user);

// for login
router.post('/users/login', user.login_user);

// for logout
router.post('/users/logout', auth_middleware, user.logout_user);

// update an user
router.patch('/users', auth_middleware, user.update_user);

// delete an suer
router.delete('/users', auth_middleware, user.delete_user);

// get all users details (only for admins)
router.get('/users', auth_middleware, is_admin, user.get_users);

module.exports = router;