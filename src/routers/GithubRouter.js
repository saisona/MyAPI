import {config} from '../default.config';
import {Router} from '../helpers';
import {LogService} from '../services';


const app = new Router();

module.exports = function (application, emitter) {
  
  app.get('/github/:action', function (req, res) {
    emitter.emit('subscription', {
      type: 'SUBSCRIBE',
      payload: {name: 'Github', opts: {action_type: req.params.action, socket: null}}
    });
    application.getService('Github').handle(req.params.action, {
      request: req,
      response: res
    }).then(response => {
      emitter.emit('subscription_data', {channel: 'Github', data: response});
      res.status(200).jsonp(response)
    })
      .catch(err => res.status(500).jsonp(err.message));
  });
  
  app.get('/github/auth/success', function (req, res) {
    application.getService('Request').post('https://github.com/login/oauth/access_token', {
      client_id: config.GITHUB_AUTH_ID,
      client_secret: config.GITHUB_AUTH_SECRET,
      code: req.query.code
    }).then(response => {
      application.store.setConstantToStore('API_KEY_GITHUB', response.body.access_token);
      LogService.log('GITHUB_ROUTER', `API_KEY_GITHUB => ${application.store.getConstantFromStore('API_KEY_GITHUB')}`);
      res.status(201).jsonp(response.response);
    }).catch(err => res.status(500).send(err.message));
  });
  
  return app;
};