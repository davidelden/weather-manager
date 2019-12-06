const getZipCodesToRemove = (currentZipCodes, newZipCodes) => (
  currentZipCodes.filter(zipCode => {
    return !newZipCodes.includes(zipCode);
  })
)

module.exports = getZipCodesToRemove;
