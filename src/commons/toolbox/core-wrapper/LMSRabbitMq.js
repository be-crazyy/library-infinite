const amqp = require('amqplib');

const LMSRabbitMq = {
    connection: null,
    channels: {},
    connect: async (connectionString) => {
        try {
            if (!LMSRabbitMq.connection) {
                LMSRabbitMq.connection = await amqp.connect(connectionString);
            }
        }
        catch (err) {
            await LMSRabbitMq.connection.close();
            console.error(err.message);
        }
    },
    publish: async (queueName, message) => {
        try {
            if (!LMSRabbitMq.connection) await LMSRabbitMq.connect(`amqp://localhost`);
            if (!LMSRabbitMq.channels[queueName]) {
                LMSRabbitMq.channels[queueName] = await LMSRabbitMq.connection.createChannel();
            }
            await LMSRabbitMq.channels[queueName].assertQueue(queueName, {
                durable: true
            });
            await LMSRabbitMq.channels[queueName].sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        }
        catch (err) {
            await LMSRabbitMq.channels[queueName].close();
            console.error(err.message);
        }
    },
    listenToQueue: async (queueName, messageHandler) => {
        try {
            if (!LMSRabbitMq.connection) await LMSRabbitMq.connect(`amqp://localhost`);
            if (!LMSRabbitMq.channels[queueName]) {
                LMSRabbitMq.channels[queueName] = await LMSRabbitMq.connection.createChannel();
            }
            await LMSRabbitMq.channels[queueName].assertQueue(queueName, {
                durable: true
            });
            await LMSRabbitMq.channels[queueName].consume(queueName, messageHandler, {
                noAck: true
            });
            console.log('Connection Established RabbitMq!');
        }
        catch (err) {
            await LMSRabbitMq.channels[queueName].close();
            console.error(err.message);
        }
    },
};
module.exports = LMSRabbitMq;