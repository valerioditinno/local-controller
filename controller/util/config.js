var configuration = {
    "lampId": '10.220.170.236:8080'

};

exports.getLampIP = getLampIPFn;

function getLampIPFn(id) {
    
    id = 'lampId'; //To be removed when configuration if really filled
    return configuration[id];
}