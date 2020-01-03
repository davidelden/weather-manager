const db = require('../connection.js');

const zipCodeIdExistsInSubscribersZipCodes = zipCodeId => (
  db('subscribers_zip_codes')
    .where('zip_code_id', zipCodeId)
    .then(data => {
      if(data && data.length > 0) {
        return true;
      }

      return false;
    })
    .catch(err => console.log(err))
)

module.exports = zipCodeIdExistsInSubscribersZipCodes;
