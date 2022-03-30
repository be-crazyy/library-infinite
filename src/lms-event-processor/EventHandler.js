const Author = require('./toolbox/models/author');
const Category = require('./toolbox/models/category');
const Publisher = require('./toolbox/models/publisher');
const User = require('./toolbox/models/user');
const Rentals = require('./toolbox/models/rentals');
const Book = require('./toolbox/models/book');

class EventHandler {
  constructor(eventData) {
    this.resource = eventData;
  };

  async syncAuthor() {
    const data = new Author(this.resource);
    await data.save();
  };

  async syncBook() {
    const data = new Book(this.resource);
    await data.save();
  };

  async syncCategory() {
    const data = new Category(this.resource);
    await data.save();
  };

  async syncPublisher() {
    const data = new Publisher(this.resource);
    await data.save();
  };

  async syncUser() {
    const data = new User(this.resource[0]);
    await data.save();
  };

  async syncRentals() {
    const data = new Rentals(this.resource);
    await data.save();
  };
};

module.exports = EventHandler;