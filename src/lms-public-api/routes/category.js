const express = require('express')
const router = express.Router();
const auth_middleware = require('../../commons/toolbox/middlewares/auth_middleware');
const is_admin = require('../../commons/toolbox/middlewares/is_admin');
const category = require('../controllers/category');
const categories = new category();

// for publisher (Only for admin)
router.post('/category', auth_middleware, is_admin, categories.create_category);

router.patch('/category/:id', auth_middleware, is_admin, categories.update_category);

router.delete('/category/:id', auth_middleware, is_admin, categories.delete_category);

// all categories details
router.get('/category', auth_middleware, categories.all_category);

// category details
router.get('/category/:id', auth_middleware, categories.get_category);

module.exports = router;
