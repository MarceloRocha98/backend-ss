
exports.up = function(knex, Promise) {
    return knex.schema.createTable('upload', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('img',300000).notNull() 
        table.integer('userId').references('id').inTable('users').notNull()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('upload')
};
