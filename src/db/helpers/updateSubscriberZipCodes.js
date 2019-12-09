const getZipCodesBySubscriberPhoneNumber = require('./getZipCodesBySubscriberPhoneNumber.js'),
      getZipCodesToAdd = require('./getZipCodesToAdd.js'),
      getZipCodesToRemove = require('./getZipCodesToRemove.js');

const updateSubscriberZipCodes = async (phoneNumber, zipCodes) => {
  // zipCodes = ['78745', '33156', '01075']
  const currentZipCodes = await getZipCodesBySubscriberPhoneNumber(phoneNumber),
        addZipCodes = getZipCodesToAdd(currentZipCodes, zipCodes),
        removeZipCodes = getZipCodesToRemove(currentZipCodes, zipCodes);

  // Compare the zipCodes array with the currentZipCodes array, which contains all zipCodes belonging to a subscriber
  //    - Are there any to remove?
  //      • Of the ones to remove will its removal result in it belonging to no other subscribers?
  //    - Are there any to add?
  //      • Of the ones to add are any new to the db table (i.e. weather data is not currently being fetched for them)?

  if(addZipCodes.length > 0) {
    // Check if the additional zipCode to add to the subscriber is active
    // (i.e. weather is currently fetched for the zipCode)

    // If zipCode is not active add it to the zip_codes table && publish message
  }

  if(removeZipCodes.length > 0) {
    // Check if the removal of the zipCode from the subscriber results in an orphan
    // (i.e. the zipCode will belong to no subscriber)

    // if orphan >>> remove zipCode from zip_codes table && publish message

  }

  return currentZipCodes;
}

module.exports = updateSubscriberZipCodes;
