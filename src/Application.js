import {config} from "../default.config";
import {__init,app, newRoute} from './helpers';
import {Store} from './Store';

export class Application {
  constructor () {
    this.app =  app();
    this.store = new Store(LocalStorage)
    __init(this.app);
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
     * Handle a GET request from Application into express API
     * @param {String} route
     * @param {String} method
     * @param {Function} callback the function to call at least
     */
  get(route, callback) {
    return this.app.get(route, callback);
  }
  
  static route(path) {
    return newRoute(path)
  }
}
