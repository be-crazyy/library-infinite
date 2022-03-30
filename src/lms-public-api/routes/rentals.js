const express = require('express')
const router = express.Router();
const auth_middleware = require('../../commons/toolbox/middlewares/auth_middleware');
const is_admin = require('../../commons/toolbox/middlewares/is_admin');
const rentals = require('../controllers/rentals.js')
const rental = new rentals();

// create an order
router.post('/rentals/:id', auth_middleware, rental.create_order);

// get all orders || only for admins
router.get('/rentals', auth_middleware, is_admin, rental.show_orders);

// Both for admins and Users.
router.patch('/rentals', auth_middleware, rental.update_order);

module.exports = router;
