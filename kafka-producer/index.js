const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const port = 3000;

const kafka = new Kafka({
    clientId: 'producer', brokers: ['kafka-broker:9092']
});

const producer = kafka.producer();


app.get('/send', async (req, res) => {
    await producer.connect();
    await producer.send({
        topic: 'test-topic', messages: [{value: 'Hello KafkaJS user!'}],
    });
    await producer.disconnect();
    res.send('Message sent to Kafka');
});


app.listen(port, () => {
    console.log(`Producer running at http://localhost:${port}`);
});