
var cfenv = require('cfenv');
var bodyParser = require('body-parser');

var express = require('express');
var kafkaCtrl = require('./controller/kafkaCtrl');
// create a new express server
var app = express();
app.use(bodyParser.json());

require('./routes/route')(app);

kafkaCtrl.initKafka();

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
