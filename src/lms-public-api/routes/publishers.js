const express = require('express')
const router = express.Router();
const auth_middleware = require('../../commons/toolbox/middlewares/auth_middleware');
const is_admin = require('../../commons/toolbox/middlewares/is_admin');
const publishers = require('../controllers/publishers');
const publisher = new publishers();

// for publisher (Only for admin)
router.post('/publishers', auth_middleware, is_admin, publisher.create_publisher);

router.patch('/publishers/:id', auth_middleware, is_admin, publisher.update_publisher);

router.delete('/publishers/:id', auth_middleware, is_admin, publisher.delete_publisher);

// all publishers details
router.get('/publishers', auth_middleware, publisher.all_publishers);

// publisher details
router.get('/publishers/:id', auth_middleware, publisher.get_publisher);

module.exports = router;
