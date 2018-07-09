import { IParameters } from '../../models';

const parameters: IParameters = {
  'exchanges': [
    {
      currencies: { from: 'USD', to: 'EUR' },
      config: {
        direction: ['from-to']
      }
    }
  ],
};

export function parametersRequestHandler(request, response) {
  const parameter = request.query.parameter;

  if (parameters.hasOwnProperty(parameter)) {
    response.status(200).json(parameters[parameter]);
  } else {
    response.status(400).json({
      errorType: 'UnknownParameters',
      message: 'The requested parameter does not exist',
    });
  }
}
