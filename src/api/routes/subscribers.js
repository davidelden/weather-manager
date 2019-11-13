const express = require('express'),
      router = express.Router(),
      db = require('../../db/connection.js');

// Get all subscribers
router.get('/', (req, res) => {
  db.select('id', 'phone_number')
    .table('subscribers')
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// Get subscriber by phone number
router.get('/:phone_number', (req, res) => {
  const { phone_number } = req.params;

  db.raw('SELECT row_to_json(sub) AS subscribers FROM (SELECT s.id, s.arn, s.phone_number, (SELECT array_agg(zip_code) FROM zip_codes INNER JOIN subscribers_zip_codes ON zip_codes.id = subscribers_zip_codes.zip_code_id WHERE subscribers_zip_codes.subscriber_id = s.id) AS zip_codes FROM subscribers AS s WHERE s.phone_number = ?) sub', phone_number)
    .then(data => {
      const subscriber = { ...data.rows[0].subscribers }

      res.send(subscriber);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;
