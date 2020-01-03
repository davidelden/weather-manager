const db = require('../connection.js');

const addNewZipCode = (zipCode, timeZoneID) => (
  db.insert({ zip_code: zipCode, time_zone_id: timeZoneID }, ['id'])
    .into('zip_codes')
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

module.exports = addNewZipCode;
