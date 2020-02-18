export default class BasicService {
  constructor(store){
    this.store = store;
  }
  
  handle(action_type){} // abstract method
  subscribe(channel, socket){}
  unsubscribe(channel, socket){}
  
  
  /**
   * Abstract method that must be called on child ones
   * @param action_type help to check if it's onAuth or not
   * @returns {boolean} isAuthenticated and allowed to make the request
   */
  isAuthenticated(action_type){
    return action_type === 'auth';
  }
  
  watch(){}
}