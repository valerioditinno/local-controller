var express = require('express');


module.exports = function (app) {


    var lampCtrl = require('../controller/lampCtrl');


    app.post('/lamp', lampCtrl.insertLamp);

    app.delete('/lamp/:id',lampCtrl.deleteLamp);

};
