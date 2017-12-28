import {api, config} from "./default.config";
import {__init, ACTION_TYPE, app} from './helpers';

import {GithubService, GoogleService, LogService, RequestService, SSEService, WebSocketService} from './services';
import Store from './Store';

export default class Application {
  constructor () {
    this._helper_app = app();
    this.app = this._helper_app.server;
    this._io = this._helper_app.io;
    this._store = new Store(null);
    this._services = new Map();
    __init(this._helper_app.app);
    this.init();
    LogService.info('APPLICATION', 'Starting APP');
  }
  
  
  /**
   * get Storage
   * @returns {null|Store}
   */
  get store () {
    return this._store;
  }
  
  
  get io () {
    return this._io;
  }
  
  
  addService (serviceName, service) {
    const fs = require('fs');
    fs.readdir('./src/services', (err, files) => {
      if (err) LogService.error('Application', err.message);
      else {
        files = files.map(file => file.split('.')[0]);
        const exists = files.some((value) => value === (serviceName + 'Service'));
        if (exists) {
          LogService.init(serviceName);
          this._services.set(serviceName, service);
        }
        else LogService.error('Application', serviceName + ' doesn\'t exists !');
      }
    });
  }
  
  
  getService (name) {
    return this._services.get(name) || null;
  }
  
  
  subscribe (name, socket, opts) {
    return new Promise((resolve, reject) => {
      this.getService('WebSocket').handle(ACTION_TYPE.SUBSCRIPTION, opts.payload, this)
        .then(data => {
          socket.emit('subscription_data', {channel: name, data: data});
          resolve(data);
        })
        .catch(err => {
          LogService.error('WEB_SOCKET', 'Failure on : ' + err.message);
          reject(err);
        });
    });
  }
  
  
  /**
   * Start the API application
   */
  run () {
    this.app.listen(config.port, function () {
      LogService.info('APPLICATION', `Listening on port ${config.port}`);
      LogService.info('APPLICATION', `Use env : ${api.API_BRANCH}`);
    });
  }
  
  
  /**
   * Init the store and the Authentication Service with the User id => UID
   * @returns {boolean} depends if the app has been set on global
   */
  init () {
    this.addService('Google', new GoogleService(this.store));
    this.addService('Github', new GithubService(this.store));
    this.addService('SSE', new SSEService(this.store, 'localhost:' + config.port));
    this.addService('Request', new RequestService(this.store));
    this.addService('WebSocket', new WebSocketService(this.store, new Map()));
    this._store.addToStore('app', this.app);
    this._store.setConstantToStore('consts', new Map());
    global.app = this;
    return this._store.getFromStore('app') !== null;
  }
  
  
  /**
   * Handle a GET request from Application into express API
   * @param {String} route
   * @param {Function} callback the function to call at least
   */
  get (route, callback) {
    return this._helper_app.app.get(route, callback);
  }
  
  
  /**
   * Handle a POST request from Application into express API
   * @param {String} route
   * @param {Function} callback the function to call at least
   */
  post (route, callback) {
    return this._helper_app.app.post(route, callback);
  }
  
  
  /**
   * Express use function
   * @param {Router} fn router function
   */
  use (fn) {
    this._helper_app.app.use(fn);
  }
  
}
