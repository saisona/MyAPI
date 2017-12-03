import {BasicService} from './BasicService';
import {initGitHubAPI} from '../helpers';
import {config} from '../default.config';

export class GithubService extends BasicService {
  
  constructor (store) {
    super(store);
    this.service = initGitHubAPI();
  }
  
  
  handle (action_type) {
    return new Promise((resolve, reject) => {
      switch (action_type) {
        case 'notifications':
          this.getNotifications({
            all: true,
            participating: true
          }).then(data => data.data).then(notifications => resolve(notifications)).catch(err => reject(err));
          break;
        case 'me':
          this.getAuthenticatedUser()
            .then(data => data.data)
            .then(user => resolve(user))
            .catch(err => reject(err));
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
}