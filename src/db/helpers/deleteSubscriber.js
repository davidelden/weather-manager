const db = require('../connection.js');

const deleteSubscriber = phoneNumber => (
  db('subscribers')
    .where('phone_number', phoneNumber)
    .del()
    .catch(err => console.log(err))
)

module.exports = deleteSubscriber;
