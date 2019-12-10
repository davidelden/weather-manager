const db = require('../connection.js');

const deleteZipCodeByID = zipCodeID => (
  db('zip_codes')
    .where('id', zipCodeID)
    .del()
    .catch(err => console.log(error))
)

module.exports = deleteZipCodeByID;
