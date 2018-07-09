import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

import { exchangesEnginesFactory } from '../../models/exchanges-engines.model';

const { FOREX_API_KEY } = dotenv.config().parsed;

const exchangeEngine = exchangesEnginesFactory('forex', {
  apiKey: FOREX_API_KEY,
});

export function currenciesExchangesRequestHandler(request, response) {
  const body = {
    from: request.params.from,
    to: request.body.to,
    amount: request.body.amount,
  };
  const enpoint = exchangeEngine.getConversionUri(body);

  fetch(enpoint, {
    method: 'GET',
  })
  .then((result) => result.json())
  .then((result) => {
    if (!result.value) {
      throw new Error('CurrencyExchangeError');
    }

    response.status(200).json({
      amount: result.value,
    });

  })
  .catch((error) => {
    console.warn(error);
    response.status(500).json({
      errorType: 'CurrencyExchangeError',
      message: 'Sorry, the service is not currently active',
    });

  });
}
