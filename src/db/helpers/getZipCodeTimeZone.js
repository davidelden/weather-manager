const db = require('../connection.js');

const getZipCodeTimeZone = zipCode => (
  db('zip_codes_time_zones_lookup')
    .where('zip_code', zipCode)
    .then(data => {
      if(data && data.length > 0) {
        const { time_zone_id } = data[0];
        if(time_zone_id) return time_zone_id;
      }

      return 0;
    })
    .catch(err => console.error(err))
)

module.exports = getZipCodeTimeZone;
