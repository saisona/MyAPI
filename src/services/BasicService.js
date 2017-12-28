export default class BasicService {
  constructor(store){
    this.store = store;
  }
  
  handle(action_type){} // abstract method
  authenticate(credentials){} // abstract method
  subscribe(channel, socket){}
  unsubscribe(channel, socket){}
  watch(){}
}