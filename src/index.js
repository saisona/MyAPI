import {Application} from './Application';

const app = new Application();
app.run();

app.get('/', function(req,res) {
  res.send('Hello World')
});

app.get('/github/:action', function(req, res) {
  const action_type = req.params.action;
  app.getService('Github').handle(action_type).then(response => {
    res.jsonp(response);
  }).catch(err => res.status(500).send(err.message));
});

app.get('/google/:action', function(req, res) {
  const action_type = req.params.action;
  const query = Object.keys(req.query).length > 0 ? req.query : null;
  app.getService('Google').handle(action_type, query).then(events => {
    res.jsonp(events);
  }).catch(err => res.status(500).send({message: err.message, code : err.status, stack: err.stack}));
});
