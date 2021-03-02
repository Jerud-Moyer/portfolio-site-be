const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Fact = require('../lib/models/Fact');

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

  it('finds all facts via GET', async() => {
    const facts = await Promise.all([
      Fact.insert({
        type: 'memory',
        colorCode: 'blue',
        text: 'blah blah blah',
        imageUrl: 'url.com'
      }),
      Fact.insert({
        type: 'personal',
        colorCode: 'green',
        text: 'blue blue blue',
        imageUrl: 'p-url.com'
      }),
      Fact.insert({
        type: 'professional',
        colorCode: 'yellow',
        text: 'blarg blarg blarg',
        imageUrl: 'F-url.com'
      })
    ]);

    return request(app)
      .get('/api/v1/facts')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(facts));
      });
  });

  it('deletes a fact with DELETE', async() => {
    const fact = await Fact.insert({
      type: 'professional',
      colorCode: 'yellow',
      text: 'blarg blarg blarg',
      imageUrl: 'F-url.com'
    });

    const response = await request(app)
      .delete(`/api/v1/facts/${fact.id}`);
    
    expect(response.body).toEqual(fact);
  });

  it('gets facts by ID', async() => {
    const fact = await Fact.insert({
      type: 'memory',
      colorCode: 'blue',
      text: 'blah blah blah',
      imageUrl: 'url.com'
    });

    const response = await request(app)
      .get(`/api/v1/facts/${fact.id}`);
    expect(response.body).toEqual(fact);

  });

  it('updates a fact via PUT', async() => {
    const fact = await Fact.insert({
      type: 'memory',
      colorCode: 'blue',
      text: 'blah blah blah',
      imageUrl: 'url.com'
    });

    return request(app)
      .put(`/api/v1/facts/${fact.id}`)
      .send({
        type: 'personal',
        colorCode: 'yellow',
        text: 'blargh blargh blargh',
        imageUrl: 'Furl.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          type: 'personal',
          colorCode: 'yellow',
          text: 'blargh blargh blargh',
          imageUrl: 'Furl.com'
        });
      });
  });
});
