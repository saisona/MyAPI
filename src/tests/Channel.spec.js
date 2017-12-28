import Application from '../Application';
import Channel from '../Channel';
import BasicService from '../services/BasicService';

describe('Channel', function () {
  
  const app = new Application();
  let channel;
  const fakeSocket = {id : Math.random()*Infinity-1, data: null};
  
  it('should create simple Channel', function () {
    channel = new Channel('tmp', app);
    return channel != null;
  });
  
  it('should count no subscribers', function () {
    return channel.clientsOnChannel() === 0;
  });
  
  it('should success subscribe fake socket !', function () {
    channel.subscribe(fakeSocket);
    return channel.clientsOnChannel() === 1;
  });
  
  it('should success unsubscribe fake socket', function () {
    return channel.unsubscribe(fakeSocket);
  });
  
  it('should fail getting service from fake Channel (tmp)', function () {
    return channel.service === null;
  });
  
  it('should success change service', function () {
    channel.service = new BasicService(app.store);
    return channel.service !== null;
  });
  
  it('should success watch', function (done) {
    try {
      channel.watch();
      done();
    }catch (err) {done(err)}
  });
  
});