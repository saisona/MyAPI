import {SSEService} from '../src/services/SSEService';
import {it,describe} from 'mocha';

describe('#SSEService', function() {
  it('should success at anytime', function() {
    const sseService = new SSEService('http://api.github.com', 'onKeyDown', 'onNewMessage');
    return sseService !== null;
  })
  
});