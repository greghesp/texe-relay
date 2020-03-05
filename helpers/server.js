const { spawn } = require('child_process');

let alarm;

exports.initializeServer = function(app) {
    return new Promise(async(res, rej) => {
        try {
            app.locals.zones = [];
            app.locals.users = [];
            alarm = spawn('py', ['./bin/monitor/alarm-monitor.py']);
            console.log("Initialising Alarm Monitor");

            alarm.stdout.on('data', (data) => {
                const regex = /(?<Date>[0-9]{4}-[0-2][1-9]-[0-2][1-9]) (?<Time>2[0-3]|[01][0-9]:[0-5][0-9]:[0-5][0-9]): (?<msgType>\w+) (?<msg>.*)/;
                const $ = data.toString().match(regex);
                if($.groups.msgType === "zone") {
                    const r = /(?<id>[0-9]+) \w+ (?<product>\w+(?:\/\w+\s+\d+)?) \w+ (?<deviceName>'([^']*)')/;
                    const m = $.groups.msg.match(r);
                    if(m) {
                        app.locals.zones.push({
                            id: m.groups.id,
                            product: m.groups.product,
                            name: m.groups.deviceName
                        });
                    }
                }

                if($.groups.msgType === "user") {
                    const r = /(?<id>[0-9]+) \w+ (?<name>'([^']*)')/;
                    const m = $.groups.msg.match(r);
                    if(m) {
                        app.locals.users.push({
                            id: m.groups.id,
                            name: m.groups.name
                        })
                    }
                }

                if($.groups.msgType === "msg") {
                    if($.groups.msg.includes("waiting for events")) {
                        console.log("Alarm Monitor Initialized. Waiting for Events");
                        return res();
                    }
                }
            });

            alarm.stderr.on('data', (err) => {
                console.log(err.toString('utf8'));
            });

            alarm.on('close', (code) => {
                console.log(code);
                return rej();
            });

        } catch (e) {
            console.error(e)
        }
    })
};