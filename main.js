var chaconEmitter = require('./chaconEmitter');
//var wpi = require('wiring-pi');
var pin = 0

//wpi.setup('wpi');
//wpi.pinMode(pin, wpi.OUTPUT);
//console.log(wpi);
//console.log(wpi.piBoardId());
chaconEmitter.init();
var order = '00101111000001000110001101010001'; 
//order = '00101111000001000110001101000001';
//chaconEmitter.setWPI(wpi);
chaconEmitter.transmit(order);


/*
for (var j = 0; j < 5; j++) {

    // do transmit
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
        sendPair(order.charAt(i));
    }
    wpi.digitalWrite(pin, wpi.HIGH);
    wpi.delayMicroseconds(275);
    wpi.digitalWrite(pin, wpi.LOW);
    // end do transmit
    console.log('transmit finished');
    wpi.delay(10);
}


function sendPair(bool) {
  if (bool == '1') {
    sendBit(true);
    sendBit(false);
  }
  else {
   sendBit(false);
   sendBit(true);
  }
}

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
*/