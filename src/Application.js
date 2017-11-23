import {config, AVAILABLE_METHODS} from "../default.config";
import {__init,app} from './helpers';


export class Application {
  constructor () {
    this.app =  app();
    __init(this.app);
  }

  /**
   * Start the API application
   */
  run() {
    this.app.listen(config.port, function() {
      console.log(`Running at 0.0.0.0:${config.port}`);
    });
  }

  handleGetRequest(route, method, callback) {
    if(!AVAILABLE_METHODS.hasOwnProperty(method.toUpperCase())){
      throw new Error(`Method ${method} is unavailable !`);
    }

    this.app.call(method, callback, route);
  }
}
