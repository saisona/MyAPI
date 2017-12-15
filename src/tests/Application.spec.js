import {Application} from '../Application';
import {LogService} from '../services';

describe('Application Primary', function() {
  const app = new Application();
  app.get('/fake', function(req,res) {
    res.send(true);
  });
  app.post('/fake', function(req,res) {
    res.send(true);
  });
  
  it('should success creating a simple Application', function() {
    return app !== null;
  });
  
  it('should success to get the specified service', function() {
    return app.getService('Google') !== null
  });
  
  it('should success get the application with a service', function() {
    const appFromStore = app.getService('Google').store.getFromStore('app');
    return appFromStore !== null;
  });
  
  it('should success use fake middleware function', function (done) {
    app.use(function(req,res,next) {
      next();
    });
    done();
  });
  
  it('should have access to all the method of LogService', function () {
    const nb_static_functions = Object.getOwnPropertyNames(LogService).filter(prop => typeof LogService[prop] === 'function').length;
    return nb_static_functions >= 5;
  });
  
  it('should should success init the application', function () {
    return app.init() !== null;
  });
  
  it('should success log anything', function () {
    LogService.obj('LOGSERVICE', {name: 'Saison', fullName: 'Alexandre', age:22, params : {test : Math.floor(Math.random()*100+1)}});
    LogService.log('LOGSERVICE', 'Test for Log');
    LogService.info('LOGSERVICE', 'Test for INFO Log');
    LogService.error('LOGSERVICE', 'Test for ERROR Log');
    LogService.init('LOGSERVICE', 'Test for INIT Log');
    return true;
  });
  
});

