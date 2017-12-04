import {Router} from '../helpers';
const app = new Router();

module.exports = function(application) {
  
  
  app.get('/github/:action', function(req, res) {
    application.getService('Github').handle(req.params.action, res).then(response => {
      res.jsonp(response);
    })
  });
  
  app.get('/github/auth/success', function(req, res) {
    console.log(req.query);
    res.jsonp({query: req.query, params: req.params});
  });
  
  return app;
};