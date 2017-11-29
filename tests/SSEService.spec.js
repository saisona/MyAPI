import {SSEService} from '../src/services/SSEService';
const mocha = require('mocha');
const should = require('should');


describe('#SSEService', function() {

    it('should success at anytime', function() {
      const onKeyDown = function() {
        return true;
      };
      const onNewMessage = function() {
        return false;
      };
      const sseService = new SSEService('http://localhost:4200', onKeyDown, onNewMessage);
      return sseService !== null;
    });

    should(it('should throw an error', function () {
      const sseService = new SSEService();
    })).throw('path from listener is missing !');
});
