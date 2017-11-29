export class BasicService {
  constructor(store){
    this._store = store;
  }
  
  
  get store () {
    return this._store;
  }
  
  set store (value) {
    this._store = value;
  }
}