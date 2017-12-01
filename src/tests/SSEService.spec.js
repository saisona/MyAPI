import {SSEService} from '../services/SSEService';
const expect = require('chai').expect;


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
