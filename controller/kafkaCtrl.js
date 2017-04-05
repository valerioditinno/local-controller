var Kafka = require('node-rdkafka');

var lampCtrl = require('lampCtrl');

exports.initKafka = initKafkaFn;

function initKafkaFn() {

    var consumer = new Kafka.KafkaConsumer({
        'group.id': 'kafka',
        'metadata.broker.list': 'localhost:9092',
    }, {});

    var stream = consumer.getReadStream('lampInfo');

    consumer.connect();


    consumer
        .on('ready', function() {
            consumer.subscribe(['lampInfo']);

            // Consume from the librdtesting-01 topic. This is what determines
            // the mode we are running in. By not specifying a callback (or specifying
            // only a callback) we get messages as soon as they are available.
            consumer.consume(function (err,message) {

                console.log("message"+message);
            });
        })
        .on('data', function(data) {
            // Output the actual message contents
            console.log(data.value.toString());
            var myValue = data.value.toString();
            var myObj = JSON.parse(myValue);
            lampCtrl.updateLamp(myObj);
        })
        .on('error',function (err) {
            console.log(err);
        });
}




