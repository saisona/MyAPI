import {server} from 'gapi';
import {BasicService} from './BasicService';

export class AuthenticationService extends BasicService{
  constructor (store = null) {
    super(store);
    this.store = store;
  }
  
  init(store) {
    server.setApiKey('AIzaSyA1OxvfX-LFjtysYxY8roJeeS26lN27hQU');
    this.store = store;
  }
  
  authenticate(username, password) {
    //FIXME : handle authentication with Google
  }
  
  register(username, password) {
    
  }
  
  
  
}