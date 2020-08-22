
exports.up = function(knex, Promise) {
    return knex.schema.createTable('handleService', table => {
        table.increments('id').primary()
        table.integer('user_Id').references('id')
        .inTable('users').notNull()
        table.integer('service_Id').references('id')
        .inTable('services').notNull()
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('handleService')
  
};
