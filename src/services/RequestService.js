export class RequestService {
  constructor() {
    this.Http = new XMLHttpRequest();
  }

  get(requestLink, ...args) {
    let buffer = null;

    if(args) {
      buffer = new FormData();
      args.map(el => buffer.append(el.type, el.data));
      console.log(buffer);
    }
    this.Http.open('GET', requestLink);
    this.Http.send(args);
    return new Promise((resolve, reject) => {
      this.Http.onreadystatechange = (xhr) => {
        if(this.Http.readyState === 4){
          resolve(xhr.response);
        }
      };
    })
  }

  post() {
    this.Http.open('GET', requestLink);
    this.Http.send(args || null);
    return new Promise((resolve, reject) => {
      this.Http.onreadystatechange = (xhr) => {
        if(this.Http.readyState === 4){
          try{
            let res = JSON.parse(xhr.response);
            this.reset();
            resolve(res);
          }catch(err) {
            reject(err);
          }
        }
      };
    })
  }

  reset() {
    this.Http = new XMLHttpRequest()
    this.Http.onreadystatechange = null;
  }
}