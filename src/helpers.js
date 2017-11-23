const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
export function __init(app) {
  app.use(cors());
  app.use(express.static('public'));
  app.use(morgan('dev'));
}

export function app() {
  return new express();
}