const CategoryModel = require('../../commons/toolbox/models/CategoryModel');

class category {
  async all_category(req, res) {
    try {
      const category = new CategoryModel();
      const { pageSize, page } = req.query;
      const data = await category.find({ 'limit': pageSize, 'page': page });
      if (data.length === 0) {
        return res.json("Categories database is empty.");
      }
      res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async create_category(req, res) {
    try {
      const category = new CategoryModel();
      const { category_name, description } = req.body;
      const { error } = CategoryModel.category_validation({ category_name, description });
      if (error) {
        return res.json(error.details[0].message);
      }
      const user_id = req.user.id;
      const new_category = await category.create({ 'category_name': category_name, 'description': description, 'created_by_user_id': user_id });
      res.json(new_category);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async delete_category(req, res) {
    try {
      const category = new CategoryModel();
      const category_id = req.params.id;
      if (!Number.isInteger(parseInt(category_id))) {
        return res.json("Category ID must be Integer.");
      }
      // // checking whether category_id exists in db or not
      const data = await category.findById( category_id );

      if (!data) {
        return res.json("Category not exists in the database.");
      }
      const user_id = req.user.id;
      await category.delete({ 'category_id': category_id }, {'deleted_by_user_id': user_id });
      res.json("Category was deleted succesfully!");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async get_category(req, res) {
    try {
      const category = new CategoryModel();
      const category_id = req.params.id;
      if (!Number.isInteger(parseInt(category_id))) {
        return res.json("Category ID must be Integer.");
      }
      // // checking whether category_id exists in db or not
      const data = await category.findById( category_id );
      if (!data) {
        return res.json("Category not exists in the database.");
      }
      return res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async update_category(req, res) {
    try {
      const category = new CategoryModel();
      const category_id = req.params.id;
      if (!Number.isInteger(parseInt(category_id))) {
        return res.json("category ID must be integer.");
      }
      const data = await category.findById( category_id );
      if (!data) {
        return res.json("category not exists in the database.");
      }
      const { description } = req.body;
      const { category_name } = data;
      const { error } = CategoryModel.category_validation({ category_name, description });
      if (error) {
        return res.json(error.details[0].message);
      }
      const user_id = req.user.id;
      const updated_data = await category.update({ 'category_id': category_id }, { 'description': description, 'updated_by_user_id': user_id, });
      return res.json(updated_data);
    }
    catch (err) {
      console.error(err.message);
    }
  };
};

module.exports = category;