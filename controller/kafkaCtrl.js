

var lampCtrl = require('../controller/lampCtrl');

exports.initKafka = initKafkaFn;


function initKafkaFn() {
    var topics = [ 'rank','warning_hour'
        ,'warning_day'
        ,'warning_hour'
        ,'warning_week'
        ,'hour_lamp_cons'
        ,'day_lamp_cons'
        ,'week_lamp_cons'
        ,'hour_street_cons'
        ,'day_street_cons'
        ,'week_street_cons'
        ,'hour_city_cons'
        ,'day_city_cons'
        ,'week_city_cons'];
    var kafkaTopics = [];
    for (var i = 0 ; i < topics.length ; i++){
        var topic = {};
        topic.topic = topics[i];
        topic.partition = 0;
        kafkaTopics.push(topic)
    }
    var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.Client('localhost:2181'),
        consumer = new Consumer(
            client,
            kafkaTopics
            ,
            {
                autoCommit: false
            }
        );

    consumer.on('message', function (message) {
        console.log(message);
        lampCtrl.updateLamp(message.value);
    });

    consumer.on('error',function (error) {
        console.log(error);
    });

}

