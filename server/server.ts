import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';

import { errorHandler } from './utils';
import apiRoutes from './api/v1';

const { PREFIX, DEBUG } = dotenv.config().parsed;
export const app = express();

app.use(cors());

if (DEBUG) {
  app.use(morgan('combined'));
}

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(errorHandler);

// API
app.use(`${PREFIX}`, apiRoutes);

