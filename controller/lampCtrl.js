var config = require('../controller/util/config');

var requestModule = require('request');

exports.updateLamp = updateLampFn;

exports.insertLamp = insertLampFn;

exports.deleteLamp = deleteLampFn;


/**
 * Get a object for adjusment from KafkaCtrl
 * Validate Object and send it with REST API to sensors system
 * @param myObject
 */
function updateLampFn(myObject) {

    /**
     * Control over object fields
     */
    if (!myObject || (myObject.lampId === null || myObject.lampId===undefined)
        || (myObject.lightIntensityAdjustment === null || myObject.lightIntensityAdjustment === undefined) ){
        console.log("Invalid Object");
        return;
    }

    /**
     * get right IP for the lamp with ID
     */
    var host = config.getLampIP(myObject.id);
    var options = { method: 'POST',
        url: 'http://'+host+'/adjustStreetLampLightIntensity/',
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
            console.log("Adjustment{id-value}:"+myObject.lampId + " - " + myObject.lightIntensityAdjustment);
            return;
        }
    });

}

/**
 * Validate id param from HTTP request and call sensor-system with REST API
 * to delete a Lamp
 * @param request - HTTP request
 * @param response - HTTP response
 */
function deleteLampFn(request,response) {

    /**
     * validate id
     */
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

/**
 * Parse body from http request and call sensors-system with REST API
 * to add new Lamp
 * @param request - HTTP request
 * @param response - HTTP response
 */
function insertLampFn(request,response) {

    /**
     * Validate Body
     */
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
