import {config} from "./default.config";
import {__init, app} from './helpers';
import {Store} from './Store';
import {AuthenticationService, GoogleService, GithubService, SSEService, RequestService} from './services';
import {User} from './User';

export class Application {
  constructor () {
    this.app = app();
    this._store = null;
    this._services = new Map();
    __init(this.app);
    this.init(new User(Math.floor(Math.random()*Number.MAX_SAFE_INTEGER), undefined));
  }
  
  
  /**
   * get Storage
   * @returns {null|Store}
   */
  get store () {
    return this._store;
  }
  
  
  addService (serviceName, service) {
    this._services.set(serviceName, service);
  }
  
  
  getService (name) {
    return this._services.get(name);
  }
  
  
  /**
   * Start the API application
   */
  run () {
    this.app.listen(config.port, function () {
      console.log(`Running at 0.0.0.0 :${config.port}`);
    });
  }
  
  
  /**
   * Init the store and the Authentication Service with the User id => UID
   * @param user
   */
  init (user) {
    const uid = user.uid;
    this._store = new Store(null, uid);
    this.addService('Auth', new AuthenticationService(this.store));
    this.addService('Google', new GoogleService(this.store));
    this.addService('Github', new GithubService(this.store));
    this.addService('SSE', new SSEService(this.store, 'localhost:' + config.port));
    this.addService('Request', new RequestService(this.store));
    this._store.addToStore('app', this.app);
    this._store.setConstantToStore('consts', new Map());
  }
  
  
  /**
   * Handle a GET request from Application into express API
   * @param {String} route
   * @param {Function} callback the function to call at least
   */
  get (route, callback) {
    return this.app.get(route, callback);
  }
  
  
  post (route, callback) {
    return this.app.post(route, callback);
  }
  
  /**
   *
   * @param {Router} fn router function
   */
  use(fn) {
    this.app.use(fn)
  }
  
}
