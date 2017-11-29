import {BasicService} from './BasicService';
import {Store} from '../Store';
import {config} from '../../default.config';

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
  
  emit(event_name, data) {
    const socket = window.socket;
    socket.emit(event_name, data);
  }
  
  start() {
    const io = require('socket.io')(config.SOCKET_IO_PORT);
    io.on('connection', function(socket) {
      window.socket = socket;
      socket.emit('start', {items: this.store.getConfigProperty('items')});
    })
  }
}