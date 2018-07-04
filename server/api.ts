import * as express from 'express';

const apiRoutes = express.Router();


apiRoutes.get('/parameters', (request, response) => {
  response.json({
    foo: 'bar'
  });

});


export default apiRoutes;
