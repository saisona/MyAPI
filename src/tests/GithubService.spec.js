import {Application} from '../Application';
import {GithubService} from '../services';
import {Store} from '../Store';

describe('Github Service', function () {
  
  describe('From app', function () {
    const app = new Application();
    it('should create simple GithubService', function (done) {
      if (app.getService('Github') !== null) done();
      else done(new Error('Can\'t access the Github service => ' + service));
    });
  });
  
  describe('From Service', function () {
    const service = new GithubService(new Store(null));
    it('should create simple GithubService', function (done) {
      if (service !== null)
        done();
      else
        done(new Error('Can\'t acces the Github service !'));
    });
    
  });
  
});