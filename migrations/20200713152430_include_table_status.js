
exports.up = function(knex, Promise) {
    return knex.schema.table('services', table => {
        table.integer('status').notNull().defaultTo(0)
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('services', table => {
        table.dropColumn('status')
    })
  
};
