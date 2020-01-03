const getZipCodesToRemove = (currentZipCodes, updatedZipCodes) => (
  currentZipCodes.filter(zipCode => {
    return !updatedZipCodes.includes(zipCode);
  })
)

module.exports = getZipCodesToRemove;
