require('dotenv').config();

const migrateLatest = require('./src/db/migrateLatest.js');

migrateLatest();
