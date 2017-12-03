import {get, request} from 'http';
import {BasicService} from './BasicService';

export class RequestService extends BasicService {
  constructor (store) {
    super(store);
    this.Http_get = get;
    this.Http_request = request;
  }
  
  get (requestLink) {
    return new Promise((resolve, reject) => {
      this.Http_get(requestLink, (resp) => {
        let response = null;
        resp.on('data', (chunk) => {
          if (!response)
            response = chunk;
          else
            response += chunk;
        });
        
        resp.on('end', () => {
          resolve(response);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
}