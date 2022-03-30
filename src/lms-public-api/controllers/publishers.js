const PublisherModel = require('../../commons/toolbox/models/PublisherModel');

class publishers {
  async all_publishers(req, res) {
    try {
      const publisher = new PublisherModel();
      const { pageSize, page } = req.query;
      const data = await publisher.find({ 'limit': pageSize, 'page': page });
      if (data.length === 0) {
        return res.json("Publisher's database is empty.");
      }
      res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async create_publisher(req, res) {
    try {
      const publisher = new PublisherModel();
      const { publisher_name, description } = req.body;
      const { error } = PublisherModel.publisher_validation({ publisher_name, description });
      if (error) {
        return res.json(error.details[0].message);
      }
      const user_id = req.user.id;
      const new_publisher = await publisher.create({ 'publisher_name': publisher_name, 'description': description, 'user_id': user_id });
      res.json(new_publisher);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async delete_publisher(req, res) {
    try {
      const publisher = new PublisherModel();
      const publisher_id = req.params.id;
      if (!Number.isInteger(parseInt(publisher_id))) {
        return res.json("Publisher ID must be Integer.");
      }
      // // checking whether publisher_id exists in db or not
      const data = await publisher.findById( publisher_id );
      if (!data) {
        return res.json("Publisher not exists in the database.");
      }
      const user_id = req.user.id;
      await publisher.delete({ 'publisher_id': publisher_id }, {'deleted_by_user_id': user_id});
      res.json("Publisher was deleted succesfully!");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async get_publisher(req, res) {
    try {
      const publisher = new PublisherModel();
      const publisher_id = req.params.id;
      if (!Number.isInteger(parseInt(publisher_id))) {
        return res.json("Publisher ID must be Integer.");
      }
      // checking whether publisher_id exists in db or not
      const data = await publisher.findById( publisher_id );
      if (!data) {
        return res.json("Publisher not exists in the database.");
      }
      res.json(data);
    }
    catch (err) {
      console.error(err.message);
    }
  };

  async update_publisher(req, res) {
    try {
      const publisher = new PublisherModel();
      const publisher_id = req.params.id;
      if (!Number.isInteger(parseInt(publisher_id))) {
        return res.json("publisher ID must be integer.");
      }
      const data = await publisher.findById( publisher_id );
      if (!data) {
        return res.json("Publisher not exists in the database.");
      }
      const { description } = req.body;
      const { publisher_name } = data;
      const { error } = PublisherModel.publisher_validation({ publisher_name, description });
      if (error) {
        return res.json(error.details[0].message);
      }
      const user_id = req.user.id;
      const updated_data = await publisher.update({ 'publisher_id': publisher_id }, { 'description': description, 'updated_by_user_id': user_id, });
      return res.json(updated_data);
    }
    catch (err) {
      console.error(err.message);
    }
  };
}

module.exports = publishers;