import {BasicService} from './BasicService';
import {Store} from '../Store';

export class SSEService extends BasicService{

  constructor(pathSSE, ...args) {
    super(null);
    if(args.find(arg => arg instanceof Store) !== null) {
      this.store = new Store(args.find(arg => arg instanceof Store), null);
      console.log('[SSE] store = ', this.store);
    } else {
      console.log('[SSE] no Store defined');
      this.store = new Store();
    }
    if(!pathSSE) {
      throw new Error("path from listener is missing !");
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
  
  static handleError(err, socket) {
    socket.emit('error_sse', {type: 'SSE', err: err});
    throw new Error(err.message);
  }
  
  start() {
    const io = require('socket.io')(4200);
    io.on('connection', function(socket) {
      socket.emit('start', {});
    })
  }
}