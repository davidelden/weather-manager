const getZipCodesBySubscriberPhoneNumber = require('./getZipCodesBySubscriberPhoneNumber.js'),
      getSubscriberID = require('./getSubscriberID.js'),
      getZipCodesToAdd = require('./getZipCodesToAdd.js'),
      getZipCodesToRemove = require('./getZipCodesToRemove.js'),
      attachZipCodesToSubscriber = require('./attachZipCodesToSubscriber.js');

const updateSubscriberZipCodes = async (phoneNumber, zipCodes) => {
  // zipCodes = ['78745', '33156', '01075']
  const subscriberID = await getSubscriberID(phoneNumber);

  if(subscriberID === 0) return { message: 'Subscriber not found.' };

  const currentZipCodes = await getZipCodesBySubscriberPhoneNumber(phoneNumber),
        addZipCodes = getZipCodesToAdd(currentZipCodes, zipCodes),
        removeZipCodes = getZipCodesToRemove(currentZipCodes, zipCodes),
        zipCodesState = {};

  if(addZipCodes.length > 0) {
    attachZipCodesToSubscriber(subscriberID, addZipCodes); // This is async
  }

  if(removeZipCodes.length > 0) {
    // Check if the removal of the zipCode from the subscriber results in an orphan
    // (i.e. the zipCode will belong to no subscriber)

    // if orphan >>> remove zipCode from zip_codes table && publish message

  }

  return zipCodesState;
}

module.exports = updateSubscriberZipCodes;
