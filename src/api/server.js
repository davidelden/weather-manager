const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000;

const startServer = () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

module.exports = startServer;
