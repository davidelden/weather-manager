const db = require('../../db/connection.js');

const subscriberExists = phone_number => (
  db('subscribers')
    .count('phone_number')
    .where('phone_number', phone_number)
    .then(data => {
      const { count } = data[0];

      return parseInt(count) > 0 ? true : false;
    })
    .catch(err => console.error(err))
)

module.exports = subscriberExists;
