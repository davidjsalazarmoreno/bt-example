import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';

import apiRoutes from './api';

const PREFIX = '/api/v1';
const PORT = 8080;

const app = express();

app.use(cors());
app.use(morgan('combined'));

// API
app.use(`${PREFIX}`, apiRoutes);

app.listen(PORT, function() {
  console.log(`Started api server at port ${PORT}`);
});
