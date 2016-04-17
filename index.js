var chaconEmitter = require('./chaconEmitter');
var Service;
var Characteristic;
var noInitDone = true;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-rpi-chacon", "Chacon", ChaconAccessory);
}

function ChaconAccessory(log, config) {
  this.log          = log;
  this.deviceId     = config['deviceId'];
  this.emitterId    = config['emitterId'];
  if (noInitDone) {
    chaconEmitter.init();
    noInitDone = false;
  }
}


ChaconAccessory.prototype = {
  setPowerState: function(powerOn, callback) {
    var that        = this;
    var order = chaconEmitter.buildOrder(this.emitterId, this.deviceId, powerOn);
    chaconEmitter.transmit(order);
    callback(null);
  },
  
  getServices: function() {
    var switchService = new Service.Switch(this.name);
    //var informationService = new Service.AccessoryInformation();

    /* informationService
      .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
      .setCharacteristic(Characteristic.Model, this.model_name)
      .setCharacteristic(Characteristic.SerialNumber, this.id);
    */
    switchService
      .getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this));

    return [switchService];
  }
}

module.exports.accessory = ChaconAccessory;
