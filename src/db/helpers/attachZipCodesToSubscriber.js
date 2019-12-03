const db = require('../connection.js'),
      getZipCodeID = require('./getZipCodeID.js'),
      getZipCodeTimeZone = require('./getZipCodeTimeZone.js'),
      addNewZipCode = require('./addNewZipCode.js');

const addSubscribersZipCode = (subscriberID, zipCodeID) => {
  db.insert({ subscriber_id: subscriberID, zip_code_id: zipCodeID })
    .into('subscribers_zip_codes')
    .catch(err => {
      console.error(err);
    });
}

const attachZipCodesToSubscriber = async (subscriberID, zipCodes) => {
  zipCodes.forEach(async code => {
    let zipCodeID = await getZipCodeID(code);

    if(!zipCodeID) {
      const zipCodeTimeZone = await getZipCodeTimeZone(code);

      if(!zipCodeTimeZone) {
        return console.error(`Zip Code ${code} not found in zip_codes_time_zones_lookup table.`)
      }

      zipCodeID = await addNewZipCode(code, zipCodeTimeZone);
    }

    addSubscribersZipCode(subscriberID, zipCodeID);
  });
}

module.exports = attachZipCodesToSubscriber;
