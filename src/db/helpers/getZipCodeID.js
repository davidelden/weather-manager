const db = require('../connection.js');

const getZipCodeID = zipCode => (
  db.select('id')
  .from('zip_codes')
  .where({ zip_code: zipCode })
  .then(data => data[0].id)
  .catch(err => {
    console.error(err);
  });
)

module.exports = getZipCodeID;
