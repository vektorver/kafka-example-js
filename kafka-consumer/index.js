const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'consumer',
    brokers: ['kafka-broker:9092']
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const folderName = message.value.toString();

            console.log(`Consumer received message "${folderName}"`);

            // delay 3 seconds to simulate processing time
            await new Promise(r => setTimeout(r, 3000));
        },
    });
};

run().catch(console.error);