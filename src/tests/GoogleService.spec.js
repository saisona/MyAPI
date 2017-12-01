import {Application} from '../Application';
import {GoogleService} from '../services/GoogleService';
import {Store} from '../Store';

describe('Google Service', function () {
  describe('From app', function ()  {
    it('should access the googleService', function (done) {
      const app = new Application();
      if(app.getService('Google') !== null)
        done();
      else
        done(new Error('Can\'t access to the Google service !'));
    })
  });
  
  describe('From Service', function () {
    it('should access to Calendar Events', function (done) {
      const service = new GoogleService(new Store(null,140));
      service.handle('calendar').then(events => {
        if(events.length > 0) done();
        else done(new Error('No values specified'));
      }).catch(err => done(err));
    })
  })
});