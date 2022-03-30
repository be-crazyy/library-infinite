const express = require('express')
const router = express.Router();
const auth_middleware = require('../../commons/toolbox/middlewares/auth_middleware');
const is_admin = require('../../commons/toolbox/middlewares/is_admin');
const authors = require('../controllers/authors');
const author = new authors();

// for authors (Only for admin) || Create an author.
router.post('/authors', auth_middleware, is_admin, author.create_author);

// update an author by id
router.patch('/authors/:id', auth_middleware, is_admin, author.update_author);

// delete an author by id
router.delete('/authors/:id', auth_middleware, is_admin, author.delete_author);

// get all authors details
router.get('/authors', auth_middleware, author.all_authors);

// get an author by id
router.get('/authors/:id', auth_middleware, author.get_author);

module.exports = router;
