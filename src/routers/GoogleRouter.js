import {Router as app} from '../helpers';

module.exports = function (application, emitter) {
  
  application.get('/google', function (req, res) {
    res.send('Subscribed to Google Channel');
  });
  
  application.get('/google/auth/success', function (req, res) {
    application.getService('Google').handleAuthentication(req.query.code);
    application.store.setConstantToStore('GOOGLE_TOKEN', req.query.code);
    res.status(200).jsonp({event: 'AUTHENTICATION_SUCCESS', payload: {google_key: req.query.code}});
  });
  
  application.get('/google/:action/unsubscribe', function (req, res) {
    const action_type = req.params.action;
    emitter.emit('unsubscription', {type: 'UNSUBSCRIBE', payload: {name: 'Google', opts: {action_type: action_type}}});
    res.status(200).jsonp({type: 'UNSUBSCRIBE_SUCCESS', payload: {name: 'Google', opts: {action_type: action_type}}});
  });
  
  application.get('/google/:action', function (req, res) {
    const action_type = req.params.action;
    emitter.emit('subscription', {
      type: 'SUBSCRIBE',
      payload: {name: 'Google', opts: {action_type: action_type, socket: null}}
    });
    const query = Object.keys(req.query).length > 0 ? req.query : null;
    return application.getService('Google').handle(action_type, query)
      .then(data => {
        if (typeof data !== 'string') {
          emitter.emit('subscription_data', {channel: 'Google', data: data});
          res.jsonp(data);
        } else {
          res.redirect(data);
        }
      })
      .catch(err => res.status(500).send({
        message: err.message,
        stack: err.stack
      }));
  });
  return app;
};