const getZipCodesToAdd = (currentZipCodes, updatedZipCodes) => (
  updatedZipCodes.filter(zipCode => {
    return !currentZipCodes.includes(zipCode);
  })
)

module.exports = getZipCodesToAdd;
