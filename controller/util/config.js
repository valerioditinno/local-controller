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
