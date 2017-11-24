import {get} from 'http';

export class RequestService {
  constructor() {
    this.Http = get;
  }

  get(requestLink) {
    return new Promise((resolve,reject) => {
      this.Http(requestLink, (resp) => {
        let response = null;
        resp.on('data', (chunck) => {
          if(!response)
            response = chunck;
          else
            response += chunck;
        });
        
        resp.on('end', () => {
          resolve(response);
        })
      }).on('error', (err) => {
        reject(err)
      });
    })
  }

  post(requestLink, opts) {
    return new Promise((resolve, reject) => {
      this.Http.request('POST', requestLink, opts)
    });
  }
}