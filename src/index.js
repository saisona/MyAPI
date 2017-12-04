import {Application} from './Application';

const app = new Application();
const githubRouter = require('./routers/GithubRouter')(app);
const googleRouter = require('./routers/GoogleRouter')(app);

app.run();
app.use(githubRouter);
app.use(googleRouter);

app.get('/', function(req,res) {
  res.send('Hello World')
});

