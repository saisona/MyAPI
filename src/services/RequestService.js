import {get, post} from 'request';
import {BasicService} from './BasicService';

export class RequestService extends BasicService {
  constructor (store) {
    super(store);
    this.Http_get = get;
    this.Http_request = post;
  }
  
  
  get (requestLink) {
    return new Promise((resolve, reject) => {
      this.Http_get(requestLink, (error, response, body) => {
        if (error) reject(error);
        else resolve(body);
      });
    });
  }
  
  
  post (requestLink, obj) {
    return new Promise((resolve, reject) => {
      this.Http_request(requestLink, {json: obj}, (error, response, body) => {
        if (error) reject(error);
        else {
          resolve({body: body});
        }
      });
    });
  }
}