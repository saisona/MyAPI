import {BasicService} from './BasicService';
import {config} from '../default.config';

const googleapis = require('googleapis');

export class GoogleService extends BasicService {
  
  constructor (store) {
    super(store);
    const oAuth2 = googleapis.auth;
    
    this.auth = new oAuth2.OAuth2(config.GOOGLE_AUTH_ID, config.GOOGLE_AUTH_SECRET, 'http://localhost:3000/google/auth');
    oAuth2.fromAPIKey(config.GOOGLE_API_KEY, (err, res) => {
      if (err) throw err;
      res.transporter = this.auth;
      this.auth = res;
      this.store.addToStore('googleAuth', this.auth);
    });
  }
  
  
  handle (action_type, options) {
    return new Promise((resolve, reject) => {
      switch (action_type) {
        case 'calendar':
          this.handleCalendar(options).then(events => {
            resolve(events);
          }).catch(err => {
            reject(err);
          });
          break;
        default :
          reject(new Error('Not defined action !'));
          break;
      }
    });
  }
  
  
  handleCalendar (opts) {
    let options_query = {
      key: config.GOOGLE_API_KEY,
      calendarId: 'alexandre.saison.pro@gmail.com',
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
        if (err) {
          return reject(err);
        }
        const events = response.items;
        if (!events)
          return resolve({events: null});
        else
          return resolve(events);
      });
    });
  }
  
  
  handleGmail(opts) {
    if(!!opts) {
    
    } else {
      googleapis.gmail()
    }
  }
}