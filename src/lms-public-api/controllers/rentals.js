const RentalModel = require('../../commons/toolbox/models/RentalModel');
const BookModel = require('../../commons/toolbox/models/BookModel');

class rentals {
  async create_order(req, res) {
    try {
      const rental = new RentalModel();
      const book_id = req.params.id;
      if (!Number.isInteger(parseInt(book_id))) {
        return res.json("Book ID must be an Integer.");
      }
      const book = new BookModel();
      // checking whether book_id exists in db or not
      const book_data = await book.findById( book_id );
      if (!book_data) {
        return res.json("Book not exists in the database.");
      }
      const data = await rental.find({ 'book_id': book_id });
      if (data.length > 0) {
        return res.json("Book not available for rent");
      }
      const user_id = req.user.id;
      await rental.create({ 'book_id': book_id, 'user_id': user_id });
      res.json("Book Requested, Please wait for the admin approval");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async show_orders(req, res) {
    try {
      const rental = new RentalModel();
      const data = await rental.find({ 'rental_status': 'REQUESTED' });
      if (data.length === 0) {
        return res.json("No incoming requests for books.");
      }
      return res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async update_order(req, res) {
    try {
      const rental = new RentalModel();
      const { rental_no, rental_status } = req.body;
      const user_id = req.user.id;
      const { error } = RentalModel.rental_validation({ rental_no, rental_status });
      if (error) {
        return res.json(error.details[0].message);
      }
      const data = await rental.find({ 'user_id': user_id });
      if (data[0].role === "ADMIN") {
        // Admin wants to accept the student request and will change the status to "RENTED".
        if (rental_status === "RENTED") {
          const rented_at = new Date();
          await rental.update({ 'rental_no': rental_no }, { 'rented_at': rented_at, 'rental_status': rental_status });

          return res.json("Admin approves the request succesfully.");
        }
        else if (rental_status === "REJECTED") {
          const rejected_at = new Date();
          await rental.update({ 'rental_no': rental_no }, { 'rejected_at': rejected_at, 'rental_status': rental_status });

          return res.json("Admin rejected the request succesfully.");
        }
        return res.json("Invalid rental_status value for the admin");
      }
      else {
        // nornal user
        if (rental_status === "CANCELLED") {
          const cancelled_at = new Date();
          await rental.update({ 'rental_no': rental_no }, { 'cancelled_at': cancelled_at, 'rental_status': rental_status, 'status': false });

          return res.json("User cancelled it's previous request succesfully.");
        }
        else if (rental_status === "RETURNED") {
          // RETURNED
          const returned_at = new Date();
          await rental.update({ 'rental_no': rental_no }, { 'returned_at': returned_at, 'rental_status': rental_status, 'status': false });

          return res.json("User returned the book succesfully.");
        }
        return res.json("Invalid rental_status value for the student");
      }
    }
    catch (err) {
      console.error(err.message);
    }
  };
};

module.exports = rentals;