const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
import {config} from './default.config';


export function __init (app) {
  app.use(cors());
  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(helmet());
}

export function app () {
  return new express();
}

export function initGitHubAPI () {
  const GitHubAPI = require('github');
  const gitAPI = new GitHubAPI({
    protocol: 'https',
    rejectUnauthorized: false // default: true
  });
  gitAPI.authenticate({
    type: 'token',
    token: config.GITHUB_API_KEY
  });
  return gitAPI;
}

export const ACTION_TYPE = {
  NOTIFICATION : 'notifications',
  PROFILE : 'me',
};
