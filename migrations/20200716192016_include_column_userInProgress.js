
exports.up = function(knex, Promise) {
    return knex.schema.table('services', table => {
        table.integer('userInProgress').notNull().defaultTo(0) 
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('services', table => {
        table.dropColumn('userInProgress')
  })
};
