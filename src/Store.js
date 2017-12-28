import {config} from './default.config';

export default class Store {
  
  constructor (storage) {
    this.storage = storage || config.store;
    if (this.storage.getConfigProperty('items'))
      this.items = this.storage.getConfigProperty('items');
    else
      this.items = new Map();
  }
  
  
  addToStore (key, value) {
    this.items.set(key, value);
    this.storage.setConfigProperty('items', this.items);
  }
  
  
  setConstantToStore (key, value) {
    const storage = this.storage.getConfigProperty('consts');
    const previousVersion = storage !== undefined;
    if (previousVersion) {
      const newVersion = new Map(storage).set(key, value);
      this.storage.setConfigProperty('consts', newVersion);
    }
    else {
      const initVersion = new Map().set(key, value);
      this.storage.setConfigProperty('consts', initVersion);
    }
  }
  
  
  getConstantFromStore (key) {
    const storageConstants = this.storage.getConfigProperty('consts');
    return storageConstants.get(key);
  }
  
  
  getFromStore (key) {
    const storageItems = this.storage.getConfigProperty('items');
    return storageItems.get(key);
  }
  
}