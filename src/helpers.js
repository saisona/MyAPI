const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

export function __init (app) {
  app.use(cors());
  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(helmet());
}

export function app () {
  const app = new express();
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  
  return {
    app, io, server
  };
}

export function initGitHubAPI () {
  const GitHubAPI = require('github');
  return new GitHubAPI({
    protocol: 'https',
    rejectUnauthorized: false // default: true
  });
}

export const ACTION_TYPE = {
  NOTIFICATION: 'notifications',
  PROFILE: 'me',
  AUTHENTICATION: 'auth',
  SUBSCRIPTION: 'subscribe',
  UNSUBSCRIPTION: 'unsubscribe'
};

export function Router () {
  return new express.Router;
}

