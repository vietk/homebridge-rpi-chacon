var chaconEmitter = require('../chaconEmitter.js')
var test = require("unit.js");
var sinon = test.sinon;
var wpi = chaconEmitter.getWPI();


describe('SendBool expectations', function() {
  var mock;
  beforeEach(function() {
    mock = test.mock(wpi);
    chaconEmitter.setWPI(mock);
  });

  afterEach(function(){
    mock = null;
  });

  it('call wpi when sends true', function() {
    mock.expects('digitalWrite').once().withArgs(sinon.match.any, sinon.match(wpi.LOW));
    mock.expects('digitalWrite').once().withArgs(sinon.match.any, sinon.match(wpi.HIGH));
    mock.expects('delayMicroseconds').once().withArgs(310);
    mock.expects('delayMicroseconds').once().withArgs(1340);
    chaconEmitter.sendBit(true);
    mock.verify();
    mock.restore();
  });

  it('call wpi when sends false', function() {
    mock.expects('digitalWrite').once().withArgs(sinon.match.any, sinon.match(wpi.HIGH));
    mock.expects('digitalWrite').once().withArgs(sinon.match.any, sinon.match(wpi.LOW));
    mock.expects('delayMicroseconds').twice().withArgs(310);
    chaconEmitter.sendBit(false);
    mock.verify();
    mock.restore();
  });
});

/*
describe('Send pair expectations', function() {
  // var spy;
  beforeEach(function() {
    // spy = test.spy(chaconEmitter, 'sendBit');
  });

  afterEach(function() {
    // spy.restore();
    // spy = null;
  });

  it('test sending a 0 with sendPair', function() { 
    var spy = test.spy(chaconEmitter, 'sendBit');
    chaconEmitter.sendPair(false);
    //test.dump(spy);
    console.log(spy.callCount);
    test.assert(spy.firstCall.calledWith(false));
    test.assert(spy.secondCall.calledWith(true));
    test.assert(spy.calledTwice);
    spy.restore();
  });

  it('tests sending a 1 with sendPair', function() {
    var spy = test.spy(chaconEmitter, 'sendBit');
    chaconEmitter.sendPair(true);
    test.assert(spy.firstCall.calledWith(true));
    test.assert(spy.secondCall.calledWith(false));
    test.assert(spy.calledTwice);
  });
});

describe('Transmit expectations', function() {
  it('transmits order ON', function() {
    var data = "011010011001110000111111110100100";
    var spy = test.spy(chaconEmitter, 'sendPair');
    var stub = test.stub(chaconEmitter, 'sendBit', function(){});
    var mock = test.mock(wpi);
    chaconEmitter.setWPI(mock);
    mock.expects('digitalWrite').exactly(7);
    mock.expects('delayMicroseconds').exactly(5);
    chaconEmitter.transmit(data);
    
    test.assert.equal(spy.callCount, data.length);
    mock.verify();
    mock.restore();
  });
});
*/ 

describe('Conversion tests', function() {
  it ('test the conversion of an integer to binary if need padding', function() {
    var id = 1;
    var expect = "00000000000000000000000001";
    var result = chaconEmitter.intToBytes(id, 26);
    test.assert.equal(expect, result);
  });

  it ('test the conversion of an integer', function() {
    var id = 12345678;
    var expect = "00101111000110000101001110"; 
    var result = chaconEmitter.intToBytes(id, 26);
    test.assert.equal(expect, result);
  });
});

describe('Build order tests', function() {
  it ('Test build order powers on a device', function() {
    var emitterId = 12345678;
    var deviceId = 1;
    var expect = "00101111000110000101001110" + "0" + "1" + "0001";   
    var result = chaconEmitter.buildOrder(emitterId, deviceId, true);
    test.assert.equal(expect, result);
  });

  it ('Test build order power off a device', function() {
    var id = 12345678;
    var deviceId = 2;
    var expect = "00101111000110000101001110" + "0" + "0" + "0010"; 
    var result = chaconEmitter.buildOrder(id, deviceId, false);
    test.assert.equal(expect, result);
  });
});