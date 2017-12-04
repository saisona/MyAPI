import {config} from '../default.config';
import {BasicService} from './BasicService';
import {initGitHubAPI, ACTION_TYPE} from '../helpers';

export class GithubService extends BasicService {
  
  constructor (store) {
    super(store);
    this.service = initGitHubAPI();
  }
  
  
  handle (action_type, Response) {
    return new Promise((resolve, reject) => {
      switch (action_type) {
        case ACTION_TYPE.NOTIFICATION:
          this.getNotifications({
            all: true,
            participating: true
          }).then(data => data.data).then(notifications => resolve(notifications)).catch(err => reject(err));
          break;
        case ACTION_TYPE.PROFILE:
          this.getAuthenticatedUser()
            .then(data => data.data)
            .then(user => resolve(user))
            .catch(err => reject(err));
          break;
        case ACTION_TYPE.AUTHENTICATION:
          console.log('ENTER AUTHENTICATION !');
          this.authenticate({user_id: config.GITHUB_AUTH_ID, user_secret: config.GITHUB_AUTH_SECRET}, Response).then(token => {
            console.log(`Response => `, token);
            resolve(token);
          }).catch(err => reject(err));
          break;
        default :
          return reject(new Error('This is not implemented yet !'));
      }
    });
  }
  
  
  getNotifications () {
    return this.service.activity.getNotifications({
      participating: true,
    });
  }
  
  
  getAuthenticatedUser () {
    return this.service.users.get({});
  }
  
  authenticate(credentials = {user_id: null, user_secret: null}, Response) {
    // const webapp = this.store.getFromStore('app');
    const redirection = Response.redirect('https://github.com/login/oauth/authorize?client_id='+ credentials.user_id);
    return Promise.resolve(redirection);
  }
}