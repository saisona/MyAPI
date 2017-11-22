import {Application} from '../src/Application';
import {it,describe} from 'mocha';

describe('Application Primary', function() {
  it('should success creating a simple Application', function() {
    try {
      const app = new Application();
      return truel
    }catch(err) {
      console.error(err);
      return false;
    }
  })
});

