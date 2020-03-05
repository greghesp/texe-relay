# Texe Relay

> This is a WIP

## Introduction

This is a Node Server that incorporates [Texecom Connect](https://github.com/davidMbrooke/texecom-connect) in to a Node Server, MQTT Broker and Client, all in one.
I'm not overly familar with Python, however I ran his code through a Python 2 to 3 converter which seems to have worked..

## Setup

To set this up, please follow the instructions from the [Texecom Connect](https://github.com/davidMbrooke/texecom-connect) repo.
The relevant files can be found in `/bin/monitor`

You will also need to change the line in `/helpers/server.js` that starts Python 3.  My command to start Python 3 is `py` so amend this as needed 

`alarm = spawn('py', ['./bin/monitor/alarm-monitor.py']);`


## Texecom NDA

As per [davidMbrooke's](https://github.com/davidMbrooke) commments on his repo.
       
This module was developed using information provided to me by Texecom under NDA.

I cannot share that documentation with anyone and can not answer questions about what this documentation says - you are free to sign your own NDA with Texecom to receive the same documentation.

I have made minor changes to Davids Texecom Connect script so that it is easier to parse the data in Node.