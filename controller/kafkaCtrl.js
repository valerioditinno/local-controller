

var lampCtrl = require('../controller/lampCtrl');

exports.initKafka = initKafkaFn;


function initKafkaFn() {

    var topics = [ 'adjustment_data'];

    var kafkaTopics = [];
    for (var i = 0 ; i < topics.length ; i++){
        var topic = {};
        topic.topic = topics[i];
        topic.partition = 0;
        topic.time = -1;
        topic.maxNum = 1;
        kafkaTopics.push(topic)
    }
    var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.Client('localhost:2181'),
        offset = new kafka.Offset(client);

    offset.fetch(kafkaTopics, function (err, data) {
        var consumerTopics = [];
        for (var i = 0 ; i < kafkaTopics.length; i++){
            var topic = {};
            topic.topic = kafkaTopics[i].topic;
            topic.partition = 0;
            topic.offset = data[topic.topic][0][0];
            consumerTopics.push(topic);
        }
        var consumer = new Consumer(
            client,
            consumerTopics,
            {
                autoCommit: false,
                fromOffset: true
            }
        );
        consumer.on('message', function (message) {
            console.log("topic : " + message.topic);
            console.log("topic content: " + message.value);
            var myObject = JSON.parse(message.value);
            lampCtrl.updateLamp(myObject);
        });
        consumer.on('error',function (error) {
            console.log(error);
        })
    });


}

