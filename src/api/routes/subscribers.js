const SNS = require('aws-sdk/clients/sns'),
      sns = new SNS(),
      express = require('express'),
      router = express.Router(),
      db = require('../../db/connection.js'),
      subscriberExists = require('../../db/helpers/subscriberExists.js'),
      addNewSubscriber = require('../../db/helpers/addNewSubscriber.js'),
      createNewSubscriberSNSParams = require('../helpers/createNewSubscriberSNSParams.js');

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
      const subscriber = { ...data.rows[0].subscribers }

      res.send(subscriber);
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
      const arn = data['SubscriptionArn'];
      let newSubscriberID;

      // Update subscriber table with new subscriber (arn, phone_number)
      addNewSubscriber(arn, phone_number)
        .then(id => {
          newSubscriberID = id;
        })
        .then(() => {
          // Check if any zip_codes exist
          //   - if not, create new zip_code
          //      • need to look up which time_zone new zip_code is in
          //      • once new zip_code is created, update subscribers_zip_codes table
          //   - if yes, update subscribers_zip_codes table

          // zipCodesExist(zip_codes)
        })
        .catch(err => console.log(err));
    }
  })
  res.send('Success!');
});

// Update subscriber zip codes

// Opt back in subscriber

module.exports = router;
