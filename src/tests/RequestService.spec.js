import {RequestService} from '../services';

describe('RequestService', function () {
  const service = new RequestService(null);
  
  it('should create simple RequestService', function () {
    return service !== null;
  });
  
  it('should handle a simple get request' , function(done) {
    service.get('http://www.google.fr').then(response => {
      if(response !== null)
        done();
      else
        done(new Error('Google can\'t be accessed due to connection issue or anything else'))
    }).catch(err => done(err));
  });
});