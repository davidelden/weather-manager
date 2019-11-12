const express = require('express'),
      router = express.Router(),
      db = require('../../db/connection.js');

// Get all subscribers
router.get('/', (req, res) => {
  db.select('id', 'arn', 'phone_number')
    .table('subscribers')
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// Get subscriber by phone number
// *** Look into Postgres json_agg and array_agg functions
// *** https://www.reddit.com/r/node/comments/aexin9/nesting_data_from_database_queries_with_joins_for/

router.get('/:phone_number', (req, res) => {
  const { phone_number } = req.params;

  db.select('id', 'arn', 'phone_number')
    .from('subscribers')
    .where({ phone_number: phone_number })
    .then(data => {
      const subscriber = { ...data[0] };

      db.select('zip_code')
        .from('zip_codes')
        .innerJoin('subscribers_zip_codes', 'zip_codes.id', 'subscribers_zip_codes.zip_code_id')
        .where({ 'subscribers_zip_codes.subscriber_id':  subscriber.id })
        .then(zipCodes => {
          subscriber.zip_codes = zipCodes.map(row => row.zip_code);
          res.json(subscriber);
        })
        .catch(err => {
          console.error(err);
          res.sendStatus(500);
        })
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;
