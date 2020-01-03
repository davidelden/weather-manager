const db = require('../connection.js');

const getSubscriberID = phoneNumber => (
  db.select('id')
    .from('subscribers')
    .where({ phone_number: phoneNumber })
    .then(data => {
      if(data && data.length > 0) {
        const { id } = data[0];
        if(id) return id;
      }

      return 0;
    })
    .catch(err => {
      console.error(err);
    })
)

module.exports = getSubscriberID;
