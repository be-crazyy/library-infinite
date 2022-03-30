const UserModel = require('../../commons/toolbox/models/UserModel');
const RentalModel = require('../../commons/toolbox/models/RentalModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../commons/config');

class users {
  async delete_user(req, res) {
    try {
      const user = new UserModel();
      const rental = new RentalModel();
      const user_id = req.user.id;
      const delete_user_id = req.body.user_id;
      if (!delete_user_id || typeof delete_user_id != 'number') {
        return res.json("Delete user_id is invalid");
      }
      const data = user.findById( user_id );
      // // when student wants to delete itself.
      if (data.role == 'STUDENT') {
        const book_data = await rental.find({ 'user_id': user_id });
        if (book_data.length > 0) {
          return res.json("First return all the pending books then only you can delete yourself.");
        }
        await user.delete({ 'user_id': user_id }, { 'deleted_by_user_id': user_id });
        res.json("Student deleted itself succesfully!");
      }
      // when admin wants to delete itself or a student.
      const delete_user = await user.findById( delete_user_id );
      if (!delete_user) {
        return res.json("We can't delete this user as it's not present in the database.");
      }
      else if (delete_user.role === 'STUDENT') {
        // when the admin wants to delete the student.
        const book_data = await rental.find({ 'user_id': delete_user_id });
        if (book_data.length > 0) {
          return res.json("We can't delete this student as it holds some books");
        }
        await user.delete({ 'user_id': delete_user_id }, {'deleted_by_user_id': user_id });
        return res.json("Admin deleted the student succesfully.");
      }
      // when admin wants to delete another admin or delete itself.
      await user.delete({ 'user_id': delete_user_id }, {'deleted_by_user_id': user_id });
      return res.json("Admin deleted the another admin or itself succesfully.");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async get_users(req, res) {
    try {
      const user = new UserModel();
      const data = await user.find({});
      if (data.length === 0) {
        return res.json("Users Database is Empty!");
      }
      return res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async login_user(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = UserModel.user_validation({ email, password });
      if (error) {
        return res.json(error.details[0].message);
      }
      const user = new UserModel();
      const data = await user.find({ 'email': email.toLowerCase() });
      if (data.length === 0) {
        return res.json("User Not exists, please sign up.");
      }
      if (await bcrypt.compare(password, data[0].password)) {
        const user_id = data[0].user_id;
        const token = jwt.sign(
          { id: user_id }, config.JWT_TOKEN_SECRET,
          {
            expiresIn: 86400 // expires in 24 hours
          }
        );
        await user.update({ 'user_id': user_id }, { 'token': token });
        return res.json(`User logged in succesfully!, token = ${token}`);
      }
      return res.json("Invalid Credentials");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async logout_user(req, res) {
    try {
      const user_id = req.user.id;
      const user = new UserModel();
      const data = await user.update({ 'user_id': user_id }, { 'token': null });
      res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async signup_user(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = UserModel.user_validation({ email, password });
      if (error) {
        return res.json(error.details[0].message);
      }
      // checking whether the user exist or not.
      const user = new UserModel();
      const old_user = await user.find({ 'email': email.toLowerCase() });
      if (old_user.length > 0) {
        return res.json("User already exists, Please login");
      }
      const hashed_password = bcrypt.hashSync(password, 10);
      const new_user = await user.create({ 'email': email.toLowerCase(), 'password': hashed_password });
      const { user_id } = new_user;
      const token = jwt.sign(
        { id: user_id }, config.JWT_TOKEN_SECRET,
        {
          expiresIn: 86400 // expires in 24 hours
        }
      );
      const updated_user = await user.update({ 'user_id': user_id }, { 'token': token });
      res.json(updated_user);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async update_user(req, res) {
    try {
      const user = new UserModel();
      const user_id = req.user.id;
      const { password } = req.body;
      const data = await user.find({ 'user_id': user_id });
      const { email } = data[0];
      const { error } = UserModel.user_validation({ email, password });
      if (error) {
        return res.json(error.details[0].message);
      }
      const hashed_password = bcrypt.hashSync(password, 10);
      await user.update({ 'user_id': user_id }, { 'password': hashed_password });
      res.json("User was updated succesfullly!");
    }
    catch (err) {
      console.error(err.message);
    }
  };
};

module.exports = users;

