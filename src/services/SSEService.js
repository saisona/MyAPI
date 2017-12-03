import {BasicService} from './BasicService';

export class SSEService extends BasicService{

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
  }

  handleMessage(msg) {
    console.log(`MSG => ${msg}`);
  }
  
  static handleError(err) {
    throw new Error(err.message);
  }
  
  start() {
    const io = require('socket.io')(3000);
    io.on('connection', function(socket) {
      socket.emit('start', {});
    })
  }
}