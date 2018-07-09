import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from './../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Test Currencies Exchanges API', () => {

  describe('/POST currencies exchanges', () => {
    it('it should calculates the currency exchanges from USD to EUR', (done) => {
      chai.request(app)
          .post(`/api/v1/currencies/exchanges/USD`)
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
