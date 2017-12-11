import {Application} from '../Application';
import {EventEmitter} from 'events';

const router = require('../routers/GoogleRouter');

describe('GoogleRoute', function () {
  const app = new Application();
  const emitter = new EventEmitter();
  it('should create simple GoogleRoute', function (done) {
    const route =  new router(app, emitter);
    done();
  });
  
});