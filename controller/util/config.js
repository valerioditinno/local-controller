/**
 * Zookeeper host
 * With a distributed Local-Controller lampId will be replaced with many fields "id" and a related IP address
 * to make Create-Update-Delete- of a Specific Lamp
 * @type {{lampId: string, zookeeper: string}}
 */
var configuration = {
    "lampId": '54.165.184.179:8080',
    "zookeeper":'54.152.81.214:2181'

};

exports.getLampIP = getLampIPFn;

exports.getZookeeperHost = getZookeeperHostFn;

function getZookeeperHostFn() {
    return configuration.zookeeper;
}

function getLampIPFn(id) {
    
    id = 'lampId'; //To be removed when configuration if really filled
    return configuration[id];
}
