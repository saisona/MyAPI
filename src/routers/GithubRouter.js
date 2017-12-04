import {Router} from '../helpers';
const app = new Router();

module.exports = function(application) {
  
  app.get('/github/:action', function(req, res) {
    application.getService('Github').handle(req.params.action).then(response => {
      res.jsonp(response);
    })
  });
  
  return app;
};