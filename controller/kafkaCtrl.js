/*var kafka = require('kafka')

var lampCtrl = require('../controller/lampCtrl');

exports.initKafka = initKafkaFn;

function initKafkaFn() {


    var consumer = new kafka.Consumer({
        // these are the default values
        host:         'localhost',
        port:          9092,
        pollInterval:  2000,
        maxSize:       1048576 // 1MB
    })
    consumer.on('message', function(topic, message) {
        console.log(message)
    })
    consumer.connect(function() {
        consumer.subscribeTopic({name: 'lampInfo', partition: 0})
    })
}*/




// create a kafkaesqe client, providing at least one broker
var kafkaesque = require('kafkaesque')({
    brokers: [{host: 'localhost', port: 9092}]
});

// subscribe to a partitioned topic
// this topic can have a large number of partitions, but using kafkaesque,
// these can be split evenly between members of the group.
kafkaesque.subscribe('lampInfo');

// connect gives a nice EventEmitter interface for receiving messages
kafkaesque.connect(function (err, kafka) {
    if (err) {
        throw new Error('problem connecting to auto managed kafka cluster' + err);
    }

    // handle each message
    kafka.on('message', function(message, commit) {
        console.log(message.value);
        // once a message has been successfull handled, call commit to advance this
        // consumers position in the topic / parition
        commit();
    });

    // report errors
    kafka.on('error', function(error) {
        console.log(error);
    });
});