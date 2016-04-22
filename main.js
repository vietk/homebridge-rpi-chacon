var chaconEmitter = require('./chaconEmitter');
var pin = 0

chaconEmitter.init();
var order = chaconEmitter.buildOrder(12325261, 1, 1, 100);
console.log(order);
chaconEmitter.transmit(order);