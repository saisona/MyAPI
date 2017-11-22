import {Application} from './src/Application';
import {AVAILABLE_METHODS} from './default.config';

const app = new Application();
app.run();
app.handleRequest('/',AVAILABLE_METHODS.GET, function(req,res) {
  console.log(req,res);
});