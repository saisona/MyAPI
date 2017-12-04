import {Router} from '../helpers';
const app = new Router();

module.exports = function(application) {
  
  application.get('/google/:action', function(req, res) {
    const action_type = req.params.action;
    const query = Object.keys(req.query).length > 0 ? req.query : null;
    application.getService('Google').handle(action_type, query).then(events => {
      res.jsonp(events);
    }).catch(err => res.status(500).send({message: err.message, code : err.status, stack: err.stack}));
  });
  
  return app;
};