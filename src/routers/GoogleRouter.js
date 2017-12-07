import {Router} from '../helpers';

const app = new Router();

module.exports = function (application) {
  application.get('/google/:action', function (req, res) {
    const action_type = req.params.action;
    const query = Object.keys(req.query).length > 0 ? req.query : null;
    return application.getService('Google').handle(action_type, query)
      .then(data => res.jsonp(data))
      .catch(err => res.status(500).send({
        message: err.message,
        stack: err.stack
      }));
  });
  return app;
};