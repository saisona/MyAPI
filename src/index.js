import {Application} from './Application';

const app = new Application();
const githubRouter = require('./routers/GithubRouter')(app);
const googleRouter = require('./routers/GoogleRouter')(app);

app.run();

/**
 *  ROUTES HANDLERS
 */
app.use(githubRouter);
app.use(googleRouter);

app.get('/', function(req,res) {
  res.redirect('https://documenter.getpostman.com/view/1161028/rand-ia-api-2017/7EK5qh1');
});

