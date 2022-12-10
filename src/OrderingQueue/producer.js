// https://kafka.js.org/docs/getting-started
// https://kafka.js.org/docs/getting-started
const { Kafka } = require("kafkajs");
const clientId = "order-queue";

const brokers = ["localhost:9092"];
const topic = "order-queue-topic";

const kafka = new Kafka({clientId, brokers});
const producer = kafka.producer();

const produce = async () => {
    await producer.connect()

    let index = 0;

    setInterval( async () => {
        try{
            await producer.send({
                topic,
                messages :[
                    {
                        key: String(index),
                        value: `Order_id:${index}`
                    }
                ]
            });
            console.log(`Item ${index} Ordered`);
            index++;
        }catch(error){
            console.error(`An error occured ${error}`);
        }
    }, 1000);
}

module.exports = produce;
/*
docker exec broker \
kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic order-queue-topic
*/