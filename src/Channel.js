import {Observable} from 'rxjs/Rx';

export class Channel {
  
  constructor (name, app) {
    this._application = app;
    this._service = app.getService(name);
    this._name = name;
    this._subscriptions = [];
    this.subscriptionInterval = null;
  }
  
  
  get name () {
    return this._name;
  }
  
  get data () {
    return this._data;
  }
  
  set data (value) {
    this._data = value;
  }
  
  get service () {
    return this._service;
  }
  
  
  set service (value) {
    this._service = value;
  }
  
  subscribe(socket) {
    const added = this._subscriptions.push(socket);
    this.watch();
    return added > 0;
  }
  
  unsubscribe(socket) {
    const initLenght = this.clientsOnChannel();
    this._subscriptions = this._subscriptions.filter(tmpSocket => socket.id !== tmpSocket.id)
    clearInterval(this.subscriptionInterval);
    return this.clientsOnChannel() < initLenght;
  }
  
  clientsOnChannel() {
    return this._subscriptions.length;
  }
  
  watch() {
    Observable.of((next) => {
      this.subscriptionInterval = setInterval(() => {
        this.service.handle(action).then(data => {
          next(data);
        })
      },2000);
    })
  }
  
  
}