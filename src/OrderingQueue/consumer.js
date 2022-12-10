const { Kafka } = require("kafkajs");
const clientId = "order-queue";

const brokers = ["localhost:9092"];
const topic = "order-queue-topic";

const kafka = new Kafka({clientId, brokers});
const consumer = kafka.consumer({ groupId: clientId })

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`)
		},
	})
}

module.exports = consume

/*
docker exec --interactive --tty broker \
kafka-console-consumer --bootstrap-server broker:9092 \
                       --topic order-queue-topic \
                       --from-beginning
*/