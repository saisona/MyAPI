import {SSEService} from '../services/SSEService';

describe('SSE Service', function() {

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
