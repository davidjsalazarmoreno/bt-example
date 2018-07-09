import * as express from 'express';

import { currenciesExchangesRequestHandler } from './currencies-exchanges';
import { parametersRequestHandler } from './parameters';

const apiRoutes = express.Router();

apiRoutes.post('/currencies/exchanges/:from', currenciesExchangesRequestHandler);
apiRoutes.get('/parameters', parametersRequestHandler);

export default apiRoutes;
