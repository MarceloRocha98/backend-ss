
exports.up = function(knex, Promise) {
    return knex.schema.createTable('contact', table => {
        table.increments('id').primary()
        table.integer('userFrom').references('id').inTable('users').notNull()
        table.integer('userTo').references('id').inTable('users').notNull()
        table.string('mensage').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contact')
};
