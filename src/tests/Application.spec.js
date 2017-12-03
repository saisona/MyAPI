import {Application} from '../Application';

describe('Application Primary', function() {
  it('should success creating a simple Application', function() {
    return new Application() !== null;
  });
  
  it('should success to get the specified service', function(done) {
    const app = new Application();
    app.getService('Google').handle('calendar').then(response => {
      if(response.length > 0) done();
      else done(new Error('Wrong returned value, null response !'));
    }, err => {
      done(err);
    })
  })
});

