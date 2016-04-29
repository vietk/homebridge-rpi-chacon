var chaconEmitter = require('./chaconEmitter');
var pin = 0

if (process.argv.length >= 3) {
  chaconEmitter.init();
  var command = process.argv[2];
  if (command == "on") {
    chaconEmitter.transmit(chaconEmitter.buildOrder(12325261, 1, true));
  }
  if (command == "off") {
    chaconEmitter.transmit(chaconEmitter.buildOrder(12325261, 1, false));
  }
  if (command == "dim") {
    var order = chaconEmitter.buildDimOrder(12325261, 1, parseInt(process.argv[3]));
    chaconEmitter.transmit(order, true);
  }
}

