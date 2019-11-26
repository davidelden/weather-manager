const db = require('../connection.js');

const addNewZipCode = (zipCode, timeZoneID) => {
  db.insert({ zip_code: zipCode, time_zone_id: timeZoneID }, ['id'])
    .into('zip_codes')
    .then(data => data[0].id)
    .catch(err => {
      console.error(err);
    });
}

module.exports = addNewZipCode;
