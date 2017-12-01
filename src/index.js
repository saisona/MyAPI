import {Application} from './Application';
const app = new Application();
app.run();

app.get('/', function(req,res) {
  res.redirect('/readme')
});

app.get('/github', function(req, res) {
  res.sendStatus(401);
});

app.get('/google/:action', function(req, res) {
  const action_type = req.params.action;
  const query = Object.keys(req.query).length > 0 ? req.query : null;
  app.getService('Google').handle(action_type, query).then(events => {
    res.jsonp(events);
  }).catch(err => res.status(500).send({message: err.message, code : err.status, stack: err.stack}));
});

app.get('/readme', function(req,res) {
  res.send('YOLO WORKS');
});