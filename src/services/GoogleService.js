import googleapis from 'googleapis';
import {config} from '../default.config';
import BasicService from './BasicService';

export default class GoogleService extends BasicService {
  
  constructor (store) {
    super(store);
    this.oAuthClient = null;
  }
  
  
  handle (action_type, options) {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated(action_type))
        reject(new Error('oAuthClient is not set, you must be logged in !'));
      else
        switch (action_type) {
          case 'calendar':
            if (this.oAuthClient === null)
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
          case 'contacts':
            this.handleContacts().then(data => resolve(data)).catch(err => reject(err));
            break;
          default:
            reject(new Error('Not defined action !'));
            break;
        }
    });
  }
  
  
  isAuthenticated (action_type) {
    return  this.oAuthClient !== null || super.isAuthenticated(action_type);
  }
  
  
  /**
   *
   * @param {oAuthClient} opts['auth'] this.oAuthClient
   * @param {String} opts['calendarId'] `primary`
   * @param {String} opts['timeMin'] `new Date().toISOString()`
   * @param {Boolean} opts['singleEvents'] `true`
   * @param {String} opts['orderBy'] `startTime`
   * @returns {Promise<any>}
   */
  handleCalendar (opts) {
    let options_query = {
      auth: this.oAuthClient,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString()
    };
    
    if (opts) options_query = Object.assign(opts, options_query);
    return new Promise((resolve, reject) => {
      const calendar = googleapis.calendar('v3');
      calendar.events.list(options_query, function (err, response) {
        if (err) reject(err);
        else {
          if (!(response && response.items)) reject(new Error('No Event existing !'));
          else resolve(response.items);
        }
      });
    });
  }
  
  
  handleProfile () {
    return new Promise((resolve, reject) => {
      const plus = googleapis.plus('v1');
      plus.people.get({
        userId: 'me',
        auth: this.oAuthClient
      }, function (err, response) {
        if (err) reject(err);
        else resolve(response);
      });
    });
  }
  
  
  handleAuthentication (code = null) {
    const OAuth2 = googleapis.auth.OAuth2;
    const oauth2Client = new OAuth2(
      config.GOOGLE.AUTH_ID,
      config.GOOGLE.AUTH_SECRET,
      config.GOOGLE.AUTHORIZED_LINK
    );
    googleapis.options({
      auth: oauth2Client
    });
    if (code) {
      oauth2Client.getToken(code, (err, tokens) => {
        if (!err) {
          oauth2Client.credentials = {
            access_token: tokens.access_token,
            expiry_date: tokens.expiry_date
          };
          this.oAuthClient = oauth2Client;
        }
      });
    } else {
      return oauth2Client.generateAuthUrl({
        access_type: 'online',
        scope: config.GOOGLE.SCOPES
      });
    }
  }
  
  
  handleContacts () {
    return new Promise((resolve, reject) => {
      const plus = googleapis.plus('v1');
      plus.people.list({
        userId: 'me',
        collection: 'visible',
        auth: this.oAuthClient,
      },function(err, response) {
        if(err) reject(err);
        else resolve(response);
      })
    })
  }
}