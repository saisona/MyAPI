import BasicService from './BasicService';

export default class SSEService extends BasicService{

  constructor(store, pathSSE, ...args) {
    super(store);
    if(!pathSSE) {
      throw new Error("Path from listener is missing !");
    }
    this.listeners = [];
    for( let i=0; i < args.length; i++ ) {
      if(typeof args[i] !== 'function') {
        throw new Error(`Argument ${i} can't be listened ! It may be not an EventTarget.`);
      }
      this.listeners.push(args[i]);
    }
    this.socket = null;
  }
  
  start() {
    // TODO : Handle Start
  }
  
  stop() {
    // TODO : Handle stop
  }
}
