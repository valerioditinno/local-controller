var config = require('../controller/util/config');

var http = require("http");

exports.updateLamp = updateLampFn;

exports.insertLamp = insertLampFn;

exports.deleteLamp = deleteLampFn;



function updateLampFn(myObject) {

    myObject.id;

    config;

    //Rest
    var options = {
        "method": "POST",
        "hostname": "localhost",
        "port": "8080",
        "path": "/updateLamp"
    };

    var req = http.request(options, function (result) {


        resultzip.on("data", function () {

        });

        resultzip.on("end", function () {


        });
    });
}

function deleteLampFn(request,response) {


    console.log(request)
    response.status(200).send({
        status: "S",
        message: "Updated preferences"
    });

    //Rest
    var options = {
        "method": "POST",
        "hostname": "localhost",
        "port": "8080",
        "path": "/updateLamp"
    };

    var req = http.request(options, function (result) {


        resultzip.on("data", function () {

        });

        resultzip.on("end", function () {


        });
    });
}

function insertLampFn(request,response) {

    console.log(request);
    response.status(200).send({
        status: "S",
        message: "Done"
    });

    //Rest
    var options = {
        "method": "POST",
        "hostname": "localhost",
        "port": "8080",
        "path": "/updateLamp"
    };

    var req = http.request(options, function (result) {


        resultzip.on("data", function () {

        });

        resultzip.on("end", function () {


        });
    });
}

