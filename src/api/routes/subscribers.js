const SNS = require('aws-sdk/clients/sns'),
      sns = new SNS(),
      express = require('express'),
      router = express.Router(),
      db = require('../../db/connection.js'),
      subscriberExists = require('../../db/helpers/subscriberExists.js'),
      addNewSubscriber = require('../../db/helpers/addNewSubscriber.js'),
      createNewSubscriberSNSParams = require('../helpers/createNewSubscriberSNSParams.js'),
      attachZipCodesToSubscriber = require('../../db/helpers/attachZipCodesToSubscriber.js'),
      updateSubscriberZipCodes = require('../../db/helpers/updateSubscriberZipCodes');

router.use(express.urlencoded({ extended: true }));

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
      if(data.rows.length === 0) return res.status(404).json({ message: `Subscriber ${phone_number} not found.` });

      const { subscribers } = data.rows[0];

      res.status(200).send(subscribers);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// Add new subscriber
router.post('/new', async (req, res) => {
  const { phone_number, zip_codes } = req.body,
        params = createNewSubscriberSNSParams(phone_number, zip_codes),
        exists = await subscriberExists(phone_number);

  // Check if subscriber exists
  if(exists) return res.json({ message: 'Subscriber already exists.' });

  sns.subscribe(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.status(500).send(err);
    } else {
      const arn = data['SubscriptionArn'],
            newSubscriber = {};

      newSubscriber.arn = arn;
      newSubscriber.phone_number = phone_number;

      // Update subscriber table with new subscriber (arn, phone_number)
      addNewSubscriber(arn, phone_number)
        .then(id => {
          newSubscriber.id = id;
          attachZipCodesToSubscriber(id, zip_codes);
        })
        .then(() => {
          res.json(newSubscriber);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    }
  })
});

// Update subscriber zip codes
router.patch('/:phone_number/update', (req, res) => {
  const { phone_number } = req.params,
        { zip_codes } = req.body;

  updateSubscriberZipCodes(phone_number, zip_codes)
    .then(data => {
      res.status(200).json({ message: 'testing', current_zip_codes: data })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
});

// Opt back in subscriber

module.exports = router;
