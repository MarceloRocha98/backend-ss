
exports.up = function(knex, Promise) {
    return knex.schema.table('services', table => {
      table.string('location',1000).notNull()
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('services', table => {
      table.dropColumn('location')
  })
};
