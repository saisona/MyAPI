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
      const sseService = new SSEService('http://api.github.com', onKeyDown, onNewMessage);
      return sseService !== null;
    });

});