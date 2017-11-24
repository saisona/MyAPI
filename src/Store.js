const fs = require('fs');
import * as configStore from 'basic-config-store';

export class Store {
  
  constructor (storage, uid= null) {
    this.items = storage || configStore.createConfig();
    this.uid = uid
  }
  
  save(uid) {
    const path = `../saves/stores/${this.uid || uid}`;
    const fd = fs.openSync(path,'a+');
    fs.write(fd, JSON.stringify({items : this.items}), (err) => {
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