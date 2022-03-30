const BookModel = require('../../commons/toolbox/models/BookModel');
const AuthorModel = require('../../commons/toolbox/models/AuthorModel');
const PublisherModel = require('../../commons/toolbox/models/PublisherModel');
const CategoryModel = require('../../commons/toolbox/models/CategoryModel');

class books {
  async all_books(req, res) {
    try {
      const book = new BookModel();
      const { pageSize, page } = req.query;
      const data = await book.find({ 'limit': pageSize, 'page': page });
      if (data.length === 0) {
        return res.json("Books database is empty.");
      }
      return res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async create_book(req, res) {
    try {
      const book = new BookModel();
      const author = new AuthorModel();
      const publisher = new PublisherModel();
      const category = new CategoryModel();

      const { book_name, description, author_id, category_id, publisher_id } = req.body;
      const { error } = BookModel.book_validation({ book_name, description, author_id, category_id, publisher_id });
      if (error) {
        return res.json(error.details[0].message);
      }
      const author_data = await author.findById( author_id );
      if (!author_data) {
        return res.json("Author ID not exists in the database. Please insert the author details first.");
      }
      const category_data = await category.findById( category_id );
      if (!category_data) {
        return res.json("Category ID not exists in the database. Please insert the category details first.");
      }
      const publisher_data = await publisher.findById( publisher_id );
      if (!publisher_data) {
        return res.json("Publisher ID not exists in the database. Please insert the publisher details first.");
      }
      const user_id = req.user.id;
      const new_book = await book.create({ 'book_name': book_name, 'description': description, 'author_id': author_id, 'category_id': category_id, 'publisher_id': publisher_id, 'created_by_user_id': user_id });
      res.json(new_book);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async delete_book(req, res) {
    try {
      const book = new BookModel();
      const book_id = req.params.id;
      if (!Number.isInteger(parseInt(book_id))) {
        return res.json("Book ID must be Integer.");
      }
      // checking whether book_id exists in db or not
      const data = await book.findById( book_id );
      if (!data) {
        return res.json("Book not exists in the database.");
      }
      const user_id = req.user.id;
      await book.delete({ 'book_id': book_id }, {'deleted_by_user_id': user_id});
      res.json("Book was deleted succesfully!");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async get_book(req, res) {
    try {
      const book = new BookModel();
      const book_id = req.params.id;
      if (!Number.isInteger(parseInt(book_id))) {
        return res.json("Book ID must be Integer.");
      }
      // checking whether book_id exists in db or not
      const data = await book.findById( book_id );
      if (!data) {
        return res.json("Book not exists in the database.");
      }
      return res.json(data);
    }
    catch (err) {
      console.error(err.message); 
    }
  };

  async update_book(req, res) {
    try {
      const book = new BookModel();
      const book_id = req.params.id;
      if (!Number.isInteger(parseInt(book_id))) {
        return res.json("Book ID must be Integer.");
      }
      const { description } = req.body;
      const { error } = BookModel.book_validation({ description });
      if (error) {
        return res.json(error.details[0].message);
      }
      const data = await book.findById( book_id );
      if (!data) {
        return res.json("Book not exists in the database.");
      }
      const user_id = req.user.id;
      const updated_data = await book.update({ 'book_id': book_id }, { 'description': description, 'updated_by_user_id': user_id, });
      return res.json(updated_data);
    }
    catch (err) {
      console.error(err.message);
    }
  };
};

module.exports = books;