const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Fact = require('../lib/models/fact');

describe('portfolio-site-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a fact via POST', () => {
    return request(app)
      .post('/api/v1/facts')
      .send({
        type: 'memory',
        colorCode: 'blue',
        text: 'blah blah blah',
        imageUrl: 'url.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          type: 'memory',
          colorCode: 'blue',
          text: 'blah blah blah',
          imageUrl: 'url.com'
        });
      });
  });
});
