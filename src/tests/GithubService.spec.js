import {Application} from '../Application';
import {GithubService} from '../services';

describe('Github Service', function () {
  
  describe('From app', function() {
    const app = new Application();
    const service = app.getService('Github');
    it('should create simple GithubService', function (done) {
      if(service !== null)
        done();
      else
        done(new Error('Can\'t acces the Github service !'));
    });
  
    it('should handle a simple Profile request', function(done) {
      service.handle('me').then(() => done()).catch(err => done(err))
    });
  
    it('should handle a simple Notification request', function(done) {
      service.handle('notifications').then(notification => {
        if(notification)
          done();
        else
          done(new Error('No values'))
      }).catch(err => done(err))
    });
    
    it('should handle a simple Authentication request', function(done) {
    })
  });
  
  describe('From Service', function () {
    const service = new GithubService(null);
    it('should create simple GithubService', function (done) {
      if(service !== null)
        done();
      else
        done(new Error('Can\'t acces the Github service !'));
    });
  
    it('should handle a simple Profile request', function(done) {
      service.handle('me').then(() => done()).catch(err => done(err))
    });
  
    it('should handle a simple Notification request', function(done) {
      service.handle('notifications').then((notification) => {
        if(notification)
          done();
        else
          done(new Error('No values'))
      }).catch(err => done(err))
    })
  })
  
  
});