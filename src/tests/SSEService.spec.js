import Application from '../Application';
import SSEService from '../services/SSEService';

const expect = require('chai').expect;

describe('SSE Service', function () {
  
  describe('From app', function() {
    const onKeyDown = function () {
      return true;
    };
    const onNewMessage = function () {
      return false;
    };
    const sseService = new Application().getService('SSE');
    
    it('should success at anytime', function () {
      return sseService instanceof SSEService;
    });
  });
  
  describe('From Service', function () {
    const onKeyDown = function () {
      return true;
    };
    const onNewMessage = function () {
      return false;
    };
    const sseService = new SSEService('http://api.github.com', onKeyDown, onNewMessage);
  
    before(function() {
      sseService.start();
    });
  
    it('should success at anytime', function () {
      return sseService instanceof SSEService;
    });
  });


  
});
