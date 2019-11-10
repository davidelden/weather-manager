const dataMessage = (zipCode, timeZone, action) => (
  ['message', 'WeatherManagerZipCodeUpdate', 'zipcode', zipCode, 'timezone', timeZone, 'action', action]
);

const errorMessage = errMsg => (
  ['message', 'WeatherManagerError', 'error', errMsg]
);

const eventMessages = {
  start: ['message', 'WeatherManagerStart'],
  end: ['message', 'WeatherManagerEnd'],
  data: dataMessage,
  error: errorMessage
}

module.exports = eventMessages;
