const db = require('../connection.js');

const getZipCodeIDs = zipCodes => (
  db.select(db.raw('array_agg(id) AS "zip_code_ids"'))
  .from('zip_codes')
  .whereIn('zip_code', zipCodes)
  .then(data => {
    if(data && data.length > 0) {
      const { zip_code_ids } = data[0];

      if(zip_code_ids) return zip_code_ids;
    }

    return 0;
  })
  .catch(err => {
    console.error(err);
  })
)

module.exports = getZipCodeIDs;
