import {Application} from './Application';

const app = new Application();
const githubRouter = require('./routers/GithubRouter')(app);
const googleRouter = require('./routers/GoogleRouter')(app);

/**
 *  ROUTES HANDLERS
 */
app.use(githubRouter);
app.use(googleRouter);

app.get('/', function(req,res) {
  res.redirect('https://documenter.getpostman.com/view/1161028/rand-ia-api-2017/7EK5qh1');
});

app.get('/events', function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  
  // send a ping approx every 2 seconds
  const timer = setInterval(() => {
    res.write('data: ping\n\n');
    
    // !!! this is the important part
    res.flush()
  }, 2000);
  
  res.on('close', function () {
    clearInterval(timer)
  })
});

app.run();