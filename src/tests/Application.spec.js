import {Application} from '../Application';

describe('Application Primary', function() {
  const app = new Application();
  
  it('should success creating a simple Application', function() {
    return app !== null;
  });
  
  it('should success to get the specified service', function(done) {
    app.getService('Google').handle('calendar').then(response => {
      if(response.length > 0) done();
      else done(new Error('Wrong returned value, null response !'));
    }, err => {
      done(err);
    })
  });
  
  it('should success get the application with a service', function() {
    const appFromStore = app.getService('Google').store.getFromStore('app');
    return appFromStore !== null;
  })
});

