'use strict';

require('../app/globalPaths');
const expect    = require('chai').expect;
const supertest = require('supertest');
const app       = require('../app');

const request = supertest.agent(app.listen())

describe('auth login', () => {

  it('should not be able to authenticate', function(done) {
    request
      .get('/api/campaign')
      .expect(401, done);
  });

  it('should be able to authenticate', function(done) {
    request
      .get('/api/campaign')
      .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhcGlfdXNlcl9pZCI6MSwiaWF0IjoxNDgwMTg1NTU1fQ.XbC-sHHbWptx6eAWMVlumqfFq_CQZ6ZYtqZ7axwXRiX2ASRmpPxjUeN-_aF0TKF5bv3as5AlrocNev_-lqr5vwoWskvAjHuPafcfbZ4MB86rvUjRWRg5zDVUUc1SemR8f-gpFohO7AhKzDuyRxN3R0sSyDJrheE13Hy5-vQDbo8')
      .expect(200, done);
  });

});
