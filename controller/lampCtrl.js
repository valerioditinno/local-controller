var config = require('../controller/util/config');

var requestModule = require('request');

exports.updateLamp = updateLampFn;

exports.insertLamp = insertLampFn;

exports.deleteLamp = deleteLampFn;



function updateLampFn(myObject) {

    /**
     * Control over object field
     */
    if (!myObject.lampId || !myObject.lightIntensityAdjustment ){
        console.log("Invalid Object");
        return;
    }
    /**
     * if field of myObject is not required in sensor-system use:
     * delete myObject.propertyX;
     */
    var host = config.getLampIP(myObject.id);
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
            return;
        }
    });

}

function deleteLampFn(request,response) {


    if (!request.params.id){
        response.status(400).send({status:"E",message:"Bad input"});
        return;
    }


    var host = config.getLampIP(request.params.id);
    var options = { method: 'POST',
        url: 'http://'+host+'/deleteStreetLamp/',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            "lampId":request.params.id
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
    if (request.body === undefined || request.body.lampId === undefined || request.body.address === undefined ||
        request.body.lightIntensity === undefined || request.body.model===undefined || request.body.consumption=== undefined ||
        request.body.stateOn === undefined || request.body.lastSubstitutionDate === undefined || request.body.residualLifeTime === undefined||
        request.body.latitude === undefined || request.body.longitude === undefined || request.body.timestamp === undefined || request.body.city === undefined){
        response.status(400).send({status:"E",message:"Bad Input"});
        return;
    }
    var host = config.getLampIP(request.body.lampId);
    var options = { method: 'POST',
        url: 'http://'+host+'/insertNewStreetLamp/',
        headers: {
            'content-type': 'application/json'
        },
        body: request.body,
        json: true };

    requestModule(options, function (error, res, body) {
        if (error || res.statusCode >= 400){

            response.status(500).send({status:"E",message:"Internal Server Error"});
            return;
        }else{
            response.status(200).send({status:"S",message:"Added new Lamp {id}:" + request.body.id});
            return;
        }
    });
}

