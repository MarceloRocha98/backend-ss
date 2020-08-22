
exports.up = function(knex, Promise) {
    return knex.schema.table('contact', table => {
        table.integer('serviceId').references('id').inTable('services').notNull()
    })
};

exports.down = function(knex, Promise) { 
    return knex.schema.table('contact', table => {
      table.dropColumn('serviceId')
  })
};
