import {server} from 'gapi';

export class AuthenticationService {
  constructor (store = null) {
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