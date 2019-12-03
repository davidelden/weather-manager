const db = require('../connection.js');

const getZipCodeID = zipCode => (
  db.select('id')
  .from('zip_codes')
  .where({ zip_code: zipCode })
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

module.exports = getZipCodeID;
