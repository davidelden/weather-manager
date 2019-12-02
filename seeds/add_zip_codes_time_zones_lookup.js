const csvFilePath = '/var/lib/postgresql/seeds/zip_codes_time_zones_lookup.csv';

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('zip_codes_time_zones_lookup').del()
    .then(function () {
      // Inserts seed entries
      return knex.raw(`COPY zip_codes_time_zones_lookup FROM '${csvFilePath}' DELIMITER ',' CSV HEADER`)
    });
};
