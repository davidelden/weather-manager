const config = require('../../knexfile.js'),
      db = require('knex')(config);

module.exports = db;
