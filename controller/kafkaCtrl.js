

var lampCtrl = require('../controller/lampCtrl');

exports.initKafka = initKafkaFn;


function initKafkaFn() {


    var kafka = require('kafka-node'),
        Consumer = kafka.Consumer,
        client = new kafka.Client('localhost:2181'),
        consumer = new Consumer(
            client,
            [{topic:'adjustment_data',partition:0}]
            ,
            {
                autoCommit: false
            }
        );


    consumer.on('message', function (message) {
        var messageObject = JSON.parse(message.value);
        lampCtrl.updateLamp(messageObject);
    });

    consumer.on('error',function (error) {
        console.log(error);
    });

}

