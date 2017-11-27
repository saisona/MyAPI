import {config} from "../default.config";
import {__init, app, newRoute} from './helpers';
import {Store} from './Store';
import {AuthenticationService} from './services/AuthenticationService';
import {SSEService} from './services/SSEService';

export class Application {
  constructor () {
    this.app =  app();
    this._store = null;
    this._event = new SSEService(config.HOST+config.SOCKET_IO_PORT);
    __init(this.app, this._event);
    this.authService = new AuthenticationService(null);
  }
  
  
  emit(event_name, data) {
    this._event.emit(event_name, data);
  }
  
  
  /**
   * get Storage
   * @returns {null|Store}
   */
  get store () {
    return this._store;
  }
  
  /**
   * Start the API application
   */
  run() {
    
    this.app.listen(config.port, function() {
      console.log(`Running at 0.0.0.0 :${config.port}`);
    });
  }
  
  
  /**
   * Init the store and the Authentication Service with the User id => UID
   * @param user
   */
  init(user) {
    const uid = user.uid;
    this._store = new Store(null, uid);
    this.authService.init(this._store);
  }
  
  /**
   * Handle a GET request from Application into express API
   * @param {String} route
   * @param {Function} callback the function to call at least
   */
  get(route, callback) {
    return this.app.get(route, callback);
  }
  
  
  post(route, callback) {
    return this.app.post(route, callback);
  }
  
  static route(path) {
    return newRoute(path)
  }
}
