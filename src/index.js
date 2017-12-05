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
  res.redirect('http://www.google.fr');
});

