
exports.up = function(knex, Promise) {
    return knex.schema.createTable('servicesInProgress', table => {
        table.increments('id').primary()
        table.integer('userId').notNull()
        table.integer('serviceId').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('servicesInProgress')
};
