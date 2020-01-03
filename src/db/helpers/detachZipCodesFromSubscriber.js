const db = require('../connection.js');

const detachZipCodesFromSubscriber = (subscriberID, zipCodeIDs) => (
  db('subscribers_zip_codes')
    .where('subscriber_id', subscriberID)
    .whereIn('zip_code_id', zipCodeIDs)
    .del()
    .catch(err => console.log(err))
)

module.exports = detachZipCodesFromSubscriber;
