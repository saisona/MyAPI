import {get} from 'http';
import {BasicService} from './BasicService';
import {post} from 'request';

export class RequestService extends BasicService {
  constructor (store) {
    super(store);
    this.Http_get = get;
    this.Http_request = post;
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
  
  
  post (requestLink, obj) {
    return new Promise((resolve, reject) => {
      this.Http_request(requestLink, {json: obj}, (error, response, body) => {
        if (error) reject(error);
        else {
          resolve({response: response, body: body});
        }
      });
    });
  }
}