const db = require('./connection.js');

const migrateLatest = () => {
  // Check if there is a valid connection in the pool
  db.raw('select 1 as dbIsUp').then(() => {
    return db.migrate.latest()
      .then(() => {
        return db.migrate.currentVersion();
      })
      .then((val) => {
        console.log('Done running latest migration:', val);
      });
  });
}

module.exports = migrateLatest;
