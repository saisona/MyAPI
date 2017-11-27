export class User {
  constructor (uid, name) {
    this._uid = uid;
    this._name = name;
  }
  
  
  get uid () {
    return this._uid;
  }
  
  
  set uid (value) {
    this._uid = value;
  }
  
  
  get name () {
    return this._name;
  }
  
  
  set name (value) {
    this._name = value;
  }
}