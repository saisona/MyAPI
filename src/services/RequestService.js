import {get, request} from 'http';
import {BasicService} from './BasicService';

export class RequestService extends BasicService{
  constructor(store) {
    super(store);
    this.Http_get = get;
    this.Http_request = request;
  }

  get(requestLink) {
    return new Promise((resolve,reject) => {
      this.Http_get(requestLink, (resp) => {
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
      this.Http_request('POST', requestLink, opts, function(resp) {
        resolve('404: API POST NOT ENABLED !');
        reject(new Error('404: API POST NOT ENABLED !'));
      })
    });
  }
}