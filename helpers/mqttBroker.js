const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

exports.startBroker = function() {
    return new Promise((res, rej) => {
        server.listen(port, function () {
            console.log(`MQTT Broker started on port ${port}`);
            return res()
        });
    })
};

