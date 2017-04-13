var config = require('../controller/util/config');

var requestModule = require('request');

var lightSystemDb = null;


exports.updateLamp = updateLampFn;

exports.insertLamp = insertLampFn;

exports.deleteLamp = deleteLampFn;



function updateLampFn(myObject) {


    if (!myObject.id || !myObject.intensityAdjustment){
        console.log("Invalid Object");
        return;
    }

    if (!lightSystemDb)
        lightSystemDb = cloudantCtrl.getLightSystemDb();

    var host = config[myObject.id];
    var options = { method: 'POST',
        url: 'http://'+host+'/adjustStreetLampLigthIntensity/',
        headers: {
                'content-type': 'application/json'
            },
        body: myObject,
        json: true };

    requestModule(options, function (error, response, body) {
        if (error){
            console.log(error);
            return;
        }else{
            console.log("Adjustment{id-value}:"+myObject.id + " - " + myObject.intensityAdjustment);
        }
    });

}

function deleteLampFn(request,response) {


    if (!request.params.id){
        response.status(400).send({status:"E",message:"Bad input"});
        return;
    }

    var host = config[request.params.id];
    var options = { method: 'POST',
        url: 'http://'+host+'/deleteStreetLamp/',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            "id":request.params.id
        },
        json: true };

    requestModule(options, function (error, res, body) {
        if (error || res.statusCode >= 400){
            console.log(error);
            response.status(500).send({status:"E",message:"Internal Server Error"});
            return;
        }else{
            response.status(200).send({status:"S",message:"Deleted {id}:" + request.params.id});
            return;
        }
    });
}

function insertLampFn(request,response) {
    //parse body
    if (!request.body || !request.body.id || !request.body.position ||
        !request.body.lightIntensity || !request.body.bulbModel || !request.body.powerConsumption ||
        !request.body.state || !request.body.lastSubstitutionDate){
        response.status(400).send({status:"E",message:"Bad Input"});
        return;
    }
    var host = config[request.body.id];
    var options = { method: 'POST',
        url: 'http://'+host+'/insertNewStreetLamp/',
        headers: {
            'content-type': 'application/json'
        },
        body: request.body,
        json: true };

    requestModule(options, function (error, res, body) {
        if (error || res.statusCode >= 400){
            console.log(res);
            console.log(body);
            response.status(500).send({status:"E",message:"Internal Server Error"});
            return;
        }else{
            response.status(200).send({status:"S",message:"Added new Lamp {id}:" + request.body.id});
            return;
        }
    });
}

