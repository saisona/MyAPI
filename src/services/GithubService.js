import {config} from '../default.config';
import {ACTION_TYPE, initGitHubAPI} from '../helpers';
import BasicService from './BasicService';
import LogService from './LogService';

export default class GithubService extends BasicService {
  
  constructor (store) {
    super(store);
    this.service = initGitHubAPI();
  }
  
  
  static GithubAuthentication (credentials, Response) {
    Response.redirect('https://github.com/login/oauth/authorize?client_id=' + credentials);
  }
  
  
  handle (action_type, params) {
    LogService.log('Github Service', 'Enter handle with => ' + action_type);
    return new Promise((resolve, reject) => {
      if (this.store.getConstantFromStore('API_KEY_GITHUB')) {
        this.service = this.authAPIGithub();
        switch (action_type) {
          case ACTION_TYPE.NOTIFICATION:
            this.getNotifications()
              .then(data => data.data)
              .then(data => {
                console.log(`LOG => `, data);
                return data;
              })
              .then(notifications => resolve(notifications))
              .catch(err => reject(err));
            break;
          case ACTION_TYPE.PROFILE:
            this.getAuthenticatedUser()
              .then(data => data.data)
              .then(user => resolve(user))
              .catch(err => reject(err));
            break;
          default :
            return reject(new Error(`${action_type} is not implemented yet !`));
        }
      } else {
        if (action_type === ACTION_TYPE.AUTHENTICATION)
          GithubService.GithubAuthentication(config.GITHUB.AUTH_ID, params.response);
        else
          return reject(new Error(`You must be authenticated to handle any request !`));
      }
    });
  }
  
  
  getNotifications () {
    return this.service.activity.getNotifications();
  }
  
  
  getAuthenticatedUser () {
    return this.service.users.get({});
  }
  
  
  authAPIGithub () {
    this.service.authenticate({
      type: 'token',
      token: this.store.getConstantFromStore('API_KEY_GITHUB')
    });
    return this.service;
  }
  
}