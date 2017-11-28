const fs = require('fs');
import {config} from '../default.config';

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
  
  save(uid) {
    const path = `../saves/stores/${this.uid || uid}`;
    const fd = fs.openSync(path,'a+');
    fs.write(fd, JSON.stringify({items : this.items.get('items')}), (err) => {
      if(err) throw err;
      console.log(`Saved to ${path}`);
    })
  }
  
  sync(uid) {
    const path = `../saves/stores/${this.uid || uid}`;
    const fd = fs.openSync(path,'a+');
    fs.readFile(path, (err, json) => {
      if(err) throw err;
      console.log(JSON.parse(json));
      this.items = JSON.parse(json).items;
      console.log('[SYNC] Finished success')
    })
  }
}