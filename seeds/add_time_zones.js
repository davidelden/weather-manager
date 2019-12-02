exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('time_zones').del()
    .then(() => {
      // Inserts seed entries
      return knex('time_zones').insert([
        {time_zone: 'us_atlantic'},
        {time_zone: 'us_eastern'},
        {time_zone: 'us_central'},
        {time_zone: 'us_mountain'},
        {time_zone: 'us_arizona'},
        {time_zone: 'us_pacific'},
        {time_zone: 'us_alaska'},
        {time_zone: 'us_hawaii'},
        {time_zone: 'us_samoa'}
      ]);
    });
};
