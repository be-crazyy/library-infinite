const express = require('express')
const router = express.Router();
const auth_middleware = require('../../commons/toolbox/middlewares/auth_middleware');
const is_admin = require('../../commons/toolbox/middlewares/is_admin');
const books = require('../controllers/books');
const book = new books();

// for books (Only for admin)
router.post('/books', auth_middleware, is_admin, book.create_book);

router.patch('/books/:id', auth_middleware, is_admin, book.update_book);

router.delete('/books/:id', auth_middleware, is_admin, book.delete_book);

// all books details
router.get('/books', auth_middleware, book.all_books);

// book details
router.get('/books/:id', auth_middleware, book.get_book);

module.exports = router;
