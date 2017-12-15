import {Channel} from '../Channel';
import {ACTION_TYPE} from '../helpers';
import {BasicService} from './BasicService';
import {LogService} from './LogService';

export class WebSocketService extends BasicService {
  
  constructor (store, channels = new Map()) {
    super(store);
    this.channels = channels;
    this._socket = null;
  }
  
  
  handle (action_type, params, app) {
    return new Promise((resolve, reject) => {
      switch (action_type) {
        case ACTION_TYPE.SUBSCRIPTION:
          this.subscribe(params.name, params.opts.socket, app) ? resolve(true) : reject(new Error('Subscription failed !'));
          break;
        case ACTION_TYPE.UNSUBSCRIPTION:
          this.unsubscribe(params.channel, params.socket) ? resolve(true) : reject(new Error('Unsubscribe failed !'));
          break;
        default:
          resolve(false);
          break;
      }
    });
  }
  
  
  get socket () {
    return this._socket;
  }
  
  
  set socket (value) {
    this._socket = value;
  }
  
  
  subscribe (channelName, socket, app) {
    if (!this.channels.get(channelName)) {
      this.channels.set(channelName, new Channel(channelName, app));
    }
    let channel = this.channels.get(channelName);
    const initLength = channel.clientsOnChannel();
    channel.subscribe(socket);
    return channel.clientsOnChannel() > initLength;
  }
  
  
  unsubscribe (channelName, socket) {
    const channel = this.channels.get(channelName),
      initLength = channel.clientsOnChannel();
    channel.unsubscribe(socket);
    return channel.clientsOnChannel() < initLength;
  };
  
}