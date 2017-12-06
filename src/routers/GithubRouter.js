import {config} from '../default.config';
import {Router} from '../helpers';

const app = new Router();

module.exports = function (application) {
  
  app.get('/github/:action', function (req, res) {
    application.getService('Github').handle(req.params.action, {
      request: req,
      response: res
    }).then(response => res.status(200).jsonp(response))
      .catch(err => res.status(500).jsonp(err.message));
  });
  
  app.get('/github/auth/success', function (req, res) {
    application.getService('Request').post('https://github.com/login/oauth/access_token', {
      client_id: config.GITHUB_AUTH_ID,
      client_secret: config.GITHUB_AUTH_SECRET,
      code: req.query.code
    }).then(response => {
      application.store.setConstantToStore('API_KEY_GITHUB', response.body.access_token);
      console.log(`FROM ROUTER => ${application.store.getConstantFromStore('API_KEY_GITHUB')}`);
      res.status(201).jsonp(response.response);
    }).catch(err => res.status(500).send(err.message));
  });
  
  return app;
};