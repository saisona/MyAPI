import {EventEmitter} from 'events';
import {Application} from './Application';
import {LogService} from './services';


const emitter = new EventEmitter();
const app = new Application();

const githubRouter = require('./routers/GithubRouter')(app, emitter);
const googleRouter = require('./routers/GoogleRouter')(app, emitter);
const channels = new Map();

app.run();

/**
 *  ROUTES HANDLERS
 */
app.use(githubRouter);
app.use(googleRouter);

app.get('/docs', function (req, res) {
  res.redirect('https://documenter.getpostman.com/view/1161028/rand-ia-api-2017/7EK5qh1');
});
app.post('/fake', function (req, res) {
  if(req.body) {
    res.jsonp(req.body);
  } else {
    res.status(500).jsonp({errcode: 500, message: 'Fake endpoint need some body to be checked'});
  }
});
app.get('/json', function(req, res) {

});

app.get('/json/version', (req, res) => res.redirect('/version'));

app.io.on('connection', (socket) => {
  app.getService('WebSocket').socket = socket;
  
  socket.on('collect', (data) => {
    LogService.obj(`COLLECT`, data);
    LogService.file('COLLECT', socket.id, data);
  });
  
  emitter.addListener('subscription_data', (data) => socket.emit('subscription_data', data));
  
  emitter.addListener('subscription', (opts) => {
    opts.payload.opts.socket = socket;
    app.subscribe(opts.payload.name, socket, opts).catch(err => LogService.error('INDEX', err.message));
  });
  
  socket.on('unsubscribtion', function (name) {
    channels.get(name).unsubscribe(socket);
  });
  
});
