const db = require('../connection.js')

const getZipCodesBySubscriberPhoneNumber = phone_number => (
  db.raw('SELECT array_agg(zip_codes.zip_code) AS zip_codes FROM subscribers, zip_codes, subscribers_zip_codes WHERE subscribers.id = subscribers_zip_codes.subscriber_id AND zip_codes.id = subscribers_zip_codes.zip_code_id AND subscribers.phone_number = ?', phone_number)
    .then(data => {
      if(data && data.rowCount > 0) {
        const { zip_codes } = data.rows[0];

        if(zip_codes) return zip_codes;

        return 0;
      }

      return 0;
    })
    .catch(err => console.error(err))
)

module.exports = getZipCodesBySubscriberPhoneNumber;
