const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
export function __init(app) {
  app.use(cors());
  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(helmet());
}

export function app() {
  return new express();
}

export function newRoute() {
  return new express.Router();
}
