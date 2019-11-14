const db = require('../connection.js');

const addNewSubscriber = (arn, phoneNumber) => {
  return new Promise((resolve, reject) => {
    db.insert({ arn: arn, phone_number: phoneNumber }, ['id'])
      .into('subscribers')
      .then(data => resolve(data[0].id))
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

module.exports = addNewSubscriber;
