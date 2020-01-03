const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      subscribers = require('./routes/subscribers.js');

app.locals.baseURL = '/api/v1/weather-manager';

app.use(`${app.locals.baseURL}/subscribers`, subscribers);

const startServer = () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = startServer;
