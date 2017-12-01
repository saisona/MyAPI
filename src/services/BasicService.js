export class BasicService {
  constructor(store){
    this.store = store;
  }
  
  handle(action_type){} // abstract method
}