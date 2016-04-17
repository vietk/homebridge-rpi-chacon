var wpi = require('wiring-pi')

var pin = 0;

// Init chacon emitter
function init(GPIOPin) {
  if (GPIOPin) {
    pin = GPIOPin;
  }
  wpi.setup('wpi');
  wpi.pinMode(pin, wpi.OUTPUT);
  //console.log('wpi setup on PIN :' + pin);
}

function setWPI(awpi) {
  this.wpi = awpi;
}

function getWPI() {
  return wpi;
}

// Send pulse
function sendBit(bool) {
  if (bool) {
    wpi.digitalWrite(pin, wpi.HIGH);
    wpi.delayMicroseconds(310);
    wpi.digitalWrite(pin, wpi.LOW);
    wpi.delayMicroseconds(1340);
  }
  else {
    wpi.digitalWrite(pin, wpi.HIGH);
    wpi.delayMicroseconds(310);
    wpi.digitalWrite(pin, wpi.LOW);
    wpi.delayMicroseconds(310);
  }
}

// Send pair of bits to simulate real bit send
// 0 = 01 , 1 = 10

function sendPair(bool) {
  if (bool) {
    sendBit(true);
    sendBit(false);
  }
  else {
   sendBit(false);
   sendBit(true);
  }
}

function buildOrder(emitterId, deviceId, powerOn) {
  // bit[0-25] convert the emitterId 
  var order = intToBytes(emitterId, 26);
  // 26th bit group command 
  order += '0';
  // 27th bit : power on/off bit
  order += powerOn?'1':'0';
  // bit[28->32] deviceId
  order += intToBytes(deviceId, 4);
  return order;
}

function toBool(str) {
  return str == '1'?true:false;
}

// convert the emitterId; 
function intToBytes(emitterId, limit) {
  var emitterIdByte = emitterId.toString(2);
  if (emitterIdByte.length > limit) {
    // truncate
    emitterIdByte = emitterIdByte.substring(0, limit);
  } 
  else {
    emitterIdByte = pad(emitterIdByte, limit - emitterIdByte.length);
  }
  return emitterIdByte;
} 

function pad(str, size) {
  var pad = "000000000000000000000000000000000000";
  return pad.substring(0, size) + str;
}

// Transmit over the air the data
function transmit(order) {
    //console.log('order : ' + order);
    for (var i = 0; i < 5; i++) {
      doTransmit(order);
      wpi.delay(10);
  }
}
function doTransmit(order) {
  // lock sequence to begin signal emission
  wpi.digitalWrite(pin, wpi.HIGH);
  wpi.delayMicroseconds(275); 
  wpi.digitalWrite(pin, wpi.LOW);
  wpi.delayMicroseconds(9900);
  wpi.digitalWrite(pin, wpi.HIGH);
  wpi.delayMicroseconds(275);
  wpi.digitalWrite(pin, wpi.LOW);
  wpi.delayMicroseconds(2675);
  wpi.digitalWrite(pin, wpi.HIGH);
  // send order data
  for (var i = 0; i < order.length; i++) {
    sendPair(toBool(order.charAt(i)));
  }
  wpi.digitalWrite(pin, wpi.HIGH);
  wpi.delayMicroseconds(275);
  wpi.digitalWrite(pin, wpi.LOW);
  //console.log('transmit finished');
}

// exports
module.exports.setWPI = setWPI;
module.exports.sendBit = sendBit;
module.exports.sendPair = sendPair;
module.exports.getWPI = getWPI;
module.exports.transmit = transmit;
module.exports.pad = pad;
module.exports.intToBytes = intToBytes;
module.exports.buildOrder = buildOrder;
module.exports.init = init;
module.exports.doTransmit = doTransmit;