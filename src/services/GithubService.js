import {BasicService} from './BasicService';
import {initGitHubAPI} from '../helpers';

export class GithubService extends BasicService {
  
  constructor (store) {
    super(store);
    this.apiGit = initGitHubAPI();
  }
  
  handle (action_type) {
    return new Promise((resolve, reject) => {
      switch (action_type) {
        case 'notifications':
          this.getNotifications({all : true, participating: true}).then(data => data.data).then(notifications => resolve(notifications));
          break;
        case 'me':
          this.getAuthenticatedUser().then(data => data.data).then(user => resolve(user));
          break;
        default: return reject(new Error('This is not implemented yet !'));
      }
    });
  }
  
  getNotifications() {
    return this.apiGit.activity.getNotifications({
      participating: true,
    })
  }
  
  getAuthenticatedUser() {
    return this.apiGit.users.get({});
  }
}