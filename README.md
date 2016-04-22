# homebridge-rpi-chacon

Chacon/DIO RF433 switches support for homebridge running on a raspberry pi. 
This plugin uses extensively the WiringPi lib to communicate with GPIO ports of 
the raspberry. This plugin is compatible with RF433 emitter wired to the Raspberry.

## How to install
## How to use

### Configuration
Here's how to configure a set of switches :

    "accessories": [
    {
        "accessory": "Chacon",
        "name": "Switch1",
        "deviceId": 1,
        "emitterId": 12325261
    },
    {
        "accessory": "Chacon",
        "name": "Switch2",
        "deviceId": 2,
        "emitterId": 12325261
    },
    {
        "accessory": "Chacon",
        "name": "Switch3",
        "deviceId": 3,
        "emitterId": 12325261
    }
    ]

Each accessory have a unique deviceId that is transmitted during the learning process, 
the emitterId bounds a switch to that emitter, a switch can have multiple emitter associated (a remote control).

### Learning process
The learning process is actually the same as described in the guide of the switch seller. A 'on' code has to be sent to the switch
during the learning process initialization.
