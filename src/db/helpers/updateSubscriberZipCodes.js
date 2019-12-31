const getZipCodesBySubscriberPhoneNumber = require('./getZipCodesBySubscriberPhoneNumber.js'),
      getSubscriberID = require('./getSubscriberID.js'),
      getZipCodesToAdd = require('./getZipCodesToAdd.js'),
      getZipCodesToRemove = require('./getZipCodesToRemove.js'),
      getZipCodeIDs = require('./getZipCodeIDs.js'),
      attachZipCodesToSubscriber = require('./attachZipCodesToSubscriber.js'),
      detachZipCodesFromSubscriber = require('./detachZipCodesFromSubscriber.js'),
      zipCodeIdExistsInSubscribersZipCodes = require('./zipCodeIdExistsInSubscribersZipCodes.js'),
      deleteZipCodeByID = require('./deleteZipCodeByID.js');

const updateSubscriberZipCodes = async (phoneNumber, updatedZipCodes) => {
  const subscriberID = await getSubscriberID(phoneNumber);

  if(subscriberID === 0) return { message: 'Subscriber not found.' };

  const currentZipCodes = await getZipCodesBySubscriberPhoneNumber(phoneNumber),
        addZipCodes = getZipCodesToAdd(currentZipCodes, updatedZipCodes),
        removeZipCodes = getZipCodesToRemove(currentZipCodes, updatedZipCodes),
        zipCodesState = {};

  if(addZipCodes.length === 0 && removeZipCodes.length === 0) return { message: `No updates made on subscriber ${phoneNumber}` };

  if(addZipCodes.length > 0) {
    zipCodesState.addedZipCodes = await attachZipCodesToSubscriber(subscriberID, addZipCodes)
      .then(() => addZipCodes)
      .catch(err => console.log(err));
  }

  if(removeZipCodes.length > 0) {
    const removeZipCodesIDs = await getZipCodeIDs(removeZipCodes);

    zipCodesState.removedZipCodes = await detachZipCodesFromSubscriber(subscriberID, removeZipCodesIDs)
      .then(() => removeZipCodes)
      .catch(err => console.log(err));

    removeZipCodesIDs.forEach(async id => {
      let zipCodeStillActive = await zipCodeIdExistsInSubscribersZipCodes(id);

      if(!zipCodeStillActive) {
        deleteZipCodeByID(id);
      }
    });
  }

  zipCodesState.subscriberZipCodes = await getZipCodesBySubscriberPhoneNumber(phoneNumber);

  return zipCodesState;
}

module.exports = updateSubscriberZipCodes;
