import Application from '../Application';
import GoogleService from '../services/GoogleService';

describe('Google Service', function () {

  let service = new Application().getService('Google');

  it('should access the googleService', function () {
    return service !== null && service instanceof GoogleService;
  });

  // TODO : HANDLE NEW TESTS !! WITHOUT LOGGED
});
