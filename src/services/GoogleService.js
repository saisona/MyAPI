import googleapis from 'googleapis';
import {api, config} from '../default.config';
import {BasicService} from './BasicService';
import {LogService} from './LogService';

export class GoogleService extends BasicService {
  
  constructor (store) {
    super(store);
    
  }
  
  
  handle (action_type, options) {
    return new Promise((resolve, reject) => {
      switch (action_type) {
        case 'calendar':
          this.handleCalendar(options)
            .then(events => resolve(events))
            .catch(err => reject(err));
          break;
        case 'profile':
          this.handleProfile(options).then(data => resolve(data)).catch(err => reject(err));
          break;
        case 'auth':
          resolve(this.handleAuthentication());
          break;
        default:
          reject(new Error('Not defined action !'));
          break;
      }
    });
  }
  
  
  handleCalendar (opts) {
    let options_query = {
      key: config.GOOGLE_API_KEY,
      calendarId: 'primary'
    };
    if (opts) {
      /*
       calendarId: 'primary',
       timeMin: (new Date()).toISOString(),
       maxResults: 10,
       singleEvents: true,
       orderBy: 'startTime'
       */
      options_query = Object.assign(opts, options_query);
    } else {
    
    }
    return new Promise((resolve, reject) => {
      const calendar = googleapis.calendar('v3');
      calendar.events.list(options_query, function (err, response) {
        if (err) reject(err);
        LogService.log('PROMISE', err);
        const events = response && response.items;
        if (!events) reject(new Error('No Event existing !'));
        else resolve(response.items);
      });
    });
  }
  
  
  handleProfile (opts) {
    let options_query = {
      key: config.GOOGLE_API_KEY
    };
    return new Promise((resolve, reject) => {
      const calendar = googleapis.plus('v3');
      calendar.events.list(options_query, function (err, response) {
        if (err) reject(err);
        const events = response.items;
        if (!events) reject(new Error('No Event existing !'));
        else resolve(events);
      });
    });
  }
  
  
  handleAuthentication () {
    const scopes = [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/calendar'
    ];
    const OAuth2 = googleapis.auth.OAuth2;
    const oauth2Client = new OAuth2(
      config.GOOGLE_AUTH_ID,
      config.GOOGLE_AUTH_SECRET,
      (api.API_BRANCH !== 'dev' ? 'https://api.randia.eu/' : 'http://localhost:1337/') + 'google/auth/success/'
    );
    googleapis.options({
      auth: oauth2Client
    });
    
    return oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
      
      // If you only need one scope you can pass it as a string
      scope: scopes
      
      // Optional property that passes state parameters to redirect URI
      // state: 'foo'
    });
  }
}