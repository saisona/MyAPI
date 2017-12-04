import {BasicService} from './BasicService';
import {initGitHubAPI, ACTION_TYPE} from '../helpers';

export class GithubService extends BasicService {
  
  constructor (store) {
    super(store);
    this.service = initGitHubAPI();
  }
  
  
  handle (action_type) {
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

exports.ACTION_TYPE = {
  NOTIFICATION: 'notifications'
};