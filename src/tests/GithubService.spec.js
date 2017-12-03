import {Application} from '../Application';
import {GithubService} from '../services';

describe('Github Service', function () {
  
  const app = new Application();
  
  it('should create simple GithubService', function (done) {
    if(app.getService('Github') !== null)
      done();
    else
      done(new Error('Can\'t acces the Github service !'));
  });
  
  it('should handle a simple Profile request', function(done) {
    app.getService('Github').handle('me').then(() => done()).catch(err => done(err))
  });
  
  it('should handle a simple Notification request', function(done) {
    app.getService('Github').handle('notifications').then((notification) => {
      if(notification)
        done();
      else
        done(new Error('No values'))
    }).catch(err => done(err))
  })
});