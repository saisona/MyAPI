import {Application} from './src/Application';
import {AVAILABLE_METHODS} from './default.config';
import {RequestService} from './src/services/RequestService';

const app = new Application();
app.run();

Application.route().get('/', function(req,res) {
  res.send('Hello World')
});

app.get('/github', function(req, res) {
  let Http = new RequestService();
  Http.get('http://api.github.com').then(data => {
    res.send(data);
  }).catch(err => console.log(`[ERROR] ${err.message || err}`));
});