exports.up = function (knex) {
  return knex.schema
    .createTable('cars', function (table) {
      table.increments('car_id').notNullable().primary();
      table.text('make').notNullable();
      table.text('model').notNullable();
      table.integer('price').notNullable();
    })
    .createTable('rentals', function (table) {
      table.increments('rental_id').notNullable().primary();
      table.integer('car_id').notNullable();
      table.integer('client_id').notNullable();
      table.integer('deposit').notNullable();
      table.text('state').notNullable();
    })
    .createTable('users', function (table) {
      table.increments('user_id').notNullable().primary();
      table.text('name').notNullable();
      table.text('email').notNullable();
      table.text('password').notNullable();
      table.integer('isVip').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cars').dropTable('rentals').dropTable('users');
};
