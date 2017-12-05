import {config} from '../default.config';
import {ACTION_TYPE, initGitHubAPI} from '../helpers';
import {BasicService} from './BasicService';

export class GithubService extends BasicService {
  
  constructor (store) {
    super(store);
    this.service = initGitHubAPI();
  }
  
  
  static GithubAuthentication (credentials, Response) {
    Response.redirect('https://github.com/login/oauth/authorize?client_id=' + credentials);
  }
  
  
  handle (action_type, params) {
    return new Promise((resolve, reject) => {
      if (this.store.getConstantFromStore('API_KEY_GITHUB')) {
        this.service = this.authAPIGithub();
        switch (action_type) {
          case ACTION_TYPE.NOTIFICATION:
            this.getNotifications()
              .then(data => data.data)
              .then(notifications => resolve(notifications))
              .catch(err => reject(err));
            break;
          case ACTION_TYPE.PROFILE:
            this.getAuthenticatedUser()
              .then(data => data.data)
              .then(user => resolve(user))
              .catch(err => reject(err));
            break;
          case ACTION_TYPE.AUTHENTICATION:
            GithubService.GithubAuthentication(config.GITHUB_AUTH_ID, params.response);
            resolve();
            break;
          default :
            return reject(new Error(`${action_type} is not implemented yet !`));
        }
      } else reject(new Error('Need to be Authenticated to handle request !'))
    });
  }
  
  
  getNotifications () {
    return this.service.activity.getNotifications({
      all: true,
      participating: true
    });
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