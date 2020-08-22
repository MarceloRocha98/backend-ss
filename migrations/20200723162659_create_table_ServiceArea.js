
exports.up = function(knex, Promise) {
    return knex.schema.createTable('serviceArea', table => {
        table.increments('id').primary()
        table.integer('userId1')
            .references('id').inTable('users').notNull()
        table.integer('userId2')
            .references('id').inTable('users').notNull()
        table.integer('serviceId')
            .references('id').inTable('services').notNull().unique()
        table.integer('chekingLocal1').notNull().defaultTo(0)
        table.integer('chekingLocal2').notNull().defaultTo(0)
        table.integer('finish1').notNull().defaultTo(0)
        table.integer('finish2').notNull().defaultTo(0)
        
        
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('serviceArea')
};
