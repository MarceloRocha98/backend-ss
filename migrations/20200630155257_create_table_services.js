
exports.up = function(knex, Promise) {
    return knex.schema.createTable('services', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description',1000).notNull()
        table.string('content').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('services')
  
};
