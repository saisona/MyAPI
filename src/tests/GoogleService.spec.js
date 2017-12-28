import Application from '../Application';
import {GoogleService} from '../services/GoogleService';
import Store from '../Store';

describe('Google Service', function () {
  describe('From app', function () {
    const app = new Application();
    it('should access the googleService', function () {
       return app.getService('Google') !== null && app.getService('Google') instanceof GoogleService;
    });
    
    it('should access to Calendar Events', function (done) {
      const service = app.getService('Google');
        service.handle('calendar').then(events => {
          if (events.length > 0) done();
          else done(new Error('No values specified'));
        }).catch(err => done(err));
    });
  });
  
  describe('From Service', function () {
    it('should access to Calendar Events', function (done) {
      const service = new GoogleService(new Store(null));
      service.handle('calendar').then(events => {
        if (events.length > 0) done();
        else done(new Error('No values specified'));
      }).catch(err => done(err));
    });
  });
});