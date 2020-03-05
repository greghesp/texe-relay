const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://localhost:1883");

exports.mqttClient = function() {
    console.log("Connecting to MQTT Client");
    client.on("connect", ack => {
        console.log("MQTT Client Connected!");
        client.subscribe("homeassistant/binary_sensor/+/state", data => {
            console.log(`MQTT Client Sensor Data: ${data}`);
        });

        client.subscribe("homeassistant/alarm_control_panel/+/state", data => {
            console.log(`MQTT Client Alarm Panel Data: ${data}`);
        });


        client.on("message", (topic, message) => {
            console.log(`MQTT Client Message.  Topic: ${topic}.  Message: ${message.toString()}`);
        });
    });

    client.on("error", err => {
        console.log(err);
    });
}

