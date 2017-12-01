import {Application} from './Application';
import {RequestService, AuthenticationService} from './services/index';

const app = new Application();
const router = Application.route();
app.run();

router.get('/', function(req,res) {
  res.send('Hello World')
});

router.get('/github', function(req, res) {
  let Http = new RequestService();
  Http.get('http://api.github.com').then(data => {
    res.send(data);
  }).catch(err => console.log(`[ERROR] ${err.message || err}`));
});

app.get('/google/:action', function(req, res) {
  const action_type = req.params.action;
  const query = Object.keys(req.query).length > 0 ? req.query : null;
  app.getService('Google').handle(action_type, query).then(events => {
    res.jsonp(events);
  }).catch(err => res.status(500).send({message: err.message, code : err.status, stack: err.stack}));
});

router.post('/auth', function (req,res) {
  const authService = new AuthenticationService(app.store);
});