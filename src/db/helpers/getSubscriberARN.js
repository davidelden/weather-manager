const db = require('../connection.js');

const getSubscriberARN = phoneNumber => (
  db.select('arn')
    .from('subscribers')
    .where({ phone_number: phoneNumber })
    .then(data => {
      if(data && data.length > 0) {
        const { arn } = data[0];
        if(arn) return arn;
      }

      return 0;
    })
    .catch(err => {
      console.error(err);
    })
)

module.exports = getSubscriberARN;
