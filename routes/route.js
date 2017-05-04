
module.exports = function (app) {


    var lampCtrl = require('../controller/lampCtrl');

    /**
     * Insert new Lamp
     * Returns 500 if lamp is not inserted. 200 otherwise
     */
    app.post('/lamp', lampCtrl.insertLamp);

    /**
     * Delete Lamp with id
     * Returns 500 if lamp is not deleted. 200 otherwise
     */
    app.delete('/lamp/:id',lampCtrl.deleteLamp);

};
