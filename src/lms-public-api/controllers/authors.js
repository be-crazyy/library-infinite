const AuthorModel = require('../../commons/toolbox/models/AuthorModel');

class authors {
    async all_authors(req, res) {
        try {
            const author = new AuthorModel();
            const { pageSize, page } = req.query;
            const data = await author.find({ 'limit': pageSize, 'page': page });
            if (data.length === 0) {
                return res.json("Authors Database is Empty!");
            }
            return res.json(data);
        }
        catch (err) {
            console.error(err.message);
        }
    };

    async create_author(req, res) {
        try {
            const author = new AuthorModel();
            const { author_name, description } = req.body;
            const { error } = AuthorModel.author_validation({ author_name, description });
            if (error) {
                return res.json(error.details[0].message);
            }
            const user_id = req.user.id;
            const new_author = await author.create({ 'author_name': author_name, 'description': description, 'user_id': user_id });
            res.json(new_author);
        }
        catch (err) {
            console.error(err.message);
        }
    };

    async delete_author(req, res) {
        try {
            const author = new AuthorModel();
            const author_id = req.params.id;
            if (!Number.isInteger(parseInt(author_id))) {
                return res.json("Author ID must be integer.");
            }
            // checking whether author_id exists in db or not
            const data = await author.findById( author_id );
            if (!data) {
                return res.json("Author not exists in the database.");
            }
            const user_id = req.user.id;
            await author.delete({ 'author_id': author_id }, {'deleted_by_user_id': user_id});
            res.json("Author was deleted succesfully!");
        }
        catch (err) {
            console.error(err.message);
        }
    };

    async get_author(req, res) {
        try {
            const author = new AuthorModel();
            const author_id = req.params.id;
            if (!Number.isInteger(parseInt(author_id))) {
                return res.json("Author ID must be integer.");
            }
            // checking whether author_id exists in db or not
            const data = await author.findById(author_id);
            if (!data) {
                return res.json("Author not exists in the database.");
            }
            return res.json(data);
        }
        catch (err) {
            console.error(err.message);
        }
    };

    async update_author(req, res) {
        try {
            const author = new AuthorModel();
            const author_id = req.params.id;
            if (!Number.isInteger(parseInt(author_id))) {
                return res.json("Author ID must be Integer.");
            }
            const user_id = req.user.id;
            const data = await author.findById(author_id);
            if (!data) {
                return res.json("Author not exists in the database.");
            }
            const { description } = req.body;
            const { author_name } = data;
            const { error } = AuthorModel.author_validation({ author_name, description });
            if (error) {
                return res.json(error.details[0].message);
            }
            const updated_data = await author.update({ 'author_id': author_id }, { 'description': description, 'updated_by_user_id': user_id, });
            res.json(updated_data);
        }
        catch (err) {
            console.error(err.message);
        }
    };

};

module.exports = authors;
