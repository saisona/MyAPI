import {config} from "./default.config";
import {__init, app, newRoute} from './helpers';
import {Store} from './Store';
import {AuthenticationService, GoogleService} from './services';
import {User} from './User';


export class Application {
  constructor () {
    this.app =  app();
    this._store = null;
    this._services = new Map();
    __init(this.app);
    this.init(new User(1405006118, 'badhrc'));
  }
  
  
  /**
   * get Storage
   * @returns {null|Store}
   */
  get store () {
    return this._store;
  }
  
  addService(serviceName, service) {
    this._services.set(serviceName, service);
  }
  
  getService(name) {
    return this._services.get(name)
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
    this.addService('Auth', new AuthenticationService(this.store));
    this.addService('Google', new GoogleService(this.store));
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
