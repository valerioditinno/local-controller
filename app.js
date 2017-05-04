/**
 * Cloud Foundry environment
 */
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var express = require('express');

/**
 * Kafka Controller in controller directory
 */
var kafkaCtrl = require('./controller/kafkaCtrl');


/**
 * Create new express Server
 */
var app = express();

/**
 * Parse JSON body
 */
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    if (req.method.match(/get/i)) {
        // Set header for prevent caching
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        res.setHeader("Pragma", "no-cache");

        res.setHeader("Expires", 0);
    }
    next();
});

/**
 * route module for REST API
 */
require('./routes/route')(app);

/**
 * Init Kafka consumer
 */
kafkaCtrl.initKafka();

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
