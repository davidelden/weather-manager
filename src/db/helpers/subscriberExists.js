const db = require('../connection.js');

const subscriberExists = phoneNumber => (
  db('subscribers')
    .count('phone_number')
    .where('phone_number', phoneNumber)
    .then(data => {
      const { count } = data[0];

      return parseInt(count) > 0 ? true : false;
    })
    .catch(err => console.error(err))
)

module.exports = subscriberExists;
