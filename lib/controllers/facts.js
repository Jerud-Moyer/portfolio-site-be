const { Router } = require('express');
const Fact = require('../models/fact');


module.exports = Router()
  .post('/', (req, res, next) => {
    Fact
      .insert(req.body)
      .then(fact => res.send(fact))
      .catch(next);
  });
