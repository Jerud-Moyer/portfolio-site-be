const Fact = require ('../models/Fact');
const factsData = require ('./factsData');
const pool = require('../utils/pool');
const fs = require('fs');

pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
Promise.all(

  factsData.map(fact => {
    return Fact.insert(fact);
  })
);
