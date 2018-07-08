import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import apiRoutes from './api';

export const PREFIX = '/api/v1';
export const PORT = 7777;
export const app = express();

app.use(cors());
app.use(morgan('combined'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    errorType: 'ServerError',
    message: 'Internal server error',
  });
}



// API
app.use(`${PREFIX}`, apiRoutes);

