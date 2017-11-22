import {config, AVAILABLE_METHODS} from "../default.config";
const express = require('express');

export class Application {
  constructor () {
    this.app = new express();
  }

  /**
   *  Allow other applications to access to express
   *  @returns {express|*|createApplication} return the Express app
   */
  getApp() {
    return this.app;
  }

  use(...args) {
    if(args){
      throw new Error('You must supply arguments to use this function');
    } else {
      this.app.use(args);
    }
  }

  /**
   * Start the API application
   */
  run() {
    this.app.listen(config.port, function() {
      console.log(`Running at 0.0.0.0:${config.port}`);
    });
  }

  handleRequest(route, method, callback) {
    if(!AVAILABLE_METHODS.hasOwnProperty(method.toUpperCase())){
      throw new Error(`Method ${method} is unavailable !`);
    }
    console.log(`this.app.${method}('${route}',${callback})`);
    this.app.call(method, route, callback);
  }
}
