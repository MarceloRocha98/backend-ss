
exports.up = function(knex, Promise) {
    return knex.schema.table('services', table => {
        table.integer('price').notNull().defaultTo(1)
      
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('services', table => {
        table.dropColumn('price')
    })
};
