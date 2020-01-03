require('dotenv').config();

const migrateLatest = require('./src/db/migrateLatest.js'),
      startServer = require('./src/api/server.js');

migrateLatest();
startServer();
