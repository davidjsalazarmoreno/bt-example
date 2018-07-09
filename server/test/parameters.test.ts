import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from './../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Test Parameters', () => {
  const usdToEur = {
    currencies: { from: 'USD', to: 'EUR' },
    config: {
      direction: ['from-to']
    }
  };

  describe('/GET parameters', () => {
    it('it should GET the exchanges parameters', (done) => {
      chai.request(app)
          .get(`/api/v1/parameters`)
          .query({
            parameter: 'exchanges',
          })
          .end((error, response) => {
            should.not.exist(error);
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body[0].should.be.eql(usdToEur);
            done();
          });
    });

    it('it should GET a 400 response for an unknown parameter', (done) => {
      chai.request(app)
          .get(`/api/v1/parameters`)
          .query({
            parameter: 'unknown',
          })
          .end((error, response) => {
            should.not.exist(error);
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.errorType.should.be.eql('UnknownParameters');
            done();
          });
    });
  });

});
