exports.up = function(knex) {
  return knex.schema
    .createTable('zip_codes_time_zones_lookup', tbl => {
      tbl.string('zip_code').unique();
      tbl.integer('time_zone_id').references('time_zones.id');
      tbl.string('state');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('zip_codes_time_zones_lookup')
};
