
const mongoose = require('mongoose');

const EventHandler = require('./EventHandler');
const LMSRabbitMq = require('../commons/toolbox/core-wrapper/LMSRabbitMq');

async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await LMSRabbitMq.connect(`amqp://localhost`);
        const queue = ['author', 'book', 'category', 'publisher', 'rentals', 'my_user'];
        queue.forEach(async (element) => {
            await LMSRabbitMq.listenToQueue(`${element}.queue`, async (msg) => {
                const eventData = JSON.parse(msg.content.toString());
                const eventHandler = new EventHandler(eventData);
                if (element === 'author') await eventHandler.syncAuthor();
                else if (element === 'category') await eventHandler.syncCategory();
                else if (element === 'publisher') await eventHandler.syncPublisher();
                else if (element === 'book') await eventHandler.syncBook();
                else if (element === 'rentals') await eventHandler.syncRentals();
                if (element === 'my_user') await eventHandler.syncUser();
            })
        })
    }
    catch (err) {
        console.error(err.message);
    }
};

start();


