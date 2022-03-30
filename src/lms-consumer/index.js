const mongoose = require('mongoose');
const express = require('express');
const app = express();
const highestRentedAuthor = require('./controllers/highest-rented-author');
const highestRentedBook = require('./controllers/highest-rented-book');
const highestRentedPublisher = require('./controllers/highest-rented-publisher');
const highestRentedCustomer = require('./controllers/highest-rented-customer');

app.use(express.json()); // -> req.body
const PORT = 4000;
let db;

function start() {
    try {
        db = mongoose.connect("mongodb://localhost:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    catch (err) {
        console.error(err.message);
    }
};

if (!db) start();

app.get('/highest-rented-book', highestRentedBook);

app.get('/highest-rented-author', highestRentedAuthor);

app.get('/highest-rented-publisher', highestRentedPublisher);

app.get('/highest-rented-customer', highestRentedCustomer);

app.listen(PORT, async () => {
    console.log(`App listening on port ${PORT}`);
});