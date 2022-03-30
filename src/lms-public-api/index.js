const express = require('express');
const app = express();
const config = require('../commons/config');
const users = require('./routes/users');
const authors = require('./routes/authors');
const books = require('./routes/books');
const category = require('./routes/category');
const publishers = require('./routes/publishers');
const rentals = require('./routes/rentals');
app.use(express.json()); // -> req.body

app.use('/', users);
app.use('/', authors);
app.use('/', publishers);
app.use('/', category);
app.use('/', books);
app.use('/', rentals);

app.listen(config.PORT, async () => {
  console.log(`App listening on port ${config.PORT}`);
});