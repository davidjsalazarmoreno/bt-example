import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app, PREFIX, PORT } from './../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Test main API', () => {
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

  describe('/POST exchanges', () => {
    it('it should calculates the currency exchanges from USD to EUR', (done) => {
      chai.request(app)
          .post(`/api/v1/currency/exchange/USD`)
          .send({
            to: 'EUR',
            amount: 200,
          })
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .end((error, response) => {
            should.not.exist(error);
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('amount').to.be.a('number');
            done();
          });
    });

  });

});
