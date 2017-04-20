

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
        console.log(message);
        lampCtrl.updateLamp(message.value);
    });

    consumer.on('error',function (error) {
        console.log(error);
    });

}

