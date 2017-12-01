import {BasicService} from './BasicService';

export class AuthenticationService extends BasicService{
  constructor (store = null) {
    super(store);
  }
  
  authenticate(username, password) {
    //FIXME : handle authentication with Google
  }
  
}