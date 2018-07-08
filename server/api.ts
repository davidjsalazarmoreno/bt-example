import * as express from 'express';
import fetch from 'node-fetch';

const apiRoutes = express.Router();

const parameters = {
  'exchanges': [
    {
      currencies: { from: 'USD', to: 'EUR' },
      config: {
        direction: ['from-to']
      }
    }
  ],
};

apiRoutes.post('/currency/exchange/:from', (request, response) => {
  const from = request.params.from;
  const to = request.body.to;
  const amount = request.body.amount;

  fetch(`https://forex.1forge.com/1.0.3/convert?from=${from}&to=${to}&quantity=${amount}&api_key=F14OnGiy5dQ7w3JQXtJjAOgUJ0T9Kd41`, {
    method: 'GET',
  })
  .then((result) => result.json())
  .then((result) => {
    response.status(200).json({
      amount: result.value
    });

  })
  .catch(() => {
    response.status(500).json({
      errorType: 'CurrencyExchangeError',
      message: 'Sorry, the service is not currently active',
    });

  });


});

apiRoutes.get('/parameters', (request, response) => {
  const parameter = request.query.parameter;

  if (parameters.hasOwnProperty(parameter)) {
    response.status(200).json(parameters[parameter]);
  } else {
    response.status(400).json({
      errorType: 'UnknownParameters',
      message: 'The requested parameter does not exist',
    });
  }

});


export default apiRoutes;
