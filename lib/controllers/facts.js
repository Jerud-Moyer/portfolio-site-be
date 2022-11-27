const { Router } = require('express');
const Fact = require('../models/Fact');


module.exports = Router()
  .post('/', (req, res, next) => {
    Fact
      .insert(req.body)
      .then(fact => res.send(fact))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Fact
      .find()
      .then(facts => res.send(facts))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Fact
      .findById(req.params.id)
      .then(fact => res.send(fact))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Fact
      .delete(req.params.id)
      .then(fact => res.send(fact))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Fact
      .update(req.params.id, req.body)
      .then(fact => res.send(fact))
      .catch(next);
  });
