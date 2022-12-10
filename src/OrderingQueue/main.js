/*
https://www.w3schools.com/nodejs/
https://www.cloudbees.com/blog/node-js-tutorial
https://www.sohamkamani.com/nodejs/working-with-kafka/
https://www.softwaretestingmaterial.com/api-test-cases-in-postman-using-javascript/
https://www.youtube.com/watch?v=z0MimkXIvE8
https://www.youtube.com/watch?v=Pm28JXFAu4Y
https://developer.confluent.io/quickstart/kafka-docker/
*/
let http = require('http')
const produce = require("./producer");
const consumer = require("./consumer");
http.createServer(function (req, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hi!')

}).listen(8080);
console.log('Main Ordering Service Running on port 8080');

produce().catch((error) => {
    console.error(`An error occured in the producer: ${error}`);
});

consumer().catch((error )=>{
    console.error(`An error occured in the consumer: ${error}`);
});