import {Application} from './src/Application';
import {RequestService, AuthenticationService} from './src/services';

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

router.post('/auth', function (req,res) {
  const authService = new AuthenticationService(app.store);
});