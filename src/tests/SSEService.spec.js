import Application from '../Application';
import SSEService from '../services/SSEService';


describe('SSE Service', function () {
  
    const sseService = new Application().getService('SSE');
    
    it('should success at anytime', function () {
      return sseService instanceof SSEService;
    });
});
