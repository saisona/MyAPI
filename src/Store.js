const fs = require('fs');
import {config} from './default.config';

export class Store {
  
  constructor (storage, uid= null) {
    this.storage = storage || config.store;
    if(this.storage.getConfigProperty('items'))
      this.items = this.storage.getConfigProperty('items');
    else
      this.items = new Map();
    this.uid = uid;

  }
  
  
  addToStore(key,value) {
    this.items.set(key, value);
    this.storage.setConfigProperty('items', this.items)
  }
  
  setConstantToStore(key,value) {
    const storage = this.storage.getConfigProperty('consts');
    const previousVersion = storage !== undefined ;
    if(previousVersion){
      const newVersion = new Map(storage).set(key, value);
      this.storage.setConfigProperty('consts', newVersion)
    }
    else{
      const initVersion = new Map().set(key, value);
      this.storage.setConfigProperty('consts', initVersion);
    }
  }
  
  getConstantFromStore(key) {
    const storageConstants = this.storage.getConfigProperty('consts');
    return storageConstants.get(key);
  }
  
  getFromStore(key) {
    const storageItems = this.storage.getConfigProperty('items');
    return storageItems.get(key);
  }
  
  save(uid) {
    const path = `../saves/stores/${this.uid || uid}`;
    const fd = fs.openSync(path,'a+');
    fs.write(fd, JSON.stringify({items : this.items.get('items'), consts : this.storage.getConfigProperty('consts')}), (err) => {
      if(err) throw err;
      console.log(`Saved to ${path}`);
    })
  }
  
  sync(uid) {
    const path = `../saves/stores/${this.uid || uid}`;
    const fd = fs.openSync(path,'a+');
    fs.readFile(path, (err, json) => {
      if(err) throw err;
      const data = JSON.parse(json);
      this.storage.setConfigProperty('items', data.items);
      this.storage.setConfigProperty('consts', data.consts);
      this.items = JSON.parse(json).items;
      console.log('[SYNC] Finished success')
    })
  }
}