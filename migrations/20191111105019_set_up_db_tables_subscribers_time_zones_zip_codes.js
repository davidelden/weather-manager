exports.up = function(knex) {
  return knex.schema
    .createTable('subscribers', tbl => {
      tbl.increments('id').primary();
      tbl.text('arn').unique();
      tbl.string('phone_number').unique();
      tbl.timestamps(true, true);
    })
    .createTable('time_zones', tbl => {
      tbl.increments('id').primary();
      tbl.string('time_zone').unique();
      tbl.timestamps(true, true);
    })
    .createTable('zip_codes', tbl => {
      tbl.increments('id').primary();
      tbl.string('zip_code').unique();
      tbl.integer('time_zone_id').references('time_zones.id');
      tbl.timestamps(true, true);
    })
    .createTable('subscribers_zip_codes', tbl => {
      tbl.increments('id').primary();
      tbl.integer('subscriber_id').references('subscribers.id').onDelete('CASCADE');
      tbl.integer('zip_code_id').references('zip_codes.id');
      tbl.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('subscribers_zip_codes')
    .dropTable('zip_codes')
    .dropTable('time_zones')
    .dropTable('subscribers')
};
